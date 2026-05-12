---
name: step-l1-submission
description: Internal routed step validator for Step 9 L1 submission readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - l1
  - submission
actor: step-validator
version: 0.1.0
---

# Step L1 Submission

## Purpose

Validate whether Step 9: L1 Submission with After Photo can proceed.

## Responsibility Boundary

`step-l1-submission` validates L1 submission status and after-photo evidence readiness only.

It does not:
- Perform full L1 report review.
- Replace `l1-report-review`.
- Update Firebase.
- Update iEPMS.
- Claim L1 accepted by customer.
- Decide unrelated workflow steps.

## Input Expectation

The skill may receive user message, site context, L1 submission status, after-photo evidence summary, report/document evidence summary, current workflow state, and `l1-report-review` result if available.

## Main Decision Flow

1. Confirm the request is about L1 submission or after-photo evidence.
2. Check whether site/session/context is sufficient.
3. Check whether submission evidence and after-photo evidence are provided.
4. Judge evidence completeness and site/report consistency.
5. Identify missing items or risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed when after-photo or submission evidence is missing, wrong-site, unclear, or invalid.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `decom_check` only when L1 submission can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless L1 submission and after-photo context have been checked.
- 先判后推: Judge submission evidence, after-photo evidence, missing items, and risks before recommending decom check.
- If evidence is incomplete, return Pending or Rework.
- If acceptance/report risk is major, return Escalate or Manual Check Required.
- Do not claim L1/customer acceptance.

## Output Requirement

```json
{
  "step": "l1_submission",
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

This skill does not route the full workflow, perform full L1 report review, persist state, update external systems, or claim L1 acceptance.
