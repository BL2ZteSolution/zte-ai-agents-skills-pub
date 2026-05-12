# Routing Rules

## Routing Decision Rules

The orchestrator must:
- Identify sender, session, and site before deciding workflow progress.
- Determine user intent from the latest message and available compact context.
- Determine the current workflow step from state, step evidence, or user-provided site/session facts.
- Decide whether to answer directly, route to a standalone step skill, route to an approved system skill action, route to a domain review skill, or ask for missing information.
- Route arrival messages through Step 0 `greeting_status` first unless minimum site context is already available.
- Route DPTW-related input to `step-dptw`.
- Route check-in input to `step-check-in` only after minimum site context is available.
- Route alarm-related input to `step-alarm-check`.
- Route check-out input to `step-check-out`.
- Route L1, EHS, and PAC report review requests to domain review skills.
- Route Firebase, iEPMS, and fishbone data needs through `action-registry.md` only.

## Main Decision Sequence

1. Check current session, sender, site, and state.
2. Identify user intent.
3. Determine current workflow step.
4. Judge whether required evidence is complete.
5. Identify missing items and risk flags.
6. Decide route target.
7. Generate required action.
8. Only then recommend next step or prepare state_patch.

Core rule: 先查后写，先判后推。

## Routing Guardrails

- If current state is unavailable, route to `read_firebase_state` or request missing site/session information.
- If current step cannot be determined, do not push workflow forward.
- If required evidence is missing, return Pending or Rework.
- If risk is safety-critical, return Escalate or Manual Check Required.
- Do not prepare state_patch before state is checked.
- Do not route to next step before current step decision is made.
- Do not claim completion, update, or submission unless confirmed by the responsible future skill.
- Do not route to outdated or unapproved system tool names.
- Do not use raw Firebase, iEPMS, or TIPIC APIs.
- Do not let system skills decide `decision` or `next_step`.
- Do not prepare `write_iepms_column` before judgement.

## Route Targets

| Input / Intent | Route Target | Required Result Before Next Step |
|---|---|---|
| Greeting, site status, unclear message | `orchestrator`, `read_firebase_state`, or `check_iepms_fishbone_data` | Sender/site/session/minimum site context resolved or missing items returned |
| Arrival with site code/link ID | `greeting_status` via orchestrator | Minimum site context checked before Step 1 |
| Check-in report with minimum site context already available | `step-check-in` via `call_step_check_in` | Check-in judgement and message draft readiness |
| DPTW/CDPTW login | `step-dptw` via `call_step_dptw` | DPTW judgement |
| EHS login or safety check | `step-ehs` via `call_step_ehs` | EHS judgement |
| Material scan or MOS | `step-material-scan` via `call_step_material_scan` | Material judgement |
| Before photo | `step-l1-before-photo` via `call_step_l1_before_photo` | Before-photo evidence judgement |
| Installation progress | `step-installation` via `call_step_installation` | Installation status judgement |
| Integration/commissioning | `step-integration` via `call_step_integration` | Integration status judgement |
| Alarm check | `step-alarm-check` via `call_step_alarm_check` | Alarm judgement and escalation if needed |
| L1 submission / after photo | `step-l1-submission` via `call_step_l1_submission` or `l1-report-review` via `review_l1_report` | Submission or quality judgement |
| Decommissioning | `step-decom` via `call_step_decom` | Decom judgement or not-applicable result |
| Housekeeping | `step-housekeeping` via `call_step_housekeeping` | Housekeeping judgement |
| Check-out report | `step-check-out` via `call_step_check_out` | Checkout judgement and message draft readiness |
| Firebase data | `firebase-db` via action registry | Compact data result |
| iEPMS/fishbone data | `iepms-fishbone-data-checker` via action registry | Compact system fact result |
| Approved iEPMS column update | `iepms-column-writter` via action registry | Completed orchestrator judgement and explicit write target |
| PAC/EHS/L1/as-built/TSSR/pathloss review | Specific domain review skill via action registry | Quality judgement |

