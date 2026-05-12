# Dependency Map

## TASK-001 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/OPENCLAW_SKILL_DEVELOPMENT_GUIDELINE.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`

## TASK-001 Outputs

- `skills/zte-site-navigator-orchestrator/SKILL.md`
- `skills/zte-site-navigator-orchestrator/references/*.md`
- `command-center/tasks/TASK-001.md`
- `command-center/agent-results/TASK-001/programming.md`
- `command-center/agent-results/TASK-001/testing.md`
- `command-center/agent-results/TASK-001/qa.md`
- `command-center/logs/execution-log.md`

## Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Existing prompt/reference files

## Future Dependencies

- Phase 2 legacy extraction
- Future step skills
- Future system skills
- Future domain review skills

---

## TASK-002 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-2.md`
- `skills/zte-site-navigator-orchestrator/SKILL.md`
- `skills/zte-site-navigator-orchestrator/references/*.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`

## TASK-002 Outputs

- `skills/zte-site-navigator-orchestrator/references/legacy-step-rules.md`
- `command-center/tasks/TASK-002.md`
- `command-center/agent-results/TASK-002/programming.md`
- `command-center/agent-results/TASK-002/testing.md`
- `command-center/agent-results/TASK-002/qa.md`
- `command-center/logs/execution-log.md`

## TASK-002 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- All orchestrator files except `references/legacy-step-rules.md`

## TASK-002 Future Dependencies

- Phase 3 standalone step skills
- Future system skills
- Future domain review skills

---

## TASK-003 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `skills/zte-site-navigator-orchestrator/SKILL.md`
- `skills/zte-site-navigator-orchestrator/references/workflow-map.md`
- `skills/zte-site-navigator-orchestrator/references/state-model.md`
- `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- `skills/zte-site-navigator-orchestrator/references/result-status.md`
- `skills/zte-site-navigator-orchestrator/references/action-registry.md`
- `skills/zte-site-navigator-orchestrator/references/context-loading-policy.md`
- `skills/zte-site-navigator-orchestrator/references/output-format.md`
- `skills/zte-site-navigator-orchestrator/references/legacy-step-rules.md`

## TASK-003 Outputs

- `skills/step-dptw/SKILL.md`
- `skills/step-dptw/references/evidence-rules.md`
- `skills/step-dptw/references/pass-fail-criteria.md`
- `skills/step-dptw/references/response-templates.md`
- Updated DPTW portions of `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- Updated `call_step_dptw` row in `skills/zte-site-navigator-orchestrator/references/action-registry.md`
- `command-center/tasks/TASK-003.md`
- `command-center/agent-results/TASK-003/programming.md`
- `command-center/agent-results/TASK-003/testing.md`
- `command-center/agent-results/TASK-003/qa.md`
- `command-center/logs/execution-log.md`

## TASK-003 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Any step skill other than `skills/step-dptw/`
- Chat Triggers, runtime folders, SQLite files, and raw system client files

## TASK-003 Future Dependencies

- Phase 4 priority step skills
- Future system skill implementations
- Future domain review skills

---

## TASK-004 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-4.md`
- Existing Phase 1 and Phase 2 orchestrator files
- Existing Phase 3 `skills/step-dptw/` pattern

## TASK-004 Outputs

- `skills/step-check-in/SKILL.md`
- `skills/step-check-in/references/evidence-rules.md`
- `skills/step-check-in/references/pass-fail-criteria.md`
- `skills/step-check-in/references/response-templates.md`
- `skills/step-alarm-check/SKILL.md`
- `skills/step-alarm-check/references/evidence-rules.md`
- `skills/step-alarm-check/references/pass-fail-criteria.md`
- `skills/step-alarm-check/references/response-templates.md`
- `skills/step-check-out/SKILL.md`
- `skills/step-check-out/references/evidence-rules.md`
- `skills/step-check-out/references/pass-fail-criteria.md`
- `skills/step-check-out/references/response-templates.md`
- Updated `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- Updated `skills/zte-site-navigator-orchestrator/references/action-registry.md`

## TASK-004 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Remaining step skill names not in Phase 4
- Chat Triggers, runtime folders, SQLite files, and raw system client files

## TASK-004 Future Dependencies

- Phase 5 system skill integration
- Remaining future step skills
- Future domain review skills

---

## TASK-005 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-5.md`
- Existing orchestrator reference contracts
- Existing standalone step skill `SKILL.md` files

## TASK-005 Outputs

