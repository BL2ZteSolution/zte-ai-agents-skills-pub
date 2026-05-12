# Planning Brief

Task ID: TASK-001

Title: Create Phase 1 Orchestrator Skill Skeleton and Reference Contracts

Intent:
Create a clean OpenClaw skill that acts as the routing and control layer for the ZTE Site AI Navigator workflow.

User Scenario:
A subcontractor, admin, or ZTE PIC sends a WhatsApp-style site workflow message. The orchestrator checks available state/context, judges intent and step status, routes to the correct future step/system/domain skill, and returns a compact structured decision.

Architecture Boundary:
- Orchestrator decides route and next action.
- Future step skills validate workflow steps.
- Future system skills provide data access only.
- Future domain skills provide quality judgement only.
- The legacy guidebook is frozen reference only.

Acceptance Criteria:
- Create `skills/zte-site-navigator-orchestrator/SKILL.md`.
- Create eight files under `skills/zte-site-navigator-orchestrator/references/`.
- Include the principle `核心原则：先查后写，先判后推。` in required files.
- Keep content lightweight and contract-focused.
- Avoid Phase 2 extraction or implementation work.

Testing Strategy:
Run file-level checks for required paths, forbidden artifacts, legacy immutability, hardcoded Firebase URL absence, forbidden Firebase operation usage, and required principle placement.

QA Strategy:
Review scope compliance, roadmap alignment, guideline alignment, file completeness, context-loading safety, no legacy modification, no scope creep, and decision guardrails.

---

Task ID: TASK-002

Title: Extract Legacy Step 0-12 Fallback Rules

Intent:
Update `skills/zte-site-navigator-orchestrator/references/legacy-step-rules.md` with compact fallback rules extracted from the frozen legacy guidebook.

User Scenario:
When no standalone step skill exists yet, the orchestrator may load this fallback reference on demand to understand compact Step 0-12 legacy workflow expectations without loading the full old guidebook.

Architecture Boundary:
- Update only `legacy-step-rules.md`.
- Keep the old guidebook read-only and unchanged.
- Keep fallback rules compact and non-primary.
- Use only approved system tool names: `firebase-db`, `iepms-column-writter`, and `iepms-fishbone-data-checker`.
- Do not create Phase 3 step skills or runtime/system implementations.

Acceptance Criteria:
- `legacy-step-rules.md` has Purpose, Loading Policy, Core Principle, Legacy Source, Step 0-12 Compact Rules, Fallback Result Rules, and System Dependency Guardrails.
- Each step uses the required field structure.
- The principle `核心原则：先查后写，先判后推。` is present and enforced.
- No outdated system tool names are introduced.
- No legacy source files are modified.

---

Task ID: TASK-003

Title: Create Standalone Step Skill for DPTW Login

Intent:
Create the first standalone step skill, `skills/step-dptw/`, to validate only whether Step 2: DPTW Login can proceed.

User Scenario:
When a subcontractor, admin, or ZTE PIC provides DPTW/CDPTW login information, the orchestrator routes the message to `step-dptw`, which judges DPTW readiness and returns compact structured output.

Architecture Boundary:
- `step-dptw` validates DPTW readiness only.
- It does not access raw Firebase, iEPMS, or TIPIC APIs.
- It does not update Firebase or iEPMS.
- It does not decide unrelated workflow steps.
- It does not generate check-in/check-out NOC/Safety messages.
- Orchestrator remains responsible for routing and next-action integration.

Acceptance Criteria:
- Create `skills/step-dptw/SKILL.md`.
- Create `skills/step-dptw/references/evidence-rules.md`.
- Create `skills/step-dptw/references/pass-fail-criteria.md`.
- Create `skills/step-dptw/references/response-templates.md`.
- Update DPTW routing in `routing-rules.md`.
- Update `call_step_dptw` in `action-registry.md`.
- Include `核心原则：先查后写，先判后推。`.
- Do not create Phase 4 step skills or runtime/system implementation.

---

Task ID: TASK-004

Title: Create Priority Standalone Step Skills for Check-in, Alarm Check, and Check-out

Intent:
Create the next three priority standalone step skills: `step-check-in`, `step-alarm-check`, and `step-check-out`.

