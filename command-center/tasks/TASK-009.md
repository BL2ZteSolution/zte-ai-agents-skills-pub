# TASK-009: Create Remaining Standalone Step Skills

## Status

Done

## Objective

Create Phase 9 remaining standalone step skills for EHS, material scan, L1 before photo, installation, integration, L1 submission, decommissioning, and housekeeping.

## Scope

- Create `skills/step-ehs/`.
- Create `skills/step-material-scan/`.
- Create `skills/step-l1-before-photo/`.
- Create `skills/step-installation/`.
- Create `skills/step-integration/`.
- Create `skills/step-l1-submission/`.
- Create `skills/step-decom/`.
- Create `skills/step-housekeeping/`.
- Add `SKILL.md` and three reference files for each new step skill.
- Update orchestrator routing and action registry for these step skills.
- Update context loading policy only if needed.

## Out of Scope

- No frozen legacy guidebook modification.
- No Firebase, iEPMS, TIPIC, OCR, image model, browser automation, SQLite, chat trigger, or runtime backend implementation.
- No direct Firebase or iEPMS updates.
- No new domain review skills.
- No Phase 10 work.

## Approved System Skill Names

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Core Principle

核心原则：先查后写，先判后推。

Each step skill judges only its own workflow step. Orchestrator decides route, workflow progression, and intended state patch.

## Completion Notes

- Created eight remaining standalone step skills with required `SKILL.md` and three reference files each.
- Updated orchestrator routing rules and action registry for remaining step skill actions.
- Updated context loading policy to keep remaining step skills on demand only.
- Verified no raw backend/API/model implementation, no chat-trigger behavior change, and no Phase 10 work.
