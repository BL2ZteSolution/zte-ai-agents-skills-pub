# Scenario 04 — Active Alarm Blocked

## Objective

Verify active alarm risk routes to `step-alarm-check`, returns a blocking result, and does not allow L1 submission or site exit.

## Input Message

```text
Alarm still active on SITE-100. NMS shows critical alarm.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000004",
  "current_step": "alarm_check",
  "current_step_id": 8,
  "known_context": {
    "site_code": "SITE-100"
  },
  "known_risks": ["active_alarm"]
}
```

## Expected Routing

- route_to: `step-alarm-check`
- action: `call_step_alarm_check`
- target_skill: `step-alarm-check`

## Expected Decision or Result

- decision/result: `Blocked`
- next_step: ``
- required_action: Hold workflow and escalate alarm status to ZTE PIC/admin.
- whatsapp_message behavior: Warn that workflow cannot continue until alarm is verified/resolved.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current alarm_check state and known risks.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "alarm_check"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "log_message_event",
    "target_skill": "firebase-db",
    "reason": "Record active alarm blocker summary.",
    "relative_path": "siteNavigator/sites/SITE-100/risks/{risk_id}",
    "input_summary": {
      "risk_type": "active_alarm",
      "severity": "critical"
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
  "current_step": "alarm_check",
  "current_step_id": 8,
  "intent": "alarm_status",
  "decision": "Blocked",
  "route_to": "step-alarm-check",
  "required_action": "Escalate active alarm to ZTE PIC/admin before workflow continues.",
  "missing_items": ["clear_alarm_evidence"],
  "risk_flags": ["active_alarm", "critical_alarm"],
  "next_step": "",
  "system_actions": ["read_firebase_state", "log_message_event"],
  "state_patch": {},
  "whatsapp_message": "Alarm risk received. Please hold next action until ZTE PIC/admin verifies the alarm status.",
  "internal_notes": "Do not route to l1_submission while critical alarm is active."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify active alarm is judged by alarm step skill.
- Verify no `next_step` is recommended for a `Blocked` result.
- Verify the scenario does not require raw NMS access.

## Acceptance Criteria

- [ ] Route is `step-alarm-check`.
- [ ] Result is `Blocked`.
- [ ] Risk flags identify the alarm blocker.
- [ ] No progression to `l1_submission`.
