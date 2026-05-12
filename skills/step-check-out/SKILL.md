---
name: step-check-out
description: Internal routed step validator for Step 12 Check-out Report readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - check-out
  - reporting
actor: step-validator
version: 0.1.0
---

# Step Check-out

## Purpose

Validate whether Step 12: Check-out Report can proceed and prepare final site check-out message drafts.

## Responsibility Boundary

`step-check-out` validates check-out readiness, progress/risk closure, and prepares final check-out message drafts.

It does not:
- Access raw Firebase.
- Access raw iEPMS.
- Update iEPMS.
- Update Firebase.
- Claim NOC/Safety messages were forwarded.
- Close session directly.
- Decide unrelated workflow steps.
- Ignore unresolved critical blockers.

## Input Expectation

The skill may receive:
- User message.
- Current site context.
- Final progress summary.
- Pending items.
- Risk summary.
- Alarm check result.
- Housekeeping result.
- L1 submission status if available.
- State snapshot from orchestrator if available.

## Main Decision Flow

1. Confirm request is about check-out/site leaving/work completion.
2. Check whether site/session/context is sufficient.
3. Check final progress and pending items.
4. Check whether critical blockers remain.
5. Check whether alarm and housekeeping conditions are safe enough for check-out.
6. Prepare exactly two drafts when sufficient: CelcomDigi NOC and ZTE Safety.
7. Decide result.
8. Recommend session closure only when result allows it.

## Evidence Handling

Use `references/evidence-rules.md` to classify check-out readiness evidence. Do not recommend session closure if critical unresolved blockers remain.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `session_closed` only when check-out can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Message Draft Requirement

When generating check-out report output, prepare exactly two message drafts:
1. CelcomDigi NOC
2. ZTE Safety

The user must manually forward both messages. This skill must not claim they were forwarded unless the user explicitly confirms.

## Session Closure Recommendation Rule

Recommend session closure only after check-out evidence is judged sufficient, critical blockers are resolved or escalated, and the user confirms both drafts were forwarded.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state update unless current check-out context and evidence have been checked.
- 先判后推: Do not recommend `session_closed` until check-out readiness and risk closure have been judged.
- If evidence is incomplete, return Pending, Rework, Escalate, Manual Check Required, or Blocked.
- Only return Proceed when required evidence and completion condition are clearly satisfied.
- Mandatory check-out cannot be silently skipped.

## Output Requirement

Always return compact structured JSON:

```json
{
  "step": "check_out_report",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "",
  "next_step": "",
  "whatsapp_message": "",
  "message_drafts": {
    "celcomdigi_noc": "",
    "zte_safety": ""
  },
  "session_closure_recommendation": "",
  "internal_notes": ""
}
```

## Non-Responsibilities

This skill does not route the overall workflow, persist state, close sessions directly, call raw system APIs, or decide any step other than check-out readiness.