## System Data Routing Rules

### Firebase State Lookup

If user message requires current site/session/workflow state, route system action:
- `read_firebase_state`

Target:
- `firebase-db`

### Firebase State Patch

If orchestrator judgement is complete and state update is needed, prepare:
- `patch_firebase_state`

Target:
- `firebase-db`

### iEPMS/Fishbone Data Check

If user message requires site/scope/material/integration/decom data consistency, route system action:
- `check_iepms_fishbone_data`

Target:
- `iepms-fishbone-data-checker`

For Step 0 `greeting_status`, `check_iepms_fishbone_data` is the default source for minimum site context when the user provides a site code/link ID and compact site facts are not already available.

### iEPMS Column Write

If user/admin explicitly requires approved column update and judgement is complete, prepare:
- `write_iepms_column`

Target:
- `iepms-column-writter`

### Message/Event Logging

If decision or message should be recorded, prepare:
- `log_message_event`

Target:
- `firebase-db`

### Async Job Creation

If slow backend work is needed but should not block immediate response, prepare:
- `create_async_job`

Target:
- `firebase-db`

### System Routing Guardrails

- Do not route to outdated tool names.
- Do not use raw Firebase, iEPMS, or TIPIC APIs.
- Do not let system skills decide `decision` or `next_step`.
- Do not prepare `write_iepms_column` before judgement.
- Do not prepare `patch_firebase_state` before state check.
- Route Firebase, iEPMS, and fishbone needs through `action-registry.md` only.
- Follow 核心原则：先查后写，先判后推.

## Fallback Rule

If no standalone step skill exists yet, use `legacy-step-rules.md` only as fallback. The fallback file is not loaded by default and must not be treated as full legacy extraction.

## DPTW/CDPTW Routing Rule

If the user message mentions any of these DPTW-related signals, route to `step-dptw` with action `call_step_dptw`:
- DPTW
- CDPTW
- permit login
- login permit
- work permit
- site permit
- DPTW screenshot
- permit screenshot
- DPTW done
- CDPTW done
- cannot login DPTW
- DPTW failed

Routing boundary:
- The orchestrator routes DPTW-related judgement to `step-dptw`.
- The orchestrator must not perform detailed DPTW evidence judgement itself when `step-dptw` exists.
- The orchestrator must pass current site state, current workflow step, user message, DPTW evidence summary, and available risk context to `step-dptw` when available.
- The orchestrator may recommend `ehs_login` only after `step-dptw` returns a result that allows progression.

## Check-in Routing Rule

If the user message mentions any of these check-in signals and minimum site context is already available, route to `step-check-in` with action `call_step_check_in`:
- check in
- check-in
- arrival report
- start work
- NOC check-in
- safety check-in

If the message is an arrival greeting, apply the Arrival Greeting Rule first.

## Arrival Greeting Rule

If the user says they arrived, reached, or are at site with a site code/link ID, route first to Step 0 `greeting_status`, not directly to `step-check-in`.

Arrival trigger examples:
- arrived site SITE-100
- I have arrived site SITE-100
- reached site SITE-100
- I reached site SITE-100
- at site SITE-100
- site team arrived SITE-100

Step 0 required action:
- Extract the site code/link ID from the message.
- Check existing state for compact site context.
- If minimum context is missing, request `check_iepms_fishbone_data` from `iepms-fishbone-data-checker`.
- Use compact fishbone facts only; do not store or expose raw iEPMS response.

Proceed to `check_in_report` only when minimum site context is available. If site code/link ID is missing or fishbone facts cannot resolve the site, remain in `greeting_status` and ask for the missing information.

## Alarm Check Routing Rule

If the user message mentions any of these alarm signals, route to `step-alarm-check` with action `call_step_alarm_check`:
- alarm
- active alarm
- blocking alarm
- no alarm
- NMS
- NMS visible
- alarm screenshot
- critical alarm
- service alarm
- integration alarm

