# Scenario 12 — State Patch Guardrail

## Objective

Verify a non-empty `state_patch` is only intended after current state is checked and current step judgement permits progression.

## Input Message

```text
DPTW completed for SITE-100. Screenshot confirms valid login.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000012",
  "current_step": "dptw_login",
  "current_step_id": 2,
  "known_context": {
    "dptw_evidence": "valid_login_screenshot",
    "step_result": "Proceed"
  },
  "known_risks": []
}
```

## Expected Routing

- route_to: `step-dptw`
- action: `call_step_dptw`
- target_skill: `step-dptw`

## Expected Decision or Result

- decision/result: `Proceed`
- next_step: `ehs_login`
- required_action: Prepare intended state patch only after DPTW judgement.
- whatsapp_message behavior: Confirm DPTW readiness and indicate next step without claiming state write success.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current DPTW step before preparing state patch.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "dptw_login"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "patch_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Patch approved DPTW step completion after judgement.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "state_patch": {
        "current_step": "ehs_login",
        "current_step_id": 3,
        "steps.dptw_login.result": "Proceed"
      }
    },
    "requires_confirmation": true,
    "blocking": false
  },
  {
    "action_name": "log_message_event",
    "target_skill": "firebase-db",
    "reason": "Record compact DPTW completion event.",
    "relative_path": "siteNavigator/sites/SITE-100/stepEvents/{event_id}",
    "input_summary": {
      "step_key": "dptw_login",
      "event_type": "step_result",
      "result": "Proceed"
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
  "intent": "dptw_evidence",
  "decision": "Proceed",
  "route_to": "step-dptw",
  "required_action": "Prepare intended state patch and move to EHS after confirmation.",
  "missing_items": [],
  "risk_flags": [],
  "next_step": "ehs_login",
  "system_actions": ["read_firebase_state", "patch_firebase_state", "log_message_event"],
  "state_patch": {
    "current_step": "ehs_login",
    "current_step_id": 3,
    "steps.dptw_login.result": "Proceed"
  },
  "whatsapp_message": "DPTW evidence is sufficient. Next step is EHS check after state update confirmation.",
  "internal_notes": "Patch is intended only; success depends on firebase-db confirmation."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify `read_firebase_state` precedes `patch_firebase_state`.
- Verify `state_patch` is non-empty only after DPTW result is `Proceed`.
- Verify `next_step` is allowed by `Proceed`.
- Verify patch success is not claimed before confirmation.

## Acceptance Criteria

- [ ] State read occurs before patch intent.
- [ ] Step judgement is complete before `next_step`.
- [ ] `state_patch` uses approved workflow fields only.
- [ ] `patch_firebase_state` target is `firebase-db`.
