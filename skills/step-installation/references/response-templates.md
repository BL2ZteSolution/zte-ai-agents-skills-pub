# Response Templates

## Proceed

```json
{"step":"installation","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to integration/commissioning.","next_step":"integration","whatsapp_message":"Installation readiness confirmed. Please proceed with integration/commissioning.","internal_notes":"Installation status is sufficient for workflow progression."}
```

## Pending

```json
{"step":"installation","result":"Pending","missing_items":["installation status or completion evidence"],"risk_flags":["missing_installation_status"],"required_action":"Please provide installation status, progress, or completion evidence.","next_step":"","whatsapp_message":"Please provide installation status or completion evidence before proceeding.","internal_notes":"Cannot proceed without installation status."}
```

## Rework

```json
{"step":"installation","result":"Rework","missing_items":["clear installation status"],"risk_flags":["partial_installation"],"required_action":"Please clarify installation progress, completed scope, and remaining blockers.","next_step":"","whatsapp_message":"Installation status is unclear. Please clarify progress, completed scope, and any blockers.","internal_notes":"Evidence/status provided but not sufficient."}
```

## Escalate

```json
{"step":"installation","result":"Escalate","missing_items":[],"risk_flags":["installation_blocker"],"required_action":"Escalate installation blocker to ZTE PIC/admin.","next_step":"","whatsapp_message":"Installation blocker detected. Please escalate to ZTE PIC/admin before continuing.","internal_notes":"Field blocker requires human intervention."}
```

## Manual Check Required

```json
{"step":"installation","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify installation status.","next_step":"","whatsapp_message":"Installation status cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge installation status."}
```

## Blocked

```json
{"step":"installation","result":"Blocked","missing_items":[],"risk_flags":["installation_blocker"],"required_action":"Resolve installation blocker before continuing.","next_step":"","whatsapp_message":"Installation is blocked. Please resolve the blocker before continuing work.","internal_notes":"Installation cannot continue."}
```

## Completed

```json
{"step":"installation","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to integration/commissioning if not already completed.","next_step":"integration","whatsapp_message":"Installation is already completed. Please continue with integration/commissioning.","internal_notes":"Current state confirms installation completion."}
```

## Skipped

```json
{"step":"installation","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception or confirmed no installation scope.","next_step":"integration","whatsapp_message":"Installation is marked skipped by approved exception. Please proceed only if approved.","internal_notes":"Skipped allowed only with explicit approved exception or scope basis."}
```

## Not Applicable

```json
{"step":"installation","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if no installation work is required for this scope.","next_step":"integration","whatsapp_message":"Installation is not applicable for this scope. Please proceed with integration if required.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
