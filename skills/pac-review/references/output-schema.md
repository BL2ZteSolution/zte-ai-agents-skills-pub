# Output Schema

```json
{
  "review_type": "pac_review",
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

Use common Phase 8 defect and missing evidence object formats. `workflow_recommendation` is advisory only.

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
