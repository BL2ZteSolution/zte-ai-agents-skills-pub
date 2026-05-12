---
name: step-check-in
description: Internal routed step validator for Step 1 Check-in Report readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - check-in
  - reporting
actor: step-validator
version: 0.1.0
---

# Step Check-in

## Purpose

Validate whether Step 1: Check-in Report can proceed.

## Responsibility Boundary

`step-check-in` validates check-in readiness and prepares short check-in message drafts when site context is sufficient.

It does not:
- Access raw Firebase.
- Access raw iEPMS.
- Update iEPMS.
- Update Firebase.
- Claim that NOC/Safety messages were forwarded.
- Decide unrelated workflow steps.
- Generate long workflow guidance.

## Input Expectation

The skill may receive:
- User message.
- Current site context.
- Current workflow step.
- Site ID, site code, or link ID.
- Team/PIC information if available.
- State snapshot from orchestrator if available.

## Main Decision Flow

1. Confirm request is about check-in/site arrival.
2. Check whether site/session/context is sufficient.
3. Check whether any blocker, wrong-site, or cancellation risk is present.
4. Identify missing site/team/PIC/context if needed.
5. Judge whether check-in message drafts can be prepared.
6. Prepare exactly two drafts when sufficient: CelcomDigi NOC and ZTE Safety.
7. Decide result.
8. Recommend `next_step` only when result allows it.

## Evidence Handling

No arrival/check-in evidence is required for Step 1. Use `references/evidence-rules.md` only to confirm site context and detect blockers, wrong-site, cancellation, or manual-verification risks. Do not block check-in only because the user did not provide arrival evidence.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `dptw_login` only when check-in can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Message Draft Requirement

When generating check-in report output, prepare exactly two message drafts:
1. CelcomDigi NOC
2. ZTE Safety

The user must manually forward both messages. This skill must not claim they were forwarded unless the user explicitly confirms.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state update unless current check-in context has been checked.
- 先判后推: Do not recommend `dptw_login` until check-in readiness has been judged.
- If site context is incomplete or risks are present, return Pending, Rework, Escalate, Manual Check Required, or Blocked.
- Only return Proceed when site context is sufficient and no blocker prevents check-in draft preparation.
- Mandatory check-in cannot be silently skipped.

## Output Requirement

Always return compact structured JSON:

```json
{
  "step": "check_in_report",
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
  "internal_notes": ""
}
```

## Non-Responsibilities

This skill does not route the overall workflow, persist state, call raw system APIs, validate DPTW/EHS/alarm/checkout, or close any session.
