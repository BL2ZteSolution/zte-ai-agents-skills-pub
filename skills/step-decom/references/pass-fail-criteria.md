# Pass-Fail Criteria

## Proceed

Use when decom is completed if required, or confirmed Not Applicable if scope does not require decom.

## Pending

Use when scope or decom status is missing.

## Rework

Use when evidence is inconsistent, unclear, or incomplete.

## Escalate

Use when required decom issue needs ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge decom requirement/status.

## Blocked

Use when required decom is blocked or not done.

## Completed

Use when current state confirms decom check completed.

## Skipped

Use only when scope confirms no decom required or approved exception exists.

## Not Applicable

Use when scope clearly confirms decom is not required.

## Decision Rules

- Required decom cannot be silently skipped.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Pending, Rework, Escalate, Manual Check Required, and Blocked must not advance workflow.
