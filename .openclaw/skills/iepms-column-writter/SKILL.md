---
name: iepms-column-writter
description: 'Updates IEPMS column values for specific sites via API. Follows a 7-step workflow with auth, project selection by proj_code, duModel/view discovery, column lookup, and batch update. Uses built-in default credentials (username: 7018000051, token: 6d1e33e2011aa1bec9b7370a1d1a57dd) on first run; you can override by providing a credentials JSON (formats: {"token":"...","username":"..."} or {"UCSSSOAccount":"...","UCSSSOToken":"..."}). All HTTP requests/responses are logged. Field selection requires separate fieldTitle and fieldName (e.g., "Material On Site" "actual_end_date"). Values must be YYYY-MM-DD for date fields. Caches: column definitions (24h, columns_{viewId}.json), site info (30m, site_{siteCode}_{projectId}.json). Falls back to "默认视图" then "Default View" if the specified view is not found. By default runs non-interactively; use --interactive to enable confirmation prompt. Requires Node.js v18+ (uses axios for HTTP).'
version: 9.0.0
author: OpenClaw Agent
tags:
  - iepms
  - column-writter
  - update
primaryLanguage: node
---

# IEPMS Column Writer

## Overview

This skill implements a precise 7-step workflow to update IEPMS columns:

1. **Credentials**: On first run (or when credentials not cached), the script prompts for credentials. Accepts either `{"token":"...","username":"..."}` or `{"UCSSSOAccount":"...","UCSSSOToken":"..."}`. Press Enter without input to use built-in defaults (username: `7018000051`, token: `6d1e33e2011aa1bec9b7370a1d1a57dd`). Credentials are cached in `~/.openclaw/skills/iepms-column-writter/cache/credentials.json`.
2. **Project List** (`POST /fbr/apidata/getAPIData?apiid=526129009928470528`): Fetch available projects, build `projMap1` (`{ [proj_id]: proj_code }`), log it; select the project matching the user-provided `proj_code` argument.
3. **DuModel IDs** (`GET /zte-crm-iepms-basebff/zte-crm-iepms-schedule/duModel`): Flatten all product domains, filter `ENABLED` models, build `duMap` (`{ [duModelId]: duModelName }`), log it; match user-provided `duModelName`.
4. **View IDs** (`GET .../viewManage/getViewList?duModelId={duModelId}`): Build `duViews` (`{ [viewId]: viewName }`), log it; match user-provided `viewName` (exact). **If not found, fall back to "默认视图" first, then "Default View" if available**.
5. **Columns** (`GET .../schedule/getScheduleTitle?duModelId={duModelId}&viewId={viewId}`): Group columns by `duModelWpAcId` → `duColumns` (`{ [duModelWpAcId]: [columns] }`), log it; cache as `columns_{viewId}.json` with `requestedAt` (date only, YYYY-MM-DD) and a 24‑hour TTL. Match user's `fieldTitle` to `titleOne`/`titleTwo` and `fieldName` to `titleThree`/`fieldName`.
6. **Site Info** (`POST /fbr/apidata/getAPIData?apiid=1059839087123398656`): Query site by code; validate exactly 1 record; cache 30 min as `site_{siteCode}_{projectId}.json`; extract `du_id`.
7. **Update** (`POST /zte-crm-iepms-basebff/.../batchModify`): Apply update with body `{ duIdList: [du_id], fieldType, fieldId, fieldValue, bizId }`, where `bizId` is the column's `duModelWpAcId`.

All HTTP requests and responses are **always logged** to stdout.

## Trigger & Usage

Trigger keyword: `iepms-writter`

```bash
# Default: non-interactive (no confirmation)
iepms-writter 1572C "P202202168750_D002" "2023 TX Rollout" "TX Rollout V2" "Material On Site" "actual_end_date" 2025-08-19

# Interactive mode: show confirmation prompt
iepms-writter 1572C "P202202168750_D002" "2023 TX Rollout" "TX Rollout V2" "Material On Site" "actual_end_date" 2025-08-19 --interactive
# or: -i short flag
```

### First‑run authentication

On first run (or if credentials are not cached), you will be prompted:

```
Enter credentials JSON (or press Enter to use defaults):
```

- Press **Enter** to use the built‑in default credentials (username `7018000051`, token `6d1e33e2011aa1bec9b7370a1d1a57dd`).
- Or paste a JSON object in either format:
  - `{"token":"your_token","username":"your_username"}`
  - `{"UCSSSOAccount":"your_username","UCSSSOToken":"your_token"}`

