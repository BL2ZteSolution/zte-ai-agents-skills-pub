# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 9: L1 Submission with After Photo.

## Acceptable Evidence

- User confirms L1 submitted.
- After photos received or summarized.
- L1 submission screenshot is provided.
- Admin/ZTE PIC confirms L1 submission.
- `l1-report-review` result is provided.

## Weak Evidence

- "Submitted" without site context.
- Missing after photo.
- Screenshot unclear.
- Submission status is not visible.

## Invalid Evidence

- L1 not submitted.
- After photos missing.
- Wrong site.
- Wrong report.
- Major evidence missing.

## Missing Evidence

- No L1 submission confirmation.
- No after-photo evidence.
- No site/session context.

## Risk Flags

- `missing_l1_submission`
- `missing_after_photo`
- `unclear_submission_evidence`
- `site_mismatch`
- `wrong_report`
- `manual_verification_required`

## Evidence Decision Notes

Do not mark Proceed unless L1 submission and after-photo evidence are sufficiently confirmed or scope confirms the step is not required.
