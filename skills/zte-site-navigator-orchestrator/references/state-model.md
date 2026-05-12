# State Model

## Purpose

This file defines the canonical state, Firebase relative paths, event records, job records, dashboard records, risk records, fishbone cache records, and patch boundaries for ZTE Site AI Navigator.

Phase 6 is documentation and contract work only. It does not implement Firebase runtime integration, database code, or job execution.

Phase 12 policy details are split into focused references:
- `dashboard-model.md` defines dashboard projection, SLA/aging indicators, update triggers, and derivation rules.
- `job-queue-policy.md` defines async job lifecycle, retry, dependency, priority, and compactness rules.
- `risk-management-policy.md` defines risk severity, lifecycle, escalation, closure, and dashboard impact rules.

## Core Principle

核心原则：先查后写，先判后推。

- Read current state before preparing any patch.
- Judge the current step before moving workflow forward.
- Store compact state and event records.
- Do not store raw API responses or full WhatsApp history in orchestrator state.

## Firebase Access Boundary

- Firebase is accessed only through `firebase-db`.
- `firebase-db` supports GET/PATCH contracts only.
- No Firebase URL.
- No PUT.
- No DELETE.
- Relative paths only.
- Orchestrator prepares intended patch only.
- Patch success must be confirmed by `firebase-db`.

## Approved Firebase Relative Paths

- `siteNavigator/sessionsBySender/{sender}`
- `siteNavigator/sites/{site_id}/state`
- `siteNavigator/sites/{site_id}/stepEvents/{event_id}`
- `siteNavigator/sites/{site_id}/messageLogs/{message_id}`
- `siteNavigator/jobs/{job_id}`
- `siteNavigator/sites/{site_id}/jobs/{job_id}`
- `siteNavigator/dashboard/sites/{site_id}`
- `siteNavigator/sites/{site_id}/risks/{risk_id}`
- `siteNavigator/sites/{site_id}/fbrCache`

`fbrCache` is a Firebase path name only. It is not a system skill name. Do not use any legacy FBR checker name as a tool name.

## Canonical Site State Schema

```json
{
  "site_id": "",
  "link_id": "",
  "site_code": "",
  "scope": "",
  "project_code": "",
  "current_step": "",
  "current_step_id": 0,
  "overall_status": "not_started | in_progress | blocked | completed",
  "session": {
    "session_id": "",
    "sender": "",
    "role": "subcon | admin | zte_pic",
    "channel": "whatsapp",
    "status": "active | closed"
  },
  "steps": {},
  "site_data": {
    "minimum_context": {}
  },
  "risks": [],
  "next_action": "",
  "last_ai_decision": "",
  "last_ai_response": "",
  "updated_at": ""
}
```

## Canonical Field Definitions

- `site_id`: Stable internal site identifier used in Firebase relative paths.
- `link_id`: Link or work identifier when provided by project data.
- `site_code`: Field-facing site code used by subcontractor, admin, or ZTE PIC.
- `scope`: Work scope summary, such as installation, integration, decom, or mixed scope.
- `project_code`: Project or rollout identifier used to disambiguate site records.
- `current_step`: Current workflow step key.
- `current_step_id`: Numeric Step 0-12 identifier.
- `overall_status`: Site workflow status: `not_started`, `in_progress`, `blocked`, or `completed`.
- `session`: Compact active channel/session identity and role state.
- `steps`: Per-step compact state keyed by workflow step key.
- `site_data`: Compact site facts needed for current judgement.
- `risks`: Compact risk identifiers or summaries linked to risk records.
- `next_action`: Short orchestrator-facing next action.
- `last_ai_decision`: Last structured decision/status produced by orchestrator or step skill.
- `last_ai_response`: Last compact user-facing response summary.
- `updated_at`: Last state update timestamp.

## Site Data Minimum Context

Optional compact guidance for `site_data.minimum_context`:

```json
{
  "site_code": "",
  "link_id": "",
  "site_id": "",
  "project_code": "",
  "scope": "",
  "region": "",
  "site_name": "",
  "source": "state | iepms-fishbone-data-checker",
  "checked_at": ""
}
```

Rules:
- Store compact fields only.
- Use Step 0 `greeting_status` to resolve this context before Step 1 check-in when the user sends an arrival message.
- `iepms-fishbone-data-checker` may provide the default compact source for this object.
- Do not store raw iEPMS response, raw fishbone payload, credentials, backend URLs, or full API output.

## Step State Schema

Recommended structure inside `steps`:

```json
{
  "{step_key}": {
    "step_id": 0,
    "step_name": "",
    "status": "not_started | in_progress | pending | rework | blocked | completed | skipped | not_applicable",
    "last_result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
    "required_action": "",
    "missing_items": [],
    "risk_flags": [],
    "evidence_summary": "",
    "last_event_id": "",
    "updated_at": ""
  }
}
```

Step keys:
- `greeting_status`
- `check_in_report`
- `dptw_login`
- `ehs_login`
- `material_scan`
- `l1_before_photo`
- `installation`
- `integration`
- `alarm_check`
- `l1_submission`
- `decom_check`
- `housekeeping`
- `check_out_report`

## Step Event Record Schema

Path:
`siteNavigator/sites/{site_id}/stepEvents/{event_id}`

Schema:

```json
{
  "event_id": "",
  "site_id": "",
  "session_id": "",
  "sender": "",
  "step_id": 0,
  "step_key": "",
  "event_type": "step_result | evidence_received | route_decision | manual_override | system_action_requested | system_action_confirmed",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "route_to": "",
  "required_action": "",
  "missing_items": [],
  "risk_flags": [],
  "evidence_summary": "",
  "system_actions": [],
  "state_patch_summary": {},
  "created_at": ""
}
```

