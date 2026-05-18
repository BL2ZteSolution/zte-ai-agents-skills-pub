# IEPMS Column Writer — API Reference

This document provides detailed information about the IEPMS APIs used by the column writer skill, following the exact 7-step workflow.

## CLI Signature

```
iepms-writter {site_code} {proj_code} {duModelName} {viewName} {fieldTitle} {fieldName} {value:YYYY-MM-DD} [--interactive]
```

- By default, the update proceeds **without** a confirmation prompt.
- Add `--interactive` (or `-i`) to show the confirmation prompt before executing Step 7.
- `proj_code` **must** match one of the project codes returned by Step 2.

## Base URL

```
https://iepms.zte.com.cn
```

## Authentication Headers (Prerequisite for Steps 3–7)

All requests in steps 3–7 must include:

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |
| `X-Emp-No` | Your username (e.g., `7018000051`) |
| `X-Auth-Value` | Your API token |
| `X-Itp-Value` | `timeZone=8;projId=<proj_id>` (obtained from Step 2) |
| `Referer` | `https://iepms.zte.com.cn/zte-crm-iepms-scheduleui/` |

**Step 2 and Step 6 use a different header set** (Cookie-based SSO, see below).

---

## Step 1: User Input

The skill prompts for a JSON object containing the token and username:

```json
{
  "token": "08276f222e9b438339fd65113bd8809d",
  "username": "7018000051"
}
```

Credentials are cached in `~/.openclaw/skills/iepms-column-writter/cache/credentials.json`.

---

## Step 2: Get Project List

**Endpoint**
```
POST /fbr/apidata/getAPIData?apiid=526129009928470528&user_id={username}&username={username}
```

**Headers (Step 2 only)**
```
Host: iepms.zte.com.cn
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/json; charset=UTF-8
Cookie: UCSSSOAccount={username}; UCSSSOToken={token};
Referer: https://iepms.zte.com.cn/fbr/
```

**Request Body**
```json
{
  "user_id": "7018000051"
}
```

**Response**
```json
{
  "success": true,
  "data": [
    {
      "proj_id": "c46633e8-6e52-2178-f17e-dcbfdade7cb2",
      "proj_code": "P202202168750_D002",
      "proj_name": "马来西亚CelcomDigi双网融合项目"
    },
    // … more projects
  ],
  "log": { "1": 515.14, "length": 8 },
  "error": null
}
```

**Processing**
- Build `projMap1` mapping: `projMap1 = { [proj_id]: proj_code }` and log it.
- Select the project with `proj_code` equal to the user-provided `proj_code` argument. Abort if not found.
- Preserve the selected `proj_id` for subsequent steps (it will be used in `X-Itp-Value`).

**Cache**: 1 hour (`proj_user_{username}.json` under cache directory).

**Note**: The API may return a `fb_session` cookie; this is captured and reused for subsequent requests (including Step 6).

---

## Step 3: Get DuModel IDs

**Endpoint**
```
GET /zte-crm-iepms-basebff/zte-crm-iepms-schedule/duModel
```

**Headers**
```
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/json
X-Emp-No: {username}
X-Auth-Value: {token}
X-Itp-Value: timeZone=8;projId={proj_id}
Referer: https://iepms.zte.com.cn/zte-crm-iepms-scheduleui/
```

**Response**
```json
{
  "code": { "code": "0000", "msgId": "RetCode.Success", "msg": "Successful" },
  "bo": [
    {
      "productDomainId": "...",
      "productDomainName": "Wireless RAN",
      "productDomainStatus": 2010,
      "duModelVOList": [
        {
          "productDomainId": "...",
          "duModelId": "1027190858144623081",
          "duModelName": "2023 TX Rollout",
          "orderNum": "3",
          "duModelStatus": "ENABLED",
          "duModelGranularity": "SITE",
          // …
        },
        // … more models
      ]
    },
    // … more product domains
  ],
  "other": { /* tracing headers omitted */ },
  "responseRule": "msa"
}
```

**Processing**
- Flatten all `duModelVOList` entries from all product domains.
- Filter to `duModelStatus === "ENABLED"` only.
- Build `duMap`: `{ [duModelId]: duModelName }` and log it.
- Match the user-provided `duModelName` and retrieve its `duModelId`. Abort if not found.

**Cache**: 24 hours (`columns_duModels.json`).

---

## Step 4: Get View IDs

**Endpoint**
```
GET /zte-crm-iepms-basebff/zte-crm-iepms-schedule/viewManage/getViewList?duModelId={duModelId}
```

