# Check-out Response Templates

## Proceed

```json
{
  "step": "check_out_report",
  "result": "Proceed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Please manually forward the two check-out messages to CelcomDigi NOC and ZTE Safety.",
  "next_step": "session_closed",
  "whatsapp_message": "Check-out drafts are ready. Please manually forward both messages to CelcomDigi NOC and ZTE Safety.",
  "message_drafts": {
    "celcomdigi_noc": "[CHECK-OUT][CelcomDigi NOC]\nSite: {site_code}\nLink/Site ID: {link_id}\nProgress: {final_progress}\nPending Items: {pending_items}\nRisk/Alarm Status: {risk_or_alarm_status}\nTeam Status: Leaving site / work completed as reported.\nTime: {check_out_time}",
    "zte_safety": "[CHECK-OUT][ZTE Safety]\nSite: {site_code}\nLink/Site ID: {link_id}\nProgress: {final_progress}\nSafety/Housekeeping: {housekeeping_status}\nPending/Risk: {pending_items_or_risks}\nTeam Status: Leaving site / work completed as reported.\nTime: {check_out_time}"
  },
  "session_closure_recommendation": "Recommend session closure after user confirms both messages were forwarded.",
  "internal_notes": "Check-out context sufficient. User must manually forward both drafts."
}
```

## Pending

```json
{
  "step": "check_out_report",
  "result": "Pending",
  "missing_items": ["final progress", "pending items", "alarm status", "housekeeping status"],
  "risk_flags": ["missing_final_progress", "missing_alarm_status", "missing_housekeeping_status"],
  "required_action": "Provide final progress, pending items, alarm status, and housekeeping status.",
  "next_step": "",
  "whatsapp_message": "Please provide final progress, pending items, alarm status, and housekeeping status before check-out.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "",
  "internal_notes": "Check-out context incomplete."
}
```

## Rework

```json
{
  "step": "check_out_report",
  "result": "Rework",
  "missing_items": ["corrected check-out summary"],
  "risk_flags": ["site_mismatch"],
  "required_action": "Correct incomplete or inconsistent check-out information.",
  "next_step": "",
  "whatsapp_message": "The check-out details are incomplete or inconsistent. Please resend corrected progress and risk summary.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "",
  "internal_notes": "Check-out information needs correction."
}
```

## Escalate

```json
{
  "step": "check_out_report",
  "result": "Escalate",
  "missing_items": [],
  "risk_flags": ["unresolved_critical_blocker"],
  "required_action": "Escalate unresolved blocker to ZTE PIC/admin before closing site.",
  "next_step": "",
  "whatsapp_message": "Critical blocker remains. Please escalate to ZTE PIC/admin before check-out closure.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "Do not close session until blocker is resolved or accepted by responsible party.",
  "internal_notes": "Critical unresolved blocker prevents closure."
}
```

## Manual Check Required

```json
{
  "step": "check_out_report",
  "result": "Manual Check Required",
  "missing_items": [],
  "risk_flags": ["manual_verification_required"],
  "required_action": "ZTE PIC/admin should manually verify check-out readiness.",
  "next_step": "",
  "whatsapp_message": "Check-out readiness cannot be confirmed safely. Please ask ZTE PIC/admin to verify.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "",
  "internal_notes": "AI cannot safely judge check-out readiness."
}
```

## Blocked

```json
{
  "step": "check_out_report",
  "result": "Blocked",
  "missing_items": [],
  "risk_flags": ["unsafe_to_leave"],
  "required_action": "Resolve unsafe leaving condition before check-out.",
  "next_step": "",
  "whatsapp_message": "Check-out is blocked because the site is not safe to leave. Please resolve before closure.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "Do not close session.",
  "internal_notes": "Unsafe site condition blocks check-out."
}
```

## Completed

```json
{
  "step": "check_out_report",
  "result": "Completed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "No further check-out action required.",
  "next_step": "session_closed",
  "whatsapp_message": "Check-out is already completed.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "Session may remain closed if already confirmed.",
  "internal_notes": "Current state confirms check-out completion."
}
```

## Skipped

```json
{
  "step": "check_out_report",
  "result": "Skipped",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only under approved exception.",
  "next_step": "session_closed",
  "whatsapp_message": "Check-out is marked skipped by approved exception.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "Session closure only under approved exception.",
  "internal_notes": "Skipped is allowed only with explicit approved exception."
}
```

## Not Applicable

```json
{
  "step": "check_out_report",
  "result": "Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only if check-out is confirmed not required for this scope.",
  "next_step": "session_closed",
  "whatsapp_message": "Check-out is marked not applicable for this scope.",
  "message_drafts": { "celcomdigi_noc": "", "zte_safety": "" },
  "session_closure_recommendation": "Session closure only with explicit scope confirmation.",
  "internal_notes": "Not Applicable is allowed only with explicit scope confirmation."
}
```
