# Response Templates

## Proceed

```json
{"step":"material_scan","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to L1 before-photo evidence.","next_step":"l1_before_photo","whatsapp_message":"Material scan/readiness confirmed. Please proceed with L1 before-photo evidence.","internal_notes":"Material evidence is sufficient for workflow progression."}
```

## Pending

```json
{"step":"material_scan","result":"Pending","missing_items":["material scan confirmation or material readiness evidence"],"risk_flags":["missing_material_scan"],"required_action":"Please provide material scan confirmation, MOS screenshot, or material readiness evidence.","next_step":"","whatsapp_message":"Please provide material scan/MOS confirmation before proceeding.","internal_notes":"Cannot proceed without material evidence."}
```

## Rework

```json
{"step":"material_scan","result":"Rework","missing_items":["clear material evidence"],"risk_flags":["material_mismatch"],"required_action":"Please correct or resend material evidence matching this site and scope.","next_step":"","whatsapp_message":"Material evidence is unclear or inconsistent. Please resend corrected material evidence.","internal_notes":"Evidence provided but not sufficient."}
```

## Escalate

```json
{"step":"material_scan","result":"Escalate","missing_items":[],"risk_flags":["critical_material_missing"],"required_action":"Escalate critical material issue to ZTE PIC/admin.","next_step":"","whatsapp_message":"Critical material issue detected. Please escalate to ZTE PIC/admin before continuing work.","internal_notes":"Material blocker requires human intervention."}
```

## Manual Check Required

```json
{"step":"material_scan","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify material readiness.","next_step":"","whatsapp_message":"Material readiness cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge material readiness."}
```

## Blocked

```json
{"step":"material_scan","result":"Blocked","missing_items":[],"risk_flags":["critical_material_missing"],"required_action":"Resolve missing or wrong critical material before continuing.","next_step":"","whatsapp_message":"Critical required material is missing or wrong. Please resolve before continuing work.","internal_notes":"Material readiness is blocked."}
```

## Completed

```json
{"step":"material_scan","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to L1 before-photo evidence if not already completed.","next_step":"l1_before_photo","whatsapp_message":"Material scan is already completed. Please continue with L1 before-photo evidence.","internal_notes":"Current state confirms material scan completion."}
```

## Skipped

```json
{"step":"material_scan","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception.","next_step":"l1_before_photo","whatsapp_message":"Material scan is marked skipped by approved exception. Please proceed with L1 before-photo evidence.","internal_notes":"Skipped is allowed only with explicit approved exception."}
```

## Not Applicable

```json
{"step":"material_scan","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if material scan is confirmed not required for this scope.","next_step":"l1_before_photo","whatsapp_message":"Material scan is not applicable for this scope. Please proceed with L1 before-photo evidence.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
