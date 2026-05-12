# Scenario 03 — Missing DPTW

## Objective

Verify mandatory DPTW evidence missing or incomplete routes to `step-dptw` and blocks progression to EHS.

## Input Message

```text
DPTW not completed yet for SITE-100.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000003",
  "current_step": "dptw_login",
  "current_step_id": 2,
  "known_context": {
    "site_code": "SITE-100"
  },
  "known_risks": []
}
```

## Expected Routing

- route_to: `step-dptw`
- action: `call_step_dptw`
- target_skill: `step-dptw`

## Expected Decision or Result

- decision/result: `Blocked`
- next_step: ``
- required_action: Complete DPTW login or provide valid DPTW evidence before continuing.
- whatsapp_message behavior: Tell the user DPTW is required before moving forward.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current step before applying mandatory DPTW blocking rule.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "dptw_login"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "log_message_event",
    "target_skill": "firebase-db",
    "reason": "Record compact DPTW blocker event.",
    "relative_path": "siteNavigator/sites/SITE-100/stepEvents/{event_id}",
    "input_summary": {
      "step_key": "dptw_login",
      "event_type": "step_result",
      "result": "Blocked"
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
  "current_step": "dptw_login",
  "current_step_id": 2,
  "intent": "dptw_status",
  "decision": "Blocked",
  "route_to": "step-dptw",
  "required_action": "Complete DPTW login or provide valid evidence.",
  "missing_items": ["valid_dptw_evidence"],
  "risk_flags": ["dptw_missing"],
  "next_step": "",
  "system_actions": ["read_firebase_state", "log_message_event"],
  "state_patch": {},
  "whatsapp_message": "DPTW is required before the workflow can continue. Please complete it or send valid evidence.",
  "internal_notes": "No progression to ehs_login."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify mandatory DPTW is judged before any next step.
- Verify `next_step` is empty because the result is `Blocked`.
- Verify no exception or skip is implied.

## Acceptance Criteria

- [ ] Route is `step-dptw`.
- [ ] Result is `Blocked`.
- [ ] No progression to `ehs_login`.
- [ ] Event logging is compact and uses `firebase-db`.