## Check-out Routing Rule

If the user message mentions any of these check-out signals, route to `step-check-out` with action `call_step_check_out`:
- check out
- check-out
- leaving site
- close site
- work completed
- finish work
- site done
- check-out report
- end work
- checkout

## Remaining Step Routing Rules

### EHS Routing

If the user message mentions EHS, safety check, safety login, PPE, hazard, or unsafe:
- route_to: `step-ehs`
- action: `call_step_ehs`

### Material Scan Routing

If the user message mentions material scan, MOS, material, material ready, material missing, or scan material:
- route_to: `step-material-scan`
- action: `call_step_material_scan`

### L1 Before Photo Routing

If the user message mentions before photo, before work photo, L1 before, pre photo, or before evidence:
- route_to: `step-l1-before-photo`
- action: `call_step_l1_before_photo`

### Installation Routing

If the user message mentions installation, installed, install done, physical work, mounting, or equipment installed:
- route_to: `step-installation`
- action: `call_step_installation`

### Integration Routing

If the user message mentions integration, commissioning, integrated, NMS visible, NMS not visible, or commissioning failed:
- route_to: `step-integration`
- action: `call_step_integration`

### L1 Submission Routing

If the user message mentions L1 submission, submit L1, after photo, after work photo, L1 submitted, or L1 report submitted:
- route_to: `step-l1-submission`
- action: `call_step_l1_submission`

### Decom Routing

If the user message mentions decom, decommission, dismantle, dismantling, remove old equipment, or decom not required:
- route_to: `step-decom`
- action: `call_step_decom`

### Housekeeping Routing

If the user message mentions housekeeping, clean site, site cleanup, restore site, leftover material, or safe to leave:
- route_to: `step-housekeeping`
- action: `call_step_housekeeping`

## Standalone Step Routing Boundary

- The orchestrator routes detailed step judgement to the standalone step skill when the relevant step skill exists.
- The orchestrator must not perform detailed evidence judgement itself for check-in, DPTW, EHS, material scan, L1 before photo, installation, integration, alarm check, L1 submission, decom, housekeeping, or check-out when the standalone step skill exists.
- The orchestrator may recommend the next workflow step only after the relevant standalone step skill returns a result that allows progression.
- Step skills are loaded on demand only.

## Domain Review Routing Rules

Domain review skills are loaded only on demand when document, report, photo, survey, acceptance, handover, or planning evidence needs deep quality review. Domain review result supports orchestrator judgement but does not directly update state or decide `next_step`.

### L1 Report Review

If the message mentions L1 report, L1 submission, before photo, after photo, L1 evidence, or L1 audit:
- route_to: `l1-report-review`
- action: `review_l1_report`

### EHS Review

If the message mentions EHS report, EHS checklist, safety report, PPE evidence, or safety evidence:
- route_to: `ehs-review`
- action: `review_ehs_report`

### PAC Review

If the message mentions PAC, acceptance document, acceptance evidence, or provisional acceptance:
- route_to: `pac-review`
- action: `review_pac_document`

### As-Built Review

If the message mentions as built, as-built, asbuilt, handover document, or installed drawing:
- route_to: `as-built-review`
- action: `review_as_built`

### TSSR Review

If the message mentions TSSR, site survey, survey report, or survey evidence:
- route_to: `tssr-review`
- action: `review_tssr`

### Pathloss Review

If the message mentions Pathloss, path loss, MW planning, microwave link planning, or link budget:
- route_to: `pathloss-review`
- action: `review_pathloss`

### Domain Review Boundary

- Orchestrator routes to a domain review skill only when document/report/evidence review is needed.
- Orchestrator must not perform deep review itself.
- Domain review result is advisory to orchestrator workflow judgement.
- Domain skills must not update Firebase or iEPMS directly.
- Domain skills must not decide workflow `next_step`.
