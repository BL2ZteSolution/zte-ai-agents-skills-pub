# TASK-002

Title: Extract Legacy Step 0-12 Fallback Rules

Assigned Agent Type: Chat Agent / DEV / TEST / QA records

Priority: High

Status: DONE

Risk Level: Medium

Objective:
Extract compact Step 0-12 fallback workflow rules from the frozen legacy guidebook into `skills/zte-site-navigator-orchestrator/references/legacy-step-rules.md`.

Background:
Phase 1 created a placeholder fallback file. Phase 2 converts it into a compact on-demand legacy reference while preserving the orchestrator as a routing/control layer.

Input Files:
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-2.md`
- Existing Phase 1 orchestrator files
- Frozen legacy guidebook source

Target Files / Areas:
- `skills/zte-site-navigator-orchestrator/references/legacy-step-rules.md`
- `command-center/agent-results/TASK-002/`
- `command-center/logs/execution-log.md`

Expected Output:
- Updated fallback-only legacy rules file with compact Step 0-12 rules.
- Programming, testing, and QA reports.

Acceptance Criteria:
- Only `legacy-step-rules.md` is modified under `skills/zte-site-navigator-orchestrator/references/`.
- Old guidebook files remain unchanged.
- No heavy prompt content is copied.
- Only approved system tool names are used.
- No standalone step skills, chat triggers, runtime shortcut, SQLite, or system clients are created.
- Phase 3 is not started.

Dependencies:
- TASK-001 Phase 1 outputs.
- Read-only access to frozen legacy guidebook.

Parallel Group: Phase 2 Legacy Fallback Extraction

Testing Requirement:
Run file-level verification for target-only modification, legacy immutability, forbidden artifacts, forbidden URLs/operations, approved and outdated tool names, required principle placement, and no Phase 3 work.

QA Requirement:
Verify Phase 2 scope compliance, roadmap alignment, Phase 1 architecture alignment, compact fallback-only design, no heavy prompt copying, no legacy modification, approved tool names, core principle enforcement, and no scope creep.

Output File Path:
`command-center/agent-results/TASK-002/programming.md`

Testing File Path:
`command-center/agent-results/TASK-002/testing.md`

QA File Path:
`command-center/agent-results/TASK-002/qa.md`

User Action Required:
None for Phase 2.

Progress Update Required:
Record implementation, testing, QA, and final status in the execution log.

Notes:
Core operating principle: 核心原则：先查后写，先判后推。
