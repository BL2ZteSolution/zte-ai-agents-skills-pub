# How to Use ZTE Site AI Navigator

## For Future Codex/OpenClaw Agents

1. Read `README.md`.
2. Read `SYSTEM_OVERVIEW.md`.
3. Read `SKILL_INDEX.md`.
4. For workflow routing, start with `zte-site-navigator-orchestrator`.
5. Load only current decision slice.
6. Use step skill only for current step judgement.
7. Use domain review skill only for document/report review.
8. Use system action contracts only through approved names.
9. Use test scenarios before changing behavior.

## For Field Workflow

- Check-in: confirm arrival and prepare manual-forward check-in drafts when context is sufficient.
- DPTW: verify permit login before workflow continues.
- EHS: validate safety readiness before site work proceeds.
- Material scan: confirm MOS/material readiness where required.
- Before photo: validate before-work evidence before installation.
- Installation: judge physical work progress or completion.
- Integration: judge commissioning/NMS readiness before alarm check.
- Alarm check: confirm no blocking alarm before later workflow actions.
- L1 submission: validate after-photo and submission readiness.
- Decom check: confirm decom requirement and completion or not applicable status.
- Housekeeping: validate cleanup and safe leaving condition.
- Check-out: summarize progress/risks and prepare manual-forward check-out drafts when safe.

## Example User Messages and Expected Routes

| User Message | Expected Route | Expected Action |
|---|---|---|
| "Arrived site 4434A" | `step-check-in` | `call_step_check_in` |
| "DPTW done" | `step-dptw` | `call_step_dptw` |
| "No alarm" | `step-alarm-check` | `call_step_alarm_check` |
| "Review L1 report" | `l1-report-review` | `review_l1_report` |
| "Check iEPMS fishbone" | `iepms-fishbone-data-checker` | `check_iepms_fishbone_data` |

## Manual Forwarding Rule

Check-in and check-out generate exactly two drafts:

1. CelcomDigi NOC
2. ZTE Safety

User must manually forward both. System must not claim they were forwarded unless user confirms.
