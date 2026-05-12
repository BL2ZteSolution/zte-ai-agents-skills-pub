# TASK-012: Optimize Dashboard, Async Job, and Risk Tracking Contracts

## Status

Done

## Phase

Phase 12: Dashboard and Async Job Optimization

## Objective

Document dashboard projection, async job lifecycle, and risk management policy for ZTE Site AI Navigator while preserving compact state, approved system tool boundaries, and 核心原则：先查后写，先判后推。

## Scope

- Create `dashboard-model.md`.
- Create `job-queue-policy.md`.
- Create `risk-management-policy.md`.
- Align state, action, output, context, and regression checklist contracts only where needed.
- Record programming, testing, and QA results.

## Out of Scope

- Runtime Firebase, iEPMS, TIPIC, OCR, model, dashboard UI, backend worker, cron job, queue processor, browser automation, SQLite, URL, or credential implementation.
- New system tool names.
- New step skills or domain review skills.
- Chat-trigger workflow changes.
- Legacy guidebook modification.
- Phase 13 work.

## Acceptance Criteria

- New policy files exist and include required schemas, lifecycle rules, compactness guardrails, and core principle.
- Optional alignment files reference dashboard/job/risk contracts without duplicating heavy content.
- Regression checklist includes dashboard/job/risk contract checks.
- Testing and QA records are PASS.
