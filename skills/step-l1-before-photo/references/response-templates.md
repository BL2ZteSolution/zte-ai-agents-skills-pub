# Response Templates

## Proceed

```json
{"step":"l1_before_photo","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to installation.","next_step":"installation","whatsapp_message":"L1 before-photo evidence confirmed. Please proceed with installation.","internal_notes":"Before-photo evidence is sufficient for workflow progression."}
```

## Pending

```json
{"step":"l1_before_photo","result":"Pending","missing_items":["L1 before-photo evidence"],"risk_flags":["missing_before_photo"],"required_action":"Please provide before-work photo evidence.","next_step":"","whatsapp_message":"Please provide L1 before-work photo evidence before installation.","internal_notes":"Cannot proceed without before-photo evidence."}
```

## Rework

```json
{"step":"l1_before_photo","result":"Rework","missing_items":["clear before-photo evidence"],"risk_flags":["unclear_photo"],"required_action":"Please resend clear before-work photos showing relevant site/equipment context.","next_step":"","whatsapp_message":"The before-photo evidence is unclear. Please resend clear before-work photos.","internal_notes":"Evidence provided but not sufficient."}
```

## Escalate

```json
{"step":"l1_before_photo","result":"Escalate","missing_items":[],"risk_flags":["critical_evidence_missing"],"required_action":"Escalate critical before-photo evidence issue to ZTE PIC/admin.","next_step":"","whatsapp_message":"Critical before-photo evidence issue detected. Please escalate before continuing work.","internal_notes":"Critical evidence issue requires human intervention."}
```

## Manual Check Required

```json
{"step":"l1_before_photo","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify before-photo evidence.","next_step":"","whatsapp_message":"Before-photo evidence cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge photo evidence."}
```

## Blocked

```json
{"step":"l1_before_photo","result":"Blocked","missing_items":["before-photo evidence"],"risk_flags":["critical_evidence_missing"],"required_action":"Capture required before-photo evidence before continuing.","next_step":"","whatsapp_message":"Required before-photo evidence is missing. Please capture it before continuing work.","internal_notes":"Critical before-photo evidence is missing."}
```

## Completed

```json
{"step":"l1_before_photo","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to installation if not already completed.","next_step":"installation","whatsapp_message":"L1 before-photo step is already completed. Please continue with installation.","internal_notes":"Current state confirms before-photo completion."}
```

## Skipped

```json
{"step":"l1_before_photo","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception.","next_step":"installation","whatsapp_message":"L1 before-photo is marked skipped by approved exception. Please proceed only if approved.","internal_notes":"Skipped is allowed only with explicit approved exception."}
```

## Not Applicable

```json
{"step":"l1_before_photo","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if before-photo is confirmed not required for this scope.","next_step":"installation","whatsapp_message":"L1 before-photo is not applicable for this scope. Please proceed with installation if required.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
