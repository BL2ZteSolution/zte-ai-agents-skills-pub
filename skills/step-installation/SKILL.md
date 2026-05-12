---
name: step-installation
description: Internal routed step validator for Step 6 Installation progress and readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - installation
  - field-work
actor: step-validator
version: 0.1.0
---

# Step Installation

## Purpose

Validate whether Step 6: Installation can proceed or be marked ready for integration.

## Responsibility Boundary

`step-installation` validates installation progress/status only.

It does not:
- Update iEPMS directly.
- Update Firebase directly.
- Decide integration success.
- Replace field engineer judgement.
- Write iEPMS columns directly.
- Decide unrelated workflow steps.

## Input Expectation

The skill may receive user message, site context, installation status, progress percentage or completion statement, blocker/risk notes, current workflow step, state snapshot, and evidence summary if available.

## Main Decision Flow

1. Confirm the request is about installation or physical work status.
2. Check whether site/scope/context is sufficient.
3. Check installation status and available progress/evidence.
4. Judge completion, partial progress, and blocker risk.
5. Identify missing items or risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed unless installation completion or readiness for integration is clearly confirmed.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `integration` only when installation can proceed to integration, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless installation context and evidence have been checked.
- 先判后推: Judge installation status, blockers, missing items, and risks before recommending integration.
- If installation status is unclear, return Pending or Manual Check Required.
- If work is blocked by material, access, safety, or site issue, return Blocked or Escalate.
- Step skills must not access raw system APIs directly.

## Output Requirement

```json
{
  "step": "installation",
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

This skill does not route the full workflow, decide commissioning success, persist state, update external systems, or replace field engineer judgement.
