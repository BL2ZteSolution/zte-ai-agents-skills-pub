# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 5: L1 Before Photo.

## Acceptable Evidence

- Before-work photos received.
- User confirms before photos captured.
- Photo summary confirms relevant site/equipment context.
- Admin/ZTE PIC confirms before evidence captured.

## Weak Evidence

- Photo is unclear.
- Site context is missing.
- Photo may belong to wrong site.
- User says "photo done" without context.

## Invalid Evidence

- No before photo.
- Wrong site photo.
- Photo is after-work only.
- Critical evidence is missing.
- Photo is unreadable or irrelevant.

## Missing Evidence

- No before-photo evidence.
- No site/session context.
- No photo stage confirmation.

## Risk Flags

- `missing_before_photo`
- `unclear_photo`
- `site_mismatch`
- `wrong_photo_stage`
- `critical_evidence_missing`
- `manual_verification_required`

## Evidence Decision Notes

Before-work evidence must be available before installation is recommended. When unsure, return Pending, Rework, or Manual Check Required.
