# Legacy Step Rules

## Purpose

This file contains compact fallback rules extracted from the old guidebook. It preserves the Step 0-12 workflow intent in summarized form so the orchestrator can use it only when standalone step skills are not available.

This file is not a full legacy prompt copy and must not become the primary workflow engine.

## Loading Policy

- This file is fallback only.
- The orchestrator must not load this file by default.
- Load only when no standalone step skill exists or when routing requires fallback step guidance.
- Do not use this file as the primary workflow engine.
- Load only the current step section needed for the current decision.

## Core Principle

核心原则：先查后写，先判后推。

- Check state, site context, current step, and relevant system facts before any write or update.
- Judge current intent, current step, evidence completeness, missing items, and risk flags before pushing the next step.
- Do not allow fallback rules to claim completion unless required evidence, user confirmation, or responsible system confirmation exists.
- If uncertain, use Pending, Rework, Escalate, or Manual Check Required.

## Legacy Source

Read-only source: `old-file/zte-subcon-guidebook/`

Repository note: in this workspace, the frozen legacy copy is located at `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`.

Do not include full copied legacy prompt content in this file.

## Step 0-12 Compact Rules

### Step 0: Greeting and Minimum Site Context Check

step_id: 0

step_key: greeting_status

category: mandatory

purpose: Greet the user, extract site code/link ID, resolve minimum site/scope/current state context, and prepare for check-in.

required_input: Sender identity and site ID, site code, link ID, or enough context to resolve the site.

completion_condition: Minimum site context is identified, or missing information is requested.

skip_rule: Not skippable.

risk_rule: If the site cannot be identified or current state cannot be checked, do not proceed; return Pending or Manual Check Required.

backend_or_system_dependency: `firebase-db` for session/state lookup; `iepms-fishbone-data-checker` as the default compact site context source when state context is missing.

fallback_decision_rule: Proceed to check-in only after minimum site context is known or explicitly provided; otherwise request missing site/session information.

next_step: check_in_report

### Step 1: Check-in Report

step_id: 1

step_key: check_in_report

category: mandatory

purpose: Generate formal check-in reporting for CelcomDigi NOC and ZTE Safety after Step 0 minimum site context is available.

required_input: Minimum site context, contractor/team/PIC details when available, DPTW/CRQ details when required, and site safety fields such as CCTV/site category when available.

completion_condition: Exactly two draft messages are prepared for CelcomDigi NOC and ZTE Safety, or the user confirms both were already forwarded.

skip_rule: Not skippable.

risk_rule: Do not claim messages were forwarded; the user must manually forward both messages and confirm. Do not generate drafts before confirming the applicable workflow step and available site context.

backend_or_system_dependency: `firebase-db` for current state; optional `iepms-fishbone-data-checker` for site context if available.

fallback_decision_rule: Proceed only after required check-in details are present and either two drafts are prepared for manual forwarding or user confirms forwarding; otherwise return Pending.

next_step: dptw_login

### Step 2: DPTW Login

step_id: 2

step_key: dptw_login

category: mandatory

purpose: Confirm CDPTW/DPTW login before site work proceeds.

required_input: DPTW/CDPTW login confirmation or evidence.

completion_condition: DPTW login is confirmed by user evidence, user confirmation, or future step judgement.

skip_rule: Not skippable.

risk_rule: If DPTW is missing, failed, or uncertain, keep Pending or Blocked and do not proceed to EHS; unresolved permit risk may require Escalate.

backend_or_system_dependency: Future `step-dptw`; optional current-state check through `firebase-db`.

fallback_decision_rule: Proceed only when DPTW login is confirmed. If user reports technical issues, request resolution or escalation to the responsible team before advancement.

next_step: ehs_login

### Step 3: EHS Login

step_id: 3

step_key: ehs_login

category: conditional but safety-critical

purpose: Complete or verify safety/EHS requirement for the work cycle.

required_input: EHS login/check evidence, safety-photo submission confirmation, system completion, or valid not-applicable reason.

completion_condition: EHS check is completed, already confirmed by system facts, or marked Not Applicable/Skipped with a clear reason and risk note when needed.

skip_rule: May be skipped only when already completed, not applicable with reason, or system verification is unavailable and manual follow-up is recorded.

risk_rule: Safety uncertainty requires Manual Check Required or Escalate. Do not claim EHS completion when only an unverified or ambiguous response exists.

backend_or_system_dependency: Future `step-ehs`; `iepms-fishbone-data-checker` for EHS task status when available; future `ehs-review` if report evidence is attached.

fallback_decision_rule: Proceed when EHS is confirmed, clearly not applicable, or risk-tagged for manual follow-up after reasonable check. Use Pending/Rework if evidence is missing or incorrect.

next_step: material_scan

### Step 4: Material Scan

step_id: 4

step_key: material_scan

