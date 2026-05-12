# Context Loading Policy

Never load the whole system. Load only the current decision slice.

## Always Load

- `SKILL.md`
- `references/workflow-map.md`
- `references/state-model.md`
- `references/routing-rules.md`
- `references/result-status.md`
- `references/action-registry.md`
- `references/chat-trigger-policy.md`
- `references/greeting-status-policy.md`
- `references/output-format.md`

## Load On Demand

- Current step skill.
- Current domain skill.
- `references/legacy-step-rules.md` fallback.
- Specific system action summary.
- `references/dashboard-model.md` only when dashboard projection or reporting is needed.
- `references/job-queue-policy.md` only when async job creation or job status reasoning is needed.
- `references/risk-management-policy.md` only when risk severity, escalation, closure, or dashboard risk impact is needed.

## Do Not Load By Default

- Old `prompt/` folder.
- Old step references.
- All step skills.
- Raw API docs.
- Raw API responses.
- Full WhatsApp history.
- Unrelated review rules.
- All domain review skills.
- Raw report/document/photo attachment content.
- Dashboard, job, and risk policy references for routine messages that do not need them.

## System Context Loading Rules

- Do not load raw Firebase API docs by default.
- Do not load raw iEPMS API docs by default.
- Do not load raw TIPIC API docs by default.
- Do not load raw API responses into orchestrator context by default.
- Load only compact system action summaries from `references/action-registry.md`.
- Load compact system results only when required for current judgement.
- Do not load full WhatsApp history.
- Do not load unrelated backend data.

## Firebase State Loading Policy

- Load compact state snapshot only when required for current decision.
- Do not load full site history by default.
- Do not load full message logs by default.
- Do not load raw API response.
- Do not load all jobs by default.
- Load only current site/job/event slice required for judgement.
- Load dashboard, job, or risk policy only for the current decision slice that requires it.
- Follow: Never load the whole system. Load only the current decision slice.

## Domain Review Loading Policy

- Load domain review skills only on demand for the specific review task.
- Do not load all domain review skills by default.
- Do not load raw documents or raw attachments into orchestrator context.
- Load compact evidence summaries where possible.
- Route specific review tasks to the matching domain skill.
- Do not let domain review rules bloat orchestrator context.
- Domain review output is advisory; orchestrator remains routing and state decision owner.

## Step Skill Loading Policy

- Load remaining step skills only on demand.
- Do not load all step skills by default.
- Do not load all evidence rules by default.
- Load only the current step skill required for the current decision.
- Do not let step skill rules bloat orchestrator context.
- Step skill output is structured judgement; orchestrator remains routing, next-action, and state patch owner.

## Approved System Skill References

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Principle

Context loading must support 先查后写，先判后推.

Load only the context needed to check current state and judge the current decision. Do not load large legacy content just to push the next step.
