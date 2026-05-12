# Job Queue Policy

## Purpose

This file defines async job record usage for slow checks, deferred writes, dashboard sync, and backend actions. It does not implement a worker.

## Core Principle

核心原则：先查后写，先判后推。

- Create jobs only after route/judgement determines they are needed.
- Do not create write jobs before evidence and state/facts are checked.
- Do not use async jobs to bypass current-step judgement.
- Job result supports future judgement but does not replace orchestrator decision.

## Approved Job Storage Paths

- `siteNavigator/jobs/{job_id}`
- `siteNavigator/sites/{site_id}/jobs/{job_id}`

## Async Job Record Schema

```json
{
  "job_id": "",
  "site_id": "",
  "session_id": "",
  "job_type": "state_patch | iepms_column_write | fishbone_check | dashboard_sync | domain_review | notification",
  "requested_action": "",
  "target_skill": "firebase-db | iepms-column-writter | iepms-fishbone-data-checker",
  "status": "queued | running | waiting_dependency | completed | failed | cancelled",
  "priority": "low | normal | high | urgent",
  "input_summary": {},
  "result_summary": {},
  "error": "",
  "created_by": "",
  "created_at": "",
  "updated_at": ""
}
```

## Site Job Index Schema

```json
{
  "job_id": "",
  "site_id": "",
  "job_type": "",
  "status": "queued | running | waiting_dependency | completed | failed | cancelled",
  "priority": "low | normal | high | urgent",
  "created_at": "",
  "updated_at": ""
}
```

## Approved Job Types

`state_patch`:
Used for deferred Firebase patch through `firebase-db`.

`iepms_column_write`:
Used for approved iEPMS column update through `iepms-column-writter`.

`fishbone_check`:
Used for data/fishbone checking through `iepms-fishbone-data-checker`.

`dashboard_sync`:
Used to refresh dashboard summary projection.

`domain_review`:
Used only as a placeholder for deferred domain review task. Do not implement actual model/API call.

`notification`:
Used only as a placeholder for future notification task. Do not implement sending.

## Job Status Lifecycle

Allowed transitions:
- `queued` -> `running`
- `queued` -> `cancelled`
- `running` -> `waiting_dependency`
- `running` -> `completed`
- `running` -> `failed`
- `waiting_dependency` -> `running`
- `waiting_dependency` -> `cancelled`
- `failed` -> `queued` only if retry is approved
- `completed` -> no further transition unless manual correction is recorded
- `cancelled` -> no further transition unless recreated as new job

## Priority Rules

`low`:
Non-urgent dashboard sync or log cleanup.

`normal`:
Standard state patch, log event, or fishbone check.

`high`:
Workflow-impacting fishbone check, dashboard sync for blocked site, important state patch.

`urgent`:
Safety, alarm, access, permit blocker, or customer-impacting risk.

## Allowed Job Creation Conditions

`create_async_job` may be used when:
- backend check is slow and should not block first reply
- dashboard sync should be deferred
- state patch is ready but needs system confirmation
- iEPMS write is approved but should be executed by system tool
- domain review is deferred for later execution
- notification is planned but not implemented

## Forbidden Job Creation Conditions

Do not create job when:
- current step judgement is incomplete
- evidence is missing and job is used to bypass review
- `target_skill` is unsupported
- job payload contains raw API response
- job payload contains credentials
- job payload contains full WhatsApp history
- job would perform Firebase PUT or DELETE
- job would write iEPMS without approved target column/value

## Job Input Compactness Rule

`input_summary` must contain only:
- `site_id`, `site_code`, or `link_id`
- `step_key`
- action name
- approved target field/column if applicable
- compact evidence summary
- judgement reference
- reason
- priority

Do not include:
- raw API response
- credentials
- raw image/document content
- full message history
- backend URLs

## Job Result Summary Rule

`result_summary` must contain only:
- success/failure
- affected path or target column
- compact result
- timestamp
- error summary if any

## Job Guardrails by Target Skill

`firebase-db`:
- GET/PATCH only.
- No Firebase URL.
- No PUT.
- No DELETE.
- Relative paths only.

`iepms-fishbone-data-checker`:
- Check facts only.
- Return compact JSON.
- Do not update iEPMS.
- Do not make workflow decision.

`iepms-column-writter`:
- Write approved column only.
- Requires completed judgement.
- Requires explicit target column/value.
- Must confirm success/failure.
- Does not decide workflow result.
