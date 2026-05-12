---
name: step-ehs
description: Internal routed step validator for Step 3 EHS Login or safety readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - ehs
  - safety
actor: step-validator
version: 0.1.0
---

# Step EHS

## Purpose

Validate whether Step 3: EHS Login can proceed.

## Responsibility Boundary

`step-ehs` validates EHS login/check readiness only.

It does not:
- Perform deep EHS report review.
- Replace `ehs-review`.
- Update Firebase.
- Update iEPMS.
- Approve unsafe work without evidence.
- Decide unrelated workflow steps.

## Input Expectation

The skill may receive user message, current site context, EHS login/check confirmation, EHS screenshot or evidence summary, safety issue notes, current workflow step, and state snapshot from orchestrator if available.

## Main Decision Flow

1. Confirm the request is about EHS login or safety check.
2. Check whether site/session/context is sufficient.
3. Check whether EHS evidence or approved not-applicable reason is provided.
4. Judge evidence completeness and safety risk.
5. Identify missing items or risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md` to classify EHS evidence. Do not mark Proceed unless EHS is confirmed or scope gives a clear approved not-applicable reason with no safety blocker.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `material_scan` only when EHS can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless current EHS context and evidence have been checked.
- 先判后推: Judge EHS evidence, safety issue notes, missing items, and risk before recommending `material_scan`.
- If safety status is unclear, return Pending or Manual Check Required.
- If unsafe condition, EHS failure, or blocker exists, return Blocked, Escalate, or Manual Check Required.
- Step skills must not call raw system APIs directly.

## Output Requirement

Always return compact structured JSON:

```json
{
  "step": "ehs_login",
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

This skill does not route the full workflow, perform deep EHS report review, persist state, update external systems, or decide any step other than EHS Login.