Rules:
- Store compact evidence summary only.
- Do not store raw image, raw attachment, or full WhatsApp history.
- Use `messageLogs` path to reference related message if needed.

## Message Log Record Schema

Path:
`siteNavigator/sites/{site_id}/messageLogs/{message_id}`

Schema:

```json
{
  "message_id": "",
  "site_id": "",
  "session_id": "",
  "sender": "",
  "role": "subcon | admin | zte_pic",
  "channel": "whatsapp",
  "direction": "inbound | outbound",
  "message_type": "text | image | document | system",
  "step_key": "",
  "intent": "",
  "compact_summary": "",
  "attachment_summary": "",
  "related_event_id": "",
  "created_at": ""
}
```

Rules:
- Store compact summary only.
- Do not store raw full WhatsApp history.
- Do not store raw image binary or raw document content.
- Attachment content should be summarized and routed to relevant step/domain skill if needed.

## Async Job Record Schema

Path:
`siteNavigator/jobs/{job_id}`

Schema:

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

Rules:
- Job payload must be compact.
- Do not store raw credentials.
- Do not store raw API responses.
- Jobs are records only in Phase 6.
- No job execution is implemented in Phase 6.

## Site Job Index Record

Path:
`siteNavigator/sites/{site_id}/jobs/{job_id}`

Schema:

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

Purpose:
Provide lightweight per-site lookup of job status.

## Dashboard Site Summary Schema

Path:
`siteNavigator/dashboard/sites/{site_id}`

Schema:

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

Rules:
- Dashboard summary must be compact.
- Do not store full state copy here.
- Dashboard updates should be derived from canonical site state.
- See `dashboard-model.md` for field definitions, SLA/aging indicators, update triggers, and derivation rules.

## Risk Record Schema

Path:
`siteNavigator/sites/{site_id}/risks/{risk_id}`

Schema:

```json
{
  "risk_id": "",
  "site_id": "",
  "step_key": "",
  "risk_type": "permit | safety | access | material | integration | alarm | l1 | decom | housekeeping | customer | data",
  "severity": "low | medium | high | critical",
  "status": "open | mitigated | closed | escalated",
  "description": "",
  "required_action": "",
  "owner": "subcon | zte_pic | admin | customer | unknown",
  "related_event_id": "",
  "created_at": "",
  "updated_at": ""
}
```

Rules:
- Critical risks should block workflow progression unless escalated or manually cleared.
- Risk closure must be traceable to a step event or manual override.
- See `risk-management-policy.md` for severity, lifecycle, escalation, dashboard impact, and closure rules.

## FBR / Fishbone Cache Schema

Path:
`siteNavigator/sites/{site_id}/fbrCache`

Schema:

```json
{
  "site_id": "",
  "source": "iepms-fishbone-data-checker",
  "checked_fields": [],
  "matched_fields": [],
  "missing_fields": [],
  "mismatched_fields": [],
  "risk_flags": [],
  "compact_summary": "",
  "checked_at": ""
}
```

Rules:
- This cache stores compact fact-check summaries only.
- It must not store raw iEPMS responses.
- It must be refreshed by approved system action: `check_iepms_fishbone_data`.
- It must not use any legacy FBR checker tool name.

## State Transition Rules

Allowed site-level transitions:
- `not_started` -> `in_progress`
- `in_progress` -> `blocked`
- `in_progress` -> `completed`
- `blocked` -> `in_progress`
- `blocked` -> `completed` only after risk clearance or approved manual override.
- `completed` should not revert unless manual correction is explicitly recorded.

Step transition rules:
- `current_step_id` can advance only when current decision is Proceed, Completed, Skipped, or Not Applicable.
- Pending, Rework, Escalate, Manual Check Required, and Blocked must not silently advance workflow.
- `next_step` must be empty or a blocked target when current result does not allow progression.
- Do not mark a future step as completed before evidence exists.

## Patch Rules

Allowed patch examples:
- `current_step`
- `current_step_id`
- `overall_status`
- `session.status`
- `steps.{step_key}`
- `risks`
- `next_action`
- `last_ai_decision`
- `last_ai_response`
- `updated_at`

Forbidden patch examples:
- Full state overwrite.
- Firebase URL.
- Credentials.
- Raw API response.
- Raw WhatsApp history.
- Raw image/document content.
- Unrelated project data.
- PUT.
- DELETE.

Patch guardrail:
- Always read or confirm current state before patch.
- Patch only fields required by the current judged decision.
- Do not patch unrelated steps.
- Do not patch future step as completed before evidence exists.
- Do not claim patch success without `firebase-db` confirmation.

## Job Status Lifecycle

Allowed transitions:
- `queued` -> `running`
- `queued` -> `cancelled`
- `running` -> `waiting_dependency`
- `running` -> `completed`
- `running` -> `failed`
- `waiting_dependency` -> `running`
- `waiting_dependency` -> `cancelled`
- `failed` -> `queued` only if retry is approved.

Rules:
- Slow or non-blocking backend work should be represented as async job.
- Async job creation must not bypass current step judgement.
- Job result can support future judgement but does not replace orchestrator decision.
- See `job-queue-policy.md` for job type definitions, lifecycle transitions, retry rules, dependency rules, and compactness guardrails.

## Compactness and Privacy Rules

- Store summaries, not raw content.
- Store evidence summary, not raw evidence.
- Store message summary, not full WhatsApp history.
- Store compact system result, not raw API response.
- Do not store credentials.
- Do not store backend URLs.
