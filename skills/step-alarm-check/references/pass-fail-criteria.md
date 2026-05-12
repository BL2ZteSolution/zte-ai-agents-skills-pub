# Alarm Check Pass-Fail Criteria

## Proceed

Use when no blocking alarm is clearly confirmed.

Allowed next action: Recommend `l1_submission`.

## Pending

Use when alarm evidence or site context is missing.

## Rework

Use when alarm evidence is unclear, wrong-site, old, or needs correction.

## Escalate

Use when alarm issue may affect customer/service or requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge alarm status.

## Blocked

Use when active blocking alarm, NMS not visible, or integration failure prevents continuation.

## Completed

Use when alarm check already completed and confirmed.

## Skipped

Normally not allowed for critical alarm check unless approved exception exists.

## Not Applicable

Normally not allowed unless scope explicitly confirms alarm check is not required.

## Decision Rule

- Critical alarm check cannot be silently skipped.
- If blocking alarm exists, do not proceed to L1 submission.
- If evidence is unclear, return Pending, Rework, or Manual Check Required.
- Apply 先查后写 before any implied state update.
- Apply 先判后推 before recommending `l1_submission`.