User Scenario:
When the orchestrator detects check-in, alarm check, or check-out intent, it routes detailed step judgement to the matching standalone step skill, which returns compact structured output.

Architecture Boundary:
- Each skill validates only its assigned workflow step.
- Step skills do not call raw Firebase, iEPMS, TIPIC, or NMS APIs.
- Step skills do not update system state or close sessions directly.
- Check-in and check-out may prepare exactly two message drafts but must not claim the user forwarded them.
- Orchestrator remains responsible for routing and next-action integration.

Acceptance Criteria:
- Create `skills/step-check-in/` with `SKILL.md` and three reference files.
- Create `skills/step-alarm-check/` with `SKILL.md` and three reference files.
- Create `skills/step-check-out/` with `SKILL.md` and three reference files.
- Update check-in, alarm, and check-out routing in `routing-rules.md`.
- Update matching actions in `action-registry.md`.
- Include `核心原则：先查后写，先判后推。` in all three `SKILL.md` files.
- Do not create Phase 5 system implementation.

---

Task ID: TASK-005

Title: Align System Skill Action Contracts and OpenClaw Metadata

Intent:
Update Phase 5 documentation contracts so the orchestrator can route approved system data actions through compact action definitions without implementing runtime clients.

User Scenario:
When a site workflow decision needs Firebase state, iEPMS fishbone facts, an approved iEPMS column update, compact event logging, or async job recording, the orchestrator uses the action registry to prepare the correct system action and then makes the workflow judgement itself.

Architecture Boundary:
- Update orchestrator contracts only: action registry, routing rules, output format, state model, and context loading policy.
- Correct OpenClaw YAML frontmatter on existing new `SKILL.md` files.
- Use only approved system skill names: `firebase-db`, `iepms-column-writter`, and `iepms-fishbone-data-checker`.
- Do not implement Firebase, iEPMS, TIPIC, browser automation, chat triggers, runtime shortcuts, SQLite, or Phase 6 work.

Acceptance Criteria:
- System actions are exactly `read_firebase_state`, `patch_firebase_state`, `check_iepms_fishbone_data`, `write_iepms_column`, `log_message_event`, and `create_async_job`.
- Each system action has input, output, allowed, forbidden, decision boundary, and guardrail contracts.
- Routing rules send Firebase/iEPMS/fishbone needs through the action registry only.
- Output format defines `system_actions` item structure and system/state patch guardrails.
- State model and context policy enforce relative paths, compact context, and no raw backend loading by default.
- All new `SKILL.md` files start with OpenClaw YAML frontmatter.

---

Task ID: TASK-006

Title: Define Firebase State Model and Job Queue Contracts

Intent:
Define stable Phase 6 Firebase state, event, message log, job, dashboard, risk, and fishbone cache schemas without implementing Firebase runtime logic.

User Scenario:
When the orchestrator needs to read state, prepare an intended state patch, log a compact message/event, queue async work, summarize dashboard status, or track risk, it follows the documented Firebase relative paths and record schemas.

Architecture Boundary:
- Primary target is `state-model.md`.
- Align action registry, output format, and context loading policy only where needed for Phase 6 schema use.
- Firebase remains accessible only through `firebase-db` GET/PATCH contracts.
- No Firebase client, database code, chat triggers, runtime shortcut, SQLite, browser automation, or Phase 7 work.

Acceptance Criteria:
- Canonical site state, step state, step event, message log, async job, site job index, dashboard summary, risk, and `fbrCache` schemas are documented.
- Approved Firebase relative paths are present and relative only.
- Read/PATCH boundaries, state transitions, patch guardrails, job lifecycle, and compactness/privacy rules are documented.
- Approved system tool names remain `firebase-db`, `iepms-column-writter`, and `iepms-fishbone-data-checker`.
- No outdated tool names or raw implementation are introduced.

---

Task ID: TASK-007

Title: Create Safe Chat Trigger Mode for OpenClaw Chat Selection

Intent:
Create a lightweight OpenClaw chat trigger skeleton that can produce safe normal chat-triggered workflow selection and orchestrator routing decisions without becoming a workflow engine.

