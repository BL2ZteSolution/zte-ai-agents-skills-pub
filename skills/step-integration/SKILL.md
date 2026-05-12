---
name: step-integration
description: Internal routed step validator for Step 7 Integration or commissioning readiness; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - integration
  - commissioning
actor: step-validator
version: 0.1.0
---

# Step Integration

## Purpose

Validate whether Step 7: Integration can proceed or is ready for alarm check.

## Responsibility Boundary

`step-integration` validates commissioning/integration status only.

It does not:
- Perform alarm check.
- Update iEPMS directly.
- Update Firebase directly.
- Replace `iepms-fishbone-data-checker`.
- Decide L1 submission readiness.
- Decide unrelated workflow steps.

## Input Expectation

The skill may receive user message, site context, commissioning/integration status, NMS visibility status, blocker/risk notes, current workflow step, state snapshot, and compact fishbone/data check result if available.

## Main Decision Flow

1. Confirm the request is about integration, commissioning, or NMS visibility readiness.
2. Check whether site/link/context is sufficient.
3. Check integration/commissioning status and NMS visibility notes.
4. Judge blockers and readiness for alarm check.
5. Identify missing items or risk flags.
6. Decide result.
7. Recommend required action.
8. Only recommend `next_step` when result allows it.

## Evidence Handling

Use `references/evidence-rules.md`. Do not mark Proceed when integration failed, NMS is not visible, or commissioning is blocked.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`next_step` should be `alarm_check` only when integration readiness can proceed, is completed, is explicitly skipped by approved exception, or is confirmed not applicable by scope.

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not prepare or imply state/system update unless integration context and evidence have been checked.
- 先判后推: Judge commissioning status, NMS visibility, missing items, and blockers before recommending alarm check.
- If integration readiness is unclear, return Pending or Manual Check Required.
- If integration failed or NMS is not visible, return Blocked, Escalate, or Manual Check Required.
- Step skills must not access raw system APIs directly.

## Output Requirement

```json
{
  "step": "integration",
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

This skill does not route the full workflow, perform alarm check, persist state, update external systems, or decide L1 submission readiness.
