# Pass-Fail Criteria

## Proceed

Use when material scan/readiness is confirmed or step is not required for scope.

## Pending

Use when evidence or material context is missing.

## Rework

Use when evidence is unclear or inconsistent.

## Escalate

Use when critical material issue blocks site work and requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge material readiness.

## Blocked

Use when critical required material is missing or wrong.

## Completed

Use when state confirms material scan completed.

## Skipped

Use only if approved exception exists.

## Not Applicable

Use only if scope confirms material scan is not required.

## Decision Rules

- Material mismatch or critical material missing must not proceed.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Do not replace compact fact checking by `iepms-fishbone-data-checker` when system facts are required.
