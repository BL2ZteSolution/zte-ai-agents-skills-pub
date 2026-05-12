# TASK-004

Title: Create Priority Standalone Step Skills for Check-in, Alarm Check, and Check-out

Assigned Agent Type: Chat Agent / DEV / TEST / QA records

Priority: High

Status: DONE

Risk Level: Medium

Objective:
Create `step-check-in`, `step-alarm-check`, and `step-check-out` as compact standalone step skills, and update orchestrator routing/action contracts for those steps.

Background:
Phase 4 expands the modular step-skill pattern after `step-dptw`. These three steps are priority because they control formal arrival reporting, critical alarm risk, and site close-out.

Input Files:
- Roadmap and Phase 4 prompt files
- Existing Phase 1/2 orchestrator files
- Existing Phase 3 `step-dptw` pattern

Target Files / Areas:
- `skills/step-check-in/`
- `skills/step-alarm-check/`
- `skills/step-check-out/`
- `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- `skills/zte-site-navigator-orchestrator/references/action-registry.md`
- `command-center/agent-results/TASK-004/`
- `command-center/logs/execution-log.md`

Expected Output:
- Three new standalone step skills with `SKILL.md`, `evidence-rules.md`, `pass-fail-criteria.md`, and `response-templates.md`.
- Minimal orchestrator route/action integration updates.

Acceptance Criteria:
- Step skills are compact and single-purpose.
- Output JSON contracts are present.
- All approved statuses are handled.
- Check-in/check-out prepare exactly two message drafts only when context is sufficient.
- Alarm check blocks progression when blocking alarm exists.
- No raw Firebase/iEPMS/TIPIC/NMS integration.
- No legacy source modification.
- No Phase 5 work.

Dependencies:
- TASK-001 orchestrator contracts.
- TASK-002 legacy fallback rules.
- TASK-003 `step-dptw` pattern.

Parallel Group: Phase 4 Priority Step Skills

Testing Requirement:
Run file-level and content-level verification for required files, routing/action integration, status coverage, core principle placement, message-draft guardrails, approved/outdated tool names, forbidden artifacts, and no Phase 5 work.

QA Requirement:
Verify Phase 4 scope compliance, roadmap alignment, architecture alignment, single-purpose design, check-in/alarm/check-out evidence handling, routing integration, action registry integration, no raw API integration, approved tool names, core principle, and no scope creep.

Output File Path:
`command-center/agent-results/TASK-004/programming.md`

Testing File Path:
`command-center/agent-results/TASK-004/testing.md`

QA File Path:
`command-center/agent-results/TASK-004/qa.md`

User Action Required:
None for Phase 4.

Progress Update Required:
Record implementation, testing, QA, and final status in the execution log.

Notes:
Core operating principle: 核心原则：先查后写，先判后推。