category: conditional

purpose: Confirm MOS/material scan or material readiness for required scope.

required_input: Material scan confirmation, MOS reference, material readiness evidence, or scope reason for not applicable.

completion_condition: Material readiness is confirmed, already shown in system facts, or conditionally skipped with a reason and risk note.

skip_rule: Skip only when scope does not require material scan, material is already confirmed, or system access is unavailable and risk is recorded.

risk_rule: Missing material for required scope should return Pending or Rework. Do not silently advance if material readiness is unknown.

backend_or_system_dependency: `iepms-fishbone-data-checker` for material/MOS status; future `step-material-scan`; `iepms-column-writter` only for approved iEPMS column updates after orchestrator judgement.

fallback_decision_rule: Proceed when material readiness is confirmed or a valid skip/not-applicable reason is judged. If required material evidence is missing, return Pending or Rework.

next_step: l1_before_photo

### Step 5: L1 Before Photo

step_id: 5

step_key: l1_before_photo

category: critical

purpose: Capture before-work evidence before installation starts.

required_input: Before photos, upload confirmation, or confirmation that required before evidence is captured.

completion_condition: Required before photos are available or missing items/risk are identified.

skip_rule: No silent skip. Manual approval is required to move forward without critical before evidence.

risk_rule: Do not proceed to installation if critical before evidence is missing unless manually approved or risk is explicitly recorded. Work already started without before photos is a quality risk.

backend_or_system_dependency: Future `step-l1-before-photo`; future `l1-report-review` if evidence quality review is needed.

fallback_decision_rule: Proceed only when before evidence is confirmed or manual approval/risk handling is recorded. Missing or poor evidence should return Pending, Rework, or Manual Check Required.

next_step: installation

### Step 6: Installation

step_id: 6

step_key: installation

category: optional / long-running

purpose: Track physical installation progress, partial completion, blockers, and safety-impacting issues.

required_input: Installation status, scope progress, completion confirmation, issue details, or risk update.

completion_condition: Installation is completed, partially completed, postponed, or blocked with reason.

skip_rule: May be skipped or postponed when installation is not required, already done, or not ready; reason should be recorded.

risk_rule: Unresolved physical/site blocker must be Escalate or Blocked when it affects safety, access, customer service, or future workflow decisions.

backend_or_system_dependency: `firebase-db` for state update after state check; `iepms-column-writter` only for approved iEPMS column update after orchestrator judgement.

fallback_decision_rule: Proceed when status is clear and risks are recorded. If the user reports a blocker, do not claim completion; return Blocked, Escalate, or Pending according to severity.

next_step: integration

### Step 7: Integration

step_id: 7

step_key: integration

category: optional / long-running

purpose: Track commissioning, integration, connectivity, or NMS visibility readiness.

required_input: Integration status, commissioning result, NMS visibility confirmation, technical blocker, or postponement reason.

completion_condition: Integration is completed, postponed, not applicable, or blocked with reason.

skip_rule: May be skipped or postponed when not applicable, already done, delayed by network dependency, or planned for later.

risk_rule: Failed commissioning or missing NMS visibility should not proceed silently; record risk or blocker and use Manual Check Required when technical status is unclear.

backend_or_system_dependency: `iepms-fishbone-data-checker` for data consistency when available; `iepms-column-writter` only for approved iEPMS updates after orchestrator judgement.

fallback_decision_rule: Proceed when integration status is known and any blocker is recorded. Use Pending/Blocked/Escalate if commissioning or NMS visibility affects site completion or customer impact.

next_step: alarm_check

### Step 8: Alarm Check

step_id: 8

step_key: alarm_check

category: critical

purpose: Confirm no blocking alarm before leaving site and verify new work did not impact existing equipment.

required_input: Alarm status, NMS screenshot, alarm-free confirmation, or active alarm details.

completion_condition: No blocking alarm is confirmed or alarm risk is identified and routed for resolution/escalation.

skip_rule: Not skippable; if verification cannot be completed, record risk and require follow-up.

risk_rule: Active blocking alarm requires Rework, Escalate, Manual Check Required, or Blocked. Do not allow silent progress to check-out with unresolved alarm risk.

backend_or_system_dependency: Future `step-alarm-check`; optional compact system fact through `iepms-fishbone-data-checker` when available.

fallback_decision_rule: Proceed only when alarm-free status is confirmed or risk is explicitly judged and escalated. If alarm status is unclear, return Manual Check Required or Pending.

next_step: l1_submission

### Step 9: L1 Submission with After Photo

step_id: 9

step_key: l1_submission

category: optional but important

purpose: Submit or confirm after-work photos and L1 report evidence for quality acceptance.

required_input: After photos, L1 submission status, report evidence, upload confirmation, or reason for later submission.

completion_condition: L1/after photo submission is confirmed, already shown in system facts, deferred with tracking, or missing items are listed.

