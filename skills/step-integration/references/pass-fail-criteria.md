# Pass-Fail Criteria

## Proceed

Use when integration/commissioning status is clearly ready for alarm check.

## Pending

Use when integration status or site/link context is missing.

## Rework

Use when evidence/status is unclear or inconsistent.

## Escalate

Use when commissioning/NMS issue needs ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge integration readiness.

## Blocked

Use when integration failed or NMS is not visible.

## Completed

Use when current state confirms integration completed.

## Skipped

Use only if integration is not required for scope.

## Not Applicable

Use only if scope confirms no integration required.

## Decision Rules

- Do not recommend alarm check when integration failed or NMS is not visible.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Do not replace the alarm check step.
