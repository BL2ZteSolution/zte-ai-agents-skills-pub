# Action Registry

This registry defines future actions only. It does not implement APIs, clients, runtime code, or credentials.

## Decision Boundaries

- System skills provide data only.
- Step skills validate workflow step only.
- Domain skills review quality only.
- Orchestrator makes routing and next-action decision.

## Step Skill Actions

| action_name | future_skill_target | purpose | input_summary | output_summary | decision_boundary |
|---|---|---|---|---|---|
| call_step_check_in | step-check-in | Validate whether Step 1 Check-in Report can proceed and prepare exactly two check-in message drafts when context is sufficient. | Current site state, current workflow step, user message, minimum site context, and team/PIC context if available. | Structured check-in judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, message_drafts, and internal_notes. | `step-check-in` validates check-in readiness only. It must not access raw Firebase or iEPMS directly, update state directly, or claim messages were forwarded. |
| call_step_dptw | step-dptw | Validate whether Step 2 DPTW Login can proceed. | Current site state, current workflow step, user message, DPTW evidence summary, and risk context if available. | Structured DPTW judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-dptw` validates DPTW readiness only. It must not access raw Firebase or iEPMS directly, update state directly, or decide unrelated workflow steps. |
| call_step_ehs | step-ehs | Validate whether Step 3 EHS Login can proceed. | Current site state, current workflow step, user message, EHS evidence summary, and safety risk context if available. | Structured EHS judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-ehs` validates EHS readiness only and must not perform deep EHS report review. |
| call_step_material_scan | step-material-scan | Validate whether Step 4 Material Scan can proceed. | Current site state, current workflow step, user message, material/MOS evidence summary, scope context, and compact fishbone facts if available. | Structured material judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-material-scan` validates material readiness only and must not update iEPMS directly. |
| call_step_l1_before_photo | step-l1-before-photo | Validate whether Step 5 L1 Before Photo can proceed. | Current site state, current workflow step, user message, before-photo evidence summary, and site context if available. | Structured before-photo judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-l1-before-photo` validates before-photo readiness only and must not perform deep L1 report review. |
| call_step_installation | step-installation | Validate whether Step 6 Installation can proceed or is ready for integration. | Current site state, current workflow step, user message, installation status, progress, blocker/risk notes, and evidence summary if available. | Structured installation judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-installation` validates installation status only and must not update systems directly. |
| call_step_integration | step-integration | Validate whether Step 7 Integration can proceed or is ready for alarm check. | Current site state, current workflow step, user message, integration/commissioning status, NMS visibility, blocker/risk notes, and compact fishbone facts if available. | Structured integration judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-integration` validates integration readiness only and must not perform alarm check. |
| call_step_alarm_check | step-alarm-check | Validate whether Step 8 Alarm Check can proceed by judging whether blocking alarm risk exists. | Current site state, current workflow step, user message, alarm evidence summary, NMS/alarm context, and risk context if available. | Structured alarm judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-alarm-check` validates alarm readiness only. It must not access raw NMS, Firebase, or iEPMS directly, update state directly, or allow progression when blocking alarm risk is unresolved. |
| call_step_l1_submission | step-l1-submission | Validate whether Step 9 L1 Submission with After Photo can proceed. | Current site state, current workflow step, user message, L1 submission status, after-photo evidence, report/document summary, and domain review result if available. | Structured L1 submission judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-l1-submission` validates submission readiness only and must not claim L1 acceptance. |
| call_step_decom | step-decom | Validate whether Step 10 Decommissioning Check can proceed. | Current site state, current workflow step, user message, scope/SOW summary, decom requirement/status, decom evidence, and compact fishbone facts if available. | Structured decom judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-decom` validates decom requirement and status only and must not update systems directly. |
| call_step_housekeeping | step-housekeeping | Validate whether Step 11 Housekeeping can proceed. | Current site state, current workflow step, user message, housekeeping confirmation, cleanup/restoration evidence, safe-site status, and risk context if available. | Structured housekeeping judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes. | `step-housekeeping` validates site cleanup/safe condition only and must not decide final check-out. |
| call_step_check_out | step-check-out | Validate whether Step 12 Check-out Report can proceed and prepare exactly two check-out message drafts when context is sufficient. | Current site state, current workflow step, user message, final progress, pending items, risk summary, alarm status, housekeeping status, and site context if available. | Structured check-out judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, message_drafts, session_closure_recommendation, and internal_notes. | `step-check-out` validates check-out readiness only. It must not access raw Firebase or iEPMS directly, update state directly, close session directly, or claim messages were forwarded. |

## Step Skill Action Contract Details

These actions route detailed step judgement to the standalone step skill. Step skills validate readiness only; they must not access raw Firebase/iEPMS/TIPIC APIs, update state directly, write iEPMS columns directly, decide unrelated workflow steps, or replace domain review skills. Orchestrator remains final routing and state decision owner.

### call_step_check_in

- action_name: `call_step_check_in`
- future_skill_target: `step-check-in`
- purpose: Validate whether Step 1 Check-in Report can proceed and prepare exactly two check-in message drafts when context is sufficient.
- input_summary: Current site state, current workflow step, user message, minimum site context, and team/PIC context if available.
- output_summary: Structured check-in judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, message_drafts, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns check-in or start-work reporting.
  - Step 0 `greeting_status` has resolved minimum site context, or equivalent compact context is already available.
- forbidden_when:
  - The action would claim messages were already forwarded without user confirmation.
  - The action would update state or external systems directly.
- decision_boundary: `step-check-in` validates check-in readiness only and prepares drafts only when context is sufficient.
- guardrails:
  - Prepare exactly two check-in drafts only when minimum site context is sufficient.
  - User must manually forward both drafts.
  - Follow 核心原则：先查后写，先判后推。

### call_step_dptw

- action_name: `call_step_dptw`
- future_skill_target: `step-dptw`
- purpose: Validate whether Step 2 DPTW Login can proceed.
- input_summary: Current site state, current workflow step, user message, DPTW evidence summary, screenshot description, and risk context if available.
- output_summary: Structured DPTW judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns DPTW/CDPTW login or permit login evidence.
- forbidden_when:
  - DPTW evidence is being treated as a direct system write.
  - The action would decide unrelated workflow steps.
- decision_boundary: `step-dptw` validates DPTW readiness only.
- guardrails:
  - Mandatory DPTW cannot be silently skipped.
  - Do not proceed when DPTW is missing, invalid, failed, expired, or blocked.
  - Follow 核心原则：先查后写，先判后推。

### call_step_ehs

- action_name: `call_step_ehs`
- future_skill_target: `step-ehs`
- purpose: Validate whether Step 3 EHS Login can proceed.
- input_summary: Current site state, current workflow step, user message, EHS login/check confirmation, EHS screenshot or evidence summary, and safety issue notes if available.
- output_summary: Structured EHS judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns EHS login/check or safety readiness.
  - Orchestrator has or requests enough site/session context to judge the step.
- forbidden_when:
  - Deep EHS report review is required; use `review_ehs_report`.
  - Raw system API access or direct state/system write is requested.
- decision_boundary: `step-ehs` validates EHS readiness only and must not perform deep EHS report review.
- guardrails:
  - Return structured judgement only.
  - Do not approve unsafe work without evidence.
  - Follow 核心原则：先查后写，先判后推。

### call_step_material_scan

- action_name: `call_step_material_scan`
- future_skill_target: `step-material-scan`
- purpose: Validate whether Step 4 Material Scan can proceed.
- input_summary: Current site state, current workflow step, user message, MOS/material scan confirmation, material evidence summary, missing material notes, and compact fishbone facts if available.
- output_summary: Structured material judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns material scan, MOS, or material readiness.
  - Material/scope context is available or can be requested.
- forbidden_when:
  - Direct iEPMS write or raw system lookup is requested.
  - Fishbone/data consistency facts are required but unavailable; route to `check_iepms_fishbone_data` first.
- decision_boundary: `step-material-scan` validates material readiness only and must not update iEPMS directly.
- guardrails:
  - Return structured judgement only.
  - Escalate or block when critical material is missing.
  - Follow 核心原则：先查后写，先判后推。

### call_step_l1_before_photo

- action_name: `call_step_l1_before_photo`
- future_skill_target: `step-l1-before-photo`
- purpose: Validate whether Step 5 L1 Before Photo can proceed.
- input_summary: Current site state, current workflow step, user message, before-photo evidence summary, photo attachment summary, and site context if available.
- output_summary: Structured before-photo judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns before-work photo evidence.
- forbidden_when:
  - Full L1 report/photo quality review is required; use `review_l1_report`.
  - Evidence is unrelated to before-work stage.
- decision_boundary: `step-l1-before-photo` validates before-photo readiness only and must not perform deep L1 report review.
- guardrails:
  - Return structured judgement only.
  - Do not allow installation when critical before-photo evidence is missing.
  - Follow 核心原则：先查后写，先判后推。

### call_step_installation

- action_name: `call_step_installation`
- future_skill_target: `step-installation`
- purpose: Validate whether Step 6 Installation can proceed or is ready for integration.
- input_summary: Current site state, current workflow step, user message, installation status, progress percentage or completion statement, blocker/risk notes, and evidence summary if available.
- output_summary: Structured installation judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns installation or physical work progress.
- forbidden_when:
  - Integration success, alarm status, or system write is being decided.
  - Field status is unclear and no evidence/context exists.
- decision_boundary: `step-installation` validates installation status only and must not update systems directly.
- guardrails:
  - Return structured judgement only.
  - Do not recommend integration when installation is partial or blocked.
  - Follow 核心原则：先查后写，先判后推。

### call_step_integration

- action_name: `call_step_integration`
- future_skill_target: `step-integration`
- purpose: Validate whether Step 7 Integration can proceed or is ready for alarm check.
- input_summary: Current site state, current workflow step, user message, commissioning/integration status, NMS visibility status, blocker/risk notes, and compact fishbone/data check result if available.
- output_summary: Structured integration judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns integration, commissioning, or NMS visibility readiness.
- forbidden_when:
  - Alarm status is being judged; use `call_step_alarm_check`.
  - Raw NMS/system API access is requested.
- decision_boundary: `step-integration` validates integration readiness only and must not perform alarm check.
- guardrails:
  - Return structured judgement only.
  - Do not proceed when integration failed or NMS is not visible.
  - Follow 核心原则：先查后写，先判后推。

### call_step_alarm_check

- action_name: `call_step_alarm_check`
- future_skill_target: `step-alarm-check`
- purpose: Validate whether Step 8 Alarm Check can proceed by judging whether blocking alarm risk exists.
- input_summary: Current site state, current workflow step, user message, alarm evidence summary, NMS/alarm context, and risk context if available.
- output_summary: Structured alarm judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns alarm check, NMS visibility, active alarm, blocking alarm, or no-alarm confirmation.
- forbidden_when:
  - Raw NMS/API access is requested.
  - The action would allow progression with unresolved blocking alarm risk.
- decision_boundary: `step-alarm-check` validates alarm readiness only and must not perform raw system access.
- guardrails:
  - Do not proceed when active blocking alarm risk exists.
  - Return Blocked, Escalate, or Manual Check Required when alarm status is unsafe or unclear.
  - Follow 核心原则：先查后写，先判后推。

### call_step_l1_submission

- action_name: `call_step_l1_submission`
- future_skill_target: `step-l1-submission`
- purpose: Validate whether Step 9 L1 Submission with After Photo can proceed.
- input_summary: Current site state, current workflow step, user message, L1 submission status, after-photo evidence summary, report/document summary, and domain review result if available.
- output_summary: Structured L1 submission judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns L1 submission or after-photo evidence.
- forbidden_when:
  - Full L1 report review is required; use `review_l1_report`.
  - The action would claim customer acceptance.
- decision_boundary: `step-l1-submission` validates submission readiness only and must not claim L1 acceptance.
- guardrails:
  - Return structured judgement only.
  - Do not proceed without required after-photo/submission evidence.
  - Follow 核心原则：先查后写，先判后推。

### call_step_decom

- action_name: `call_step_decom`
- future_skill_target: `step-decom`
- purpose: Validate whether Step 10 Decommissioning Check can proceed.
- input_summary: Current site state, current workflow step, user message, scope/SOW summary, decom requirement status, decom completion evidence, and compact fishbone/data check if available.
- output_summary: Structured decom judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns decom, decommissioning, dismantling, or old equipment removal.
- forbidden_when:
  - Raw system lookup is required but not yet performed.
  - Physical decommissioning instruction beyond required action summary is requested.
- decision_boundary: `step-decom` validates decom requirement and status only and must not update systems directly.
- guardrails:
  - Return structured judgement only.
  - Required decom cannot be silently skipped.
  - Follow 核心原则：先查后写，先判后推。

### call_step_housekeeping

- action_name: `call_step_housekeeping`
- future_skill_target: `step-housekeeping`
- purpose: Validate whether Step 11 Housekeeping can proceed.
- input_summary: Current site state, current workflow step, user message, housekeeping confirmation, cleanup/restoration evidence, safe-site status, and risk/blocker notes if available.
- output_summary: Structured housekeeping judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns housekeeping, cleanup, restoration, or safe-to-leave status.
- forbidden_when:
  - Final check-out report is being generated; use `call_step_check_out`.
  - Site safety/cleanup status is unclear and no evidence exists.
- decision_boundary: `step-housekeeping` validates site cleanup/safe condition only and must not decide final check-out.
- guardrails:
  - Return structured judgement only.
  - Do not recommend check-out when site is unsafe or unclean.
  - Follow 核心原则：先查后写，先判后推。

### call_step_check_out

- action_name: `call_step_check_out`
- future_skill_target: `step-check-out`
- purpose: Validate whether Step 12 Check-out Report can proceed and prepare exactly two check-out message drafts when context is sufficient.
- input_summary: Current site state, current workflow step, user message, final progress, pending items, risk summary, alarm status, housekeeping status, and site context if available.
- output_summary: Structured check-out judgement with result, missing_items, risk_flags, required_action, next_step, whatsapp_message, message_drafts, session_closure_recommendation, and internal_notes.
- allowed_when:
  - User message or current workflow step concerns check-out, leaving site, finish work, close site, or work completion.
  - Final progress, pending items, risk/alarm, housekeeping, and site context are available or can be requested.
- forbidden_when:
  - Critical unresolved blockers remain and no escalation/manual acceptance exists.
  - The action would claim messages were forwarded or close the session directly.
- decision_boundary: `step-check-out` validates check-out readiness only and must not close session directly.
- guardrails:
  - Prepare exactly two check-out drafts only when context is sufficient.
  - User must manually forward both drafts.
  - Recommend session closure only after forwarding confirmation and no unresolved critical blockers.
  - Follow 核心原则：先查后写，先判后推。

## System Skill Actions

System skill actions:
- `read_firebase_state`
- `patch_firebase_state`
- `check_iepms_fishbone_data`
- `write_iepms_column`
- `log_message_event`
- `create_async_job`

### read_firebase_state

- action_name: `read_firebase_state`
- future_skill_target: `firebase-db`
- purpose: Read current session/site/workflow state using approved Firebase relative paths.
- input_summary: `relative_path`, `sender`, `site_id`, `link_id`, or `session_id` as available.
- output_summary: Compact canonical state snapshot including `site_id`, `current_step`, `current_step_id`, `overall_status`, session status, per-step summaries, known risks, and last decision if available.
- allowed_when:
  - Session, site, or workflow state is needed before judgement.
  - Orchestrator needs current state before preparing `state_patch`.
  - User message requires status lookup.
- forbidden_when:
  - Raw Firebase URL is required.
  - PUT or DELETE is requested.
  - The action is being used to make final workflow decision without orchestrator judgement.
- decision_boundary: `firebase-db` returns data only. It does not decide workflow result or `next_step`.
- guardrails:
  - Use relative paths only.
  - No Firebase URL.
  - GET only.
  - Follow 先查后写.

### patch_firebase_state

- action_name: `patch_firebase_state`
- future_skill_target: `firebase-db`
- purpose: Patch approved state fields after orchestrator judgement.
- input_summary: `relative_path` and limited `state_patch` payload containing only approved schema fields.
- output_summary: Compact JSON confirmation including success/failure, `patched_path`, `patched_fields`, timestamp, and error if any.
- allowed_when:
  - `read_firebase_state` or equivalent current-state confirmation already exists.
  - Orchestrator has completed judgement.
  - `state_patch` is explicit and limited.
- forbidden_when:
  - Current state was not checked.
  - Patch attempts to overwrite full state.
  - PUT or DELETE is requested.
  - Firebase URL is hardcoded.
  - The patch contains unrelated or raw API data.
- decision_boundary: `firebase-db` performs approved PATCH only. It does not decide workflow result or `next_step`.
- guardrails:
  - PATCH only.
  - No PUT.
  - No DELETE.
  - Relative paths only.
  - Do not claim patch success unless `firebase-db` confirms success.
  - Align patch payload with `state-model.md` allowed patch fields.

### check_iepms_fishbone_data

- action_name: `check_iepms_fishbone_data`
- future_skill_target: `iepms-fishbone-data-checker`
- purpose: Check iEPMS fishbone/data consistency and return compact facts for orchestrator judgement. During Step 0 `greeting_status`, this is the default source for minimum site context when state does not already contain enough site facts.
- input_summary: `site_id`, `site_code`, `link_id`, `scope`, `project_code`, or requested data field.
- output_summary: Compact JSON containing matched site/data status, minimum site context, mismatches, missing fields, risk flags, recommended data clarification, and optional fishbone cache summary.
- allowed_when:
  - Orchestrator needs iEPMS/fishbone facts before judgement.
  - Step 0 greeting needs compact site facts before routing to check-in.
  - Site/scope/material/integration/decom data consistency needs checking.
  - User asks about iEPMS/fishbone status.
- forbidden_when:
  - The action is used to update iEPMS.
  - The action is used to make final workflow decision without orchestrator judgement.
  - Raw credentials, URLs, or large raw responses are requested.
- decision_boundary: `iepms-fishbone-data-checker` checks and returns facts only. It does not update iEPMS. It does not decide workflow result or `next_step`.
- guardrails:
  - Return compact JSON only.
  - Return compact site facts only for minimum context; never return raw iEPMS payloads.
  - Do not load raw API response into orchestrator context.
  - Do not make final decision.
  - Fishbone cache updates must be represented through approved future contracts; the orchestrator must not write cache records directly.
  - Follow 先查后写，先判后推.

### write_iepms_column

- action_name: `write_iepms_column`
- future_skill_target: `iepms-column-writter`
- purpose: Write approved iEPMS column updates only after orchestrator judgement.
- input_summary: `site_id`, `site_code`, `target_column`, `approved_value`, `judgement_reference`, and reason.
- output_summary: Compact JSON confirmation including success/failure, `target_column`, `approved_value`, timestamp, and error if any.
- allowed_when:
  - Orchestrator judgement is complete.
  - Required evidence is sufficient.
  - Target column and value are explicit.
  - Write action is approved by workflow rule or user/admin instruction.
  - Relevant facts were checked first.
- forbidden_when:
  - Current state/facts were not checked.
  - Evidence is incomplete.
  - User intent is unclear.
  - Target column is missing or ambiguous.
  - The action attempts bulk/unbounded write.
  - The action is used to decide workflow result.
- decision_boundary: `iepms-column-writter` performs approved column write only. It does not make final workflow decision. It does not validate step evidence. It does not replace step skills.
- guardrails:
  - Follow 先查后写.
  - Write only approved target column.
  - No bulk write unless explicitly approved in future scope.
  - Do not claim write success unless `iepms-column-writter` confirms success.

### log_message_event

- action_name: `log_message_event`
- future_skill_target: `firebase-db`
- purpose: Log compact user/AI message metadata or step event after orchestrator judgement or routing.
- input_summary: `relative_path`, `message_id`, `sender`, `site_id`, `step_key`, `event_type`, timestamp, compact message summary, attachment summary, and decision reference.
- output_summary: Compact JSON confirmation including success/failure, `logged_path`, timestamp, and error if any.
- allowed_when:
  - Message/event should be recorded after routing or judgement.
  - The log payload is compact and does not expose unnecessary raw content.
- forbidden_when:
  - Raw WhatsApp history is being stored unnecessarily.
  - Full attachment content is being copied.
  - Firebase URL is hardcoded.
  - PUT or DELETE is requested.
- decision_boundary: `firebase-db` logs compact events only. It does not decide workflow result.
- guardrails:
  - PATCH only through `firebase-db`.
  - Store compact logs.
  - Avoid full WhatsApp history.
  - Align log payload with the message log or step event schemas in `state-model.md`.

### create_async_job

- action_name: `create_async_job`
- future_skill_target: `firebase-db`
- purpose: Create a compact async job record and optional site job index for future slow checks, backend updates, or dashboard synchronization.
- input_summary: `job_id`, `site_id`, `job_type`, `requested_action`, priority, status, `created_by`, `created_at`, and compact payload.
- output_summary: Compact JSON confirmation including success/failure, `job_id`, `job_path`, optional site job index path, timestamp, and error if any.
- allowed_when:
  - Work should be queued instead of blocking immediate reply.
  - Backend check/update is slow or not required before first response.
  - Orchestrator needs to record pending system work.
  - Job type is one of: `state_patch`, `iepms_column_write`, `fishbone_check`, `dashboard_sync`, `domain_review`, or `notification`.
- forbidden_when:
  - The job is used to avoid required current-step judgement.
  - The job payload includes raw API docs or large raw data.
  - Firebase URL is hardcoded.
  - PUT or DELETE is requested.
  - The job would write iEPMS without completed judgement and explicit target column/value.
- decision_boundary: `firebase-db` records job only. It does not execute the job. It does not decide workflow result.
- guardrails:
  - Keep job payload compact.
  - Do not block first reply for slow backend work.
  - Use relative paths only.
  - Align job payload with async job and site job index schemas in `state-model.md`.
  - Follow `job-queue-policy.md` for lifecycle, retry, dependency, priority, and compactness rules.
  - `dashboard_sync` jobs must derive dashboard summary from canonical state and must not replace canonical site state.

## Domain Review Actions

Domain review actions return structured quality judgement only. They do not decide workflow `next_step`, update Firebase, update iEPMS, call raw APIs, or claim final customer/engineering acceptance.

### review_l1_report

- action_name: `review_l1_report`
- future_skill_target: `l1-report-review`
- purpose: Review L1 report and photo evidence for completeness, defects, missing evidence, and risk.
- input_summary: Report/document summary, site context, before/after photo evidence summary, current workflow step, and user request.
- output_summary: Structured domain review result with result, defects, missing_evidence, risk_level, required_action, summary, workflow_recommendation, and internal_notes.
- allowed_when:
  - L1 report, L1 submission, before photo, after photo, or L1 audit evidence needs quality review.
  - Orchestrator needs domain quality judgement before claiming L1 readiness.
- forbidden_when:
  - Raw report/photo content would be stored in orchestrator state.
  - The action is being used to update Firebase or iEPMS directly.
  - The action is being used to decide workflow next step without orchestrator judgement.
- decision_boundary: `l1-report-review` provides quality judgement only. It must not update Firebase or iEPMS. It must not decide workflow `next_step`.
- guardrails:
  - Return structured judgement only.
  - Do not claim customer acceptance.
  - Orchestrator remains final routing and state decision owner.

### review_ehs_report

- action_name: `review_ehs_report`
- future_skill_target: `ehs-review`
- purpose: Review EHS evidence for safety compliance, completeness, and safety risk.
- input_summary: EHS report/checklist summary, safety/PPE evidence summary, site context, current workflow step, and user request.
- output_summary: Structured domain review result with result, defects, missing_evidence, risk_level, required_action, summary, workflow_recommendation, and internal_notes.
- allowed_when:
  - EHS report, checklist, PPE, safety report, or safety evidence needs quality review.
  - Safety compliance cannot be judged from routing alone.
- forbidden_when:
  - The action is used to approve unsafe work without evidence.
  - The action is used to update Firebase or iEPMS directly.
  - Raw safety evidence is being copied into orchestrator state.
- decision_boundary: `ehs-review` provides safety/evidence quality judgement only. It must not decide workflow `next_step`.
- guardrails:
  - Do not approve unsafe work.
  - Escalate or require manual check when safety risk cannot be safely judged.
  - Orchestrator remains final routing and state decision owner.

### review_pac_document

- action_name: `review_pac_document`
- future_skill_target: `pac-review`
- purpose: Review PAC document for acceptance readiness, evidence consistency, and acceptance risk.
- input_summary: PAC document summary, acceptance evidence summary, site/link/scope context, current workflow step, and user request.
- output_summary: Structured domain review result with result, defects, missing_evidence, risk_level, required_action, summary, workflow_recommendation, and internal_notes.
- allowed_when:
  - PAC, acceptance document, acceptance evidence, or provisional acceptance readiness needs quality review.
- forbidden_when:
  - The action is used to claim final customer acceptance.
  - The action is used to update Firebase or iEPMS directly.
  - The action is used to decide workflow `next_step`.
- decision_boundary: `pac-review` provides acceptance-readiness quality judgement only.
- guardrails:
  - Do not claim PAC/customer acceptance.
  - Return structured judgement only.
  - Orchestrator remains final routing and state decision owner.

### review_as_built

- action_name: `review_as_built`
- future_skill_target: `as-built-review`
- purpose: Review as-built documentation for handover readiness, site/scope consistency, and documentation defects.
- input_summary: As-built document summary, installed drawing/equipment evidence summary, site/link/scope context, current workflow step, and user request.
- output_summary: Structured domain review result with result, defects, missing_evidence, risk_level, required_action, summary, workflow_recommendation, and internal_notes.
- allowed_when:
  - As-built, asbuilt, handover document, installed drawing, or installed evidence needs review.
- forbidden_when:
  - The action is used to update systems directly.
  - Raw document content is copied into orchestrator state.
  - The action is used to claim final handover acceptance.
- decision_boundary: `as-built-review` provides documentation quality judgement only.
- guardrails:
  - Do not claim handover acceptance.
  - Return structured judgement only.
  - Orchestrator remains final routing and state decision owner.

### review_tssr

- action_name: `review_tssr`
- future_skill_target: `tssr-review`
- purpose: Review TSSR document for survey completeness, site constraints, and deployment readiness risk.
- input_summary: TSSR/survey summary, site access/constraint evidence summary, site context, current workflow step, and user request.
- output_summary: Structured domain review result with result, defects, missing_evidence, risk_level, required_action, summary, workflow_recommendation, and internal_notes.
- allowed_when:
  - TSSR, site survey, survey report, or survey evidence needs quality review.
- forbidden_when:
  - The action is used to provide final engineering approval.
  - The action is used to update systems directly.
  - The action is used to replace deployment planning judgement.
- decision_boundary: `tssr-review` provides survey quality/readiness judgement only.
- guardrails:
  - Do not claim final deployment approval.
  - Return structured judgement only.
  - Orchestrator remains final routing and state decision owner.

### review_pathloss

- action_name: `review_pathloss`
- future_skill_target: `pathloss-review`
- purpose: Review Pathloss-related evidence for microwave link planning consistency and technical readiness risk.
- input_summary: Pathloss report/file summary, link identity, Site A/Site B context, planning evidence summary, current workflow step, and user request.
- output_summary: Structured domain review result with result, defects, missing_evidence, risk_level, required_action, summary, workflow_recommendation, and internal_notes.
- allowed_when:
  - Pathloss, path loss, MW planning, microwave link planning, or link budget evidence needs quality review.
- forbidden_when:
  - The action is used to run Pathloss software or calculate final RF design.
  - The action is used to claim engineering approval.
  - The action is used to update systems directly.
- decision_boundary: `pathloss-review` provides microwave planning evidence judgement only.
- guardrails:
  - Do not claim engineering approval.
  - Do not calculate final RF design.
  - Return structured judgement only.
  - Orchestrator remains final routing and state decision owner.

## Action Guardrails

- `patch_firebase_state` must only be prepared after `read_firebase_state` or equivalent current-state confirmation.
- `write_iepms_column` must only be prepared after relevant facts are checked and orchestrator judgement is complete.
- System skills must not make final workflow decisions or replace step skills.
- Step skill actions must return judgement before the orchestrator recommends `next_step`.
- Domain review actions must return quality judgement before the orchestrator claims report/document acceptance.
- All system actions must use only approved system skill names: `firebase-db`, `iepms-column-writter`, and `iepms-fishbone-data-checker`.
- Follow 核心原则：先查后写，先判后推。
