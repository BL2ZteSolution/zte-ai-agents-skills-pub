# Architecture Summary

## Why Modular Skill System

Do not build one heavy guidebook skill. Use an orchestrator plus small step skills, domain review skills, and approved system contracts. This keeps workflow routing, evidence judgement, quality review, and data access boundaries clear.

## Responsibility Matrix

| Component | Owns | Must Not Do |
|---|---|---|
| Orchestrator | Routing, state interpretation, next action, output structure, state_patch intent. | Perform deep document review, raw backend access, or detailed step validation owned by step skills. |
| Step Skills | One-step evidence judgement and short user guidance. | Update Firebase/iEPMS directly, decide unrelated workflow steps, or replace domain review. |
| Domain Review Skills | Structured quality judgement for reports/documents/evidence. | Decide workflow next_step, update systems directly, or claim final acceptance. |
| System Skills | Approved data/read/write/log/job contracts. | Make workflow decisions or replace orchestrator/step/domain judgement. |
| OpenClaw Skill Selector | Detect normal site workflow chat intent and select `zte-site-navigator-orchestrator`. | Select standalone step skills directly for normal chat messages. |
| Dashboard/Job/Risk policies | Compact projection, async job record policy, and risk lifecycle rules. | Replace canonical state, execute workers, or claim system success without confirmation. |

## Canonical Workflow

| Step | Step Key | Route Target | Next Step |
|---:|---|---|---|
| 0 | `greeting_status` | `orchestrator` | `check_in_report` |
| 1 | `check_in_report` | `step-check-in` | `dptw_login` |
| 2 | `dptw_login` | `step-dptw` | `ehs_login` |
| 3 | `ehs_login` | `step-ehs` | `material_scan` |
| 4 | `material_scan` | `step-material-scan` | `l1_before_photo` |
| 5 | `l1_before_photo` | `step-l1-before-photo` | `installation` |
| 6 | `installation` | `step-installation` | `integration` |
| 7 | `integration` | `step-integration` | `alarm_check` |
| 8 | `alarm_check` | `step-alarm-check` | `l1_submission` |
| 9 | `l1_submission` | `step-l1-submission` | `decom_check` |
| 10 | `decom_check` | `step-decom` | `housekeeping` |
| 11 | `housekeeping` | `step-housekeeping` | `check_out_report` |
| 12 | `check_out_report` | `step-check-out` | `session_closed` |

## Routing and Action Model

- `route_to`: names the skill or system route needed for current decision.
- `action-registry`: defines allowed step, system, and domain actions.
- `system_actions`: compact requested system actions with approved target skill and confirmation flags.
- `state_patch`: intended patch only; it requires prior state check and completed judgement.
- `next_step`: allowed only when the current decision permits progression.

## Production Guardrails

- 核心原则：先查后写，先判后推。
- Approved tools only: `firebase-db`, `iepms-column-writter`, `iepms-fishbone-data-checker`.
- Firebase GET/PATCH only through `firebase-db`.
- No raw API response in context, state, dashboard, job, or risk records.
- Compact context only; never load the whole system.
