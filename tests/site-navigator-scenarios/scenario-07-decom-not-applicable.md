# Scenario 07 — Decom Not Applicable

## Objective

Verify decom can be marked `Not Applicable` only when scope/facts confirm decom is not required, and then may progress to housekeeping.

## Input Message

```text
No decom required for SITE-100. Scope is new install only.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000007",
  "current_step": "decom_check",
  "current_step_id": 10,
  "known_context": {
    "scope": "new_install_only",
    "decom_required": false
  },
  "known_risks": []
}
```

## Expected Routing

- route_to: `step-decom`
- action: `call_step_decom`
- target_skill: `step-decom`

## Expected Decision or Result

- decision/result: `Not Applicable`
- next_step: `housekeeping`
- required_action: Continue to housekeeping after decom non-applicability is judged.
- whatsapp_message behavior: Confirm decom is not applicable only if scope evidence is present.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current decom step and scope before non-applicable judgement.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "decom_check"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "check_iepms_fishbone_data",
    "target_skill": "iepms-fishbone-data-checker",
    "reason": "Confirm compact scope facts when decom applicability depends on system data.",
    "relative_path": "",
    "input_summary": {
      "site_id": "SITE-100",
      "scope": "new_install_only"
    },
    "requires_confirmation": true,
    "blocking": true
  }
]
```

## Expected Output Contract

```json
{
  "site_id": "SITE-100",
  "current_step": "decom_check",
  "current_step_id": 10,
  "intent": "decom_status",
  "decision": "Not Applicable",
  "route_to": "step-decom",
  "required_action": "Proceed to housekeeping after scope confirmation.",
  "missing_items": [],
  "risk_flags": [],
  "next_step": "housekeeping",
  "system_actions": ["read_firebase_state", "check_iepms_fishbone_data"],
  "state_patch": {},
  "whatsapp_message": "Decom can be treated as not applicable after scope confirmation. Please proceed with housekeeping evidence.",
  "internal_notes": "Progression allowed because Not Applicable is a progression-allowed status."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify decom non-applicability is judged from scope/context, not assumed from a bare message.
- Verify `next_step` is allowed because result is `Not Applicable`.
- Verify system facts are compact and use approved target names.

## Acceptance Criteria

- [ ] Route is `step-decom`.
- [ ] Result is `Not Applicable`.
- [ ] `next_step` is `housekeeping`.
- [ ] Scope/fact check occurs before progression.
