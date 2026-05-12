# Scenario 11 — Domain Review Routing

## Objective

Verify report/document review messages route to the correct domain review skills and do not get handled as step validation.

## Input Message

```text
Please review the PAC document and as-built handover evidence for SITE-100.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000011",
  "current_step": "check_out_report",
  "current_step_id": 12,
  "known_context": {
    "pac_summary": "document attached",
    "as_built_summary": "handover evidence attached"
  },
  "known_risks": []
}
```

## Expected Routing

- route_to: `pac-review` and `as-built-review` as separate on-demand review tasks
- action: `review_pac_document` and `review_as_built`
- target_skill: `pac-review` and `as-built-review`

## Expected Decision or Result

- decision/result: `Pending`
- next_step: ``
- required_action: Get domain review judgement before orchestrator makes any acceptance or closure decision.
- whatsapp_message behavior: Acknowledge review routing; do not claim document acceptance.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm site and workflow context before applying domain review results.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "check_out_report"
    },
    "requires_confirmation": true,
    "blocking": true
  },
  {
    "action_name": "create_async_job",
    "target_skill": "firebase-db",
    "reason": "Queue compact domain review job records if review cannot complete immediately.",
    "relative_path": "siteNavigator/jobs/{job_id}",
    "input_summary": {
      "site_id": "SITE-100",
      "requested_reviews": ["review_pac_document", "review_as_built"]
    },
    "requires_confirmation": true,
    "blocking": false
  }
]
```

## Expected Domain Review Output Contract

```json
{
  "review_type": "pac_or_as_built",
  "result": "Pending",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "medium",
  "required_action": "Complete domain review before acceptance or closure decision.",
  "summary": "Review routing confirmed; final judgement pending.",
  "workflow_recommendation": "Hold acceptance claim until domain result is returned.",
  "internal_notes": "Load domain review skills on demand only."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify document review routes to domain review skills, not step-check-out.
- Verify domain review output is advisory only.
- Verify no customer acceptance or handover acceptance is claimed.
- Verify domain skills are loaded on demand only.

## Acceptance Criteria

- [ ] PAC review routes to `pac-review`.
- [ ] As-built review routes to `as-built-review`.
- [ ] Orchestrator remains next-action owner.
- [ ] No raw document storage or runtime model integration is required.