skip_rule: May be postponed when L1 submission will be completed later, but pending status and reminder must be recorded.

risk_rule: Do not claim L1 accepted unless confirmed by responsible review/system. Quality defects require Rework; missing submission remains Pending after check-out.

backend_or_system_dependency: Future `step-l1-submission`; future `l1-report-review`; `iepms-fishbone-data-checker` for L1 task status when available.

fallback_decision_rule: Proceed when submission is confirmed or explicitly deferred with risk tracking. If acceptance is requested, require responsible review/system confirmation before Completed.

next_step: decom_check

### Step 10: Decommissioning Check

step_id: 10

step_key: decom_check

category: conditional

purpose: Confirm decommissioning requirement only when SOW/scope requires it, and track decom completion or deferral.

required_input: Project scope/SOW, decom status, dismantling confirmation, packing/labeling status, or not-applicable reason.

completion_condition: Decom is completed, Not Applicable, or Pending/Blocked with reason.

skip_rule: Skip only if scope clearly does not require decom. If scope requires decom, postponement must be recorded as Pending, Blocked, or risk.

risk_rule: Required decom not done should return Pending or Rework. Incomplete packing/labeling or required removal left undone is a follow-up risk.

backend_or_system_dependency: `iepms-fishbone-data-checker` for scope/data consistency if available.

fallback_decision_rule: Proceed when scope confirms decom is not required or decom status is judged. If required decom is incomplete, record risk and do not claim completion.

next_step: housekeeping

### Step 11: Housekeeping

step_id: 11

step_key: housekeeping

category: critical

purpose: Confirm site cleanup, restoration, safe leaving condition, and removal of debris/tools/personal items.

required_input: Housekeeping confirmation, cleanup photos, or obstacle preventing cleanup.

completion_condition: Housekeeping is completed or missing items/risk are identified.

skip_rule: Not skippable. If user cannot complete it, risk must be recorded and escalation/manual follow-up may be required.

risk_rule: Unsafe, unclean, or unrestored site condition requires Rework or Escalate. Do not silently advance to check-out without housekeeping judgement.

backend_or_system_dependency: Future `step-housekeeping`; `firebase-db` for state update after state check.

fallback_decision_rule: Proceed only when housekeeping completion is confirmed or unresolved cleanup risk is explicitly judged. Use Rework/Escalate for unsafe or unacceptable site condition.

next_step: check_out_report

### Step 12: Check-out Report

step_id: 12

step_key: check_out_report

category: mandatory

purpose: Close site activity with progress summary, risk summary, and formal check-out reporting for CelcomDigi NOC and ZTE Safety.

required_input: Final progress, pending items, risk flags, check-out status, time-out context, and required report fields.

completion_condition: Exactly two check-out message drafts are prepared for CelcomDigi NOC and ZTE Safety, or the user confirms both were already forwarded.

skip_rule: Not skippable.

risk_rule: Do not claim forwarded; the user must manually forward both messages. Do not close session if critical blockers remain unresolved unless escalated or manually accepted by the responsible party.

backend_or_system_dependency: `firebase-db` for state/session closure after current state check; `iepms-column-writter` only for approved iEPMS updates after orchestrator judgement.

fallback_decision_rule: Proceed to session closure only after progress/risk judgement and message-forwarding confirmation. If critical risks remain, return Escalate, Manual Check Required, or Blocked.

next_step: session_closed

## Fallback Result Rules

- Proceed: Use only when required input and completion condition are satisfied, current state/context has been checked, and the current step has been judged.
- Pending: Use when information, evidence, state, site context, or system facts are missing.
- Rework: Use when submitted evidence is incorrect, insufficient, unsafe, or fails expected quality/workflow criteria.
- Escalate: Use when safety, access, permit, alarm, customer-impacting, or unresolved site risk exists.
- Manual Check Required: Use when AI cannot safely judge from the available state, evidence, or system facts.
- Blocked: Use when the workflow cannot continue because a dependency, permit, access issue, physical blocker, or critical alarm is unresolved.
- Completed: Use only when the closure condition is clearly met through required evidence, user confirmation, responsible review, or responsible system confirmation.
- Skipped: Use only when a valid skip rule is satisfied and the reason is recorded.
- Not Applicable: Use only when scope confirms the step is not required.

## System Dependency Guardrails

- `firebase-db` handles Firebase GET/PATCH only.
- `iepms-fishbone-data-checker` checks iEPMS fishbone/data consistency and returns compact JSON.
- `iepms-column-writter` writes approved iEPMS column updates only after orchestrator judgement.
- System tools provide data access or approved write operations only.
- System tools do not make final workflow decisions.
- The orchestrator uses system outputs to decide route and next action.
- No Firebase URL.
- No PUT.
- No DELETE.
