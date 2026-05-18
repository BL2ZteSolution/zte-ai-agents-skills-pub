---
name: iepms-fishbone-data-checker
description: Check IEPMS site data and task status for fishbone analysis. Fetches project list, site info, tasks, and custom fields; outputs WhatsApp-formatted summary. Uses default credentials (7018000051 / 6d1e33e2011aa1bec9b7370a1d1a57dd) or accepts provided credentials. All HTTP requests/responses are logged. Caches field definitions once per day. Uses axios for HTTP.
version: 9.0.0
author: OpenClaw Agent
tags:
  - iepms
  - fishbone
  - data-checker
primaryLanguage: node
---

# IEPMS Fishbone Data Checker

A skill to query IEPMS API through a multi-step process to verify site information, task status, and SubCon TI value with precise filtering, caching, and logging.

## Trigger

```
fbr-check {site_code}
```

Or with optional parameters:
```
fbr-check {site_code} [project {project_code}] [model {du_model_name}] [full] [tasks {task1,task2,...}]
```

Examples:
```
fbr-check 3634B_1
fbr-check 3634B_1 project P202202168750_D002
fbr-check 3634B_1 project P202202168750_D002 model 2023 TX Rollout
fbr-check 3634B_1 full
fbr-check 3634B_1 tasks Material Collection,Material On Site,EHS Check
fbr-check 3634B_1 project P202202168750_D002 model 2023 TX Rollout full tasks Material Collection,Material On Site,EHS Check,Equipment Installation,TX Integrated,L1 Approved,PAC Approved
```

## Authentication

The skill uses default credentials by default:
- Username: `7018000051`
- Token: `6d1e33e2011aa1bec9b7370a1d1a57dd`

If you need to override, provide credentials via the skill's context. Two formats are supported:

**Format A (preferred):**
```json
{
  "credentials": {
    "token": "your_token",
    "username": "your_username"
  }
}
```

**Format B (raw cookie components):**
```json
{
  "credentials": {
    "UCSSSOAccount": "your_username",
    "UCSSSOToken": "your_token"
  }
}
```

The skill constructs the required `Cookie` header automatically: `UCSSSOAccount={username}; UCSSSOToken={token};`

### Session handling
The IEPMS API returns a `fb_session` cookie after authentication. The skill automatically captures this `Set-Cookie` header and includes it in all subsequent requests. This cookie is required for authenticated API calls.

## Process

### Step 1: User Input / Credentials
- Credentials are taken from `context.credentials` if provided.
- If not provided, the built-in defaults are used.
- No prompting — the skill runs non-interactively.

**Request headers:** All HTTP requests include:
- `Host: iepms.zte.com.cn`
- `Accept: application/json, text/javascript, */*; q=0.01`
- `Content-Type: application/json; charset=UTF-8`
- `Cookie`: constructed from credentials + persisted `fb_session`

**Query parameters:** All API calls append both `user_id` and `username` query parameters with the same value.

### Step 2: Project Lookup
- **API**: `POST https://iepms.zte.com.cn/fbr/apidata/getAPIData?apiid=526129009928470528&user_id=<username>&username=<username>`
- Request body: `{ "user_id": "<username>" }`
- Retrieves all projects and finds the one matching `proj_code` (default: `P202202168750_D002`)
- Extracts `proj_id` for subsequent steps
- **Logging**: Outputs `step1Payload` and `step1Response` as pretty‑printed JSON to stdout

### Step 2.1: Daily Fields Cache
- **API**: `POST https://iepms.zte.com.cn/fbr/apidata/getAPIData?apiid=553988106803511296&user_id=<username>&username=<username>`
- Request body: `{ "proj_id": "{proj_id}" }`
- Fetches field metadata for the project. Cache is stored with `requestedAt` date (YYYY-MM-DD) and reused for the remainder of the calendar day.
- Cache file: `data/dufield_{proj_id}.json`
- **Logging**: Outputs `step1_1Payload` and `step1_1Response` as JSON
- If cache is fresh (same day), the API call is skipped and the cached data is used.
- The cached response is appended with `requestedAt` indicating the date it was fetched.

### Step 3: Site/DU Lookup with Model Filter
- **API**: `POST https://iepms.zte.com.cn/fbr/apidata/getAPIData?apiid=1059839087123398656&user_id=<username>&username=<username>&parse_json=true`
- Request body:
  ```json
  {
    "proj_id": "{proj_id}",
    "model_id": "",
    "model_name": "",
    "site_model_name": "",
    "region": "",
    "phase": "",
    "du_code": "",
    "du_name": "",
    "du_status": "",
    "site_id": "",
    "site_code": "{site_code}",
    "site_name": ""
  }
  ```
