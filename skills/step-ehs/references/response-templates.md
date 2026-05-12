# Response Templates

Use these compact JSON templates and adjust missing items, risk flags, and notes to match evidence.

## Proceed

```json
{"step":"ehs_login","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to material scan/check if required by scope.","next_step":"material_scan","whatsapp_message":"EHS check confirmed. Please proceed with material scan/check if required.","internal_notes":"EHS evidence is sufficient for workflow progression."}
```

## Pending

```json
{"step":"ehs_login","result":"Pending","missing_items":["EHS confirmation or screenshot"],"risk_flags":["missing_ehs_evidence"],"required_action":"Please provide EHS login/check confirmation or screenshot.","next_step":"","whatsapp_message":"Please provide EHS login/check confirmation or screenshot before proceeding.","internal_notes":"Cannot proceed without EHS evidence."}
```

## Rework

```json
{"step":"ehs_login","result":"Rework","missing_items":["clear EHS evidence"],"risk_flags":["unclear_ehs_screenshot"],"required_action":"Please resend clear EHS evidence showing site and valid status.","next_step":"","whatsapp_message":"The EHS evidence is unclear. Please resend a clear screenshot showing site and status.","internal_notes":"Evidence provided but not sufficient."}
```

## Escalate

```json
{"step":"ehs_login","result":"Escalate","missing_items":[],"risk_flags":["safety_issue"],"required_action":"Escalate safety/EHS issue to ZTE PIC/admin.","next_step":"","whatsapp_message":"Safety or EHS issue detected. Please escalate to ZTE PIC/admin before continuing work.","internal_notes":"Safety issue requires human intervention."}
```

## Manual Check Required

```json
{"step":"ehs_login","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify EHS status.","next_step":"","whatsapp_message":"EHS status cannot be confirmed safely. Please ask ZTE PIC/admin to verify before proceeding.","internal_notes":"AI cannot safely judge EHS evidence."}
```

## Blocked

```json
{"step":"ehs_login","result":"Blocked","missing_items":[],"risk_flags":["ehs_failed"],"required_action":"Resolve EHS failure or unsafe condition before continuing.","next_step":"","whatsapp_message":"EHS is failed or unsafe condition exists. Please resolve before continuing work.","internal_notes":"Safety-critical EHS step is blocked."}
```

## Completed

```json
{"step":"ehs_login","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to material scan/check if not already completed.","next_step":"material_scan","whatsapp_message":"EHS step is already completed. Please continue with material scan/check if required.","internal_notes":"Current state confirms EHS completion."}
```

## Skipped

```json
{"step":"ehs_login","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception.","next_step":"material_scan","whatsapp_message":"EHS is marked skipped by approved exception. Please proceed with material scan/check if required.","internal_notes":"Skipped is allowed only with explicit approved exception."}
```

## Not Applicable

```json
{"step":"ehs_login","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if EHS is confirmed not required for this scope.","next_step":"material_scan","whatsapp_message":"EHS is marked not applicable for this scope. Please proceed with material scan/check if required.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
