# Check-in Pass-Fail Criteria

## Proceed

Use when site context is sufficient, no blocker prevents check-in, and exactly two message drafts can be prepared.

Allowed next action: Ask user to manually forward both drafts and recommend `dptw_login`.

## Pending

Use when site context or required reporting details are missing.

## Rework

Use when provided site/check-in information is incorrect or insufficient.

## Escalate

Use when access, customer, safety, or site identification issue requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely identify site context or check-in risk.

## Blocked

Use when site access is blocked or check-in cannot proceed.

## Completed

Use when check-in was already completed and confirmed.

## Skipped

Normally not allowed for mandatory check-in unless approved exception exists.

## Not Applicable

Normally not allowed unless project/site scope explicitly confirms no check-in is required.

## Decision Rule

- Mandatory check-in cannot be silently skipped.
- Do not claim messages were forwarded unless user explicitly confirms.
- If context is incomplete, do not prepare final drafts.
- Do not require arrival/check-in evidence for Step 1.
- Apply 先查后写 before any implied state update.
- Apply 先判后推 before recommending `dptw_login`.
