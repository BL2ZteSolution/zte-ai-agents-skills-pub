# Response Templates

## Pass

```json
{
  "review_type": "l1_report_review",
  "result": "Pass",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "low",
  "required_action": "No L1 evidence correction required.",
  "summary": "L1 report and photo evidence are complete and consistent.",
  "workflow_recommendation": "Orchestrator may continue if workflow step judgement also allows.",
  "internal_notes": "Quality review passed; no state update performed."
}
```

## Conditional Pass

```json
{
  "review_type": "l1_report_review",
  "result": "Conditional Pass",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "medium",
  "required_action": "Complete the listed minor follow-up items.",
  "summary": "L1 evidence is usable with stated conditions.",
  "workflow_recommendation": "Continue only if orchestrator accepts the condition.",
  "internal_notes": "Advisory quality judgement only."
}
```

## Pending

```json
{
  "review_type": "l1_report_review",
  "result": "Pending",
  "defects": [],
  "missing_evidence": [{"item": "L1 report or before/after photo evidence", "reason_required": "Required for L1 quality review.", "impact": "high"}],
  "risk_level": "medium",
  "required_action": "Provide missing L1 report/photo evidence.",
  "summary": "Required L1 evidence is missing.",
  "workflow_recommendation": "Do not claim L1 readiness yet.",
  "internal_notes": "Awaiting evidence."
}
```

## Reject

```json
{
  "review_type": "l1_report_review",
  "result": "Reject",
  "defects": [{"defect_id": "L1-001", "severity": "major", "category": "evidence", "description": "Evidence is invalid or mismatched.", "evidence_reference": "", "required_fix": "Resubmit correct L1 evidence."}],
  "missing_evidence": [],
  "risk_level": "high",
  "required_action": "Correct and resubmit L1 evidence.",
  "summary": "L1 evidence cannot be accepted as submitted.",
  "workflow_recommendation": "Hold L1 acceptance claim.",
  "internal_notes": "Reject is quality judgement only."
}
```

## Manual Check Required

```json
{
  "review_type": "l1_report_review",
  "result": "Manual Check Required",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "high",
  "required_action": "ZTE PIC/admin should manually verify L1 evidence.",
  "summary": "L1 evidence cannot be safely judged by AI.",
  "workflow_recommendation": "Do not proceed based on AI review alone.",
  "internal_notes": "Manual verification required."
}
```
