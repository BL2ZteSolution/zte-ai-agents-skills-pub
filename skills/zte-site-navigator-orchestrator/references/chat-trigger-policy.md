# Chat Trigger Policy

## Purpose

OpenClaw normal chat selection should choose `zte-site-navigator-orchestrator` for ZTE site workflow intent. The orchestrator is the first selected skill for site workflow chat, then routes to step, domain, or system skills as needed.

## Strong Trigger Examples

Select `zte-site-navigator-orchestrator` when the user message indicates a site workflow event, progress update, blocker, status request, or closure request.

Examples:
- I have arrived site
- I reached site
- Site team arrived
- Check in
- DPTW done
- CDPTW login done
- EHS done
- Material scan done
- Before photo uploaded
- Installation done
- Integration done
- Alarm checked
- No alarm
- L1 submitted
- Decom done
- Housekeeping done
- Can check out
- Work completed
- What is the current site status?
- What next for this site?
- Site blocked by access issue
- Customer rejected the report

## Subagent Usage Rule

For normal chat messages that match strong site workflow triggers, OpenClaw should select `zte-site-navigator-orchestrator` and handle the workflow directly using orchestrator and step skill guidance.

This applies especially to first-turn site arrival messages.

Strong examples:
- I have arrived site 1572C
- I arrived site 1572C
- We have arrived site 1572C
- Arrived at site 1572C
- Reached site 1572C
- Team reached site 1572C
- Team at site 1572C
- Site 1572C arrived
- I am at site 1572C

When matched:
1. Select and run `zte-site-navigator-orchestrator` directly in the normal workflow path.
2. Do not spawn a subagent for lightweight workflow handling.
3. Route Step 0 `greeting_status` to `step-greeting-status`.
4. Return only final user-facing `output` or `whatsapp_message`.
5. Do not expose internal processing notes or full JSON to the user.
6. Do not bypass the orchestrator.

Subagents should only be spawned for system tasks or heavy external work, such as:
- Firebase read/write
- iEPMS fishbone check
- iEPMS column write
- L1/EHS/PAC/TSSR/Pathloss document review
- attachment/photo/document analysis
- other slow or heavy backend/system work

Do not spawn subagents for normal lightweight workflow handling, including:
- first-turn arrival greeting
- Step 0 completion
- Step 0 to Step 1 handoff
- simple check-in preparation
- normal workflow routing
- WhatsApp response formatting
- reading step skill guidance

## Weak Trigger Examples

Select `zte-site-navigator-orchestrator` when the message likely belongs to site workflow but lacks enough context. The orchestrator should ask for missing site code, link ID, current step, or evidence instead of routing directly to a standalone step skill.

Examples:
- Done
- Uploaded
- Completed
- Please check
- Can proceed?
- Need help
- Status?
- PIC asking update
- Already sent
- Team waiting

## Non-Trigger Examples

Do not select Site Navigator for messages unrelated to ZTE site workflow.

Examples:
- General coding questions
- Personal calendar requests
- Non-site document editing
- Generic weather, news, or finance questions
- OpenClaw configuration questions unrelated to Site Navigator
- Requests to modify unrelated repositories

## Direct Step Skill Selection Restriction

Standalone step skills must not be selected directly from normal chat messages. They are internal validators reached only through orchestrator routing after the orchestrator checks compact site context, current state, workflow step, missing items, and risk flags.

Normal chat first selects:

```text
zte-site-navigator-orchestrator
```

The orchestrator may then route to:
- `step-greeting-status`
- `step-check-in`
- `step-dptw`
- `step-ehs`
- `step-material-scan`
- `step-l1-before-photo`
- `step-installation`
- `step-integration`
- `step-alarm-check`
- `step-l1-submission`
- `step-decom`
- `step-housekeeping`
- `step-check-out`

The routing decision must preserve 核心原则：先查后写，先判后推.

Arrival messages selected by normal chat must enter Step 0 `greeting_status` first. The orchestrator routes Step 0 to `step-greeting-status`, then routes to `step-check-in` only after minimum arrival context is sufficient.
