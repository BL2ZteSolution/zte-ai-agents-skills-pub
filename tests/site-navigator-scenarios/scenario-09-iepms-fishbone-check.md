# Scenario 09 — iEPMS Fishbone Check

## Objective

Verify iEPMS/fishbone consistency requests route through the approved fact-check action and do not directly decide workflow or write data.

## Input Message

```text
Please check fishbone data for SITE-100 material readiness before installation.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000009",
  "current_step": "material_scan",
  "current_step_id": 4,
  "known_context": {
    "site_code": "SITE-100",
    "scope": "installation"
  },
  "known_risks": []
}
```

## Expected Routing

- route_to: `orchestrator`
- action: `check_iepms_fishbone_data`
- target_skill: `iepms-fishbone-data-checker`

## Expected Decision or Result

- decision/result: `Pending`
- next_step: ``
- required_action: Wait for compact fishbone facts before material judgement.
- whatsapp_message behavior: Acknowledge that system facts are being checked; do not claim readiness.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current site and material step before requesting external facts.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "material_scan"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "check_iepms_fishbone_data",
    "target_skill": "iepms-fishbone-data-checker",
    "reason": "Return compact material/fishbone facts for orchestrator judgement.",
    "relative_path": "",
    "input_summary": {
      "site_id": "SITE-100",
      "scope": "installation",
      "requested_fact": "material_readiness"
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
  "current_step": "material_scan",
  "current_step_id": 4,
  "intent": "system_fact_check",
  "decision": "Pending",
  "route_to": "orchestrator",
  "required_action": "Check compact fishbone facts before material judgement.",
  "missing_items": ["fishbone_fact_result"],
  "risk_flags": [],
  "next_step": "",
  "system_actions": ["read_firebase_state", "check_iepms_fishbone_data"],
  "state_patch": {},
  "whatsapp_message": "Received. I will check the material/fishbone facts before confirming readiness.",
  "internal_notes": "System facts do not make the final workflow decision."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify `check_iepms_fishbone_data` returns facts only.
- Verify no material readiness decision is made until facts are available and judged.
- Verify no iEPMS write is prepared.

## Acceptance Criteria

- [ ] Target system skill is `iepms-fishbone-data-checker`.
- [ ] Decision remains `Pending`.
- [ ] `next_step` is empty.
- [ ] No raw response loading is required.