- Returns all site/DU records matching the `site_code` within the selected project.
- Builds `availableModels` map: `{ [du_model_name]: du_model_id }` from the returned set.
- Selection:
  - If user provides `model {du_model_name}`, tries to match exactly.
  - Otherwise defaults to `2023 TX Rollout`; if not present, uses the first record.
- Preserves all response fields. Important outputs: `du_id`, `du_code`, `du_model_name`, `du_model_id`, `product_domain`, `region`, `state`, `longitude`, `latitude`, etc.
- **Logging**: Outputs `step2Payload` and `step2Response` as JSON
- If no matching record: returns `{ success: false, message: "Step 2 no record, skip step 3" }`

### Step 4: Task Status for All Tasks (Full Sequence)
- **API**: `POST https://iepms.zte.com.cn/fbr/apidata/getAPIData?apiid=529648514487058432&user_id=<username>&username=<username>`
- Request body:
  ```json
  {
    "task_id": "",
    "proj_id": "{proj_id}",
    "status": "Completed,OnGoing",
    "du_id": "empty,{du_id}"
  }
  ```
- Retrieves all tasks for the selected DU.
- The **full 32‑step task sequence** (see below) is included in the result when `full` flag is set; otherwise only the 7 primary milestones are kept.
- Filtering:
  - Without `full`: filters to the **primary milestones** (fishbone key points):
    - Material Collection
    - Material On Site
    - EHS Check
    - Equipment Installation
    - TX Integrated
    - L1 Approved
    - PAC Approved
  - With `full`: all tasks are kept (unfiltered).
  - User can override with `tasks {task1,task2,...}` to show a custom subset.
- **Logging**: Outputs `step3Payload` and `step3Response` as JSON
- If no tasks found at all: returns `{ success: false, message: "no result found" }`

### Step 5: Field Values Lookup (SubCon TI & SOW)
- **API**: `POST https://iepms.zte.com.cn/fbr/apidata/getAPIData?apiid=553909219625041920&user_id=<username>&username=<username>`
- Request body (for each target field):
  ```json
  {
    "proj_id": "{proj_id}",
    "field_code": "{field_code}",
    "du_id": "{du_id}"
  }
  ```
- Target field names (resolved via Step 2.1 cache):
  - `SubCon - TI`
  - `TX SOW (LLD)`
  - `Post MOCN TX SOW (LLD)`
  - `Microwave Tx SOW-1`
- Field codes are looked up in the Step 2.1 cache by exact `field_name` match. If not found, value is set to `-`.
- **Default output**: These four fields are always included in the human‑readable summary, showing `-` when empty.
- **Logging**: Outputs `step4Payload` and `step4Response` as JSON for each field lookup

## Output Format (WhatsApp)

The skill produces a human‑readable summary in the following exact format:

```
Site: {site_code}

Project: {proj_code} ({proj_name})
DU: {product_domain}/{du_model_name} ({du_code})
Region: {region}

Work Status:

✅ Material Collection - Completed (2025-04-16) - ZHANG DONG
✅ Material On Site - Completed (2025-04-25) - MUHAMMAD AMIRUL BIN KHAMIS
⏳ EHS Check - OnGoing - -
✅ Equipment Installation - Completed (2025-04-25) - MUHAMMAD AMIRUL BIN KHAMIS
✅ TX Integrated - Completed (2025-04-18) - MOHD AMIR BIN SAMSI
✅ L1 Approved - Completed (2025-04-25) - MUHAMMAD AMIRUL BIN KHAMIS
✅ PAC Approved - Completed (2025-04-25) - ASTI GANIS PUTRIANI

SubCon TI: GTSB
TX SOW (LLD): -
Post MOCN TX SOW (LLD): -
Microwave Tx SOW-1: -
```

**Notes:**
- **DU line**: Uses `{product_domain}/{du_model_name} ({du_code})`. If `product_domain` is missing, falls back to `{du_model_name} ({du_code})`.
- **Blank lines**: There is a blank line after the site header block, after `Work Status:`, and between the last task line and the field lines.
- **Task status symbols**:
  - `✅` for `Completed`
  - `⏳` for any other status (e.g., `OnGoing`, `InProgress`)
