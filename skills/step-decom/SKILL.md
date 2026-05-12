---
name: step-decom
description: Internal routed step validator for Step 10 Decommissioning requirement and completion; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - decom
  - decommissioning
actor: step-validator
version: 0.1.0
---

# Step Decom

## Purpose

Validate whether Step 10: Decommissioning Check can proceed.

## Responsibility Boundary

`step-decom` validates decom requirement and decom completion/readiness only.

It does not:
- Update iEPMS directly.
- Update Firebase directly.
- Decide unrelated steps.
- Perform physical decommissioning instruction beyond required action summary.
- Call raw system APIs.

## Input Expectation

The skill may receive user message, site context, scope/SOW summary, decom requirement status, decom completion evidence, current workflow state, and compact fishbone/data check if available.

## Main Decision Flow

1. Confirm the request is about decom, decommissioning, dismantling, or old equipment removal.
2. Check whether site/scope/context is sufficient.
3. Check whether decom is required by scope.
4. If required, check decom completion evidence.
5. Identify missing scope/evidence and risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed if required decom is not done, blocked, wrong-site, or unsupported by scope/evidence.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `housekeeping` only when decom can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless decom scope and evidence have been checked.
- 先判后推: Judge decom requirement, completion, missing items, and blockers before recommending housekeeping.
- If decom scope is unclear, return Pending or Manual Check Required.
- If decom is required but not done, return Blocked, Rework, or Escalate.
- Do not physically instruct decommissioning beyond a short required action summary.

## Output Requirement

```json
{
  "step": "decom_check",
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

This skill does not route the full workflow, access system data directly, persist state, update external systems, or decide any step other than decommissioning check.
