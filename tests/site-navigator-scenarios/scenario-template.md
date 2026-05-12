# Scenario XX — {Scenario Name}

## Objective

Describe the behavior, route, output contract, and guardrail being tested.

## Input Message

```text
{message}
```

## Assumed State

```json
{
  "site_id": "",
  "sender": "",
  "current_step": "",
  "current_step_id": 0,
  "known_context": {},
  "known_risks": []
}
```

## Expected Routing

- route_to: ``
- action: ``
- target_skill: ``

## Expected Decision or Result

- decision/result: ``
- next_step: ``
- required_action: ``
- whatsapp_message behavior: ``

## Expected System Actions

```json
[]
```

## Expected Output Contract

```json
{
  "site_id": "",
  "current_step": "",
  "current_step_id": 0,
  "intent": "",
  "decision": "",
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

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify current state/context/facts are checked before state patch, external write intent, or context-dependent message generation.
- Verify current step judgement is complete before any next_step is recommended.
- Verify only approved system tool names are used.
- Verify no raw backend/API/model integration is required.

## Acceptance Criteria

- [ ] Expected route and action are correct.
- [ ] Expected decision/result uses the correct status set.
- [ ] Blocking or incomplete evidence does not advance workflow.
- [ ] Any state_patch is intended only and follows prior state check.
- [ ] Any system action uses an approved target skill.
- [ ] WhatsApp message is short, clear, and does not claim unconfirmed system success.
