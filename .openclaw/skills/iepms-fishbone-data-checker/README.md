# IEPMS Fishbone Data Checker (Refined v5.5.4

Check site information and task status from the IEPMS system through a multi-step API process with filtering, caching, and detailed logging.

## Trigger

```
fbr-check {site_code}
```

Or with optional parameters:
```
fbr-check {site_code} [project {project_code}] [model {du_model_name}] [full]
```

Examples:
```
fbr-check 3634B_1
fbr-check 3634B_1 project P202202168750_D002
fbr-check 3634B_1 project P202202168750_D002 model 2023 TX Rollout
fbr-check 3634B_1 full
fbr-check 3634B_1 project P202202168750_D002 model 2023 TX Rollout full
```

## Process Overview

### Step 1: Project Lookup
- API: `526129009928470528`
- Gets project list, filters by `proj_code` (default: `P202202168750_D002`)
- Extracts `proj_id`
- **Logs**: `step1Payload`, `step1Response`

### Step 1.1: Daily Fields Cache
- API: `553988106803511296`
- Fetches field metadata for `{proj_id}`, caches **full response** in `data/dufield_{proj_id}.json` with `requestedAt` date appended
- Cache valid for current day (YYYY-MM-DD)
- **Logs**: `step1.1Payload`, `step1.1Response`
- Used to build `field_name → field_code` map for later steps

### Step 2: Site/DU Lookup
- API: `1059839087123398656` with `parse_json=true`
- Filters: `proj_id` must match Step 1; optional `du_model_name` filter
- Default model preference: `2023 TX Rollout` (or first match if not found)
- Builds `available_models` map: `{ [du_model_name]: du_model_id }`
- **Logs**: `step2Payload`, `step2Response`
- Failure: "Step 2 no record, skip step 3"

### Step 3: Task Status
- API: `529648514487058432`
- Queries tasks for the `du_id` with statuses `Completed,OnGoing`
- **Target task names** (filter by `scope_task_name`):
  - `Material Collection`
  - `Material On Site` (MOS)
  - `Equipment Installation` (TI)
  - `TX Integrated`
  - `L1 Approved`
  - `PAC Approved` (PAC)
- Returns most recent per name by `my_date`
- **Default output**: only `scope_task_name`, `status`, `my_date`
- **With `full` flag**: all task fields are included.
- **Logs**: `step3Payload`, `step3Response`
- Failure: "no result found"

### Step 4: SubCon TI
- API: `553909219625041920`
- Looks up field code from Step 1.1 cache where `field_name = "SubCon - TI"`
- If field name missing, Step 4 is skipped (non-fatal)
- Fetches value for `{proj_id}`, `{du_id}`, `{field_code}`
- **Default output**: `{ field_code, value }`
- **With `full` flag**: all field info fields are included.
- **Logs**: `step4Payload`, `step4Response`

## Output

**Success** (default, minimal fields):
```json
{
  "success": true,
  "data": {
    "project": {
      "proj_id": "...",
      "proj_code": "...",
      "proj_name": "..."
    },
    "site": {
      "site_id": "...",
      "site_code": "...",
      "du_id": "...",
      "du_code": "...",
      "du_model_id": "...",
      "du_model_name": "...",
      "region": "...",
      "state": "...",
      "longitude": "...",
      "latitude": "...",
      "available_models": { "2023 CR": "...", "2023 TX Rollout": "..." }
    },
    "tasks": {
      "Material Collection": { "scope_task_name": "...", "status": "...", "my_date": "..." },
      "Material On Site": { "scope_task_name": "...", "status": "...", "my_date": "..." },
      "Equipment Installation": { "scope_task_name": "...", "status": "...", "my_date": "..." },
      "TX Integrated": { "scope_task_name": "...", "status": "...", "my_date": "..." },
      "L1 Approved": { "scope_task_name": "...", "status": "...", "my_date": "..." },
      "PAC Approved": { "scope_task_name": "...", "status": "...", "my_date": "..." }
    },
    "subcon_ti": { "field_code": "...", "value": "..." }
  }
}
```

Only listed fields are included by default for `tasks` and `subcon_ti`; `site` retains all original fields plus `available_models`.

**Full output** (with `full` flag): `tasks` and `subcon_ti` include all fields from their respective API responses.

### Task Sequence Reference (Complete List)

IEPMS defines a 32-step task sequence. For fishbone analysis, the skill focuses on these 6 critical milestones:

- `Material Collection` (early stage)
- `Material On Site` (MOS)
- `Equipment Installation` (TI)
- `TX Integrated`
- `L1 Approved`
- `PAC Approved` (PAC)

The full sequence (for reference) includes:

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

## Configuration

- `USER_ID = '7018000051'`
- `DEFAULT_PROJ_CODE = 'P202202168750_D002'`
- Base URL: `https://iepms.zte.com.cn/fbr/apidata/getAPIData`
- **Target task names**: `Material Collection`, `Material On Site`, `Equipment Installation`, `TX Integrated`, `L1 Approved`, `PAC Approved`
- **Target field name**: `SubCon - TI` (code is looked up from Step 1.1 cache)
- Default DU model filter: `'2023 TX Rollout'`

## Technical

- Node.js 18+ (native fetch)
- No external dependencies
- Entry: `fetch_iepms_data.js` (exports `main`)
- Cache: `data/dufield_{proj_id}.json` (contains full Step 1.1 response + `requestedAt`)
- OpenClaw invoke: `main({ message: "...trigger..." })`

## Error Messages

- Invalid trigger: `"Invalid trigger. Use: fbr-check {site_code} [project {project_code}] [model {du_model_name}] [full]"`
- Step 1 no match: `"Step 1 no record"`
- Step 2 no match: `"Step 2 no record, skip step 3"`
- Step 3 no tasks: `"no result found"`

## Version History

- **5.5.4** (2026-04-13): Changed PAC milestone target from `PAC Work Complete` to `PAC Approved` to better reflect final acceptance stage. Updated documentation.
- **5.5.3** (2026-04-13): Added `Material Collection` to target task list; now tracking 6 milestones total. Updated all documentation accordingly.
- **5.5.2** (2026-04-13): Expanded target task list to 5 milestones: Material On Site, Equipment Installation, TX Integrated, L1 Approved, PAC Work Complete. Added complete 32-item task sequence reference in docs.
- **5.5.1** (2026-04-06): Step 1.1 cache now stores full API response with `requestedAt`; internal refactor `writeCache` signature.
- **5.5.0** (2026-04-06): Switched to name-based mapping for tasks and SubCon TI field; dynamic field code lookup; task keys now names
- 5.4.0: Added `full` flag for complete output; improved documentation
- 5.3.0: Added `model` parameter, default `du_model_name` filtering, step1 logging, strict column output, `du_model_name` in response
- 5.2.0: Initial refined implementation with caching and minimal field output