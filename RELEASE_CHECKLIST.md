# Release Checklist

## Skill Format

- [ ] Every skill folder contains `SKILL.md`.
- [ ] Every `SKILL.md` starts with YAML frontmatter.
- [ ] Every `SKILL.md` includes `name`.
- [ ] Every `SKILL.md` includes `description`.
- [ ] `name` matches folder name.
- [ ] `description` is trigger-focused.

## Architecture

- [ ] Orchestrator is lightweight.
- [ ] Step skills are single-purpose.
- [ ] Domain review skills are separate.
- [ ] Chat trigger mode selects the orchestrator before any step validation.
- [ ] System tools do not make workflow decisions.
- [ ] Legacy guidebook remains frozen.

## System Tool Naming

Approved:
- [ ] `firebase-db`
- [ ] `iepms-column-writter`
- [ ] `iepms-fishbone-data-checker`

Legacy alias scan:
- [ ] No unapproved legacy system aliases appear outside frozen legacy source.
- [ ] Approved spelling is preserved exactly.
- [ ] No new system tool names are introduced.

## Firebase Boundary

- [ ] Firebase accessed only through `firebase-db`.
- [ ] GET/PATCH only.
- [ ] No PUT.
- [ ] No DELETE.
- [ ] No Firebase URL.
- [ ] Relative paths only.

## Safety

- [ ] 先查后写 preserved.
- [ ] 先判后推 preserved.
- [ ] No `next_step` when result blocks progression.
- [ ] No `state_patch` before state check.
- [ ] No iEPMS write before judgement.
- [ ] No check-in/check-out forwarded claim without user confirmation.

## Context

- [ ] Do not load old prompt folder by default.
- [ ] Do not load all step skills by default.
- [ ] Do not load all domain review skills by default.
- [ ] Do not load raw API docs by default.
- [ ] Do not load full WhatsApp history.

## Testing

- [ ] Scenario tests exist.
- [ ] Regression checklist exists.
- [ ] Phase 10 integration report exists.
- [ ] Phase 13 release readiness review exists.
