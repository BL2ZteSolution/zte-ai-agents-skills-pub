# Response Templates

## Proceed

```json
{"step":"l1_submission","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to decommissioning check if required by scope.","next_step":"decom_check","whatsapp_message":"L1 submission and after-photo evidence confirmed. Please proceed to decom check if required.","internal_notes":"L1 submission evidence is sufficient for workflow progression."}
```

## Pending

```json
{"step":"l1_submission","result":"Pending","missing_items":["L1 submission confirmation","after-photo evidence"],"risk_flags":["missing_l1_submission","missing_after_photo"],"required_action":"Please provide L1 submission confirmation and after-photo evidence.","next_step":"","whatsapp_message":"Please provide L1 submission confirmation and after-photo evidence before proceeding.","internal_notes":"Cannot proceed without L1 submission and after-photo evidence."}
```

## Rework

```json
{"step":"l1_submission","result":"Rework","missing_items":["clear L1 submission or after-photo evidence"],"risk_flags":["unclear_submission_evidence"],"required_action":"Please resend clear L1 submission evidence and after photos for the correct site.","next_step":"","whatsapp_message":"L1 evidence is unclear or incomplete. Please resend clear submission evidence and after photos.","internal_notes":"Evidence provided but not sufficient."}
```

## Escalate

```json
{"step":"l1_submission","result":"Escalate","missing_items":[],"risk_flags":["wrong_report"],"required_action":"Escalate major L1/report issue to ZTE PIC/admin.","next_step":"","whatsapp_message":"Major L1/report issue detected. Please escalate before continuing.","internal_notes":"Major L1 issue requires human intervention."}
```

## Manual Check Required

```json
{"step":"l1_submission","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify L1 submission evidence.","next_step":"","whatsapp_message":"L1 submission evidence cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge L1 submission evidence."}
```

## Blocked

```json
{"step":"l1_submission","result":"Blocked","missing_items":[],"risk_flags":["missing_l1_submission"],"required_action":"Resolve L1 submission blocker before continuing.","next_step":"","whatsapp_message":"L1 submission cannot proceed due to a blocker. Please resolve before continuing.","internal_notes":"L1 submission is blocked."}
```

## Completed

```json
{"step":"l1_submission","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to decommissioning check if not already completed.","next_step":"decom_check","whatsapp_message":"L1 submission is already completed. Please continue to decom check if required.","internal_notes":"Current state confirms L1 submission completion."}
```

## Skipped

```json
{"step":"l1_submission","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception.","next_step":"decom_check","whatsapp_message":"L1 submission is marked skipped by approved exception. Please proceed only if approved.","internal_notes":"Skipped is allowed only with explicit approved exception."}
```

## Not Applicable

```json
{"step":"l1_submission","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if L1 submission is not required for this scope.","next_step":"decom_check","whatsapp_message":"L1 submission is not applicable for this scope. Please proceed to decom check if required.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
