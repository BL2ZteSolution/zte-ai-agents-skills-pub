# Output Format

## Default Orchestrator Output JSON

```json
{
  "site_id": "",
  "current_step": "",
  "current_step_id": 0,
  "intent": "",
  "decision": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "route_to": "",
  "required_action": "",
  "missing_items": [],
  "risk_flags": [],
  "next_step": "",
  "system_actions": [],
  "state_patch": {},
  "whatsapp_message": "",
  "internal_notes": ""
}
```

## Rules

- WhatsApp message must be short and actionable.
- Do not expose `internal_notes` to subcontractor unless needed.
- Do not output long explanation unless user asks.
- If generating check-in or check-out, prepare exactly two message drafts:
  1. CelcomDigi NOC
  2. ZTE Safety
- User must manually forward the generated NOC/Safety messages.
- Never claim system update is completed unless actual future system skill confirms it.

## System Actions Item Format

Each item in `system_actions` must use this compact shape:

```json
{
  "action_name": "",
  "target_skill": "",
  "reason": "",
  "relative_path": "",
  "input_summary": {},
  "requires_confirmation": true,
  "blocking": false
}
```

Allowed system action names:
- `read_firebase_state`
- `patch_firebase_state`
- `check_iepms_fishbone_data`
- `write_iepms_column`
- `log_message_event`
- `create_async_job`

Allowed system targets:
- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## State Patch Guardrail

Follow 核心原则：先查后写，先判后推。

Before outputting a non-empty `state_patch`:
- Current site/session/state must be checked or explicitly provided.
- Current intent must be judged.
- Current workflow step must be identified.
- Required evidence, missing items, and risk flags must be evaluated.
- The `state_patch` must only describe the intended patch.
- Do not claim the patch has been written unless `patch_firebase_state` confirms success.
- `state_patch` must align with approved fields in `state-model.md`.
- Do not include raw API response, full WhatsApp history, raw attachment content, credentials, backend URLs, or unrelated project data.

## System Action Guardrail

- `read_firebase_state` can be blocking if state is required before judgement.
- `check_iepms_fishbone_data` can be blocking if facts are required before judgement.
- `patch_firebase_state` requires prior state check and completed judgement.
- `write_iepms_column` requires prior state/fact check and completed judgement.
- `log_message_event` should be compact.
- `create_async_job` should be used for slow non-blocking backend work.
- For `create_async_job`, `input_summary` should include `job_type`, `priority`, compact payload summary, judgement reference, and intended `target_skill`.
- Do not include raw credentials, raw API response, or large payload.
- System skills must not make final workflow decisions or replace step skills.
- Firebase-related system actions should include a relative path when the target record is known.
- Dashboard sync, deferred write, and risk-related jobs must follow `job-queue-policy.md`, `dashboard-model.md`, and `risk-management-policy.md` when applicable.

## Next-Step Guardrail

Before outputting `next_step`:
- Current step decision must be completed.
- `decision` must justify the transition.
- If `decision` is Pending, Rework, Escalate, Manual Check Required, or Blocked, `next_step` must either remain empty or describe the blocked target only.
- Do not push the user forward without a valid Proceed, Completed, Skipped, or Not Applicable decision.

## Step Skill Output Compatibility

Standalone step skills return compact judgement that is compatible with the orchestrator decision fields:

```json
{
  "step": "",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "",
  "next_step": "",
  "whatsapp_message": "",
  "internal_notes": ""
}
```

Step-specific additions such as `message_drafts` or `session_closure_recommendation` are allowed only for the step skill that owns that output contract. Step skill output supports orchestrator judgement; it does not directly write state.

## Domain Review Output Contract

Domain review skills use a separate review status contract:

```json
{
  "review_type": "",
  "result": "Pass | Conditional Pass | Pending | Reject | Manual Check Required",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "low | medium | high | critical",
  "required_action": "",
  "summary": "",
  "workflow_recommendation": "",
  "internal_notes": ""
}
```

Domain review output is advisory to orchestrator judgement. It must not be treated as direct workflow advancement, state patch confirmation, Firebase update, iEPMS update, or customer acceptance.
