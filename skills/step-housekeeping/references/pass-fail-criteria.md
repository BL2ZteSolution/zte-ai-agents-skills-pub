# Pass-Fail Criteria

## Proceed

Use when housekeeping is completed and site condition is safe enough for check-out.

## Pending

Use when housekeeping evidence or site context is missing.

## Rework

Use when cleanup/evidence is incomplete or unclear.

## Escalate

Use when unsafe site or customer/safety issue requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge housekeeping status.

## Blocked

Use when unsafe or unclean site prevents check-out.

## Completed

Use when current state confirms housekeeping completed.

## Skipped

Normally not allowed for critical housekeeping unless approved exception exists.

## Not Applicable

Use only if scope confirms housekeeping is not required.

## Decision Rules

- Unsafe or unclean site must not proceed to check-out.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Critical housekeeping cannot be silently skipped.
