# Scenario 06 — L1 Review Reject

## Objective

Verify L1 report quality issues route to `l1-report-review`, return a domain `Reject`, and do not advance workflow.

## Input Message

```text
Please review the L1 report for SITE-100. It may be the wrong template and after photos are missing.
```

## Assumed State

```json
{
  "site_id": "SITE-100",
  "sender": "+60120000006",
  "current_step": "l1_submission",
  "current_step_id": 9,
  "known_context": {
    "document_summary": "L1 report provided, template mismatch suspected",
    "after_photo_summary": "missing"
  },
  "known_risks": []
}
```

## Expected Routing

- route_to: `l1-report-review`
- action: `review_l1_report`
- target_skill: `l1-report-review`

## Expected Decision or Result

- decision/result: `Reject`
- next_step: ``
- required_action: Resubmit correct L1 report template and after-photo evidence.
- whatsapp_message behavior: State required fix without claiming acceptance.

## Expected System Actions

```json
[
  {
    "action_name": "read_firebase_state",
    "target_skill": "firebase-db",
    "reason": "Confirm site and current workflow context before applying review result.",
    "relative_path": "siteNavigator/sites/SITE-100/state",
    "input_summary": {
      "site_id": "SITE-100",
      "step_key": "l1_submission"
    },
    "requires_confirmation": true,
    "blocking": true
  }
]
```

## Expected Domain Review Output

```json
{
  "review_type": "l1_report",
  "result": "Reject",
  "defects": [
    {
      "defect_id": "L1-001",
      "severity": "major",
      "category": "template",
      "description": "Wrong or invalid L1 report template.",
      "evidence_reference": "report_summary",
      "required_fix": "Use the approved L1 template."
    }
  ],
  "missing_evidence": [
    {
      "item": "after_photo_evidence",
      "reason_required": "Required to validate completion evidence.",
      "impact": "high"
    }
  ],
  "risk_level": "high",
  "required_action": "Resubmit correct report and after photos.",
  "summary": "L1 evidence is not acceptable for workflow readiness.",
  "workflow_recommendation": "Do not advance until corrected.",
  "internal_notes": "Domain review is advisory to orchestrator."
}
```

## Guardrail Checks

- Verify 核心原则：先查后写，先判后推。
- Verify domain review status set is used, not step status set.
- Verify review result is advisory and does not directly update state.
- Verify the orchestrator does not claim L1/customer acceptance.

## Acceptance Criteria

- [ ] Route is `l1-report-review`.
- [ ] Domain result is `Reject`.
- [ ] No `next_step` is recommended.
- [ ] No raw document storage is required.
