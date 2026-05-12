# DPTW Response Templates

Use these compact JSON templates as response patterns. Adjust `missing_items`, `risk_flags`, and notes to match the evidence.

## Proceed

```json
{
  "step": "dptw_login",
  "result": "Proceed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed to EHS login/check.",
  "next_step": "ehs_login",
  "whatsapp_message": "DPTW login confirmed. Please proceed with EHS login/check.",
  "internal_notes": "DPTW evidence is sufficient for workflow progression."
}
```

## Pending

```json
{
  "step": "dptw_login",
  "result": "Pending",
  "missing_items": ["DPTW login confirmation or screenshot"],
  "risk_flags": ["missing_dptw_evidence"],
  "required_action": "Please provide DPTW login confirmation or screenshot.",
  "next_step": "",
  "whatsapp_message": "Please provide DPTW login confirmation or screenshot before proceeding.",
  "internal_notes": "Cannot proceed without DPTW evidence."
}
```

## Rework

```json
{
  "step": "dptw_login",
  "result": "Rework",
  "missing_items": ["clear DPTW evidence"],
  "risk_flags": ["unclear_screenshot"],
  "required_action": "Please resend clear DPTW evidence showing site and login status.",
  "next_step": "",
  "whatsapp_message": "The DPTW evidence is unclear. Please resend a clear screenshot showing site and login status.",
  "internal_notes": "Evidence provided but not sufficient."
}
```

## Escalate

```json
{
  "step": "dptw_login",
  "result": "Escalate",
  "missing_items": [],
  "risk_flags": ["permit_blocker"],
  "required_action": "Escalate to ZTE PIC/admin for permit or access issue.",
  "next_step": "",
  "whatsapp_message": "DPTW/permit issue detected. Please escalate to ZTE PIC/admin before continuing work.",
  "internal_notes": "Permit/access blocker requires human intervention."
}
```

## Manual Check Required

```json
{
  "step": "dptw_login",
  "result": "Manual Check Required",
  "missing_items": [],
  "risk_flags": ["manual_verification_required"],
  "required_action": "ZTE PIC/admin should manually verify DPTW status.",
  "next_step": "",
  "whatsapp_message": "DPTW status cannot be confirmed safely. Please ask ZTE PIC/admin to verify before proceeding.",
  "internal_notes": "AI cannot safely judge DPTW evidence."
}
```

## Blocked

```json
{
  "step": "dptw_login",
  "result": "Blocked",
  "missing_items": [],
  "risk_flags": ["dptw_login_failed"],
  "required_action": "Resolve DPTW login failure before continuing.",
  "next_step": "",
  "whatsapp_message": "DPTW login is not completed or failed. Please resolve it before continuing work.",
  "internal_notes": "Mandatory DPTW step is blocked."
}
```

## Completed

```json
{
  "step": "dptw_login",
  "result": "Completed",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Continue to EHS login/check if not already completed.",
  "next_step": "ehs_login",
  "whatsapp_message": "DPTW step is already completed. Please continue with EHS login/check.",
  "internal_notes": "Current state confirms DPTW completion."
}
```

## Skipped

```json
{
  "step": "dptw_login",
  "result": "Skipped",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only under approved exception.",
  "next_step": "ehs_login",
  "whatsapp_message": "DPTW is marked skipped by approved exception. Please proceed with EHS login/check.",
  "internal_notes": "Skipped is allowed only with explicit approved exception."
}
```

## Not Applicable

```json
{
  "step": "dptw_login",
  "result": "Not Applicable",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "Proceed only if DPTW is confirmed not required for this scope.",
  "next_step": "ehs_login",
  "whatsapp_message": "DPTW is marked not applicable for this scope. Please proceed with EHS login/check.",
  "internal_notes": "Not Applicable is allowed only with explicit scope confirmation."
}
```
