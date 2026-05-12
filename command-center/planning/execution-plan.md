# Execution Plan

## TASK-001 Lifecycle

1. BACKLOG: User requested Phase 1 orchestrator implementation.
2. ASSIGNED: Chat Agent owns final control; programming, testing, and QA records are maintained under TASK-001.
3. IN_PROGRESS: Create command-center records before skill files.
4. SUBMITTED: Create all required skill and reference files.
5. TESTING: Run file-level verification and record results.
6. QA: Review compliance against scope, roadmap, and OpenClaw guideline.
7. READY_FOR_MAIN_REVIEW: Confirm no Phase 2 work and no legacy modification.
8. DONE: Final response reports created tree and evidence paths only.

Implementation Order:
- Command-center records.
- Orchestrator skill files.
- Verification.
- QA report.

---

## TASK-002 Lifecycle

1. BACKLOG: User requested Phase 2 fallback extraction.
2. ASSIGNED: Chat Agent owns final control; TASK-002 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before modifying the target fallback file.
4. SUBMITTED: Replace the Phase 1 placeholder with compact extracted Step 0-12 fallback rules.
5. TESTING: Run file-level verification and record results.
6. QA: Review fallback-only design, approved tool naming, legacy immutability, and no Phase 3 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm only the target fallback file changed under orchestrator references.
8. DONE: Final response reports modified files and evidence paths only.

Implementation Order:
- Command-center TASK-002 records.
- Read-only legacy source review and hash snapshot.
- `legacy-step-rules.md` update.
- Verification.
- QA report.

---

## TASK-003 Lifecycle

1. BACKLOG: User requested Phase 3 creation of first standalone step skill.
2. ASSIGNED: Chat Agent owns final control; TASK-003 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before creating or modifying skill files.
4. SUBMITTED: Create `step-dptw` files and minimal orchestrator DPTW route/action updates.
5. TESTING: Run file-level and content-level verification.
6. QA: Review single-purpose design, routing integration, system boundaries, and no Phase 4 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm outputs and reports are complete.
8. DONE: Final response reports created/modified files and evidence paths only.

Implementation Order:
- Command-center TASK-003 records.
- Create `skills/step-dptw/` files.
- Update orchestrator DPTW routing/action contracts.
- Verification.
- QA report.

---

## TASK-004 Lifecycle

1. BACKLOG: User requested Phase 4 priority step skills.
2. ASSIGNED: Chat Agent owns final control; TASK-004 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before creating or modifying skill files.
4. SUBMITTED: Create three priority step skills and minimal orchestrator integration updates.
5. TESTING: Run file-level and content-level verification.
6. QA: Review single-purpose design, evidence handling, routing/action integration, and no Phase 5 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm outputs and reports are complete.
8. DONE: Final response reports created/modified files and evidence paths only.

Implementation Order:
- Command-center TASK-004 records.
- Create `step-check-in`, `step-alarm-check`, and `step-check-out`.
- Update orchestrator routing/action contracts.
- Verification.
- QA report.
- Execution log update.

---

## TASK-005 Lifecycle

1. BACKLOG: User requested Phase 5 system skill connection contracts and metadata alignment.
2. ASSIGNED: Chat Agent owns final control; TASK-005 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before modifying orchestrator or skill files.
4. SUBMITTED: Update system action contracts, routing, output format, state/context policies, and metadata.
5. TESTING: Run file-level and content-level verification.
6. QA: Review Phase 5 contract boundaries, approved naming, metadata, and no Phase 6 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm outputs and reports are complete.
8. DONE: Final response reports created/modified files and evidence paths only.

Implementation Order:
- Command-center TASK-005 records.
- Update orchestrator system contracts.
- Correct SKILL metadata.
- Verification.
- QA report.
- Execution log update.

---

## TASK-006 Lifecycle

1. BACKLOG: User requested Phase 6 Firebase state model and job queue documentation/contracts.
2. ASSIGNED: Chat Agent owns final control; TASK-006 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before modifying contract files.
4. SUBMITTED: Expand state model and align adjacent contracts.
5. TESTING: Run file-level and content-level verification.
6. QA: Review schema completeness, Firebase boundaries, approved naming, compactness, and no Phase 7 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm outputs and reports are complete.
8. DONE: Final response reports created/modified files and evidence paths only.

Implementation Order:
- Command-center TASK-006 records.
- Expand `state-model.md`.
- Align action/output/context contracts if required.
- Verification.
- QA report.
- Execution log update.

---

## TASK-007 Lifecycle

