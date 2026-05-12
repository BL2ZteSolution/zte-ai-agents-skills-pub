# Task Breakdown

## TASK-001

Title: Create Phase 1 Orchestrator Skill Skeleton and Reference Contracts

Narrow Work Items:
- Record planning and task scope in command-center.
- Create orchestrator skill folder.
- Create `SKILL.md`.
- Create `workflow-map.md`.
- Create `state-model.md`.
- Create `routing-rules.md`.
- Create `result-status.md`.
- Create `action-registry.md`.
- Create `context-loading-policy.md`.
- Create `output-format.md`.
- Create fallback-only `legacy-step-rules.md`.
- Verify required files and forbidden artifacts.
- Record testing and QA results.

Out of Scope:
- Runtime chat triggers.
- Firebase/iEPMS/TIPIC implementation.
- SQLite.
- Standalone step skills.
- Heavy legacy prompt extraction.
- Phase 2 work.

---

## TASK-002

Title: Extract Legacy Step 0-12 Fallback Rules

Narrow Work Items:
- Record Phase 2 task scope in command-center.
- Read the frozen legacy guidebook as read-only source.
- Summarize Step 0-12 business rules into fallback format.
- Update only `skills/zte-site-navigator-orchestrator/references/legacy-step-rules.md`.
- Preserve Phase 1 orchestrator boundaries.
- Verify old guidebook files remain unchanged.
- Verify no Phase 3 or runtime artifacts are created.
- Record testing and QA results.

Out of Scope:
- Modifying old guidebook files.
- Editing `SKILL.md` or other Phase 1 reference contracts.
- Creating standalone step skills.
- Creating chat triggers, runtime shortcut, SQLite, or system clients.
- Hardcoding backend URLs or implementation details.

---

## TASK-003

Title: Create Standalone Step Skill for DPTW Login

Narrow Work Items:
- Record Phase 3 task scope in command-center.
- Create `skills/step-dptw/`.
- Create `SKILL.md`.
- Create `references/evidence-rules.md`.
- Create `references/pass-fail-criteria.md`.
- Create `references/response-templates.md`.
- Update DPTW route rule in orchestrator `routing-rules.md`.
- Update `call_step_dptw` action contract in orchestrator `action-registry.md`.
- Verify no legacy files or unrelated skill files were modified.
- Record testing and QA results.

Out of Scope:
- Creating any other step skill.
- Creating chat triggers, runtime shortcut, SQLite, Firebase/iEPMS/TIPIC clients, or raw API integrations.
- Heavy legacy prompt copying.
- Phase 4 work.

---

## TASK-004

Title: Create Priority Standalone Step Skills for Check-in, Alarm Check, and Check-out

Narrow Work Items:
- Record Phase 4 task scope in command-center.
- Create `skills/step-check-in/` files.
- Create `skills/step-alarm-check/` files.
- Create `skills/step-check-out/` files.
- Update orchestrator route rules for check-in, alarm, and check-out signals.
- Update `call_step_check_in`, `call_step_alarm_check`, and `call_step_check_out` action contracts.
- Verify no legacy files or unrelated skill files were modified.
- Record testing and QA results.

Out of Scope:
- Creating remaining step skills.
- Creating system skills or raw API clients.
- Creating chat triggers, runtime shortcut, SQLite, or backend implementation.
- Phase 5 work.

---

## TASK-005

Title: Align System Skill Action Contracts and OpenClaw Metadata

Narrow Work Items:
- Record Phase 5 task scope in command-center.
- Update `action-registry.md` with approved system action contracts.
- Update `routing-rules.md` with system data routing rules.
- Update `output-format.md` with `system_actions` item format and guardrails.
- Update or confirm `state-model.md` Firebase relative path boundary.
- Update or confirm `context-loading-policy.md` compact system context boundary.
- Correct OpenClaw YAML frontmatter in existing new `SKILL.md` files.
- Verify approved names, forbidden names, no raw implementation, and no Phase 6 scope creep.
- Record testing and QA results.

Out of Scope:
- Creating system skill folders or raw API clients.
- Creating remaining step skills or domain review skills.
- Creating chat triggers, runtime shortcut, browser automation, SQLite, or backend implementation.
- Phase 6 work.

