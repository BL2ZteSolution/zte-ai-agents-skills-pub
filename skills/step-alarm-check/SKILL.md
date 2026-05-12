---
name: step-alarm-check
description: Internal routed step validator for Step 8 Alarm Check readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - alarm-check
  - risk-control
actor: step-validator
version: 0.1.0
---

# Step Alarm Check

## Purpose

Validate whether Step 8: Alarm Check can proceed.

## Responsibility Boundary

`step-alarm-check` validates whether there is any blocking alarm before the user proceeds to L1 submission or leaves site.

It does not:
- Access raw NMS.
- Access raw Firebase.
- Access raw iEPMS.
- Update iEPMS.
- Update Firebase.
- Decide unrelated workflow steps.
- Silently allow site leave with blocking alarm.

## Input Expectation

The skill may receive:
- User message.
- Current site context.
- Alarm screenshot description.
- NMS visibility status.
- Alarm status confirmation.
- Current workflow step.
- State snapshot from orchestrator if available.

## Main Decision Flow

1. Confirm request is about alarm/NMS/blocking alarm.
2. Check whether site/session/context is sufficient.
3. Check whether alarm evidence or confirmation is provided.
4. Judge whether any blocking alarm exists.
5. Identify missing items and risk flags.
6. Decide result.
7. Recommend `next_step` only when result allows it.

## Evidence Handling

Use `references/evidence-rules.md` to classify alarm evidence. Do not mark Proceed unless no blocking alarm is clearly confirmed.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `l1_submission` only when no blocking alarm is confirmed, the step is completed, or an explicit approved exception/scope confirmation allows progression.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state update unless current alarm context and evidence have been checked.
- 先判后推: Do not recommend `l1_submission` until alarm status and risk have been judged.
- If alarm status is unclear, return Pending or Manual Check Required.
- If active blocking alarm exists, return Blocked, Rework, Escalate, or Manual Check Required.
- Do not allow progression when blocking alarm risk is unresolved.

## Output Requirement

Always return compact structured JSON:

```json
{
  "step": "alarm_check",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "",
  "next_step": "",
  "whatsapp_message": "",
  "internal_notes": ""
}
```

## Non-Responsibilities

This skill does not route the overall workflow, query NMS directly, call raw system APIs, persist state, review L1 reports, or perform integration troubleshooting.
