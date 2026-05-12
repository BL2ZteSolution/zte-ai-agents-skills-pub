# Scenario 13 - Manual Check Required

## Objective

Verify that unclear or conflicting field evidence returns `Manual Check Required`, does not advance `next_step`, and preserves the rule:

核心原则：先查后写，先判后推。

## Input Message

```text
EHS photo uploaded but PPE and site condition are unclear. Please proceed.
```

## Assumed State

```json
{
  "site_id": "SITE-4434A",
  "current_step": "ehs_login",
  "current_step_id": 3,
  "last_checked_state": true,
  "evidence": {
    "ehs_photo": "received",
    "ppe_visibility": "unclear",
    "site_condition": "unclear"
  }
}
```

## Expected Route

- `route_to`: `step-ehs`
- `required_action`: `call_step_ehs`

## Expected Decision

- `decision` or step `result`: `Manual Check Required`
- `next_step`: empty
- `state_patch`: empty until manual judgement or verified evidence is available

## Expected System Actions

The orchestrator may request:

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm current site state before deciding whether EHS can progress.",
    "relative_path": "siteNavigator/sites/{site_id}/state",
    "input_summary": {
      "site_id": "SITE-4434A",
      "step_key": "ehs_login"
    },
    "requires_confirmation": true,
    "blocking": true
  }
]
```

No `patch_firebase_state`, `write_iepms_column`, or `create_async_job` should be emitted to advance the workflow.

## Expected WhatsApp Message Behavior

The response should ask the user to provide clearer EHS evidence or request ZTE PIC/manual review. It must not claim EHS passed and must not push the user to material scan.

## Guardrail Checks

- Confirm current state/context is checked before judgement.
- Confirm unclear EHS evidence is judged before any progression.
- Confirm `Manual Check Required` does not silently advance workflow.
- Confirm no Firebase patch is requested for workflow progression.
- Confirm no iEPMS write is requested.
- Confirm only approved system tool names are used.

## Acceptance Criteria

- [ ] Route is `step-ehs`.
- [ ] Action is `call_step_ehs`.
- [ ] Result is `Manual Check Required`.
- [ ] `next_step` is empty.
- [ ] Missing or unclear evidence is listed.
- [ ] Risk flags mention unclear safety/EHS evidence.
- [ ] `state_patch` does not advance `current_step_id`.
- [ ] Core rule `先查后写，先判后推` is preserved.
