# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 3: EHS Login.

## Acceptable Evidence

- User confirms EHS login/check completed.
- EHS screenshot shows completed or valid status.
- ZTE PIC/admin confirms EHS check.
- Scope confirms EHS is not required with an approved reason.

## Weak Evidence

- "Done" without EHS step context.
- Screenshot is unclear or cropped.
- Site context is missing.
- Evidence appears old or unrelated to current session.
- EHS confirmation lacks safety context.

## Invalid Evidence

- EHS failed.
- Unsafe condition is reported.
- Evidence belongs to the wrong site.
- Mandatory safety requirement is missing.
- User cannot complete EHS.

## Missing Evidence

- No EHS confirmation.
- No EHS screenshot or approved alternative.
- No site/session context.

## Risk Flags

- `missing_ehs_evidence`
- `unclear_ehs_screenshot`
- `safety_issue`
- `site_mismatch`
- `ehs_failed`
- `manual_verification_required`

## Evidence Decision Notes

Do not mark Proceed unless EHS status is clear enough and no safety blocker exists. When unsure, return Pending or Manual Check Required.
