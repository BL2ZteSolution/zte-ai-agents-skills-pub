# Output Schema

```json
{
  "review_type": "ehs_review",
  "result": "Pass | Conditional Pass | Pending | Reject | Manual Check Required",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "low | medium | high | critical",
  "required_action": "",
  "summary": "",
  "workflow_recommendation": "",
  "internal_notes": ""
}
```

Use the common defect and missing evidence object formats defined by Phase 8. Orchestrator owns `next_step` and `state_patch`.

Defect object:

```json
{
  "defect_id": "",
  "severity": "minor | major | critical",
  "category": "",
  "description": "",
  "evidence_reference": "",
  "required_fix": ""
}
```

Missing evidence object:

```json
{
  "item": "",
  "reason_required": "",
  "impact": "low | medium | high | critical"
}
```
