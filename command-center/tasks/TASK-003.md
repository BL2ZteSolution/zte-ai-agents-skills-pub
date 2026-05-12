# TASK-003

Title: Create Standalone Step Skill for DPTW Login

Assigned Agent Type: Chat Agent / DEV / TEST / QA records

Priority: High

Status: DONE

Risk Level: Medium

Objective:
Create `skills/step-dptw/` as the first standalone step skill. It validates only whether Step 2: DPTW Login can proceed.

Background:
Phase 3 proves the modular step skill pattern. DPTW is mandatory, simple, and safety-sensitive, so it is the first standalone step skill.

Input Files:
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- Existing Phase 1 and Phase 2 orchestrator files

Target Files / Areas:
- `skills/step-dptw/`
- `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- `skills/zte-site-navigator-orchestrator/references/action-registry.md`
- `command-center/agent-results/TASK-003/`
- `command-center/logs/execution-log.md`

Expected Output:
- `skills/step-dptw/SKILL.md`
- `skills/step-dptw/references/evidence-rules.md`
- `skills/step-dptw/references/pass-fail-criteria.md`
- `skills/step-dptw/references/response-templates.md`
- Minimal DPTW routing/action contract updates

Acceptance Criteria:
- Step skill is compact and single-purpose.
- Output JSON contract is present.
- All approved statuses are handled.
- Mandatory DPTW cannot be silently skipped.
- No raw Firebase/iEPMS/TIPIC integration.
- No legacy source modification.
- No Phase 4 step skill creation.

Dependencies:
- TASK-001 orchestrator contracts.
- TASK-002 compact fallback rules.

Parallel Group: Phase 3 First Standalone Step Skill

Testing Requirement:
Run file-level and content-level verification for required files, routing/action integration, result status coverage, principle placement, approved/outdated tool names, forbidden artifacts, and no Phase 4 work.

QA Requirement:
Verify Phase 3 scope compliance, roadmap alignment, Phase 1/2 architecture alignment, single-purpose design, DPTW evidence handling, status usage, routing integration, action registry integration, no raw API integration, approved tool names, core principle, and no scope creep.

Output File Path:
`command-center/agent-results/TASK-003/programming.md`

Testing File Path:
`command-center/agent-results/TASK-003/testing.md`

QA File Path:
`command-center/agent-results/TASK-003/qa.md`

User Action Required:
None for Phase 3.

Progress Update Required:
Record implementation, testing, QA, and final status in the execution log.

Notes:
Core operating principle: 核心原则：先查后写，先判后推。