**Headers**: Same as Step 3.

**Response**
```json
{
  "code": { "code": "0000", "msgId": "RetCode.Success", "msg": "Successful" },
  "bo": {
    "publicViews": [
      {
        "viewId": "2540490949868649705",
        "viewName": "TX Mini Project v1",
        "viewType": "CUSTOM_VIEW"
      },
      // … more views
    ],
    "personalViews": [],
    "selectedViewId": "2540490949868649705"
  },
  "other": { /* tracing headers omitted */ },
  "responseRule": "msa"
}
```

**Processing**
- Build `duViews`: `{ [viewId]: viewName }` for all public and personal views, and log it.
- Match the user-provided `viewName` **exactly** (case-sensitive). If not found:
  1. Fall back to `"默认视图"` (Chinese) if available.
  2. If still not found, fall back to `"Default View"` (English) if available.
  3. If none found, abort with error.
- Store the selected `viewId` for the next step.

**Cache**: 24 hours (`columns_views_{duModelId}.json`).

---

## Step 5: Get Column Definitions (Schedule Titles)

**Endpoint**
```
GET /zte-crm-iepms-basebff/zte-crm-iepms-schedule/schedule/getScheduleTitle?duModelId={duModelId}&viewId={viewId}
```

**Headers**: Same as Step 3.

**Response**
```json
{
  "code": { "code": "0000", "msgId": "RetCode.Success", "msg": "Successful" },
  "bo": [
    {
      "titleOne": "Material On Site",
      "titleTwo": "Material On Site",
      "titleThree": "actual end time",
      "viewFieldId": "4612352360812042495",
      "fieldId": "actual_end_date",
      "fieldName": "actual_end_date",
      "fieldType": "activity",
      "fieldPath": "WP10500|AC0000111566|actual_end_date",
      "screeningType": "date",
      "duModelWpAcId": "4188808420050925271",
      "acCode": "AC0000111566",
      "duModelWpId": "8197012087852314541",
      "wpCode": "WP10500"
    },
    // … more columns
  ],
  "other": { /* tracing headers omitted */ },
  "responseRule": "msa"
}
```

**Processing**
- Group columns by `duModelWpAcId` into `duColumns`:
  ```js
  {
    "4188808420050925271": [ /* columns for this work package */ ],
    // …
  }
  ```
  Log `duColumns` as JSON.
- Match the user's `fieldTitle` and `fieldName`:
  - `fieldTitle` must equal either `titleOne` or `titleTwo`.
  - `fieldName` must equal either `titleThree` or `fieldName`.
  - The first column that satisfies both conditions yields:
    - `fieldId`
    - `fieldType`
    - `duModelWpAcId` (used as `bizId` in Step 7)
- Validate date format if `fieldType` is `"activity"` and `screeningType` is `"date"` (or `valueType === "date"`). The value must match `YYYY-MM-DD` or be empty string (to clear).
- Append `requestedAt: <current date YYYY-MM-DD>` to the response and combine with the original payload. Cache the combined object.

**Cache**: 24 hours (`columns_{viewId}.json`). Runs once per day maximum.

---

## Step 6: Get Site Info (du_id)

**Endpoint**
```
POST /fbr/apidata/getAPIData?apiid=1059839087123398656&user_id={username}&username={username}&parse_json=true
```

**Headers**: Same as Step 2 (Cookie-based with `Host`).

