# Result Status

Use these statuses consistently in orchestrator output.

| Status | Meaning | When To Use | Allowed Next Action |
|---|---|---|---|
| Proceed | Required checks and judgement are complete, and the current step can advance. | Evidence is sufficient, no blocking risk is present, and state/context has been checked. | Recommend next step, prepare intended state_patch, or route to the next required skill. |
| Pending | More information is needed before judgement. | Site, session, state, evidence, or required system facts are incomplete. | Ask for missing items or route to read/check action. |
| Rework | Submitted evidence is not acceptable and needs correction. | Photo, report, permit, or workflow evidence fails expected criteria. | Request corrected evidence; do not advance. |
| Escalate | Safety, access, permit, alarm, or other blocking risk requires human or responsible-team attention. | Risk is critical, blocking, or outside orchestrator authority. | Escalate to responsible role or domain/system skill; do not advance until resolved. |
| Manual Check Required | AI cannot safely judge from available context. | Evidence is ambiguous, state conflicts exist, or decision requires human confirmation. | Ask ZTE PIC/admin or responsible reviewer to confirm. |
| Blocked | Workflow cannot continue due to unresolved blocker. | Dependency, permit, site access, system outage, or alarm prevents progress. | Record blocker and request resolution; next_step remains empty or blocked target only. |
| Completed | Current workflow step or session is confirmed complete by the responsible skill/system. | Completion is explicitly confirmed by the responsible future step, system, or domain skill. | Record completion and close or advance according to workflow. |
| Skipped | Step is intentionally skipped with valid reason. | Scope or approved instruction allows skipping. | Record skip reason and move to allowed next step. |
| Not Applicable | Step does not apply to this site/scope. | Scope confirms the step is irrelevant, such as no decommissioning requirement. | Record not-applicable reason and move to allowed next step. |

Proceed is allowed only after required checks and judgement are complete.
