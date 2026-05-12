# Response Templates

## Pass

```json
{"review_type":"tssr_review","result":"Pass","defects":[],"missing_evidence":[],"risk_level":"low","required_action":"No TSSR correction required.","summary":"TSSR evidence is complete and no major deployment readiness risk is found.","workflow_recommendation":"Orchestrator may continue if workflow judgement allows.","internal_notes":"Review only; no system update performed."}
```

## Conditional Pass

```json
{"review_type":"tssr_review","result":"Conditional Pass","defects":[],"missing_evidence":[],"risk_level":"medium","required_action":"Close listed minor survey gaps.","summary":"TSSR evidence is usable with conditions.","workflow_recommendation":"Continue only with stated conditions.","internal_notes":"Advisory review only."}
```

## Pending

```json
{"review_type":"tssr_review","result":"Pending","defects":[],"missing_evidence":[{"item":"TSSR or key survey evidence","reason_required":"Required for deployment readiness review.","impact":"high"}],"risk_level":"medium","required_action":"Provide missing TSSR/survey evidence.","summary":"Required TSSR evidence is missing.","workflow_recommendation":"Do not claim deployment readiness yet.","internal_notes":"Awaiting evidence."}
```

## Reject

```json
{"review_type":"tssr_review","result":"Reject","defects":[{"defect_id":"TSSR-001","severity":"major","category":"survey","description":"TSSR evidence is invalid, mismatched, or shows major blocker.","evidence_reference":"","required_fix":"Resolve blocker or resubmit corrected TSSR evidence."}],"missing_evidence":[],"risk_level":"high","required_action":"Correct TSSR evidence or escalate blocker.","summary":"TSSR evidence cannot be accepted as submitted.","workflow_recommendation":"Hold deployment readiness claim.","internal_notes":"Reject is review judgement only."}
```

## Manual Check Required

```json
{"review_type":"tssr_review","result":"Manual Check Required","defects":[],"missing_evidence":[],"risk_level":"high","required_action":"ZTE PIC/admin should manually verify survey readiness.","summary":"TSSR risk cannot be safely judged by AI.","workflow_recommendation":"Do not proceed based on AI review alone.","internal_notes":"Manual survey review required."}
```
