# Instruction Record

Project: ZTE Site AI Navigator Skill System

Instruction date: 2026-05-07

Objective: Implement Phase 1 only by creating a clean orchestrator skill at `skills/zte-site-navigator-orchestrator/`.

Core operating principle: 核心原则：先查后写，先判后推。

Scope:
- Create command-center planning, task, result, testing, QA, and execution-log records.
- Create the Phase 1 orchestrator skill skeleton and eight lightweight reference contracts.
- Keep legacy guidebook files unchanged.
- Do not create chat triggers, runtime shortcut, SQLite, Firebase/iEPMS/TIPIC clients, or standalone step skills.
- Do not proceed to Phase 2.

Acceptance:
- Required command-center records exist.
- Required orchestrator files exist.
- Content defines routing, state interpretation, context loading, next-action decision, and structured output only.
- Testing and QA results are recorded.
