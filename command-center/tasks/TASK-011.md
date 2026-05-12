# TASK-011: Create End-to-End Scenario Tests

## Status

Done

## Phase

Phase 11: End-to-End Test Scenarios

## Objective

Create repeatable markdown scenario tests that validate routing correctness, step judgement behavior, domain review routing, chat trigger chat trigger boundary, system action contracts, output JSON consistency, state patch guardrails, next-step guardrails, approved system tool naming, and 核心原则：先查后写，先判后推。

## Scope

- Create `tests/site-navigator-scenarios/`.
- Create README, scenario template, twelve scenario files, and regression checklist.
- Record programming, testing, and QA results.
- Keep the work documentation-only and test-design-only.

## Out of Scope

- Runtime Firebase, iEPMS, TIPIC, OCR, model, browser automation, or SQLite implementation.
- New step skills, domain review skills, system tool names, or chat-trigger behavior.
- Backend URLs, credentials, or executable integration tests.
- Legacy guidebook modification.
- Phase 12 work.

## Acceptance Criteria

- Scenario directory contains all requested files.
- Every scenario includes expected route/action/decision/system action behavior and acceptance criteria.
- Every scenario verifies 核心原则：先查后写，先判后推。
- Only approved system skill names are used.
- Testing and QA results are recorded under `command-center/agent-results/TASK-011/`.