Credentials are saved to `~/.openclaw/skills/iepms-column-writter/cache/credentials.json` for subsequent runs.

## Arguments

Ordered arguments:
- `site_code` – The site code in IEPMS (e.g., `1572C`)
- `proj_code` – Project code to select (must exist in user's project list)
- `duModelName` – The DU Model name (e.g., `2023 TX Rollout`)
- `viewName` – The view name to use; if not found, falls back to `默认视图` (Chinese) then `Default View` (English) if available
- `fieldTitle` – Category title; must match `titleOne` or `titleTwo` from column definitions
- `fieldName` – Field identifier; must match `fieldName` or `titleThree` from column definitions
- `value` – Value to set (date fields require `YYYY-MM-DD`; other fields accept any string)

Optional flags:
- `--interactive` or `-i`: present a confirmation prompt before updating (default is non‑interactive)

## Field Selection

Fields are identified by two separate arguments:

- `fieldTitle`: The group/category title.
- `fieldName`: The specific field identifier.

Both must match the column metadata returned by the IEPMS API for the selected view. Examples:
- `"Material On Site" "actual_end_date"`
- `"Material On Site" "responsible_person"`
- `"Installation" "ZDCSZ01164457"` (AA Planner Approval Remarks)

To see all available fields, inspect the cached `columns_{viewId}.json` after a run. The relevant fields are `titleOne`, `titleTwo`, `titleThree`, and `fieldName`.

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

## Logging

Every HTTP request and response is printed:

```
=== HTTP REQUEST ===
POST https://iepms.zte.com.cn/...
Headers: { ... }
Body: { ... }

Response: 200 OK
Response Headers: { ... }
Response Body: { ... }
```

This is essential for debugging and verifying field IDs.

## Debug Outputs

The script prints internal maps at key steps:

- **Step 2**: `projMap1` maps `proj_id → proj_code`
- **Step 3**: `duMap` maps `duModelId → duModelName`
- **Step 4**: `duViews` maps `viewId → viewName`
- **Step 5**: `duColumns` groups columns by `duModelWpAcId`

Example:
```
duMap: {
  "1027190858144623081": "2023 TX Rollout"
}
duColumns: {
  "4188808420050925271": [
    { "titleOne": "Material On Site", "fieldName": "actual_end_date", ... },
    ...
  ]
}
```

## Error Handling

Common errors:
- **Invalid JSON**: Credentials must be valid JSON with required fields.
- **Project not found**: The provided `proj_code` is not in your accessible projects.
- **duModel not found**: The specified `duModelName` is not ENABLED or does not exist.
- **View not found**: The specified `viewName` does not exist and no fallback (`默认视图` or `Default View`) is available.
- **Field not found**: `fieldTitle`/`fieldName` do not match any column; inspect `columns_{viewId}.json`.
- **Site not found**: The site code does not exist in the selected project.
- **Multiple site records**: Unexpected; more than one site matched the code.
- **Invalid date**: Date fields must be `YYYY-MM-DD`.

## Implementation Notes

- **API endpoints**: See `references/api_reference.md` for full request/response examples and field mappings.
- **Headers**:
  - Step 2 (project list) uses: `Host: iepms.zte.com.cn`, `Cookie` (SSO format: `UCSSSOAccount={username}; UCSSSOToken={token};`), `Accept`, `Content-Type`, `Referer`. Also includes `&username` query parameter.
  - Steps 3–7 (all authenticated API calls) use: `Accept`, `Content-Type`, `X-Emp-No`, `X-Auth-Value`, `X-Itp-Value` (with `projId`), `Referer`.
  - Step 6 (site info) uses the same Cookie-based headers as Step 2 (with `Host` and `&username`).
- **Session cookie**: The `fb_session` cookie returned by the API is automatically captured and included in subsequent requests (Step 2 onward).
- **Batch update**: The `batchModify` endpoint accepts `duIdList`; this script updates a single site (`[du_id]`).
- **Node.js**: Requires Node.js 18+ (uses axios for HTTP).
- **Retries/timeouts**: Not implemented; relies on default fetch/axios behavior.
- **Cache key generation**: Columns cache key is the `viewId`; site cache key is `{siteCode}_{projectId}`.

## Files

- `scripts/iepms-column-writter.js` — main script
- `SKILL.md` — this documentation
- `references/api_reference.md` — detailed API reference
- `cache/` — cached credentials and API responses
