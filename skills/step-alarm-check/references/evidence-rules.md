# Alarm Check Evidence Rules

## Purpose

Define evidence rules for Step 8: Alarm Check.

## Acceptable Evidence

- User explicitly confirms no active/blocking alarm.
- NMS screenshot clearly shows no blocking alarm.
- Alarm list screenshot shows clear/normal status.
- ZTE PIC/admin confirms alarm clear.
- State/context confirms alarm check completed.

## Weak Evidence

- "No alarm" without site context.
- Screenshot is unclear or cropped.
- Screenshot is old.
- NMS status is not visible.
- Site code mismatch.

## Invalid Evidence

- Active critical/blocking alarm.
- NMS not visible.
- Integration failed.
- Alarm screenshot belongs to another site.
- User cannot confirm alarm status.

## Missing Evidence

Evidence is missing when no alarm confirmation, screenshot description, NMS/alarm context, or admin/ZTE PIC confirmation is available.

## Risk Flags

- `missing_alarm_evidence`
- `unclear_alarm_screenshot`
- `active_blocking_alarm`
- `nms_not_visible`
- `site_mismatch`
- `integration_failed`
- `manual_verification_required`
- `customer_impact_risk`

## Evidence Decision Notes

- Do not mark Proceed unless no blocking alarm is clear.
- Use Pending when evidence is missing.
- Use Rework when evidence is unclear or wrong-site.
- Use Blocked/Escalate when alarm risk may block site exit or affect customer/service.
- Follow 核心原则：先查后写，先判后推。
