# Pass-Fail Criteria

## Proceed

Use when installation completion or readiness for integration is clearly confirmed.

## Pending

Use when installation status or scope context is missing.

## Rework

Use when installation evidence/status is unclear or inconsistent.

## Escalate

Use when field blocker needs ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge installation status.

## Blocked

Use when installation cannot continue due to blocker.

## Completed

Use when current state confirms installation completed.

## Skipped

Use only when installation is not required for scope or already handled elsewhere by approved exception.

## Not Applicable

Use only if scope confirms no installation work is required.

## Decision Rules

- Do not recommend integration when installation is partial or blocked.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Field blocker, access issue, or safety issue must not be hidden.
