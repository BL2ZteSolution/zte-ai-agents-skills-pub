# Scenario 05 — Check-out With Pending Risk

## Objective

Verify check-out cannot close the session when unresolved risk or pending evidence remains.

## Input Message

```text
We want to check out now but housekeeping photo is unclear and alarm still needs admin confirmation.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000005",
  "current_step": "check_out_report",
  "current_step_id": 12,
  "known_context": {
    "housekeeping_status": "unclear",
    "alarm_status": "pending_admin_confirmation"
  },
  "known_risks": ["pending_alarm_confirmation", "unclear_housekeeping_evidence"]
}
```

## Expected Routing

- route_to: `step-check-out`
- action: `call_step_check_out`
- target_skill: `step-check-out`

## Expected Decision or Result

- decision/result: `Escalate`
- next_step: ``
- required_action: Resolve alarm confirmation and housekeeping evidence before preparing final closure.
- whatsapp_message behavior: Ask for missing confirmation/evidence; do not produce closure claim.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm final step, risk summary, alarm, and housekeeping state before check-out judgement.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "check_out_report"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "log_message_event",
    "target_skill": "firebase-db",
    "reason": "Record unresolved check-out risk summary.",
    "relative_path": "siteNavigator/sites/SITE-100/stepEvents/{event_id}",
    "input_summary": {
      "step_key": "check_out_report",
      "event_type": "step_result",
      "result": "Escalate"
    },
    "requires_confirmation": false,
    "blocking": false
  }
]
```

## Expected Output Contract

```json
{
  "site_id": "SITE-100",
  "current_step": "check_out_report",
  "current_step_id": 12,
  "intent": "check_out",
  "decision": "Escalate",
  "route_to": "step-check-out",
  "required_action": "Resolve alarm confirmation and housekeeping evidence before check-out.",
  "missing_items": ["clear_housekeeping_evidence", "alarm_admin_confirmation"],
  "risk_flags": ["pending_alarm_confirmation", "unclear_housekeeping_evidence"],
  "next_step": "",
  "system_actions": ["read_firebase_state", "log_message_event"],
  "state_patch": {},
  "whatsapp_message": "Check-out is not ready. Please provide clear housekeeping evidence and alarm/admin confirmation first.",
  "internal_notes": "Do not close session or claim check-out completion."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify unresolved risk prevents session closure.
- Verify check-out drafts are not treated as forwarded messages.
- Verify `next_step` does not become `session_closed`.

## Acceptance Criteria

- [ ] Route is `step-check-out`.
- [ ] Result is `Escalate`.
- [ ] Session closure is not recommended.
- [ ] No state_patch claims closure.
