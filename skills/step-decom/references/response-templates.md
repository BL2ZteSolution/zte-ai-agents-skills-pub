# Response Templates

## Proceed

```json
{"step":"decom_check","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to housekeeping.","next_step":"housekeeping","whatsapp_message":"Decom status confirmed. Please proceed with housekeeping.","internal_notes":"Decom evidence/scope is sufficient for workflow progression."}
```

## Pending

```json
{"step":"decom_check","result":"Pending","missing_items":["decom scope or decom status"],"risk_flags":["missing_decom_scope"],"required_action":"Please confirm whether decom is required and provide decom status/evidence if applicable.","next_step":"","whatsapp_message":"Please confirm decom scope/status before proceeding.","internal_notes":"Cannot proceed without decom scope/status."}
```

## Rework

```json
{"step":"decom_check","result":"Rework","missing_items":["clear decom scope or evidence"],"risk_flags":["scope_mismatch"],"required_action":"Please resend decom scope/status evidence matching this site.","next_step":"","whatsapp_message":"Decom evidence is unclear or inconsistent. Please resend scope/status evidence for this site.","internal_notes":"Evidence provided but not sufficient."}
```

## Escalate

```json
{"step":"decom_check","result":"Escalate","missing_items":[],"risk_flags":["decom_blocker"],"required_action":"Escalate decom blocker to ZTE PIC/admin.","next_step":"","whatsapp_message":"Decom blocker detected. Please escalate before continuing.","internal_notes":"Required decom issue requires human intervention."}
```

## Manual Check Required

```json
{"step":"decom_check","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify decom requirement/status.","next_step":"","whatsapp_message":"Decom requirement/status cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge decom requirement/status."}
```

## Blocked

```json
{"step":"decom_check","result":"Blocked","missing_items":[],"risk_flags":["decom_required_not_done"],"required_action":"Complete or resolve required decom before continuing.","next_step":"","whatsapp_message":"Required decom is not completed or blocked. Please resolve before continuing.","internal_notes":"Required decom blocks progression."}
```

## Completed

```json
{"step":"decom_check","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to housekeeping if not already completed.","next_step":"housekeeping","whatsapp_message":"Decom check is already completed. Please continue with housekeeping.","internal_notes":"Current state confirms decom check completion."}
```

## Skipped

```json
{"step":"decom_check","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception or confirmed no decom scope.","next_step":"housekeeping","whatsapp_message":"Decom is marked skipped by approved exception. Please proceed with housekeeping only if approved.","internal_notes":"Skipped allowed only with explicit approved exception or scope basis."}
```

## Not Applicable

```json
{"step":"decom_check","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed because scope confirms decom is not required.","next_step":"housekeeping","whatsapp_message":"Decom is not required for this scope. Please proceed with housekeeping.","internal_notes":"Scope confirms decom is not applicable."}
```