- **Responsible person**: taken from `responsible_user_en`; if empty, `responsible_user_cn`; if also empty, `-`.
- **Date**: shown as `YYYY-MM-DD` extracted from `my_date`. If `my_date` is empty, the parentheses are omitted.
- **Field lines**: All four (SubCon TI, TX SOW (LLD), Post MOCN TX SOW (LLD), Microwave Tx SOW-1) are always displayed. If a value is not found, `-` is shown.

## Task Sequence Reference

The full IEPMS 32‑step task sequence (used when `full` flag is set):

1. PO Received from Cust
2. TX Planning
3. Lifting 1 Usage Submission (Document Approval)
4. Physical Survey
5. Lifting 1 Usage Report (L1)
6. TSSR Submitted to ZTE
7. TSSR Submitted to Customer
8. TSSR customer Approval
9. Link Budget_Tx
10. BOQ Confirm
11. Material Collection
12. Lifting 2 Usage Submission (Document Approval)
13. Material On Site
14. EHS Check
15. Equipment Installation
16. TX Integrated
17. Lifting 2 Usage Report (L1)
18. L1 Approved
19. TX Outsource Handover
20. Online Site Acceptance
21. Digi ATP Approval
22. MRCF
23. Topology Diagram_Tx
24. L1 Report
25. As-Built Drawing
26. FQPL
27. MRCF Document
28. Front Page
29. Site Binder Completed
30. PAC Work Complete
31. PAC Approved
32. FAC Approved

By default (without `full`), only these **primary milestones** are shown:
- Material Collection
- Material On Site
- EHS Check
- Equipment Installation
- TX Integrated
- L1 Approved
- PAC Approved

## Result Object

When `full` flag is **not** set:

```typescript
{
  success: boolean,
  output: string,
  result: {
    data: {
      project: { ... },           // full project record from Step 2
      site: { ... },              // selected site/DU record from Step 3 (same as du)
      du: { ... },                // same as site
      availableModels: { [name]: id },  // model map from Step 3
      tasks: Array<...>,          // filtered tasks (with limited fields: scope_task_name, status, my_date, responsible_user_en/cn)
      fields: null,
      fieldValues: {              // only SubCon TI value by default; others omitted unless full
        subcon_ti: string
      },
      fieldCodes: {               // resolved field codes from Step 2.1 cache
        subcon_ti: string,
        tx_sow: string,
        post_mocn_tx_sow: string,
        microwave_tx_sow: string
      }
    }
  }
}
```

When `full` flag **is** set:

```typescript
{
  success: boolean,
  output: string,
  result: {
    data: {
      project: { ... },
      site: { ... },
      du: { ... },
      availableModels: { [name]: id },
      tasks: Array<...>,          // all tasks from Step 4 (unfiltered, full fields)
      fields: { ... },            // full Step 2.1 cache response (with requestedAt)
      fieldValues: {              // full values for all four target fields
        subcon_ti: string,
        tx_sow: string,
        post_mocn_tx_sow: string,
        microwave_tx_sow: string
      },
      fieldCodes: { ... }
    }
  }
}
```

All original API response fields are preserved in `project`, `site/du`, and (when `full`) `tasks` and `fields` for downstream processing.

## Error Handling

- **Step 1**: Returns `{ success: false, message: 'Step 1 failed: ...' }` or `'Step 1 no record'`
- **Step 1.1**: Returns `{ success: false, message: 'Step 1.1 failed: ...' }`
- **Step 2**: If no site found: `'Step 2 no record, skip step 3'`
- **Step 3**: If no tasks found: `'no result found'`
- All other exceptions return `{ success: false, message: err.message }`

## Caching

| Data                | TTL   | Cache file                          |
|---------------------|-------|-------------------------------------|
| Fields list (Step 2.1) | 1 day (calendar) | `data/dufield_{proj_id}.json` (includes `requestedAt` as YYYY-MM-DD) |

Cache is checked at the start of Step 2.1; if a cache exists with today's date, it is reused without making an API call.

## Dependencies

- Node.js 18+
- `axios` (included in `node_modules`)

## Files

- `fetch_iepms_data.js` — main script
- `SKILL.md` — this documentation
- `data/` — cache directory for `dufield_{proj_id}.json`
- `node_modules/` — axios dependency
- `package.json` — npm manifest

## Notes

- **Host header**: All requests must include `Host: iepms.zte.com.cn`. This is set automatically.
- **Username parameter**: Every API URL requires both `user_id` and `username` query parameters (same value). This is added automatically.
- **Session cookie**: The `fb_session` cookie returned by the API is automatically captured and included in subsequent requests. No manual intervention needed.
