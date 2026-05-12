# Check-out Evidence Rules

## Purpose

Define evidence rules for Step 12: Check-out Report.

## Acceptable Evidence

- User explicitly requests check-out.
- User provides final progress summary.
- User confirms work completed or stopped with clear reason.
- Alarm check completed or risk clearly stated.
- Housekeeping completed or risk clearly stated.
- Pending items listed.
- Admin or ZTE PIC confirms check-out status.

## Weak Evidence

- "Done" without progress details.
- No site context.
- No pending/risk summary.
- Alarm or housekeeping status missing.
- Check-out message without confirmation that team is leaving.

## Invalid Evidence

- Critical alarm unresolved.
- Housekeeping unsafe.
- Work status unclear.
- Site access or customer issue unresolved.
- Wrong site.
- User asks to close while blockers remain without escalation.

## Missing Evidence

Evidence is missing when site context, final progress, pending items, alarm status, housekeeping status, or risk summary is unavailable.

## Risk Flags

- `missing_site_context`
- `missing_final_progress`
- `missing_pending_item_summary`
- `missing_alarm_status`
- `missing_housekeeping_status`
- `unresolved_critical_blocker`
- `site_mismatch`
- `unsafe_to_leave`
- `manual_verification_required`

## Evidence Decision Notes

- Do not mark Proceed unless check-out context is sufficient and two drafts can be prepared.
- Do not recommend closure if critical blockers remain unresolved.
- Use Pending for missing context and Rework for inconsistent or incomplete details.
- Use Escalate or Blocked for unsafe-to-leave conditions.
- Follow 核心原则：先查后写，先判后推。
