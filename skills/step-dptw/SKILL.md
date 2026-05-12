---
name: step-dptw
description: Internal routed step validator for Step 2 DPTW Login readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - dptw
  - permit
actor: step-validator
version: 0.1.0
---

# Step DPTW

## Purpose

Validate whether Step 2: DPTW Login can proceed.

This skill answers only one workflow question: Can Step 2: DPTW Login proceed or not?

## Responsibility Boundary

`step-dptw` only validates DPTW readiness.

It does not:
- Access raw Firebase.
- Access raw iEPMS.
- Access TIPIC.
- Update iEPMS.
- Update Firebase.
- Generate full site workflow guidance.
- Review L1, EHS, PAC, as-built, TSSR, or pathloss reports.
- Decide unrelated workflow steps.
- Create NOC/Safety messages.

## Input Expectation

The skill may receive:
- User message.
- Current site context.
- Current workflow step.
- DPTW evidence summary.
- Screenshot description if available.
- State snapshot from orchestrator if available.
- Risk context or previous DPTW status if available.

## Main Decision Flow

1. Confirm the request is about DPTW/CDPTW login.
2. Check whether site/session/context is sufficient.
3. Check whether DPTW evidence or confirmation is provided.
4. Judge evidence completeness.
5. Identify missing items or risks.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md` to classify evidence as acceptable, weak, invalid, or missing. Do not mark Proceed unless DPTW login is clearly confirmed and no blocking risk exists.

## Result Status Contract

Use only these result values:
- Proceed
- Pending
- Rework
- Escalate
- Manual Check Required
- Blocked
- Completed
- Skipped
- Not Applicable

`next_step` should be `ehs_login` only when DPTW can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: `step-dptw` must not prepare or imply state update unless current DPTW context and evidence have been checked.
- 先判后推: `step-dptw` must judge DPTW evidence and risk before recommending the next step.
- If DPTW status is unclear, return Pending or Manual Check Required.
- If DPTW is missing, expired, invalid, blocked, failed, or rejected, return Rework, Blocked, Escalate, or Manual Check Required.
- Only return Proceed when DPTW login is clearly confirmed.
- Mandatory DPTW cannot be silently skipped.
- Do not claim completion unless current state, evidence, admin/ZTE PIC confirmation, or responsible step judgement confirms it.

## Output Requirement

Always return compact structured JSON:

```json
{
  "step": "dptw_login",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "",
  "next_step": "",
  "whatsapp_message": "",
  "internal_notes": ""
}
```

Output rules:
- `result` must be one of the approved statuses.
- `next_step` should be `ehs_login` only when DPTW can proceed.
- If `result` is Pending, Rework, Escalate, Manual Check Required, or Blocked, `next_step` must be empty or explain blocked target only.
- `whatsapp_message` must be short, clear, and actionable.
- `internal_notes` are for orchestrator/admin only.

## Non-Responsibilities

This skill does not route the overall workflow, load full legacy guidebook content, call raw system APIs, persist state, or decide any step other than DPTW Login.
