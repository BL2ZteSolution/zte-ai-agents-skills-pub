# ZTE Site AI Navigator Skill System

## Purpose

ZTE Site AI Navigator is a modular OpenClaw chat-triggered skill system for field site workflow guidance, routing, step validation, domain review, system action contracts, and dashboard/job/risk policies.

## Architecture Summary

```text
Site AI Navigator = OpenClaw chat-triggered skill system
OpenClaw Skill Selector = Detects site workflow chat intent
Orchestrator Skill = Routing / state / next action
Step Skills = Individual workflow step validation
System Skills = API/data access contracts
Domain Review Skills = Deep quality review
Firebase = State/session/job/dashboard/risk storage
```

## Core Principle

核心原则：先查后写，先判后推。

- Check current state, context, and facts before state patches, write requests, dashboard completion, or context-dependent message generation.
- Judge current step, evidence, missing items, and risks before workflow progression.

## Folder Structure

```text
skills/
├── zte-site-navigator-orchestrator/
├── step-check-in/
├── step-dptw/
├── step-ehs/
├── step-material-scan/
├── step-l1-before-photo/
├── step-installation/
├── step-integration/
├── step-alarm-check/
├── step-l1-submission/
├── step-decom/
├── step-housekeeping/
├── step-check-out/
├── l1-report-review/
├── ehs-review/
├── pac-review/
├── as-built-review/
├── tssr-review/
└── pathloss-review/

tests/
└── site-navigator-scenarios/

command-center/
```

## Approved System Tools

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Safety Boundaries

- No Firebase URL in orchestrator.
- Firebase through `firebase-db` only.
- GET/PATCH only.
- No PUT.
- No DELETE.
- No SQLite.
- No raw API response in context/state/dashboard/job/risk.
- No direct iEPMS write from step/domain skills.
- No workflow progression without judgement.
- No check-in/check-out forwarding claim unless the user confirms manual forwarding.
- No system update success claim unless the approved system skill confirms it.

## How to Continue Development

- Use command-center tasks.
- Work phase by phase.
- Commit after each phase.
- Run scenario regression checks.
- Preserve approved naming exactly.
- Do not modify `old-file/zte-subcon-guidebook/`.
