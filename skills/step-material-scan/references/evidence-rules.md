# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 4: Material Scan.

## Acceptable Evidence

- User confirms material scan completed.
- MOS/material scan screenshot is provided.
- Material list or material reference is provided.
- Admin/ZTE PIC confirms material readiness.
- Compact summary from `iepms-fishbone-data-checker` confirms readiness.

## Weak Evidence

- "Done" without material context.
- Missing site or scope.
- Screenshot is unclear.
- Partial material confirmation.

## Invalid Evidence

- Critical material is missing.
- Material belongs to wrong site.
- Material is wrong for scope.
- Material scan failed.
- Material mismatch exists.

## Missing Evidence

- No material scan confirmation.
- No material context for scope.
- No site/session context.

## Risk Flags

- `missing_material_scan`
- `missing_material_context`
- `material_mismatch`
- `critical_material_missing`
- `site_mismatch`
- `manual_verification_required`

## Evidence Decision Notes

Do not mark Proceed unless material scan/readiness is clear enough. When unsure, return Pending, Rework, or Manual Check Required.