1. BACKLOG: User requested Phase 7 chat trigger mode documentation and safe skeleton.
2. ASSIGNED: Chat Agent owns final control; TASK-007 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before creating chat-trigger files.
4. SUBMITTED: Create chat trigger docs and orchestrator boundary note.
5. TESTING: Run file-level, content-level, and lightweight TypeScript verification where possible.
6. QA: Review chat trigger safety, architecture boundary, approved naming, and no Phase 8 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm outputs and reports are complete.
8. DONE: Final response reports created/modified files and evidence paths only.

Implementation Order:
- Command-center TASK-007 records.
- Create chat trigger folder and files.
- Add optional orchestrator/context chat-trigger boundary note.
- Verification.
- QA report.
- Execution log update.

---

## TASK-008 Lifecycle

1. BACKLOG: User requested Phase 8 domain review skill contracts.
2. ASSIGNED: Chat Agent owns final control; TASK-008 programming, testing, and QA records are maintained.
3. IN_PROGRESS: Update command-center records before creating domain skill files.
4. SUBMITTED: Create six domain review skills and orchestrator routing/action integration.
5. TESTING: Run file-level and content-level verification.
6. QA: Review domain boundaries, structured output, approved naming, and no Phase 9 scope creep.
7. READY_FOR_MAIN_REVIEW: Confirm outputs and reports are complete.
8. DONE: Final response reports created/modified files and evidence paths only.

Implementation Order:
- Command-center TASK-008 records.
- Create domain review skill folders/files.
- Update orchestrator routing/action/context contracts.
- Verification.
- QA report.
- Execution log update.
# Phase 9 Execution Plan

## TASK-009

1. Read Phase 9 prompt, roadmap, Phase 1 prompt, existing orchestrator references, existing step-skill pattern, domain review context, and chat-trigger boundary.
2. Create TASK-009 command-center records before implementation edits.
3. Create the eight remaining step skill folders and references folders.
4. Add compact `SKILL.md`, `evidence-rules.md`, `pass-fail-criteria.md`, and `response-templates.md` for each new step.
5. Update orchestrator routing rules for remaining step intents.
6. Update orchestrator action registry for remaining `call_step_*` contracts.
7. Update context loading policy only if needed to confirm remaining step skills load on demand only.
8. Run file-level and content-level checks.
9. Record programming, testing, and QA results.
10. Confirm no legacy source modification, no raw backend/API/model implementation, and no Phase 10 work.
# Phase 10 Execution Plan

## TASK-010

1. Read Phase 10 prompt, roadmap, Phase 1 prompt, and existing Phase 1-9 outputs.
2. Create TASK-010 command-center records before implementation edits.
3. Run file and content inspection across orchestrator references, step skills, domain review skills, and chat trigger.
4. Identify consistency issues in step keys, routes, actions, statuses, metadata, output contracts, system names, and boundaries.
5. Apply only safe documentation/contract fixes.
6. Create integration consistency report with issues found and fixes applied.
7. Run verification checks for mappings, approved names, metadata, no raw integration, no legacy modification, and no Phase 11 scope.
8. Record programming, testing, and QA results.

# Phase 11 Execution Plan

## TASK-011

1. Read Phase 11 prompt, roadmap, Phase 1 prompt, existing Phase 1-10 outputs, chat trigger, and Phase 10 consistency report.
2. Create TASK-011 command-center records before adding scenario files.
3. Create the scenario test directory.
4. Add README, scenario template, twelve scenario documents, and regression checklist.
5. Keep tests markdown-only unless an existing test framework is clearly in scope.
6. Verify file presence, approved system names, no raw integration, no legacy modification, and no Phase 12 scope.
7. Record programming, testing, and QA results.

# Phase 12 Execution Plan

## TASK-012

1. Read Phase 12 prompt, roadmap, Phase 1 prompt, existing Phase 1-11 outputs, chat trigger, and scenario tests.
2. Create TASK-012 command-center records before modifying orchestrator/test contracts.
3. Create dashboard, async job, and risk policy reference files.
4. Apply minimal alignment updates to state model, action registry, output format, context loading policy, and regression checklist.
5. Run file-level and content-level verification for required files, approved names, compactness, boundaries, and no Phase 13 scope.
6. Record programming, testing, and QA results.

# Phase 13 Execution Plan

## TASK-013

1. Read Phase 13 prompt, roadmap, Phase 1 prompt, Phase 1-12 outputs, integration report, scenario tests, and Phase 12 policy files.
2. Create TASK-013 command-center records before packaging edits.
3. Create top-level handoff documents and `docs/` handoff documents.
4. Create final release readiness review.
5. Validate packaging files, SKILL metadata, approved system names, legacy protection, and no runtime implementation.
6. Record programming, testing, QA, and release readiness results.
