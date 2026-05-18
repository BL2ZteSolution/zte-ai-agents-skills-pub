---
name: step-greeting-status
description: Internal routed step validator for Step 0 Greeting and Minimum Arrival Context Check; use through zte-site-navigator-orchestrator, not direct chat selection.
tags:
  - zte
  - site-navigator
  - step-skill
  - greeting
  - arrival-context
actor: step-validator
version: 0.1.0
---

# Step Greeting Status

## Purpose

Handle Step 0: `greeting_status`.

This skill greets the user, extracts `site_code` or `link_id` when available, identifies arrival/start/resume session intent, collects minimum arrival context before check-in, and returns a short actionable WhatsApp message.

## Responsibility Boundary

`step-greeting-status` handles only Step 0 greeting and minimum arrival context judgement.

It does not:
- Access raw Firebase.
- Access raw iEPMS.
- Update Firebase.
- Update iEPMS.
- Generate NOC/Safety check-in drafts.
- Decide DPTW, EHS, material, alarm, check-out, or unrelated workflow steps.
- Route unrelated workflow steps.

## Input Expectation

The skill may receive:
- User message.
- Sender/session summary.
- Extracted site code or link ID if already detected.
- Compact site context from orchestrator state or system facts.
- Compact fishbone facts if the orchestrator already requested them.
- Current WhatsApp sender phone number if available.
- Current message timestamp or current local/chat time if available.
- Current risk flags if available.

## Minimum Arrival Context

- `arrival_time` is automatically set from current message timestamp or current local/chat time.
- `phone_number` is automatically set from current WhatsApp sender phone number.
- User only needs to provide or confirm:
  - `team_or_subcon_pic`
  - `access_or_safety_issue_status`

Site identity is also required before check-in handoff:
- `site_code` or `link_id`

## Main Decision Flow

1. Identify greeting, arrival, start-session, or resume-session intent.
2. Extract `site_code` or `link_id` from the user message when available.
3. Use current message timestamp or current local/chat time as `arrival_time`.
4. Use current WhatsApp sender phone number as `phone_number`.
5. Check compact site context provided by the orchestrator.
6. Identify missing minimum arrival context.
7. Do not ask user for arrival time unless timestamp/current time is unavailable or ambiguous.
8. Do not ask user for phone number unless sender phone number is unavailable or ambiguous.
9. Identify access or safety issue status.
10. Return a compact Step 0 judgement and short actionable WhatsApp message.
11. Return Step 0 judgement to `zte-site-navigator-orchestrator`.

## Result Status Contract

Use only: Proceed, Pending, Rework, Escalate, Manual Check Required, Blocked, Completed, Skipped, Not Applicable.

`step-greeting-status` may indicate Step 0 is complete and may set `next_step = check_in_report`, but it must not execute Step 1. Final next route is decided by `zte-site-navigator-orchestrator`.

## Orchestrator Handoff Rule

`step-greeting-status` must return its Step 0 judgement back to `zte-site-navigator-orchestrator`.

This skill does not make final workflow routing decisions.

When minimum arrival context is complete:
- return `result = Completed` or `Proceed`
- return the collected `minimum_arrival_context`
- return a short user-facing confirmation message
- do not decide or execute the next workflow step
- do not route directly to `step-check-in`
- do not mention DPTW, EHS, material scan, installation, integration, alarm check, L1 submission, housekeeping, check-out, or later workflow steps

The orchestrator decides whether to route to `step-check-in` after receiving the Step 0 result.

## Step 0 Completion Response

When the previous Step 0 response asked for minimum arrival context and the user provides team/PIC and access/safety issue status, handle it as lightweight Step 0 completion only.

Use the previously recorded or current `arrival_time`, and use the current WhatsApp sender `phone_number`.

Do not treat this as full workflow orchestration.

Rules:
1. Do not search workspace files.
2. Do not read `state-model.md`.
3. Do not read `result-status.md`.
4. Do not prepare `state_patch`.
5. Do not call system skills.
6. Do not route to DPTW or later workflow steps.
7. Do not mention DPTW, EHS, material scan, installation, integration, alarm check, L1 submission, housekeeping, or check-out.
8. Return only the user-facing WhatsApp confirmation.
9. The next workflow handoff is Check-in preparation only.
10. Routing control returns to `zte-site-navigator-orchestrator` after Step 0 judgement.

Use this WhatsApp template:

```text
✅ Arrival details confirmed.

Site: {site_code}
Time: {arrival_time}
Phone: {phone_number}
Team / PIC: {team_or_subcon_pic}
Access / Safety issue: {access_or_safety_issue_status}

Next step: Check-in preparation.
```

Structured behavior:
- If `team_or_subcon_pic` and `access_or_safety_issue_status` are present, site identity exists, and there is no access/safety blocker:
  - `result = Completed` or `Proceed`
  - `next_step = check_in_report`
  - `whatsapp_message` uses the template above
- Do not keep `arrival_time` as a missing item if current message timestamp/current time is available.
- Do not keep `phone_number` as a missing item if current WhatsApp sender phone number is available.
- Only ask for `arrival_time` if no timestamp/current time is available or if the user explicitly corrects the time.
- Only ask for `phone_number` if sender phone number is unavailable or ambiguous.
- If any minimum context is missing:
  - `result = Pending`
  - ask only for missing items
- If access or safety issue is present:
  - `result = Manual Check Required`, `Escalate`, or `Blocked`
  - do not proceed to check-in preparation

## Safety Rules

Core principle: 核心原则：先查后写，先判后推。

- 先查后写: Do not imply state update unless current compact context has been checked.
- 先判后推: Do not imply workflow progression until greeting/arrival context has been judged and returned to the orchestrator.
- If site identity or minimum arrival context is missing, return Pending.
- If access or safety issue is present, return Escalate, Manual Check Required, or Blocked.
- Do not generate check-in drafts.
- Do not execute Step 1.
- Do not mention DPTW.
- Do not claim system updates or external submissions.
- Do not call system skills during first-turn arrival.
- Do not prepare `state_patch` during first-turn arrival.

## Normal WhatsApp Response

For normal subcontractor/chat users, return a short human-readable WhatsApp message, not full JSON.

Use this template for normal arrival messages:

```text
📍 Site {site_code} arrival noted.
🕒 Arrival time recorded as {arrival_time}.
📞 Phone: {phone_number}

Please reply with:
1️⃣ Team / PIC
2️⃣ Any access or safety issue

Then proceed to check-in preparation. ✅
```

If `site_code` is not available, use the best available site reference or ask for the site code/link ID in the same short style.

## Output Requirement

Structured JSON is for internal, debug, or system use only:

```json
{
  "step": "greeting_status",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required | Blocked | Completed | Skipped | Not Applicable",
  "intent": "greeting | arrival | start_session | resume_session | status_request",
  "site_code": "",
  "link_id": "",
  "minimum_arrival_context": {
    "arrival_time": "",
    "phone_number": "",
    "team_or_subcon_pic": "",
    "access_or_safety_issue_status": ""
  },
  "missing_items": [],
  "risk_flags": [],
  "required_action": "",
  "next_step": "",
  "whatsapp_message": "",
  "internal_notes": ""
}
```

## Non-Responsibilities

This skill does not route the overall workflow, persist state, call raw system APIs, validate later workflow steps, or close any session.
