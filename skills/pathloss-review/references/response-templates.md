# Response Templates

## Pass

```json
{"review_type":"pathloss_review","result":"Pass","defects":[],"missing_evidence":[],"risk_level":"low","required_action":"No Pathloss evidence correction required.","summary":"Pathloss evidence is complete enough and link context is consistent.","workflow_recommendation":"Orchestrator may continue if workflow judgement allows.","internal_notes":"Review only; no engineering approval claimed."}
```

## Conditional Pass

```json
{"review_type":"pathloss_review","result":"Conditional Pass","defects":[],"missing_evidence":[],"risk_level":"medium","required_action":"Close listed planning evidence gaps.","summary":"Pathloss evidence is usable with conditions.","workflow_recommendation":"Continue only with stated conditions.","internal_notes":"Advisory planning review only."}
```

## Pending

```json
{"review_type":"pathloss_review","result":"Pending","defects":[],"missing_evidence":[{"item":"Pathloss report or link context","reason_required":"Required for microwave planning review.","impact":"high"}],"risk_level":"medium","required_action":"Provide missing Pathloss/link evidence.","summary":"Required Pathloss evidence is missing.","workflow_recommendation":"Do not claim planning readiness yet.","internal_notes":"Awaiting evidence."}
```

## Reject

```json
{"review_type":"pathloss_review","result":"Reject","defects":[{"defect_id":"PL-001","severity":"major","category":"planning","description":"Pathloss evidence is invalid, mismatched, or technically high risk.","evidence_reference":"","required_fix":"Resubmit corrected planning evidence or escalate to MW planning engineer."}],"missing_evidence":[],"risk_level":"high","required_action":"Correct Pathloss evidence or escalate technical risk.","summary":"Pathloss evidence cannot be accepted as submitted.","workflow_recommendation":"Hold planning readiness claim.","internal_notes":"Reject is review judgement only."}
```

## Manual Check Required

```json
{"review_type":"pathloss_review","result":"Manual Check Required","defects":[],"missing_evidence":[],"risk_level":"high","required_action":"MW planning engineer or ZTE PIC/admin should manually verify Pathloss evidence.","summary":"Technical planning risk cannot be safely judged by AI.","workflow_recommendation":"Do not proceed based on AI review alone.","internal_notes":"Manual technical review required."}
```
