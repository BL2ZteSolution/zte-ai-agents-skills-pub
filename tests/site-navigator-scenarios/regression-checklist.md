# Site Navigator Regression Checklist

## Purpose

Use this checklist after contract changes to confirm Phase 11 scenario expectations still align with the Site Navigator skill system.

## Scenario File Completeness

- [ ] `README.md` exists.
- [ ] `scenario-template.md` exists.
- [ ] Scenarios 01 through 13 exist.
- [ ] Every scenario includes input message, assumed state, expected routing, expected decision/result, expected system actions, guardrail checks, and acceptance criteria.
- [ ] Every scenario includes 核心原则：先查后写，先判后推。

## Approved System Tool Names

- [ ] System target names are limited to `firebase-db`, `iepms-column-writter`, and `iepms-fishbone-data-checker`.
- [ ] System action names are limited to `read_firebase_state`, `patch_firebase_state`, `check_iepms_fishbone_data`, `write_iepms_column`, `log_message_event`, and `create_async_job`.
- [ ] No unapproved legacy aliases appear in implementation or test contracts.

## Routing and Action Mapping

- [ ] Arrival messages with site code/link ID start at `greeting_status`.
- [ ] `greeting_status` routes to `step-greeting-status` through `call_step_greeting_status`.
- [ ] Step 0 resolves minimum arrival context before routing to `check_in_report`.
- [ ] Step 0 uses `check_iepms_fishbone_data` as default minimum context source when compact state context is missing.
- [ ] `check_in_report` routes to `step-check-in` through `call_step_check_in`.
- [ ] `dptw_login` routes to `step-dptw` through `call_step_dptw`.
- [ ] `ehs_login` routes to `step-ehs` through `call_step_ehs`.
- [ ] `material_scan` routes to `step-material-scan` through `call_step_material_scan`.
- [ ] `l1_before_photo` routes to `step-l1-before-photo` through `call_step_l1_before_photo`.
- [ ] `installation` routes to `step-installation` through `call_step_installation`.
- [ ] `integration` routes to `step-integration` through `call_step_integration`.
- [ ] `alarm_check` routes to `step-alarm-check` through `call_step_alarm_check`.
- [ ] `l1_submission` routes to `step-l1-submission` through `call_step_l1_submission`.
- [ ] `decom_check` routes to `step-decom` through `call_step_decom`.
- [ ] `housekeeping` routes to `step-housekeeping` through `call_step_housekeeping`.
- [ ] `check_out_report` routes to `step-check-out` through `call_step_check_out`.

## Step Status Guardrails

- [ ] Step results use only `Proceed`, `Pending`, `Rework`, `Escalate`, `Manual Check Required`, `Blocked`, `Completed`, `Skipped`, or `Not Applicable`.
- [ ] `next_step` appears only with progression-allowed results.
- [ ] `Pending`, `Rework`, `Escalate`, `Manual Check Required`, and `Blocked` do not silently advance workflow.

## Domain Review Guardrails

- [ ] Domain review results use only `Pass`, `Conditional Pass`, `Pending`, `Reject`, or `Manual Check Required`.
- [ ] Domain reviews do not update state directly.
- [ ] Domain reviews do not claim customer, handover, safety, or engineering acceptance.
- [ ] Domain review skills are loaded on demand only.

## State and System Action Guardrails

- [ ] Any non-empty `state_patch` is preceded by `read_firebase_state` or equivalent current-state confirmation.
- [ ] `patch_firebase_state` targets `firebase-db` only and requires confirmation.
- [ ] `write_iepms_column` targets `iepms-column-writter` only, requires prior fact/judgement checks, and requires confirmation.
- [ ] `check_iepms_fishbone_data` targets `iepms-fishbone-data-checker` only and returns facts only.
- [ ] No scenario requires backend URLs, credentials, raw API responses, full WhatsApp history, raw attachments, or runtime clients.

## Dashboard / Job / Risk Contracts

- [ ] Dashboard summary is derived from canonical site state.
- [ ] Dashboard does not replace canonical site state.
- [ ] Dashboard does not store raw API responses.
- [ ] Dashboard does not store full WhatsApp history.
- [ ] `create_async_job` does not bypass step judgement.
- [ ] iEPMS column write job requires completed judgement.
- [ ] `state_patch` job requires current state check.
- [ ] Risk severity rules are defined.
- [ ] Critical unresolved risk blocks affected workflow progression.
- [ ] Risk closure requires evidence or manual override.
- [ ] Only approved `target_skill` values are used.

## OpenClaw Metadata and Context Loading

- [ ] All `SKILL.md` files start with YAML frontmatter.
- [ ] Step skills include `actor: step-validator`.
- [ ] Domain review skills include `actor: domain-reviewer`.
- [ ] Orchestrator includes `actor: site-workflow-orchestrator`.
- [ ] Orchestrator chat trigger policy exists.
- [ ] Normal chat site workflow messages select `zte-site-navigator-orchestrator`.
- [ ] Standalone step skills are reached through orchestrator routing, not direct chat selection.
- [ ] Context loading remains current-decision-slice only.

## Scope Boundary

- [ ] Scenario tests are markdown-only unless a future phase explicitly adds executable tests.
- [ ] No Firebase, iEPMS, TIPIC, OCR, model, browser automation, SQLite, or production WhatsApp runtime integration is introduced.
- [ ] Frozen legacy guidebook sources remain unchanged.
- [ ] No Phase 13 work is started.
