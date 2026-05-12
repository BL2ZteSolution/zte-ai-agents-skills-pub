# Scenario 02 — Missing Site Context

## Objective

Verify a status request without usable site/session context stays with the orchestrator, asks for missing context, and does not advance the workflow.

## Input Message

```text
What is the current status?
```

## Assumed State

```json
{
  "site_id": "",
  "sender": "+60120000002",
  "current_step": "",
  "current_step_id": 0,
  "known_context": {},
  "known_risks": []
}
```

## Expected Routing

- route_to: `orchestrator`
- action: `read_firebase_state`
- target_skill: `firebase-db`

## Expected Decision or Result

- decision/result: `Pending`
- next_step: ``
- required_action: Ask for site code, link ID, or session context.
- whatsapp_message behavior: Short request for missing site/session information.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Try to resolve active session by sender before asking for site context.",
    "relative_path": "siteNavigator/sessionsBySender/+60120000002",
    "input_summary": {
      "sender": "+60120000002"
    },
    "requires_confirmation": true,
    "blocking": true
  }
]
```

## Expected Output Contract

```json
{
  "site_id": "",
  "current_step": "",
  "current_step_id": 0,
  "intent": "site_status_request",
  "decision": "Pending",
  "route_to": "orchestrator",
  "required_action": "Request site code or link ID.",
  "missing_items": ["site_id_or_link_id", "current_session_context"],
  "risk_flags": [],
  "next_step": "",
  "system_actions": ["read_firebase_state"],
  "state_patch": {},
  "whatsapp_message": "Received. Please provide site code or link ID so I can check the workflow status.",
  "internal_notes": "Do not push workflow without resolved site context."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify status is checked by sender before asking for more information when possible.
- Verify no `state_patch` is prepared.
- Verify `next_step` is empty because context is missing.
- Verify no step skill is loaded before the current site/session is known.

## Acceptance Criteria

- [ ] Decision is `Pending`.
- [ ] No workflow advancement occurs.
- [ ] Missing context is explicit.
- [ ] Only `firebase-db` is used for state lookup.
