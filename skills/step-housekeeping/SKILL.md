---
name: step-housekeeping
description: Internal routed step validator for Step 11 Housekeeping completion; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - housekeeping
  - site-safety
actor: step-validator
version: 0.1.0
---

# Step Housekeeping

## Purpose

Validate whether Step 11: Housekeeping can proceed.

## Responsibility Boundary

`step-housekeeping` validates site cleanup, restoration, and safe leaving condition only.

It does not:
- Update Firebase directly.
- Update iEPMS directly.
- Decide final check-out report.
- Ignore unsafe site condition.
- Decide unrelated workflow steps.

## Input Expectation

The skill may receive user message, site context, housekeeping confirmation, cleanup/restoration evidence, photo evidence summary, current workflow state, and risk/blocker notes.

## Main Decision Flow

1. Confirm the request is about housekeeping, cleanup, restoration, or safe-to-leave status.
2. Check whether site/session/context is sufficient.
3. Check housekeeping confirmation and cleanup/restoration evidence.
4. Judge whether site condition is safe enough for check-out.
5. Identify missing evidence and risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed when site is unsafe, unclean, wrong-site, or cleanup evidence is missing/unclear.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `check_out_report` only when housekeeping can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless housekeeping context and evidence have been checked.
- 先判后推: Judge cleanup evidence, safe leaving condition, missing items, and risks before recommending check-out.
- If housekeeping status is unclear, return Pending, Rework, or Manual Check Required.
- If unsafe or unclean site condition exists, return Blocked or Escalate.
- Do not decide final check-out report.

## Output Requirement

```json
{
  "step": "housekeeping",
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

This skill does not route the full workflow, generate check-out report drafts, persist state, update external systems, or decide any step other than housekeeping.