User Scenario:
When an incoming WhatsApp message is simple enough to enter normal chat-trigger mode, the chat trigger selects the orchestrator for normal routing and system-action decisions, then hands judgement to the orchestrator and step skills.

Architecture Boundary:
- Create `skills/zte-site-navigator-orchestrator/references/chat-trigger-policy.md` and `chat-trigger-policy.md`.
- Chat Trigger may parse metadata, detect simple intent, prepare safe replies, and prepare limited system action hints.
- Chat Trigger must not update state, call raw backends, load skill references, perform evidence review, advance workflow, or replace orchestrator/step skills.
- Use only approved system tool name in chat trigger action hints: `firebase-db`.

Acceptance Criteria:
- Chat-trigger documentation includes YAML frontmatter and safety boundaries.
- Chat trigger policy defines selection examples and step selection restrictions.
- Chat trigger policy uses explicit selection examples only.
- Chat Trigger action hints include only `read_firebase_state`, `log_message_event`, and `create_async_job`.
- No raw Firebase/iEPMS/TIPIC client, URL, credential, SQLite, or Phase 8 work is introduced.

---

Task ID: TASK-008

Title: Create Domain Review Skill Contracts

Intent:
Create six compact domain review skills that provide structured quality judgement for documents, photos, reports, survey, acceptance, and planning evidence without controlling workflow or implementing backend/model integrations.

User Scenario:
When a user submits or asks about L1, EHS, PAC, as-built, TSSR, or Pathloss evidence, the orchestrator routes the review request to the matching domain skill, receives a structured review result, and remains responsible for next action and state patch intent.

Architecture Boundary:
- Domain skills review evidence quality only.
- Orchestrator remains workflow/routing/state decision owner.
- Step skills remain workflow step validators.
- No Firebase, iEPMS, TIPIC, OCR, image model, browser automation, SQLite, URL, credential, or Phase 9 implementation.

Acceptance Criteria:
- Create six domain review skill folders with `SKILL.md` and five reference files each.
- Update orchestrator routing and action registry for six domain review actions.
- Keep domain review loading on demand only.
- Include OpenClaw YAML frontmatter and 核心原则：先查后写，先判后推 in every domain `SKILL.md`.
- Use only approved system tool names and no outdated names.
# Phase 9 Planning Brief

## TASK-009: Create Remaining Standalone Step Skills

Phase 9 completes the standalone step-skill layer by adding the remaining eight workflow validators:

- `step-ehs`
- `step-material-scan`
- `step-l1-before-photo`
- `step-installation`
- `step-integration`
- `step-l1-submission`
- `step-decom`
- `step-housekeeping`

The work is contract-only. Each new skill validates one workflow step, returns compact structured judgement, and leaves routing, state patch intent, and system writes to the orchestrator.

Core principle: 核心原则：先查后写，先判后推。

## Phase 9 Boundaries

- Do not modify frozen legacy guidebook sources.
- Do not recreate existing Phase 3/4 step skills except for minor routing/action alignment.
- Do not implement Firebase, iEPMS, TIPIC, OCR, image model, browser automation, chat-trigger behavior, SQLite, or runtime backend logic.
- Do not create new domain review skills.
- Do not proceed to Phase 10.

## Success Criteria

- Eight new step skill folders exist with `SKILL.md` and three reference files each.
- Each new `SKILL.md` has OpenClaw YAML frontmatter and includes `核心原则：先查后写，先判后推`.
- Each step skill is single-purpose and supports all approved result statuses.
- Orchestrator routing and action registry point the new step intents to the new step skills.
- Context loading keeps remaining step skills on demand only.
- Testing and QA results are recorded under `command-center/agent-results/TASK-009/`.
# Phase 10 Planning Brief

## TASK-010: Integration Consistency Review and Contract Alignment

Phase 10 reviews Phase 1-9 outputs for integration consistency. It is a QA-hardening phase, not a feature phase.

The review covers:
- Step key, action, route target, and next-step mapping.
- Step skill and domain review result status separation.
- OpenClaw YAML frontmatter.
- Approved system tool names.
- Firebase GET/PATCH-only boundary and relative path rules.
- Context loading boundaries.
- Output contract compatibility for orchestrator, system actions, state patch, step skills, domain review skills, and chat trigger hints.
- Chat trigger mode boundary.

