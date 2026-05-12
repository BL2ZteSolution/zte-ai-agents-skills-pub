# Response Templates

## Pass

```json
{"review_type":"as_built_review","result":"Pass","defects":[],"missing_evidence":[],"risk_level":"low","required_action":"No as-built correction required.","summary":"As-built documentation is complete and consistent.","workflow_recommendation":"Orchestrator may continue if workflow judgement allows.","internal_notes":"Review only; no state update performed."}
```

## Conditional Pass

```json
{"review_type":"as_built_review","result":"Conditional Pass","defects":[],"missing_evidence":[],"risk_level":"medium","required_action":"Complete minor as-built corrections.","summary":"As-built documentation is usable with conditions.","workflow_recommendation":"Continue only with stated conditions.","internal_notes":"Advisory review only."}
```

## Pending

```json
{"review_type":"as_built_review","result":"Pending","defects":[],"missing_evidence":[{"item":"As-built document or installed evidence","reason_required":"Required for handover readiness review.","impact":"high"}],"risk_level":"medium","required_action":"Provide missing as-built evidence.","summary":"Required as-built evidence is missing.","workflow_recommendation":"Do not claim handover readiness yet.","internal_notes":"Awaiting evidence."}
```

## Reject

```json
{"review_type":"as_built_review","result":"Reject","defects":[{"defect_id":"AB-001","severity":"major","category":"documentation","description":"As-built evidence is invalid or mismatched.","evidence_reference":"","required_fix":"Resubmit corrected as-built evidence."}],"missing_evidence":[],"risk_level":"high","required_action":"Correct as-built documentation.","summary":"As-built evidence cannot be accepted as submitted.","workflow_recommendation":"Hold handover readiness claim.","internal_notes":"Reject is review judgement only."}
```

## Manual Check Required

```json
{"review_type":"as_built_review","result":"Manual Check Required","defects":[],"missing_evidence":[],"risk_level":"high","required_action":"ZTE PIC/admin should manually verify as-built readiness.","summary":"As-built completeness cannot be safely judged by AI.","workflow_recommendation":"Do not proceed based on AI review alone.","internal_notes":"Manual review required."}
```