---

## TASK-006

Title: Define Firebase State Model and Job Queue Contracts

Narrow Work Items:
- Record Phase 6 task scope in command-center.
- Expand `state-model.md` into a complete Firebase state model and record schema reference.
- Align `action-registry.md` only where Phase 6 schema references are needed.
- Align `output-format.md` only where `system_actions` and intended `state_patch` need schema fields.
- Align `context-loading-policy.md` only where Firebase state loading rules are needed.
- Verify approved relative paths, schemas, read/PATCH boundary, patch guardrails, job lifecycle, compactness rules, approved names, and no Phase 7 work.
- Record programming, testing, and QA results.

Out of Scope:
- Implementing Firebase/iEPMS/TIPIC clients or database code.
- Creating chat triggers, runtime shortcut, browser automation, SQLite, remaining step skills, or domain review skills.
- Creating real API calls or backend jobs.
- Phase 7 work.

---

## TASK-007

Title: Create Safe Chat Trigger Mode for OpenClaw Chat Selection

Narrow Work Items:
- Record Phase 7 task scope in command-center.
- Create `skills/zte-site-navigator-orchestrator/references/chat-trigger-policy.md`.
- Create `skills/zte-site-navigator-orchestrator/SKILL.md`.
- Define safe intent categories, safe replies, orchestrator routing decisions, and limited system action hints.
- Add a small orchestrator/context note if needed to document chat-trigger boundary.
- Verify no raw clients, network calls, URLs, credentials, SQLite, old guidebook changes, or Phase 8 work.
- Record programming, testing, and QA results.

Out of Scope:
- Full workflow engine behavior.
- Firebase/iEPMS/TIPIC client implementation.
- Step validation, deep review, or image/document analysis.
- State patches, iEPMS writes, database code, chat triggers beyond the one requested chat trigger, and Phase 8 work.

---

## TASK-008

Title: Create Domain Review Skill Contracts

Narrow Work Items:
- Record Phase 8 task scope in command-center.
- Create `l1-report-review`, `ehs-review`, `pac-review`, `as-built-review`, `tssr-review`, and `pathloss-review`.
- For each domain skill, create `SKILL.md` plus `review-scope.md`, `evidence-rules.md`, `judgement-criteria.md`, `output-schema.md`, and `response-templates.md`.
- Update orchestrator `routing-rules.md` with domain review routing.
- Update orchestrator `action-registry.md` with full domain review action contracts.
- Update `context-loading-policy.md` if needed for on-demand domain loading.
- Verify all files, YAML metadata, status coverage, approved names, no raw integrations, and no Phase 9 work.
- Record programming, testing, and QA results.

Out of Scope:
- Runtime AI/model/OCR/API integration.
- Firebase, iEPMS, TIPIC clients or direct updates.
- Remaining step skills.
- Browser automation, SQLite, backend URLs, credentials, and Phase 9 work.

---

## TASK-009

Title: Create Remaining Standalone Step Skills

Narrow Work Items:
- Record Phase 9 task scope in command-center.
- Create `step-ehs`, `step-material-scan`, `step-l1-before-photo`, `step-installation`, `step-integration`, `step-l1-submission`, `step-decom`, and `step-housekeeping`.
- For each new step skill, create `SKILL.md`, `evidence-rules.md`, `pass-fail-criteria.md`, and `response-templates.md`.
- Add OpenClaw YAML frontmatter to every new `SKILL.md`.
- Update orchestrator `routing-rules.md` for remaining step intents.
- Update orchestrator `action-registry.md` with remaining `call_step_*` action contracts.
- Update `context-loading-policy.md` only where needed for on-demand remaining step loading.
- Verify all files, status coverage, approved names, no raw integrations, and no Phase 10 work.
- Record programming, testing, and QA results.

Out of Scope:
- Recreating existing `step-dptw`, `step-check-in`, `step-alarm-check`, or `step-check-out`.
- Runtime Firebase/iEPMS/TIPIC clients or direct system updates.
- OCR, image model API, browser automation, chat-trigger behavior, SQLite, backend URLs, credentials, and Phase 10 work.
- New domain review skills.

