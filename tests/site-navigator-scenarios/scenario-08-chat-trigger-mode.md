# Scenario 08 - Chat Trigger Mode

## Purpose

Verify normal OpenClaw chat selects `zte-site-navigator-orchestrator` for site workflow messages and does not select standalone step skills directly.

## Input Message

```text
I have arrived site ABC123
```

## Assumed State

```json
{
  "site_id": "ABC123",
  "current_step": "greeting_status",
  "current_step_id": 0,
  "session_status": "active",
  "risk_flags": []
}
```

## Expected Primary Selection

- selected_skill: `zte-site-navigator-orchestrator`
- reason: strong site workflow chat trigger

## Expected Routing

- route_to: `greeting_status`
- required_action: resolve minimum site context before check-in routing
- system_actions: include `read_firebase_state` and `check_iepms_fishbone_data` when minimum site context is not already provided

## Expected Decision Behavior

- Orchestrator checks site context/state before state patch intent.
- Orchestrator identifies arrival intent and starts at Step 0 `greeting_status`.
- Orchestrator uses compact fishbone facts as the default minimum site context source when needed.
- Orchestrator routes to `step-check-in` only after minimum site context is available.
- `step-check-in` is not selected directly from the initial chat message.

## Guardrail Checks

- Verify normal chat first selects `zte-site-navigator-orchestrator`.
- Verify standalone step skills are reached only through orchestrator routing.
- Verify arrival messages start from `greeting_status`.
- Verify no workflow progression occurs before current-step judgement.
- Verify no state patch is prepared before state/context check.
- Verify raw iEPMS/fishbone response is not stored or exposed.
- Verify no system update success is claimed without approved system action confirmation.
- Verify 核心原则：先查后写，先判后推.

## Acceptance Criteria

- [ ] OpenClaw chat selection target is `zte-site-navigator-orchestrator`.
- [ ] Direct chat selection target is not `step-check-in`.
- [ ] Initial orchestrator route target is `greeting_status`.
- [ ] Step 1 `call_step_check_in` occurs only after minimum site context is available.
- [ ] Output follows `output-format.md`.
- [ ] The chat-trigger policy is respected.
