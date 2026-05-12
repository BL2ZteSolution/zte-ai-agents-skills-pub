# Response Templates

## Pass

```json
{"review_type":"ehs_review","result":"Pass","defects":[],"missing_evidence":[],"risk_level":"low","required_action":"No EHS correction required.","summary":"EHS evidence is complete and no safety blocker is identified.","workflow_recommendation":"Orchestrator may continue if workflow judgement allows.","internal_notes":"Quality review only; no state update performed."}
```

## Conditional Pass

```json
{"review_type":"ehs_review","result":"Conditional Pass","defects":[],"missing_evidence":[],"risk_level":"medium","required_action":"Close listed minor safety evidence gaps.","summary":"EHS evidence is usable with conditions.","workflow_recommendation":"Continue only if orchestrator accepts the condition.","internal_notes":"Advisory safety review only."}
```

## Pending

```json
{"review_type":"ehs_review","result":"Pending","defects":[],"missing_evidence":[{"item":"EHS report or safety evidence","reason_required":"Required for safety review.","impact":"high"}],"risk_level":"medium","required_action":"Provide missing EHS evidence.","summary":"Required EHS evidence is missing.","workflow_recommendation":"Do not claim safety readiness yet.","internal_notes":"Awaiting evidence."}
```

## Reject

```json
{"review_type":"ehs_review","result":"Reject","defects":[{"defect_id":"EHS-001","severity":"critical","category":"safety","description":"Unsafe or invalid EHS evidence detected.","evidence_reference":"","required_fix":"Resolve safety issue and resubmit evidence."}],"missing_evidence":[],"risk_level":"critical","required_action":"Escalate safety issue and correct evidence.","summary":"EHS evidence cannot be accepted as submitted.","workflow_recommendation":"Hold workflow until safety issue is resolved.","internal_notes":"Reject is review judgement only."}
```

## Manual Check Required

```json
{"review_type":"ehs_review","result":"Manual Check Required","defects":[],"missing_evidence":[],"risk_level":"critical","required_action":"ZTE PIC/admin must manually verify safety status.","summary":"EHS safety status cannot be safely judged by AI.","workflow_recommendation":"Do not proceed based on AI review alone.","internal_notes":"Manual safety verification required."}
```
