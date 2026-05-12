# System Overview

## System Role

ZTE Site AI Navigator coordinates site workflow messages, state/context checks, step validation, domain review, and approved system action contracts. It is a modular OpenClaw chat-triggered skill system, not one heavy guidebook skill.

Core principle: 核心原则：先查后写，先判后推。

## Main Components

1. OpenClaw Skill Selector: detects normal site workflow chat intent and selects `zte-site-navigator-orchestrator`.
2. Orchestrator: routes messages, checks compact state, decides required action, and prepares structured output.
3. Step Skills: validate one workflow step at a time after orchestrator routing.
4. Domain Review Skills: review document, report, survey, acceptance, and planning evidence.
5. System Skill Contracts: define approved read, patch, fact-check, write, log, and async job actions.
6. Firebase State Model: defines canonical state, events, message logs, jobs, dashboard summaries, risks, and compact fishbone cache.
7. Dashboard / Job / Risk Policies: define compact operational projection, async job lifecycle, and risk handling.
8. Scenario Tests: markdown end-to-end validation scenarios and regression checklist.
9. Command Center: planning, task, programming, testing, QA, and release records.

## Message Flow

1. WhatsApp/user message arrives as normal OpenClaw chat.
2. OpenClaw selects `zte-site-navigator-orchestrator` for site workflow intent.
3. Orchestrator checks current context/state.
4. Orchestrator identifies intent/current step.
5. Orchestrator routes to step/domain/system action.
6. Step/domain skill returns structured judgement.
7. Orchestrator decides required action/next_step/state_patch intent.
8. System action confirms read/patch/write/job if applicable.
9. Dashboard/job/risk records are updated by approved system contract.

## Decision Ownership

- OpenClaw Skill Selector = initial chat intent selection only.
- Orchestrator = route and next-action owner.
- Step skill = step evidence judgement only, reached through orchestrator routing.
- Domain skill = quality review judgement only.
- System skill = data/write contract only.
- Firebase = storage only.

## Context Loading Principle

Never load the whole system.

Load only the current decision slice.

Use `context-loading-policy.md` as the source of truth for what to load by default, what to load on demand, and what must not be loaded into context.
