# Risk Management Policy

## Purpose

This file defines risk record structure, severity rules, lifecycle, escalation rules, and dashboard impact for ZTE Site AI Navigator.

## Core Principle

核心原则：先查后写，先判后推。

- Risk must be based on checked evidence, user report, or system fact summary.
- Do not close risk without evidence or manual override.
- Do not allow workflow progression when critical unresolved risk blocks the next step.

## Risk Record Path

`siteNavigator/sites/{site_id}/risks/{risk_id}`

## Risk Record Schema

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

## Risk Type Definitions

`permit`:
DPTW/CDPTW/permit issue.

`safety`:
EHS/PPE/unsafe condition.

`access`:
Site access issue.

`material`:
MOS/material readiness or mismatch.

`integration`:
Commissioning/NMS/integration blocker.

`alarm`:
Active or blocking alarm.

`l1`:
L1 report/photo/submission issue.

`decom`:
Decommissioning requirement or completion issue.

`housekeeping`:
Cleanup/restoration/safe leaving issue.

`customer`:
Customer-facing impact or acceptance concern.

`data`:
iEPMS/fishbone/site data mismatch.

## Severity Rules

`low`:
Minor issue, no immediate blocker.

`medium`:
Issue needs follow-up but does not immediately block critical workflow.

`high`:
Issue may block progression or needs ZTE PIC/admin attention.

`critical`:
Safety, permit, access, active blocking alarm, customer-impacting issue, or critical evidence blocker.

## Status Lifecycle

`open`:
Risk identified and unresolved.

`escalated`:
Risk assigned/escalated to owner.

`mitigated`:
Risk has temporary workaround or partial mitigation.

`closed`:
Risk resolved with evidence or approved manual override.

Allowed transitions:
- `open` -> `escalated`
- `open` -> `mitigated`
- `open` -> `closed`
- `escalated` -> `mitigated`
- `escalated` -> `closed`
- `mitigated` -> `closed`
- `closed` -> `open` only if new evidence reopens issue

## Escalation Rules

Escalate when:
- permit/DPTW failed
- safety issue exists
- site access blocked
- active blocking alarm exists
- customer-impacting risk exists
- critical material missing
- unresolved housekeeping unsafe condition exists
- AI cannot safely judge and risk may affect safety/service/customer

## Dashboard Impact Rules

`risk_count`:
Count open, escalated, or mitigated risks.

`blocking_risk_count`:
Count high/critical open or escalated risks.

`sla_status`:
- `critical` if high risk exists
- `overdue` if critical risk remains unresolved beyond threshold
- `warning` if medium risk or pending evidence exists
- `normal` if no open risk and no pending item

`overall_status`:
- `blocked` if critical unresolved risk blocks current or next step
- `in_progress` if risk exists but does not block current workflow
- `completed` only if no critical open risk remains, unless manually closed/escalated with accepted closure note

## Workflow Progression Guardrails

- Critical unresolved permit risk blocks DPTW progression.
- Critical safety risk blocks site work progression.
- Critical access risk blocks check-in/work progression.
- Critical alarm risk blocks L1 submission/check-out.
- Critical housekeeping risk blocks check-out.
- Critical missing evidence blocks affected report/review completion.
- `Manual Check Required` should be used when risk cannot be safely classified.

## Risk Closure Rules

Risk may close only when:
- user provides clear resolution evidence
- step skill confirms issue resolved
- system tool confirms relevant update/check
- ZTE PIC/admin provides manual override
- customer/PIC confirmation is available where required

Risk must not close when:
- evidence is unclear
- issue is only noted but not resolved
- owner is unknown and action pending
- blocker remains active
