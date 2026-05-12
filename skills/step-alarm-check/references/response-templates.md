# Alarm Check Response Templates

## Proceed

```json
{
  "step": "alarm_check",
  "result": "Proceed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed to L1 submission with after photo.",
  "next_step": "l1_submission",
  "whatsapp_message": "No blocking alarm confirmed. Please proceed with L1 submission and after-photo evidence.",
  "internal_notes": "Alarm check evidence is sufficient for workflow progression."
}
```

## Pending

```json
{
  "step": "alarm_check",
  "result": "Pending",
  "missing_items": ["alarm status confirmation or screenshot"],
  "risk_flags": ["missing_alarm_evidence"],
  "required_action": "Provide alarm status confirmation or NMS/alarm screenshot.",
  "next_step": "",
  "whatsapp_message": "Please confirm alarm status or provide an NMS/alarm screenshot before proceeding.",
  "internal_notes": "Cannot proceed without alarm evidence."
}
```

## Rework

```json
{
  "step": "alarm_check",
  "result": "Rework",
  "missing_items": ["clear alarm evidence"],
  "risk_flags": ["unclear_alarm_screenshot"],
  "required_action": "Resend clear alarm/NMS evidence for the correct site.",
  "next_step": "",
  "whatsapp_message": "The alarm evidence is unclear. Please resend a clear screenshot showing alarm status for this site.",
  "internal_notes": "Evidence provided but not sufficient."
}
```

## Escalate

```json
{
  "step": "alarm_check",
  "result": "Escalate",
  "missing_items": [],
  "risk_flags": ["customer_impact_risk"],
  "required_action": "Escalate alarm issue to ZTE PIC/admin before continuing.",
  "next_step": "",
  "whatsapp_message": "Alarm risk may affect service. Please escalate to ZTE PIC/admin before proceeding.",
  "internal_notes": "Alarm risk requires human decision."
}
```

## Manual Check Required

```json
{
  "step": "alarm_check",
  "result": "Manual Check Required",
  "missing_items": [],
  "risk_flags": ["manual_verification_required"],
  "required_action": "ZTE PIC/admin should manually verify alarm status.",
  "next_step": "",
  "whatsapp_message": "Alarm status cannot be confirmed safely. Please ask ZTE PIC/admin to verify.",
  "internal_notes": "AI cannot safely judge alarm evidence."
}
```

## Blocked

```json
{
  "step": "alarm_check",
  "result": "Blocked",
  "missing_items": [],
  "risk_flags": ["active_blocking_alarm"],
  "required_action": "Resolve blocking alarm before proceeding.",
  "next_step": "",
  "whatsapp_message": "Blocking alarm detected. Please resolve or escalate before proceeding.",
  "internal_notes": "Critical alarm risk blocks workflow progression."
}
```

## Completed

```json
{
  "step": "alarm_check",
  "result": "Completed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Continue to L1 submission if not already completed.",
  "next_step": "l1_submission",
  "whatsapp_message": "Alarm check is already completed. Please continue with L1 submission.",
  "internal_notes": "Current state confirms alarm check completion."
}
```

## Skipped

```json
{
  "step": "alarm_check",
  "result": "Skipped",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only under approved exception.",
  "next_step": "l1_submission",
  "whatsapp_message": "Alarm check is marked skipped by approved exception. Please proceed with L1 submission.",
  "internal_notes": "Skipped is allowed only with explicit approved exception."
}
```

## Not Applicable

```json
{
  "step": "alarm_check",
  "result": "Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only if alarm check is confirmed not required for this scope.",
  "next_step": "l1_submission",
  "whatsapp_message": "Alarm check is marked not applicable for this scope. Please proceed with L1 submission.",
  "internal_notes": "Not Applicable is allowed only with explicit scope confirmation."
}
```
