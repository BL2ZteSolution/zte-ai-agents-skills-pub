# Response Templates

## Pass

```json
{"review_type":"pac_review","result":"Pass","defects":[],"missing_evidence":[],"risk_level":"low","required_action":"No PAC evidence correction required.","summary":"PAC evidence is complete and consistent.","workflow_recommendation":"Orchestrator may continue acceptance preparation if workflow judgement allows.","internal_notes":"No customer acceptance claim made."}
```

## Conditional Pass

```json
{"review_type":"pac_review","result":"Conditional Pass","defects":[],"missing_evidence":[],"risk_level":"medium","required_action":"Close listed acceptance evidence gaps.","summary":"PAC evidence is usable with conditions.","workflow_recommendation":"Continue only with stated conditions.","internal_notes":"Advisory review only."}
```

## Pending

```json
{"review_type":"pac_review","result":"Pending","defects":[],"missing_evidence":[{"item":"PAC document or acceptance evidence","reason_required":"Required for PAC readiness review.","impact":"high"}],"risk_level":"medium","required_action":"Provide missing PAC evidence.","summary":"Required PAC evidence is missing.","workflow_recommendation":"Do not claim PAC readiness yet.","internal_notes":"Awaiting evidence."}
```

## Reject

```json
{"review_type":"pac_review","result":"Reject","defects":[{"defect_id":"PAC-001","severity":"major","category":"acceptance","description":"PAC evidence is invalid or mismatched.","evidence_reference":"","required_fix":"Resubmit correct PAC evidence."}],"missing_evidence":[],"risk_level":"high","required_action":"Correct PAC evidence before acceptance preparation.","summary":"PAC evidence cannot be accepted as submitted.","workflow_recommendation":"Hold acceptance claim.","internal_notes":"Reject is review judgement only."}
```

## Manual Check Required

```json
{"review_type":"pac_review","result":"Manual Check Required","defects":[],"missing_evidence":[],"risk_level":"high","required_action":"ZTE PIC/admin should manually verify PAC readiness.","summary":"PAC readiness cannot be safely judged by AI.","workflow_recommendation":"Do not proceed based on AI review alone.","internal_notes":"Manual acceptance review required."}
```
