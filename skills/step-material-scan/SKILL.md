---
name: step-material-scan
description: Internal routed step validator for Step 4 Material Scan or MOS/material readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - material-scan
  - mos
actor: step-validator
version: 0.1.0
---

# Step Material Scan

## Purpose

Validate whether Step 4: Material Scan can proceed.

## Responsibility Boundary

`step-material-scan` validates material scan, MOS, and material readiness only.

It does not:
- Update iEPMS directly.
- Update Firebase directly.
- Decide unrelated installation status.
- Replace `iepms-fishbone-data-checker`.
- Call raw system APIs.

## Input Expectation

The skill may receive user message, site context, MOS/material scan confirmation, material evidence summary, missing material notes, current workflow step, state snapshot, and compact iEPMS/fishbone fact summary if available.

## Main Decision Flow

1. Confirm the request is about material scan, MOS, or material readiness.
2. Check whether site/scope/context is sufficient.
3. Check whether material scan evidence or readiness confirmation is provided.
4. Judge material evidence completeness and consistency.
5. Identify missing material or mismatch risks.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed when critical required material is missing, mismatched, or wrong-scope.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `l1_before_photo` only when material scan/readiness can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless material context and evidence have been checked.
- 先判后推: Judge material readiness, missing items, mismatch risk, and blockers before recommending `l1_before_photo`.
- If material facts are unclear, return Pending or Manual Check Required.
- If critical material is missing or wrong, return Blocked or Escalate.
- Step skills must not write iEPMS columns directly.

## Output Requirement

```json
{
  "step": "material_scan",
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

This skill does not route the full workflow, perform fishbone data access, persist state, update external systems, or decide any step other than material scan/readiness.
