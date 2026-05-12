# TASK-001

Title: Create Phase 1 Orchestrator Skill Skeleton and Reference Contracts

Assigned Agent Type: Chat Agent / DEV / TEST / QA records

Priority: High

Status: DONE

Risk Level: Medium

Objective:
Create a lightweight orchestrator skill that defines routing, state interpretation, context loading, result status, action registry, and output contracts for Phase 1.

Background:
The roadmap defines Site AI Navigator as a system of small skills. Phase 1 creates only the orchestrator and must not implement future step, system, domain, chat trigger, or runtime components.

Input Files:
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/OPENCLAW_SKILL_DEVELOPMENT_GUIDELINE.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`

Target Files / Areas:
- `skills/zte-site-navigator-orchestrator/`
- `command-center/agent-results/TASK-001/`
- `command-center/logs/execution-log.md`

Expected Output:
- `SKILL.md`
- Eight reference files
- Programming, testing, and QA reports

Acceptance Criteria:
- Required files exist.
- Core operating principle is included where required.
- No legacy guidebook modification.
- No chat triggers, runtime shortcut, SQLite, Firebase/iEPMS/TIPIC clients, or standalone step skills.
- No Phase 2 work.

Dependencies:
- Command-center records must exist before implementation.
- Legacy files must remain frozen.

Parallel Group: Phase 1 Orchestrator Foundation

Testing Requirement:
Run file-level verification for required files, forbidden artifacts, legacy status, Firebase URL absence, forbidden operation usage, and required principle placement.

QA Requirement:
Verify Phase 1 scope compliance, roadmap alignment, OpenClaw guideline alignment, file completeness, context-loading safety, no scope creep, and guardrail correctness.

Output File Path:
`command-center/agent-results/TASK-001/programming.md`

Testing File Path:
`command-center/agent-results/TASK-001/testing.md`

QA File Path:
`command-center/agent-results/TASK-001/qa.md`

User Action Required:
None for Phase 1.

Progress Update Required:
Record implementation, testing, QA, and final status in the execution log.

Notes:
Core operating principle: 核心原则：先查后写，先判后推。
