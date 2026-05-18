# Scenario 01 — Normal Flow

## Objective

Verify a normal arrival/check-in message starts at Step 0 `greeting_status`, checks minimum site context, then routes to `step-check-in` only after context is resolved.

## Input Message

```text
Arrived at site SITE-100 link LNK-100. Please prepare check-in.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000001",
  "current_step": "greeting_status",
  "current_step_id": 0,
  "known_context": {
    "site_code": "SITE-100",
    "link_id": "LNK-100",
    "role": "subcon",
    "minimum_arrival_context": {
      "arrival_time": "message_time",
      "team_or_subcon_pic": "+60120000001",
      "access_or_safety_issue_status": "no_issue_reported"
    }
  },
  "known_risks": []
}
```

## Expected Routing

- initial_route_to: `step-greeting-status`
- initial_action: `call_step_greeting_status`
- system_context_action: `check_iepms_fishbone_data` when minimum site context is not already available
- follow_up_route_to: `step-check-in`
- follow_up_action: `call_step_check_in`
- follow_up_target_skill: `step-check-in`

## Expected Decision or Result

- decision/result: `Proceed`
- next_step: `check_in_report`
- required_action: Route Step 0 to `step-greeting-status`; Step 1 check-in drafts are prepared only after Step 0 allows handoff.
- whatsapp_message behavior: Short actionable response; must not claim check-in drafts were forwarded.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current session and workflow step before greeting status judgement.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "sender": "+60120000001"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "check_iepms_fishbone_data",
    "target_skill": "iepms-fishbone-data-checker",
    "reason": "Return compact minimum site context before check-in routing.",
    "relative_path": "",
    "input_summary": {
      "site_code": "SITE-100",
      "link_id": "LNK-100"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "log_message_event",
    "target_skill": "firebase-db",
    "reason": "Record compact greeting status routing event after judgement.",
    "relative_path": "siteNavigator/sites/SITE-100/messageLogs/{message_id}",
    "input_summary": {
      "step_key": "greeting_status",
      "intent": "arrival_greeting"
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
  "current_step": "greeting_status",
  "current_step_id": 0,
  "intent": "arrival_greeting",
  "decision": "Proceed",
  "route_to": "step-greeting-status",
  "required_action": "Call Step 0 greeting status to collect minimum arrival context, then route to check-in when allowed.",
  "missing_items": [],
  "risk_flags": [],
  "next_step": "check_in_report",
  "system_actions": ["read_firebase_state", "check_iepms_fishbone_data", "log_message_event"],
  "state_patch": {},
  "whatsapp_message": "Arrival received for SITE-100. I will continue with check-in preparation.",
  "internal_notes": "Arrival starts at Step 0 through step-greeting-status. Step 1 routing is allowed only after minimum arrival context is resolved."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify `read_firebase_state` and compact fishbone context check occur before check-in message generation and any future state patch.
- Verify Step 0 may recommend `check_in_report` only because `decision` is `Proceed`.
- Verify exactly two check-in drafts are prepared only by the Step 1 check-in contract.
- Verify raw iEPMS response is not stored or exposed.
- Verify no system update success is claimed.

## Acceptance Criteria

- [ ] Arrival message starts from `greeting_status`.
- [ ] Step 0 routes to `step-greeting-status` through `call_step_greeting_status`.
- [ ] Minimum arrival context is resolved before `call_step_check_in`.
- [ ] Route and action match the check-in contract after Step 0.
- [ ] Result uses an approved step status.
- [ ] Step 0 `next_step` is `check_in_report`.
- [ ] System action targets use approved names only.
- [ ] No backend runtime integration is required.