**Request Body**
```json
{
  "proj_id": "{proj_id}",
  "model_id": "{duModelId}",
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

**Response**
```json
{
  "success": true,
  "data": [
    {
      "proj_id": "c46633e8-6e52-2178-f17e-dcbfdade7cb2",
      "product_domain": "Wireless RAN",
      "du_model_name": "2023 CR",
      "du_model_id": "2639475995759150990",
      "site_code": "3634B_1",
      "site_id": "400a44271535ae501d4bb78f02ad3426",
      "region": "Central",
      "du_code": "DU00003792564",
      "du_name": "Wireless RAN/2023 CR/3634B_1",
      "du_id": "5684065407857658120",
      "du_status": "ENABLED",
      "phase_code": "",
      "cluster": "",
      "site_model_name": "Wireless RAN",
      "longitude": "101.42053",
      "latitude": "2.9903",
      "state": "Selangor"
    }
  ],
  "log": { "1": 365.17, "length": 1 },
  "error": null
}
```

**Processing**
- Validate that `data.data` has exactly one element.
  - If zero → `Error: No records found for site '{site_code}'`
  - If > 1 → `Error: Multiple records found for site '{site_code}' (n)`
- Extract `du_id` from the single record. This will populate `duIdList` for Step 7.

**Cache**: 30 minutes (`site_{siteCode}_{projectId}.json`).

---

## Step 7: Batch Modify Column

**Endpoint**
```
POST /zte-crm-iepms-basebff/zte-crm-iepms-schedule/schedule/batchModify
```

**Headers**: Same as Step 3.

**Request Body**
```json
{
  "duIdList": [
    "5684065407857658120"
  ],
  "fieldType": "activity",
  "fieldId": "actual_end_date",
  "fieldValue": "2025-08-19",
  "bizId": "4188808420050925271"
}
```

**Parameters**

| Parameter | Source | Notes |
|-----------|--------|-------|
| `duIdList` | Step 6 (`du_id`) | Array, can contain multiple IDs |
| `fieldType` | Step 5 column | Typically `"activity"` or `"docata"` |
| `fieldId` | Step 5 column | e.g., `"actual_end_date"` |
| `fieldValue` | Command argument | Date string `YYYY-MM-DD` for `activity`, any string for `docata` |
| `bizId` | Step 5 column | The `duModelWpAcId` from the selected column |

**Response**
```json
{
  "code": { "code": "0000", "msgId": "RetCode.Success", "msg": "Successful" },
  "bo": { /* implementation-specific result object */ },
  "other": { /* tracing headers omitted */ },
  "responseRule": "msa"
}
```

**Confirmation and Summary**

After Step 6, the skill prints a summary to stdout for verification:

```
==================================================
SUMMARY
==================================================
Project:  马来西亚CelcomDigi双网融合项目
Site:     1572C
Field:    Material On Site > actual_end_date
Value:    2025-08-19
Target:   DU ID 5684065407857658120
==================================================
```

- **Default (non-interactive)**: The update proceeds immediately.
- **With `--interactive`**: The skill prompts `Proceed with update? (yes/no):` and waits for confirmation before sending the batch modify request.

---

## Logging

Every HTTP request and response is printed to stdout **in full**, before and after execution:

```
=== HTTP REQUEST ===
POST https://iepms.zte.com.cn/...
Headers: { ... }
Body: { ... }

Response: 200 OK
Response Headers: { ... }
Response Body: { ... }
```

Sensitive token values are masked (`***`) in the printed headers.

---

## Common Errors

| Condition | Message |
|-----------|---------|
| Invalid credentials JSON | `Invalid JSON. Expected: {"token":"your_token","username":"your_username"}` |
| Project not found (default) | `Project 'P202202168750_D002' not accessible` |
| duModel not found | `duModel "2023 TX Rollout" not found` |
| View not found (exact match required) | `View "TX Mini Project v1" not found` |
| Column not found | `Field not found: Material On Site + actual_end_date` |
| Site not found | `No records found for site '1572C'` |
| Multiple site records | `Multiple records found for site '1572C' (2)` |
| Invalid date format | `Error: value must be in YYYY-MM-DD format` |
| Business validation error | e.g., `AC_PLAN_TIME_ILLEGAL_WITH_PARAM` – check date constraints |
| HTTP non‑200 or API error | Detailed message from the response is shown |

---

## Rate Limits and Best Practices

- The skill implements caching to minimize redundant API calls (see Caching below).
- If you encounter HTTP 429, consider adding exponential backoff (not currently implemented).
- Batch multiple `duIdList` entries in a single update when possible.

---

## Caching

To minimize API load and improve speed:

| Data                    | TTL   | Cache file pattern                      |
|-------------------------|-------|-----------------------------------------|
| Credentials             | indefinite | `credentials.json` (stored in user home) |
| Project list            | 1h    | `proj_user_{username}.json` (full response; construct `projMap1`) |
| duModel map             | 24h   | `columns_duModels.json`                 |
| View map                | 24h   | `columns_views_{duModelId}.json`        |
| Column definitions      | 24h   | `columns_{viewId}.json` (includes `requestedAt`) |
| Site info               | 30m   | `site_{siteCode}_{projectId}.json`      |

Cache directory: `~/.openclaw/skills/iepms-column-writter/cache/`

---

## Files

- `scripts/iepms-column-writter.js` — main script
- `SKILL.md` — user-facing documentation
- `references/api_reference.md` — this document
- `cache/` — local cache for credentials and API responses