- Updated `skills/zte-site-navigator-orchestrator/references/action-registry.md`
- Updated `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- Updated `skills/zte-site-navigator-orchestrator/references/output-format.md`
- Updated or confirmed `skills/zte-site-navigator-orchestrator/references/state-model.md`
- Updated or confirmed `skills/zte-site-navigator-orchestrator/references/context-loading-policy.md`
- Corrected OpenClaw YAML frontmatter in existing new `SKILL.md` files

## TASK-005 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Raw Firebase, iEPMS, TIPIC, chat trigger, runtime, browser automation, and SQLite implementation paths
- Remaining step skills and domain review skills

## TASK-005 Future Dependencies

- Phase 6 Firebase state model/job queue implementation
- Future concrete system skill folders
- Remaining future step skills

---

## TASK-006 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-6.md`
- Existing Phase 1-5 orchestrator references
- Existing standalone step skill metadata

## TASK-006 Outputs

- Updated `skills/zte-site-navigator-orchestrator/references/state-model.md`
- Updated `skills/zte-site-navigator-orchestrator/references/action-registry.md`, if schema alignment is required
- Updated `skills/zte-site-navigator-orchestrator/references/output-format.md`, if schema alignment is required
- Updated `skills/zte-site-navigator-orchestrator/references/context-loading-policy.md`, if schema alignment is required

## TASK-006 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Runtime/database implementation paths
- Chat Triggers, browser automation, SQLite, raw API clients, remaining step skills, and domain review skills

## TASK-006 Future Dependencies

- Phase 7 chat trigger mode
- Future concrete Firebase/system skill implementation
- Future dashboard/job execution implementation

---

## TASK-007 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-7.md`
- Existing Phase 1-6 orchestrator contracts
- Existing standalone step skills

## TASK-007 Outputs

- `skills/zte-site-navigator-orchestrator/references/chat-trigger-policy.md`
- `skills/zte-site-navigator-orchestrator/SKILL.md`
- Optional small orchestrator/context chat-trigger boundary notes

## TASK-007 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Raw backend client, database, SQLite, credential, and external API implementation paths
- Remaining step skills and domain review skills

## TASK-007 Future Dependencies

- Phase 8 domain review skills
- Future runtime integration of chat trigger deployment/discovery
- Future concrete system skill implementations

---

## TASK-008 Inputs

- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/ZTE_Site_AI_Navigator_Roadmap.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-1.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/Prompt to Codex.md`
- `.openclaw/skills/zte-site-navigator-orchestrator/prompt/dev-phase-8.md`
- Existing Phase 1-7 orchestrator contracts
- Existing priority step skills and chat trigger

## TASK-008 Outputs

- Six domain review skill folders under `skills/`
- Updated `skills/zte-site-navigator-orchestrator/references/routing-rules.md`
- Updated `skills/zte-site-navigator-orchestrator/references/action-registry.md`
- Updated `skills/zte-site-navigator-orchestrator/references/context-loading-policy.md`, if needed

## TASK-008 Protected Areas

- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/`
- `old-file/zte-subcon-guidebook/`, if added later
- Raw backend client, OCR/model integration, browser automation, SQLite, credential, and API implementation paths
- Remaining step skills

## TASK-008 Future Dependencies

- Phase 9 remaining step skills or future system implementations
- Future concrete document/OCR/model integrations if explicitly scoped later
# Phase 9 Dependency Map

## New Step Skill Dependencies

- `step-ehs` depends on compact site context, EHS evidence summary, safety notes, and orchestrator-provided state snapshot when available.
- `step-material-scan` depends on material/MOS evidence and optional compact facts from `iepms-fishbone-data-checker`.
- `step-l1-before-photo` depends on before-photo evidence summary and site context.
- `step-installation` depends on installation status, progress, blocker notes, and evidence summary.
- `step-integration` depends on integration/commissioning status, NMS visibility summary, blocker notes, and optional compact facts from `iepms-fishbone-data-checker`.
- `step-l1-submission` depends on L1 submission status, after-photo evidence, and optional `l1-report-review` result.
- `step-decom` depends on scope/SOW summary, decom requirement/status, decom evidence, and optional compact facts from `iepms-fishbone-data-checker`.
- `step-housekeeping` depends on cleanup/restoration evidence, safe leaving status, and risk/blocker notes.

## Boundary Dependencies

