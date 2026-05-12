# TASK-005: Align System Skill Action Contracts and OpenClaw Metadata

## Status

Done

## Objective

Update Phase 5 documentation contracts so the orchestrator knows when and how to prepare approved system skill actions without implementing runtime clients or backend logic.

## Scope

- Update `skills/zte-site-navigator-orchestrator/references/action-registry.md`.
- Update `skills/zte-site-navigator-orchestrator/references/routing-rules.md`.
- Update `skills/zte-site-navigator-orchestrator/references/output-format.md`.
- Check or update `skills/zte-site-navigator-orchestrator/references/state-model.md`.
- Check or update `skills/zte-site-navigator-orchestrator/references/context-loading-policy.md`.
- Correct OpenClaw YAML frontmatter in existing new `SKILL.md` files.
- Record programming, testing, and QA results.

## Out of Scope

- No Firebase client implementation.
- No iEPMS client implementation.
- No TIPIC client implementation.
- No chat triggers, runtime shortcut, browser automation, SQLite, or real API calls.
- No placeholder system skill folders unless explicitly required.
- No domain review skills or remaining step skills.
- No Phase 6 work.

## Approved System Skill Names

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Required System Actions

- `read_firebase_state`
- `patch_firebase_state`
- `check_iepms_fishbone_data`
- `write_iepms_column`
- `log_message_event`
- `create_async_job`

## Core Principle

核心原则：先查后写，先判后推。

System actions provide compact data access or approved write-operation contracts only. The orchestrator remains responsible for routing, result judgement, required action, next step, and intended state patch decisions.

## Completion Notes

- Updated Phase 5 orchestrator system action contracts.
- Updated system routing, output, state model, and context loading guardrails.
- Corrected OpenClaw YAML metadata for existing new skill files.
- Verified no raw system implementation or Phase 6 work was started.
