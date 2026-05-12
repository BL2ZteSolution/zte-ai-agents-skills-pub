# DPTW Pass-Fail Criteria

## Purpose

Define result criteria for Step 2: DPTW Login.

## Proceed

Use when DPTW login is clearly confirmed and no blocking risk exists.

Allowed next action: Recommend `ehs_login`.

## Pending

Use when DPTW evidence or site context is missing but no confirmed blocker exists.

Allowed next action: Ask for DPTW login confirmation, screenshot, or missing site/session context.

## Rework

Use when submitted evidence is insufficient, unclear, wrong-site, expired, or needs correction.

Allowed next action: Ask user to resend clear DPTW evidence showing site and login status.

## Escalate

Use when DPTW, permit, or access issue creates safety, customer, or work-blocking risk that needs ZTE PIC/admin action.

Allowed next action: Escalate to ZTE PIC/admin before work continues.

## Manual Check Required

Use when evidence cannot be safely judged by AI.

Allowed next action: Request ZTE PIC/admin manual verification.

## Blocked

Use when DPTW login failed, permit is rejected, access is blocked, or work cannot proceed.

Allowed next action: Resolve DPTW login, permit, or access blocker before continuing.

## Completed

Use only if DPTW step was already completed and confirmed in current state.

Allowed next action: Recommend `ehs_login` if EHS is not already completed.

## Skipped

Normally not allowed for mandatory DPTW.

Use only if orchestrator provides explicit approved exception.

Allowed next action: Recommend `ehs_login` only under approved exception.

## Not Applicable

Normally not allowed for mandatory DPTW.

Use only if project/site scope explicitly confirms DPTW is not required.

Allowed next action: Recommend `ehs_login` only with explicit scope confirmation.

## Decision Rule

- Mandatory DPTW cannot be silently skipped.
- If DPTW is missing, do not proceed to EHS.
- If DPTW risk exists, return Blocked, Escalate, or Manual Check Required.
- If evidence is unclear, return Pending or Rework.
- Proceed only when evidence and context are sufficient.
- Apply 先查后写 by checking current DPTW context before any implied state update.
- Apply 先判后推 by judging DPTW evidence and risk before recommending `ehs_login`.
