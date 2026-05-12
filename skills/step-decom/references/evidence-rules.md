# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 10: Decommissioning Check.

## Acceptable Evidence

- Scope/SOW confirms decom required or not required.
- User confirms decom completed.
- Decom photo/evidence summary is provided.
- Admin/ZTE PIC confirms decom status.
- Compact fishbone/data check confirms scope.

## Weak Evidence

- "No decom" without scope context.
- "Done" without decom context.
- Missing site/scope.
- Partial decom unclear.

## Invalid Evidence

- Required decom not done.
- Wrong site.
- Scope mismatch.
- Decom blocked.
- Required decom evidence missing.

## Missing Evidence

- No decom scope/SOW status.
- No decom completion evidence when decom is required.
- No site/session context.

## Risk Flags

- `missing_decom_scope`
- `decom_required_not_done`
- `scope_mismatch`
- `site_mismatch`
- `decom_blocker`
- `manual_verification_required`

## Evidence Decision Notes

Decom can be Proceed only when completed if required, or Not Applicable when scope clearly confirms no decom requirement.