- Orchestrator remains route, next-action, and state patch owner.
- Step skills do not call raw Firebase, iEPMS, TIPIC, OCR, model, or browser APIs.
- System tool references remain limited to `firebase-db`, `iepms-column-writter`, and `iepms-fishbone-data-checker`.
- Domain review skills remain separate and are not replaced by step skills.
- Chat-trigger behavior remains unchanged.
# Phase 10 Dependency Map

## Reviewed Contract Dependencies

- `workflow-map.md` is the canonical Step 0-12 workflow reference.
- `state-model.md` defines canonical step keys, event schemas, relative Firebase paths, and patch boundaries.
- `routing-rules.md` maps user intents to step, domain, and system actions.
- `action-registry.md` maps actions to target skills and defines decision boundaries.
- `output-format.md` defines orchestrator/system output contracts.
- Step skills provide one-step readiness judgement only.
- Domain review skills provide deep quality judgement only.
- Chat trigger mode provides chat-trigger selection and orchestrator routing boundaries only.

## Approved System Skill Dependencies

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Frozen Legacy Boundary

- Root `old-file/zte-subcon-guidebook/`, if present, remains unchanged.
- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/` remains unchanged when present.

# Phase 11 Dependency Map

## Scenario Test Dependencies

- `workflow-map.md` provides canonical step keys and next-step mapping.
- `routing-rules.md` provides route/action intent expectations.
- `action-registry.md` provides step, domain, and system action contracts.
- `output-format.md` provides orchestrator, system action, step skill, domain review, and chat-trigger policy contracts.
- `state-model.md` provides relative state paths, event/log records, and state patch boundaries.
- Phase 10 integration consistency report provides confirmed canonical mappings.
- Chat-trigger documentation and handler define chat trigger boundary scenarios.

## Approved System Skill Dependencies

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Protected Areas

- Root `old-file/zte-subcon-guidebook/`, if present, remains unchanged.
- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/` remains unchanged when present.
- No runtime clients, credentials, backend URLs, browser automation, SQLite, OCR, model API, or chat-trigger behavior changes are part of TASK-011.

# Phase 12 Dependency Map

## Dashboard / Job / Risk Dependencies

- `state-model.md` remains the canonical state and Firebase relative path source.
- `dashboard-model.md` defines compact dashboard projection and derivation rules.
- `job-queue-policy.md` defines async job records, lifecycle, retry, priority, and compactness rules.
- `risk-management-policy.md` defines risk record lifecycle, severity, escalation, closure, and dashboard impact.
- `action-registry.md` remains the approved system action source for `create_async_job`, `patch_firebase_state`, `write_iepms_column`, `check_iepms_fishbone_data`, and `log_message_event`.
- `output-format.md` remains the orchestrator/system action output contract.
- Scenario regression checklist tracks Phase 12 contract expectations.

## Approved System Skill Dependencies

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Protected Areas

- Root `old-file/zte-subcon-guidebook/`, if present, remains unchanged.
- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/` remains unchanged when present.
- No dashboard UI, backend worker, cron job, queue processor, runtime client, credentials, backend URLs, browser automation, SQLite, OCR, model API, new system tool, new step skill, or new domain review skill is part of TASK-012.

# Phase 13 Dependency Map

## Packaging Inputs

- `skills/zte-site-navigator-orchestrator/` and references.
- All `skills/step-*` step skills.
- All `skills/*-review` domain review skills.
- `skills/zte-site-navigator-orchestrator/`.
- `tests/site-navigator-scenarios/`.
- `command-center/agent-results/TASK-010/integration-consistency-report.md`.
- `skills/zte-site-navigator-orchestrator/references/dashboard-model.md`.
- `skills/zte-site-navigator-orchestrator/references/job-queue-policy.md`.
- `skills/zte-site-navigator-orchestrator/references/risk-management-policy.md`.

## Packaging Outputs

- `README.md`
- `SYSTEM_OVERVIEW.md`
- `SKILL_INDEX.md`
- `RELEASE_CHECKLIST.md`
- `CHANGELOG.md`
- `docs/architecture-summary.md`
- `docs/how-to-use-site-navigator.md`
- `docs/phase-completion-summary.md`
- TASK-013 command-center results and release readiness review.

## Protected Areas

- Root `old-file/zte-subcon-guidebook/`, if present, remains unchanged.
- `.openclaw/skills/zte-site-navigator-orchestrator/old-file/zte-subcon-guidebook/` remains unchanged when present.
- No runtime clients, credentials, backend URLs, dashboard UI, workers, cron jobs, queue processors, browser automation, SQLite, OCR, model API, new system tool, new step skill, or new domain review skill is part of TASK-013.
