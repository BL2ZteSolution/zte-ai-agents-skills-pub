# TASK-007: Create Safe Chat Trigger Mode for OpenClaw Chat Selection

## Status

Done

## Objective

Create Phase 7 chat trigger mode documentation and a chat trigger policy for safe normal chat-triggered workflow selection and orchestrator routing decisions.

## Scope

- Create `skills/zte-site-navigator-orchestrator/references/chat-trigger-policy.md`.
- Create `skills/zte-site-navigator-orchestrator/SKILL.md`.
- Define chat-trigger mode responsibilities, chat-trigger selection categories, orchestrator routing decisions, and allowed queued system action hints.
- Optionally add a small orchestrator/context boundary note.
- Record programming, testing, and QA results.

## Out of Scope

- No raw Firebase client.
- No raw iEPMS client.
- No TIPIC client.
- No backend URLs or credentials.
- No SQLite or database code.
- No external API calls or network requests.
- No full workflow engine, step validation, or deep review.
- No remaining step skills or domain review skills.
- No Phase 8 work.

## Approved System Skill Names

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Chat Trigger-Side Allowed System Action Notes

- `read_firebase_state`
- `log_message_event`
- `create_async_job`

## Chat Trigger-Side Forbidden Direct Actions

- `patch_firebase_state`
- `write_iepms_column`

## Core Principle

核心原则：先查后写，先判后推。

Chat trigger mode selects the orchestrator first; it must not write final state or push workflow progression before judgement.

## Completion Notes

- Created `chat-trigger-policy.md` with metadata, chat-trigger mode rules, orchestrator routing decision shape, allowed system action hints, and fallback rules.
- Created `chat-trigger-policy.md` with strong, weak, and non-trigger examples.
- Added a small orchestrator/context boundary note.
- Verified no raw backend clients, URLs, credentials, SQLite, or Phase 8 work were introduced.
