# Pass-Fail Criteria

## Proceed

Use when EHS login/check is confirmed or EHS is not applicable with a clear approved reason.

## Pending

Use when EHS evidence or site context is missing.

## Rework

Use when evidence is unclear, wrong format, or needs correction.

## Escalate

Use when safety issue or EHS blocker requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge EHS status.

## Blocked

Use when EHS failed or unsafe condition blocks work.

## Completed

Use when current state confirms EHS step completed.

## Skipped

Use only if approved exception exists.

## Not Applicable

Use only if scope confirms EHS is not required.

## Decision Rules

- Safety-critical uncertainty must not proceed.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Pending, Rework, Escalate, Manual Check Required, and Blocked must not advance workflow.
