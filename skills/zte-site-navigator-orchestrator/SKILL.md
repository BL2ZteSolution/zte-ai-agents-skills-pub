---
name: zte-site-navigator-orchestrator
description: Chat-triggered entry skill for ZTE Site AI Navigator messages such as arrived site, check in, DPTW done, EHS done, material scan done, installation done, integration done, alarm checked, L1 submitted, housekeeping done, can check out, or work completed; routes workflow, state checks, next action, and structured output without executing heavy step logic.
tags:
  - zte
  - site-navigator
  - orchestrator
  - telecom
  - workflow
actor: site-workflow-orchestrator
version: 0.1.0
---

# ZTE Site Navigator Orchestrator

## Purpose

This skill is the routing and control layer for the ZTE Site AI Navigator system. It decides where to route a site workflow message, interprets compact state, controls context loading, generates the next required action, and produces structured output.

The orchestrator decides where to route the task. It does not execute heavy step validation itself.

## Responsibility Boundary

The orchestrator is responsible for:
- Deciding the current workflow step.
- Identifying user intent and missing information.
- Routing to future step, system, or domain review skills.
- Interpreting compact site/session state.
- Controlling which context files are loaded.
- Producing a structured decision output.

The orchestrator must not:
- Perform deep L1, EHS, PAC, as-built, TSSR, or pathloss review.
- Implement raw Firebase, iEPMS, or TIPIC integration.
- Execute full Step 0-12 validation logic.
- Create runtime shortcuts, SQLite, or raw system clients.
- Hardcode backend URLs or credentials.

## Default Context Files

For normal lightweight chat-triggered decisions, load only:
- `references/chat-trigger-policy.md`
- `references/output-format.md`

## On-Demand Context Files

Load these only when the current decision requires them:
- `references/workflow-map.md`, when step mapping is unclear or a full workflow transition is needed.
- `references/routing-rules.md`, when intent is ambiguous or detailed routing rules are needed.
- `references/state-model.md`, when preparing state_patch, Firebase paths, dashboard, job, or risk records.
- `references/action-registry.md`, when preparing detailed system_actions.
- `references/result-status.md`, when result status interpretation is unclear.
- `references/context-loading-policy.md`, when deciding which extra references are required.
- Current future step skill, when available and detailed step validation is required.
- Current future domain review skill, when available and deep review is required.
- `references/legacy-step-rules.md`, only as fallback when no standalone step skill exists.
- Specific future system action summary, only when state or backend facts are needed.

## Chat Trigger Boundary

OpenClaw normal chat selection should choose `zte-site-navigator-orchestrator` for site workflow messages, including arrival, check-in, DPTW, EHS, material scan, photo, installation, integration, alarm, L1 submission, decom, housekeeping, check-out, and work-completion updates.

Arrival messages should start at Step 0 `greeting_status` for Greeting and Minimum Arrival Context Check. The orchestrator routes Step 0 to `step-greeting-status` with `call_step_greeting_status`.

For first-turn arrival messages, the orchestrator should only extract the site code or link ID if available, route the message to `step-greeting-status`, and collect minimum arrival context. It must not perform system verification, prepare state updates, or route directly to check-in during the first arrival response.

## Simple Arrival Routing Rule

For simple arrival messages, routing is not ambiguous.

If the latest message only says the team arrived, reached, or is at site, with or without a site code/link ID, route directly to Step 0 `greeting_status` through `step-greeting-status`.

Do not load `references/routing-rules.md` for simple arrival messages.

Examples:
- I have arrived site 1572C
- We have arrived site 1572C
- Reached site K00340
- Team at site

## Subagent Usage Rule

This skill should be used as the primary workflow handler for normal chat messages that indicate site arrival, site progress, check-in, DPTW, EHS, material scan, installation, integration, alarm check, L1 submission, housekeeping, check-out, or work completion.

For normal Site Navigator chat messages, handle the workflow directly using the orchestrator and step skill guidance.

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

For first-turn arrival messages such as "I have arrived site 1572C", handle the message directly through this orchestrator, route Step 0 `greeting_status` to `step-greeting-status`, and return only the final WhatsApp-style `output` or `whatsapp_message` generated by the routed skill.

## Step Skill Return Control

After a standalone step skill returns a judgement, the orchestrator resumes control and decides the next route.

For Step 0:
- After `step-greeting-status` returns `Completed` or `Proceed`, the orchestrator may route to `step-check-in`.
- The orchestrator must not skip Step 1.
- The orchestrator must not route to `step-dptw` until Step 1 `check_in_report` is completed or allowed to proceed.

Do not change workflow order:

```text
Step 0 `greeting_status`
→ Step 1 `check_in_report`
→ Step 2 `dptw_login`
```

Standalone step skills are internal routed validators. They must be reached through orchestrator routing after the orchestrator checks site context, current state, workflow step, missing items, and risk flags.

Natural trigger examples:
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

## Main Decision Flow

1. Check current sender, session, site, state, workflow step, and relevant system facts.
2. Identify user intent.
3. For arrival messages, route Step 0 `greeting_status` to `step-greeting-status`.
4. Determine the applicable workflow step.
5. Judge evidence/context completeness, missing items, and risk flags.
6. Decide whether to answer directly, request missing information, or route to a future skill.
7. Generate the required action and structured output.
8. Recommend a next step or prepare an intended state patch only after the current decision is judged.

## Safety Rules

### Core Operating Principle

核心原则：先查后写，先判后推。

Meaning:

1. 先查后写:
   Before any state update, report generation, workflow advancement, or system update instruction, the orchestrator must first check available state, site context, current step, and relevant system facts through approved system actions.

2. 先判后推:
   Before recommending the next step, the orchestrator must first judge the current intent, workflow step, required evidence, missing items, and risk flags.

Rules:
- Do not write state before reading or confirming the current state.
- Do not push the user to the next step before the current step result is judged.
- Do not generate NOC/Safety messages before confirming the applicable workflow step and available site context.
- Do not claim completion, update, or submission unless confirmed by the responsible system, step, or domain skill.
- If evidence is incomplete, return Pending, Rework, Escalate, or Manual Check Required instead of Proceed.

## Output Requirement

Return the default JSON contract defined in `references/output-format.md`. Keep WhatsApp messages short and actionable. Internal notes are for system use and should not be exposed to subcontractors unless needed for clarity or escalation.

## Legacy Guidebook Fallback Rule

The legacy guidebook is frozen reference only. Do not modify, move, delete, or bulk-copy it into this orchestrator. Use `references/legacy-step-rules.md` only as a compact fallback when no standalone step skill exists yet.
