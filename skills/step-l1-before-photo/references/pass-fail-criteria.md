# Pass-Fail Criteria

## Proceed

Use when before-photo evidence is clearly available and relevant.

## Pending

Use when before photo or site context is missing.

## Rework

Use when photo/evidence is unclear, wrong angle, or incomplete.

## Escalate

Use when critical evidence issue requires ZTE PIC/admin decision.

## Manual Check Required

Use when AI cannot safely judge photo evidence.

## Blocked

Use when critical before-photo evidence is missing and work should not proceed.

## Completed

Use when current state confirms before-photo step completed.

## Skipped

Use only with approved exception.

## Not Applicable

Use only if scope confirms before-photo is not required.

## Decision Rules

- Critical before-photo evidence cannot be silently skipped.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Do not replace `l1-report-review` when report/photo quality review is requested.
