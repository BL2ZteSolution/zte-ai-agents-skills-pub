# Check-in Response Templates

## Proceed

```json
{
  "step": "check_in_report",
  "result": "Proceed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Please manually forward the two check-in messages to CelcomDigi NOC and ZTE Safety.",
  "next_step": "dptw_login",
  "whatsapp_message": "Check-in drafts are ready. Please manually forward both messages to CelcomDigi NOC and ZTE Safety, then let me know after you have done it.",
  "message_drafts": {
    "celcomdigi_noc": "[CHECK-IN][CelcomDigi NOC]\nSite: {site_code}\nLink/Site ID: {link_id}\nStatus: Team arrived at site and starting work.\nPIC/Team: {team_or_pic}\nTime: {check_in_time}",
    "zte_safety": "[CHECK-IN][ZTE Safety]\nSite: {site_code}\nLink/Site ID: {link_id}\nStatus: Team arrived at site. Please monitor safety compliance.\nPIC/Team: {team_or_pic}\nTime: {check_in_time}"
  },
  "internal_notes": "Check-in context sufficient. User must manually forward both drafts."
}
```

## Pending

```json
{
  "step": "check_in_report",
  "result": "Pending",
  "missing_items": ["site context"],
  "risk_flags": ["missing_site_context"],
  "required_action": "Provide site code/link ID.",
  "next_step": "",
  "whatsapp_message": "Please provide site code/link ID before check-in.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Check-in context incomplete."
}
```

## Rework

```json
{
  "step": "check_in_report",
  "result": "Rework",
  "missing_items": ["correct site/check-in information"],
  "risk_flags": ["site_mismatch"],
  "required_action": "Correct the site/check-in details.",
  "next_step": "",
  "whatsapp_message": "The check-in details do not match the site. Please resend correct site/check-in information.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Provided details are insufficient or mismatched."
}
```

## Escalate

```json
{
  "step": "check_in_report",
  "result": "Escalate",
  "missing_items": [],
  "risk_flags": ["access_blocked"],
  "required_action": "Escalate site access/check-in issue to ZTE PIC/admin.",
  "next_step": "",
  "whatsapp_message": "Site access/check-in issue detected. Please escalate to ZTE PIC/admin before starting work.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Access or site identification risk requires human action."
}
```

## Manual Check Required

```json
{
  "step": "check_in_report",
  "result": "Manual Check Required",
  "missing_items": [],
  "risk_flags": ["manual_verification_required"],
  "required_action": "ZTE PIC/admin should verify site and check-in status.",
  "next_step": "",
  "whatsapp_message": "Check-in status cannot be confirmed safely. Please ask ZTE PIC/admin to verify.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "AI cannot safely judge check-in readiness."
}
```

## Blocked

```json
{
  "step": "check_in_report",
  "result": "Blocked",
  "missing_items": [],
  "risk_flags": ["access_blocked"],
  "required_action": "Resolve site access blocker before check-in.",
  "next_step": "",
  "whatsapp_message": "Check-in is blocked due to site access issue. Please resolve before proceeding.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Mandatory check-in cannot proceed."
}
```

## Completed

```json
{
  "step": "check_in_report",
  "result": "Completed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Continue to DPTW login if not already completed.",
  "next_step": "dptw_login",
  "whatsapp_message": "Check-in is already completed. Please continue with DPTW login.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Current state confirms check-in completion."
}
```

## Skipped

```json
{
  "step": "check_in_report",
  "result": "Skipped",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only under approved exception.",
  "next_step": "dptw_login",
  "whatsapp_message": "Check-in is marked skipped by approved exception. Please proceed with DPTW login.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Skipped is allowed only with explicit approved exception."
}
```

## Not Applicable

```json
{
  "step": "check_in_report",
  "result": "Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only if check-in is confirmed not required for this scope.",
  "next_step": "dptw_login",
  "whatsapp_message": "Check-in is marked not applicable for this scope. Please proceed with DPTW login.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "internal_notes": "Not Applicable is allowed only with explicit scope confirmation."
}
```
