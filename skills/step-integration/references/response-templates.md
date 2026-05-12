# Response Templates

## Proceed

```json
{"step":"integration","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to alarm check.","next_step":"alarm_check","whatsapp_message":"Integration/commissioning readiness confirmed. Please proceed with alarm check.","internal_notes":"Integration evidence is sufficient for workflow progression."}
```

## Pending

```json
{"step":"integration","result":"Pending","missing_items":["integration or commissioning status"],"risk_flags":["missing_integration_status"],"required_action":"Please provide integration/commissioning status and NMS visibility if available.","next_step":"","whatsapp_message":"Please provide integration/commissioning status before proceeding.","internal_notes":"Cannot proceed without integration status."}
```

## Rework

```json
{"step":"integration","result":"Rework","missing_items":["clear integration status"],"risk_flags":["commissioning_blocker"],"required_action":"Please clarify integration status, NMS visibility, and remaining issues.","next_step":"","whatsapp_message":"Integration status is unclear. Please clarify NMS visibility and remaining issues.","internal_notes":"Evidence/status provided but not sufficient."}
```

## Escalate

```json
{"step":"integration","result":"Escalate","missing_items":[],"risk_flags":["commissioning_blocker"],"required_action":"Escalate commissioning/NMS issue to ZTE PIC/admin.","next_step":"","whatsapp_message":"Commissioning or NMS issue detected. Please escalate before continuing.","internal_notes":"Integration blocker requires human intervention."}
```

## Manual Check Required

```json
{"step":"integration","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify integration readiness.","next_step":"","whatsapp_message":"Integration readiness cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge integration readiness."}
```

## Blocked

```json
{"step":"integration","result":"Blocked","missing_items":[],"risk_flags":["integration_failed","nms_not_visible"],"required_action":"Resolve integration failure or NMS visibility issue before continuing.","next_step":"","whatsapp_message":"Integration is failed or NMS is not visible. Please resolve before continuing.","internal_notes":"Integration readiness is blocked."}
```

## Completed

```json
{"step":"integration","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to alarm check if not already completed.","next_step":"alarm_check","whatsapp_message":"Integration is already completed. Please continue with alarm check.","internal_notes":"Current state confirms integration completion."}
```

## Skipped

```json
{"step":"integration","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception or confirmed no integration scope.","next_step":"alarm_check","whatsapp_message":"Integration is marked skipped by approved exception. Please proceed only if approved.","internal_notes":"Skipped allowed only with explicit approved exception or scope basis."}
```

## Not Applicable

```json
{"step":"integration","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if integration is not required for this scope.","next_step":"alarm_check","whatsapp_message":"Integration is not applicable for this scope. Please proceed with alarm check if required.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