---

## TASK-010

Title: Integration Consistency Review and Contract Alignment

Narrow Work Items:
- Record Phase 10 task scope in command-center.
- Inspect orchestrator references.
- Inspect all standalone step skills.
- Inspect all domain review skills.
- Inspect chat trigger mode if present.
- Verify canonical step key/action/next-step mappings.
- Verify result status separation between step skills and domain review skills.
- Verify OpenClaw YAML frontmatter and core principle placement.
- Verify approved system tool names and remove outdated names where safe.
- Fix clearly safe consistency defects in documentation/contract files only.
- Create `integration-consistency-report.md`.
- Record programming, testing, and QA results.

Out of Scope:
- New capabilities or runtime integrations.
- New step skills or domain review skills.
- Firebase/iEPMS/TIPIC/OCR/model/browser/SQLite implementation.
- Chat-trigger workflow engine expansion.
- Legacy guidebook modification.
- Phase 11 work.

---

## TASK-011

Title: Create End-to-End Scenario Tests

Narrow Work Items:
- Record Phase 11 task scope in command-center.
- Create `tests/site-navigator-scenarios/`.
- Create scenario index and execution guide in `README.md`.
- Create reusable `scenario-template.md`.
- Create twelve markdown scenario files covering normal flow, missing context/evidence, blockers, domain review, system actions, chat trigger chat trigger, state patch, and iEPMS write guardrails.
- Create `regression-checklist.md` for approved system names, metadata, routing, output contracts, and context boundaries.
- Verify no runtime clients, URLs, credentials, SQLite, browser automation, or Phase 12 work is introduced.
- Record programming, testing, and QA results.

Out of Scope:
- Executable/runtime test framework work.
- Firebase/iEPMS/TIPIC/OCR/model/browser/SQLite implementation.
- New step skills, domain review skills, or system tool names.
- Chat-trigger behavior changes.
- Legacy guidebook modification.
- Phase 12 work.

---

## TASK-012

Title: Optimize Dashboard, Async Job, and Risk Tracking Contracts

Narrow Work Items:
- Record Phase 12 task scope in command-center.
- Create `dashboard-model.md`.
- Create `job-queue-policy.md`.
- Create `risk-management-policy.md`.
- Align `state-model.md` with Phase 12 policy references and dashboard schema additions.
- Align `action-registry.md` for `create_async_job` job types and guardrails.
- Align `output-format.md` with `create_async_job` input summary expectations.
- Align `context-loading-policy.md` for dashboard/job/risk references on demand only.
- Update `tests/site-navigator-scenarios/regression-checklist.md` with dashboard/job/risk checks.
- Verify no raw backend/UI/worker/client implementation and no Phase 13 work.
- Record programming, testing, and QA results.

Out of Scope:
- Runtime backend clients, dashboard UI, background workers, queue processors, cron jobs, browser automation, OCR/model integration, SQLite, URLs, or credentials.
- New system tool names, step skills, domain review skills, or chat-trigger behavior.
- Legacy guidebook modification.
- Phase 13 work.

---

## TASK-013

Title: Production Readiness and Packaging

Narrow Work Items:
- Record Phase 13 task scope in command-center.
- Create top-level `README.md`.
- Create `SYSTEM_OVERVIEW.md`.
- Create `SKILL_INDEX.md`.
- Create `RELEASE_CHECKLIST.md`.
- Create `CHANGELOG.md`.
- Create `docs/architecture-summary.md`.
- Create `docs/how-to-use-site-navigator.md`.
- Create `docs/phase-completion-summary.md`.
- Create final release readiness review.
- Verify skill metadata, approved system names, packaging files, no legacy modification, and no runtime implementation.
- Record programming, testing, and QA results.

Out of Scope:
- New runtime capability or architecture changes.
- Firebase/iEPMS/TIPIC/OCR/model/browser/SQLite/dashboard UI/backend worker/cron/queue processor implementation.
- New step skills, domain review skills, system tool names, or chat-trigger workflow behavior.
- Legacy guidebook modification.
- Phase 14 work.
