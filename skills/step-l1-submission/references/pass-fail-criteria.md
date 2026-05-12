# Pass-Fail Criteria

## Proceed

Use when L1 submission and after-photo evidence are sufficiently confirmed, or step is not required for scope.

## Pending

Use when submission evidence or after-photo evidence is missing.

## Rework

Use when evidence is unclear, wrong-site, or incomplete.

## Escalate

Use when major L1/report issue requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge L1 submission evidence.

## Blocked

Use when required L1 submission cannot proceed due to major blocker.

## Completed

Use when current state confirms L1 submission completed.

## Skipped

Use only with approved exception.

## Not Applicable

Use only if scope confirms L1 submission is not required.

## Decision Rules

- Do not claim L1 accepted by customer.
- `next_step` is allowed only for Proceed, Completed, Skipped, or Not Applicable.
- Use `l1-report-review` when deep report/photo quality review is required.
