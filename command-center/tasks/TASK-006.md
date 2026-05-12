# TASK-006: Define Firebase State Model and Job Queue Contracts

## Status

Done

## Objective

Define Phase 6 Firebase state model and job queue contracts as documentation only. This task stabilizes schemas, relative paths, record structures, state transitions, patch boundaries, compactness rules, and job lifecycle expectations.

## Scope

- Update `skills/zte-site-navigator-orchestrator/references/state-model.md`.
- Align `action-registry.md`, `output-format.md`, and `context-loading-policy.md` only if required by Phase 6 schemas.
- Record programming, testing, and QA results.

## Out of Scope

- No Firebase runtime integration.
- No iEPMS or TIPIC client implementation.
- No database code.
- No chat triggers or runtime shortcut.
- No SQLite.
- No browser automation or real API calls.
- No unsupported tool names.
- No domain review skills or remaining step skills.
- No Phase 7 work.

## Approved System Skill Names

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Core Principle

核心原则：先查后写，先判后推。

Read or confirm current state before any intended patch. Judge the current step before workflow advancement. Store compact summaries only.

## Completion Notes

- Expanded `state-model.md` into the Phase 6 Firebase state model and job queue contract reference.
- Aligned action registry, output format, and context loading policy with Phase 6 schema usage.
- Verified no runtime Firebase, iEPMS, TIPIC, chat trigger, SQLite, database code, or Phase 7 work was introduced.
