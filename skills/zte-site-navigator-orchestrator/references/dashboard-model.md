# Dashboard Model

## Purpose

This file defines the dashboard summary model for ZTE Site AI Navigator. The dashboard must provide compact project/site visibility without storing full raw workflow history.

## Core Principle

核心原则：先查后写，先判后推。

- Dashboard summary is derived from canonical site state.
- Do not mark site progressed or completed unless current judgement allows progression.
- Do not display system update success unless `firebase-db` or the relevant system tool confirms success.
- Do not store raw API responses, full WhatsApp history, raw images, or raw documents in dashboard records.

## Dashboard Source of Truth

Primary source:
- `siteNavigator/sites/{site_id}/state`

Supporting sources:
- `siteNavigator/sites/{site_id}/stepEvents/{event_id}`
- `siteNavigator/sites/{site_id}/risks/{risk_id}`
- `siteNavigator/jobs/{job_id}`
- `siteNavigator/sites/{site_id}/jobs/{job_id}`
- `siteNavigator/sites/{site_id}/fbrCache`

Dashboard summary path:
- `siteNavigator/dashboard/sites/{site_id}`

Dashboard is a compact projection. It must not replace canonical site state.

## Dashboard Site Summary Schema

```json
{
  "site_id": "",
  "site_code": "",
  "link_id": "",
  "scope": "",
  "project_code": "",
  "current_step": "",
  "current_step_id": 0,
  "overall_status": "not_started | in_progress | blocked | completed",
  "last_result": "",
  "risk_count": 0,
  "blocking_risk_count": 0,
  "pending_items_count": 0,
  "open_job_count": 0,
  "failed_job_count": 0,
  "last_job_status": "",
  "sla_status": "normal | warning | critical | overdue | not_applicable",
  "aging_days": 0,
  "next_action": "",
  "last_update_source": "orchestrator | step_skill | system_skill | manual",
  "updated_at": ""
}
```

## Field Definitions

- `site_id`: Stable internal site identifier used in approved relative paths.
- `site_code`: Field-facing site code used by subcontractor, admin, or ZTE PIC.
- `link_id`: Link or work identifier when provided by project data.
- `scope`: Compact work scope such as installation, integration, decom, or mixed scope.
- `project_code`: Project or rollout identifier used to disambiguate site records.
- `current_step`: Current canonical workflow step key from site state.
- `current_step_id`: Numeric Step 0-12 identifier from site state.
- `overall_status`: Canonical workflow status derived from state and risk posture.
- `last_result`: Latest judged step result from canonical state or step event.
- `risk_count`: Count of open, escalated, or mitigated risks for the site.
- `blocking_risk_count`: Count of high or critical open/escalated risks.
- `pending_items_count`: Count of active missing items from step state and open risks.
- `open_job_count`: Count of jobs with status `queued`, `running`, or `waiting_dependency`.
- `failed_job_count`: Count of jobs with status `failed`.
- `last_job_status`: Latest job status by `updated_at`.
- `sla_status`: Dashboard indicator only: `normal`, `warning`, `critical`, `overdue`, or `not_applicable`.
- `aging_days`: Days since check-in or first active session when known; otherwise 0 or unknown.
- `next_action`: Short next action copied from canonical site state.
- `last_update_source`: Source that caused the latest dashboard projection update.
- `updated_at`: Timestamp for the dashboard projection update.

## SLA Status Rule

`normal`:
No current SLA concern.

`warning`:
Work is approaching expected delay threshold or has pending items.

`critical`:
Risk, blocker, missing evidence, or workflow delay needs action.

`overdue`:
Workflow has exceeded expected threshold or blocker remains unresolved.

`not_applicable`:
SLA not applicable for current site/scope.

Do not hardcode customer commercial SLA unless provided by project data. Use this as a dashboard indicator only.

## Suggested Aging Indicators

If site activity start time exists:
- `aging_days` = days since check-in or first active session.

If no start time exists:
- `aging_days` = 0 or unknown.

Aging indicator:
- 0-7 days: `normal`
- >7-10 days: `warning`
- >10-14 days: `critical`
- >14 days: `overdue`

These are default dashboard indicators only. They must be configurable in future phases and must not override customer contract rules.

## Dashboard Update Triggers

Dashboard may be refreshed after:
- step result event
- risk created, updated, or closed
- async job created, completed, or failed
- `state_patch` confirmed
- manual override
- check-out or session closure

## Dashboard Guardrails

- Do not store raw API response.
- Do not store raw message history.
- Do not store raw images/documents.
- Do not mark completed if unresolved critical risk exists.
- Do not advance `current_step_id` if result does not allow progression.
- Do not display iEPMS write success unless `iepms-column-writter` confirms it.
- Do not display Firebase patch success unless `firebase-db` confirms it.

## Dashboard Derivation Rules

`risk_count`:
Count open or escalated risks for site.

`blocking_risk_count`:
Count open risks with severity high or critical, or status escalated.

`pending_items_count`:
Count `missing_items` from active step state and open risks.

`open_job_count`:
Count jobs with status `queued`, `running`, or `waiting_dependency`.

`failed_job_count`:
Count jobs with status `failed`.

`last_job_status`:
Use latest job status by `updated_at`.

`last_result`:
Use latest judged step result from canonical state or step event.

`next_action`:
Use canonical site state `next_action`.
