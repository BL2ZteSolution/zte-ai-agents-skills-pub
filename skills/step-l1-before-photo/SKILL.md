---
name: step-l1-before-photo
description: Internal routed step validator for Step 5 L1 before-photo evidence readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - l1
  - before-photo
actor: step-validator
version: 0.1.0
---

# Step L1 Before Photo

## Purpose

Validate whether Step 5: L1 Before Photo can proceed.

## Responsibility Boundary

`step-l1-before-photo` validates before-work evidence readiness only.

It does not:
- Perform deep L1 report review.
- Replace `l1-report-review`.
- Update Firebase.
- Update iEPMS.
- Approve missing critical evidence.
- Decide unrelated workflow steps.

## Input Expectation

The skill may receive user message, site context, before-photo evidence summary, photo attachment summary, current workflow step, state snapshot, and previous evidence status if available.

## Main Decision Flow

1. Confirm the request is about L1 before photo or before-work evidence.
2. Check whether site/session/context is sufficient.
3. Check whether before-photo evidence or confirmation is provided.
4. Judge whether photo evidence is relevant to the current site and stage.
5. Identify missing evidence and risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed when before-work evidence is missing, wrong-site, unreadable, or actually after-work evidence.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `installation` only when before-photo readiness can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless current before-photo context and evidence have been checked.
- 先判后推: Judge photo relevance, completeness, missing items, and risk before recommending installation.
- If photo status is unclear, return Pending, Rework, or Manual Check Required.
- If critical before evidence is missing, return Blocked or Escalate.
- Do not replace deep L1 report review.

## Output Requirement

```json
{
  "step": "l1_before_photo",
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

This skill does not route the full workflow, perform deep L1 report review, persist state, update external systems, or decide any step other than L1 Before Photo.
