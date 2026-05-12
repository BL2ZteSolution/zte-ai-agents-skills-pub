# Site Navigator End-to-End Scenario Tests

## Purpose

These scenario tests validate routing, judgement, state/action guardrails, and output contracts across the Site AI Navigator skill system.

## Scope

Covered:
- normal workflow progression
- missing context handling
- mandatory DPTW blocking
- alarm blocking
- check-out closure guardrails
- domain review rejection
- decom not applicable handling
- chat-trigger skill selection
- iEPMS fishbone data check
- iEPMS column write guardrail
- domain review routing
- state_patch guardrail
- manual check required handling

Not covered:
- real Firebase runtime integration
- real iEPMS runtime integration
- real TIPIC runtime integration
- OCR/image model behavior
- WhatsApp production delivery

## How to Use

Each scenario includes:
- input message
- assumed state
- expected route_to
- expected action
- expected decision/result
- expected next_step
- expected system_actions
- expected whatsapp_message behavior
- guardrail checks
- acceptance criteria

Run the scenarios as review checklists against the orchestrator, step skill, domain review, and system action contracts. They are markdown test cases, not executable integration tests.

## Scenario Index

| Scenario | Focus | Expected Primary Route |
|---|---|---|
| 01 | Normal arrival to check-in progression | `greeting_status` then `step-check-in` |
| 02 | Missing site context | `orchestrator` |
| 03 | Missing mandatory DPTW | `step-dptw` |
| 04 | Active alarm blocker | `step-alarm-check` |
| 05 | Check-out with unresolved risk | `step-check-out` |
| 06 | L1 review rejection | `l1-report-review` |
| 07 | Decom not applicable | `step-decom` |
| 08 | Chat trigger mode | `zte-site-navigator-orchestrator` |
| 09 | iEPMS fishbone data check | `iepms-fishbone-data-checker` |
| 10 | iEPMS column write guardrail | `iepms-column-writter` |
| 11 | Domain review routing | domain review skill |
| 12 | state_patch guardrail | `firebase-db` |
| 13 | Manual check required handling | `step-ehs` |

## Core Rule

Every scenario must verify:
核心原则：先查后写，先判后推。

## Approved System Tool Names

- `firebase-db`
- `iepms-column-writter`
- `iepms-fishbone-data-checker`

## Expected Status Sets

Step skill statuses:
- Proceed
- Pending
- Rework
- Escalate
- Manual Check Required
- Blocked
- Completed
- Skipped
- Not Applicable

Domain review statuses:
- Pass
- Conditional Pass
- Pending
- Reject
- Manual Check Required

## Execution Guide

1. Read the input message and assumed state.
2. Confirm the route and action match `routing-rules.md` and `action-registry.md`.
3. Confirm the expected output uses `output-format.md`.
4. Confirm any `state_patch`, `patch_firebase_state`, or `write_iepms_column` is preceded by current state/fact checking and completed judgement.
5. Confirm any `next_step` is allowed by the decision/result.
6. Confirm no scenario requires real backend, OCR, model, browser, credential, or production WhatsApp behavior.
