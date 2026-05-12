# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 6: Installation.

## Acceptable Evidence

- User confirms installation completed.
- Installation progress is clearly stated.
- Completion photo/evidence summary is provided.
- ZTE PIC/admin confirms installation status.

## Weak Evidence

- "Done" without scope.
- No site context.
- Partial progress is unclear.
- Blocker summary is missing.

## Invalid Evidence

- Installation not started when progression is requested.
- Work is blocked.
- Wrong scope.
- Material or site blocker exists.
- Safety or access issue exists.

## Missing Evidence

- No installation status.
- No site/scope context.
- No blocker or risk summary for partial work.

## Risk Flags

- `missing_installation_status`
- `partial_installation`
- `installation_blocker`
- `material_issue`
- `access_issue`
- `safety_issue`
- `site_mismatch`
- `manual_verification_required`

## Evidence Decision Notes

Proceed requires clear installation completion or readiness for integration. Partial/unclear progress should return Pending, Rework, or Manual Check Required.
