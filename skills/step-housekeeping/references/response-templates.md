# Response Templates

## Proceed

```json
{"step":"housekeeping","result":"Proceed","missing_items":[],"risk_flags":[],"required_action":"Proceed to check-out report preparation.","next_step":"check_out_report","whatsapp_message":"Housekeeping confirmed and site condition is safe. Please proceed with check-out report.","internal_notes":"Housekeeping evidence is sufficient for workflow progression."}
```

## Pending

```json
{"step":"housekeeping","result":"Pending","missing_items":["housekeeping confirmation or cleanup evidence"],"risk_flags":["missing_housekeeping_confirmation"],"required_action":"Please provide housekeeping confirmation and cleanup/safe-site evidence.","next_step":"","whatsapp_message":"Please provide housekeeping confirmation and cleanup evidence before check-out.","internal_notes":"Cannot proceed without housekeeping evidence."}
```

## Rework

```json
{"step":"housekeeping","result":"Rework","missing_items":["clear housekeeping evidence"],"risk_flags":["unclear_housekeeping_evidence"],"required_action":"Please resend clear housekeeping evidence showing cleanup and safe site condition.","next_step":"","whatsapp_message":"Housekeeping evidence is unclear. Please resend clear cleanup/safe-site evidence.","internal_notes":"Evidence provided but not sufficient."}
```

## Escalate

```json
{"step":"housekeeping","result":"Escalate","missing_items":[],"risk_flags":["unsafe_to_leave"],"required_action":"Escalate unsafe site or customer/safety issue to ZTE PIC/admin.","next_step":"","whatsapp_message":"Unsafe site or safety issue detected. Please escalate before check-out.","internal_notes":"Unsafe condition requires human intervention."}
```

## Manual Check Required

```json
{"step":"housekeeping","result":"Manual Check Required","missing_items":[],"risk_flags":["manual_verification_required"],"required_action":"ZTE PIC/admin should manually verify housekeeping and safe-site status.","next_step":"","whatsapp_message":"Housekeeping status cannot be confirmed safely. Please ask ZTE PIC/admin to verify.","internal_notes":"AI cannot safely judge housekeeping status."}
```

## Blocked

```json
{"step":"housekeeping","result":"Blocked","missing_items":[],"risk_flags":["unsafe_to_leave","unclean_site"],"required_action":"Resolve unsafe or unclean site condition before check-out.","next_step":"","whatsapp_message":"Site is unsafe or unclean. Please resolve before check-out.","internal_notes":"Housekeeping blocks check-out."}
```

## Completed

```json
{"step":"housekeeping","result":"Completed","missing_items":[],"risk_flags":[],"required_action":"Continue to check-out report if not already completed.","next_step":"check_out_report","whatsapp_message":"Housekeeping is already completed. Please continue with check-out report.","internal_notes":"Current state confirms housekeeping completion."}
```

## Skipped

```json
{"step":"housekeeping","result":"Skipped","missing_items":[],"risk_flags":[],"required_action":"Proceed only under approved exception.","next_step":"check_out_report","whatsapp_message":"Housekeeping is marked skipped by approved exception. Please proceed only if approved.","internal_notes":"Skipped is allowed only with explicit approved exception."}
```

## Not Applicable

```json
{"step":"housekeeping","result":"Not Applicable","missing_items":[],"risk_flags":[],"required_action":"Proceed only if housekeeping is confirmed not required for this scope.","next_step":"check_out_report","whatsapp_message":"Housekeeping is not applicable for this scope. Please proceed with check-out report if required.","internal_notes":"Not Applicable is allowed only with explicit scope confirmation."}
```
