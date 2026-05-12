# Skill Index

## Orchestrator Skill

| Skill | Path | Purpose | Primary Output |
|---|---|---|---|
| zte-site-navigator-orchestrator | `skills/zte-site-navigator-orchestrator/` | Chat-triggered entry skill for normal site workflow messages; interprets compact state, routes decisions, and prepares structured output. | Orchestrator decision JSON with route, required_action, system_actions, state_patch intent, and WhatsApp message. |

## Step Skills

| Step ID | Step Key | Skill | Path | Action | Next Step |
|---:|---|---|---|---|---|
| 1 | `check_in_report` | `step-check-in` | `skills/step-check-in/` | `call_step_check_in` | `dptw_login` |
| 2 | `dptw_login` | `step-dptw` | `skills/step-dptw/` | `call_step_dptw` | `ehs_login` |
| 3 | `ehs_login` | `step-ehs` | `skills/step-ehs/` | `call_step_ehs` | `material_scan` |
| 4 | `material_scan` | `step-material-scan` | `skills/step-material-scan/` | `call_step_material_scan` | `l1_before_photo` |
| 5 | `l1_before_photo` | `step-l1-before-photo` | `skills/step-l1-before-photo/` | `call_step_l1_before_photo` | `installation` |
| 6 | `installation` | `step-installation` | `skills/step-installation/` | `call_step_installation` | `integration` |
| 7 | `integration` | `step-integration` | `skills/step-integration/` | `call_step_integration` | `alarm_check` |
| 8 | `alarm_check` | `step-alarm-check` | `skills/step-alarm-check/` | `call_step_alarm_check` | `l1_submission` |
| 9 | `l1_submission` | `step-l1-submission` | `skills/step-l1-submission/` | `call_step_l1_submission` | `decom_check` |
| 10 | `decom_check` | `step-decom` | `skills/step-decom/` | `call_step_decom` | `housekeeping` |
| 11 | `housekeeping` | `step-housekeeping` | `skills/step-housekeeping/` | `call_step_housekeeping` | `check_out_report` |
| 12 | `check_out_report` | `step-check-out` | `skills/step-check-out/` | `call_step_check_out` | `session_closed` |

## Domain Review Skills

| Review Type | Skill | Path | Action | Output |
|---|---|---|---|---|
| L1 report/photo evidence | `l1-report-review` | `skills/l1-report-review/` | `review_l1_report` | Structured review result with defects, missing_evidence, risk_level, required_action, and recommendation. |
| EHS evidence | `ehs-review` | `skills/ehs-review/` | `review_ehs_report` | Structured safety/evidence review judgement. |
| PAC documentation | `pac-review` | `skills/pac-review/` | `review_pac_document` | Structured acceptance readiness review. |
| As-built documentation | `as-built-review` | `skills/as-built-review/` | `review_as_built` | Structured handover/documentation review. |
| TSSR survey evidence | `tssr-review` | `skills/tssr-review/` | `review_tssr` | Structured survey readiness review. |
| Pathloss planning evidence | `pathloss-review` | `skills/pathloss-review/` | `review_pathloss` | Structured microwave planning evidence review. |

## Reference Files

| File | Purpose |
|---|---|
| `workflow-map.md` | Canonical Step 0-12 mapping. |
| `greeting-status-policy.md` | Step 0 arrival greeting and minimum site context rules before check-in. |
| `state-model.md` | Canonical Firebase state, event, log, job, dashboard, risk, and cache schemas. |
| `routing-rules.md` | Intent routing rules for orchestrator, step skills, domain review skills, and system actions. |
| `result-status.md` | Approved step result statuses and transition meaning. |
| `action-registry.md` | Step, system, and domain action contracts. |
| `context-loading-policy.md` | Current-decision-slice context loading rules. |
| `chat-trigger-policy.md` | OpenClaw chat trigger examples and direct step skill selection restriction. |
| `output-format.md` | Orchestrator, step, domain, and system action output contracts. |
| `legacy-step-rules.md` | Compact fallback-only legacy workflow summary. |
| `dashboard-model.md` | Dashboard projection schema and derivation rules. |
| `job-queue-policy.md` | Async job lifecycle and compactness policy. |
| `risk-management-policy.md` | Risk severity, lifecycle, escalation, and closure policy. |