Core principle: 核心原则：先查后写，先判后推。

## Phase 10 Boundaries

- Do not modify frozen legacy guidebook sources.
- Do not implement Firebase, iEPMS, TIPIC, OCR, image model, browser automation, SQLite, or runtime backend logic.
- Do not create new step or domain review skills.
- Do not expand the chat trigger into a workflow engine.
- Do not proceed to Phase 11.

## Success Criteria

- TASK-010 command-center records exist.
- Integration consistency report exists.
- Safe consistency defects are fixed in documentation/contract files only.
- Testing and QA records confirm canonical mappings, approved names, metadata, boundaries, and no scope creep.

# Phase 11 Planning Brief

## TASK-011: Create End-to-End Scenario Tests

Phase 11 creates repeatable markdown scenario tests for the ZTE Site AI Navigator skill system. The scenarios validate routing, step judgement behavior, domain review routing, chat trigger chat trigger boundary, system action contracts, output JSON consistency, state patch guardrails, next-step guardrails, approved system tool naming, and the core principle.

Core principle: 核心原则：先查后写，先判后推。

## Phase 11 Boundaries

- Do not modify frozen legacy guidebook sources.
- Do not implement Firebase, iEPMS, TIPIC, OCR, image model, browser automation, SQLite, or runtime backend logic.
- Do not create new step skills, domain review skills, or system tool names.
- Do not expand the chat trigger into a workflow engine.
- Do not proceed to Phase 12.

## Success Criteria

- `tests/site-navigator-scenarios/` exists with README, scenario template, twelve scenario files, and regression checklist.
- Each scenario defines input, assumed state, expected route/action/decision, system actions, guardrails, and acceptance criteria.
- Every scenario checks 核心原则：先查后写，先判后推。
- Testing and QA records confirm markdown-only test design and no runtime integration.

# Phase 12 Planning Brief

## TASK-012: Optimize Dashboard, Async Job, and Risk Tracking Contracts

Phase 12 refines documentation contracts for dashboard summary projection, async job lifecycle, and risk management. It remains documentation/contract optimization only.

Core principle: 核心原则：先查后写，先判后推。

## Phase 12 Boundaries

- Do not modify frozen legacy guidebook sources.
- Do not implement Firebase, iEPMS, TIPIC, OCR, image model, browser automation, dashboard UI, background workers, queue processors, cron jobs, SQLite, or runtime backend logic.
- Do not create new system tool names.
- Do not expand the chat trigger into a workflow engine.
- Do not create new step skills or domain review skills.
- Do not proceed to Phase 13.

## Success Criteria

- `dashboard-model.md`, `job-queue-policy.md`, and `risk-management-policy.md` exist under orchestrator references.
- State, action, output, context, and regression checklist contracts are aligned only where needed.
- Dashboard/job/risk records remain compact and derived from checked canonical state.
- Testing and QA records confirm boundaries, approved names, and no runtime implementation.

# Phase 13 Planning Brief

## TASK-013: Production Readiness and Packaging

Phase 13 prepares the ZTE Site AI Navigator skill system for production-ready handoff through packaging documents, release checklist, changelog, final QA, and release readiness review.

Core principle: 核心原则：先查后写，先判后推。

## Phase 13 Boundaries

- Do not modify frozen legacy guidebook sources.
- Do not implement Firebase, iEPMS, TIPIC, OCR, image model, browser automation, dashboard UI, backend workers, cron jobs, queue processors, SQLite, or runtime backend logic.
- Do not create new system tool names, step skills, or domain review skills.
- Do not expand the chat trigger into a workflow engine.
- Do not proceed beyond Phase 13.

## Success Criteria

- Top-level packaging docs exist: README, system overview, skill index, release checklist, changelog.
- `docs/` contains architecture summary, usage guide, and phase completion summary.
- TASK-013 programming, testing, QA, and release readiness records exist.
- Packaging validation confirms skill metadata readiness, approved names, safety boundaries, and no runtime implementation.
