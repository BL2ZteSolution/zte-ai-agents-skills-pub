# Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 7: Integration.

## Acceptable Evidence

- Integration completed confirmation.
- Commissioning completed confirmation.
- NMS visibility confirmed.
- Admin/ZTE PIC confirms integration complete.

## Weak Evidence

- "Integrated" without site context.
- NMS status unclear.
- Partial commissioning.
- Issue summary is missing.

## Invalid Evidence

- Integration failed.
- NMS not visible.
- Commissioning blocked.
- Wrong site or link.
- Active issue prevents continuation.

## Missing Evidence

- No integration/commissioning status.
- No site/link context.
- No NMS visibility or blocker summary when relevant.

## Risk Flags

- `missing_integration_status`
- `integration_failed`
- `nms_not_visible`
- `commissioning_blocker`
- `site_mismatch`
- `link_mismatch`
- `manual_verification_required`

## Evidence Decision Notes

Proceed requires clear readiness for alarm check. Active commissioning or NMS blockers must not advance.
