# TASK-008: Create Domain Review Skill Contracts

## Status

Done

## Objective

Create Phase 8 domain review skills for structured document/report/evidence quality judgement while keeping workflow routing, next action, and state patch ownership in the orchestrator.

## Scope

- Create `skills/l1-report-review/`.
- Create `skills/ehs-review/`.
- Create `skills/pac-review/`.
- Create `skills/as-built-review/`.
- Create `skills/tssr-review/`.
- Create `skills/pathloss-review/`.
- Add `SKILL.md` and five reference files for each.
- Update orchestrator routing and action registry for domain reviews.
- Update context loading policy only if needed.

## Out of Scope

- No raw Firebase/iEPMS/TIPIC client.
- No OCR pipeline or image model API integration.
- No browser automation.
- No SQLite.
- No backend URLs or credentials.
- No direct Firebase or iEPMS updates.
- No remaining step skills.
- No Phase 9 work.

## Approved System Skill Names

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Core Principle

核心原则：先查后写，先判后推。

Domain skills judge evidence quality only. Orchestrator decides route, next action, and intended state patch.

## Completion Notes

- Created six domain review skill folders with required `SKILL.md` and five reference files each.
- Updated orchestrator routing and action registry for domain review skills.
- Updated context loading policy to keep domain review loading on demand only.
- Verified no raw backend/API/model/OCR implementation and no Phase 9 work were introduced.
