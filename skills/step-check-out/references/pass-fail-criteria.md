# Check-out Pass-Fail Criteria

## Proceed

Use when check-out context is sufficient, final progress/risk summary is available, and exactly two message drafts can be prepared.

Allowed next action: Ask user to manually forward both drafts; recommend session closure only after forwarding confirmation.

## Pending

Use when final progress, pending items, alarm status, housekeeping status, or site context is missing.

## Rework

Use when provided check-out information is incomplete, inconsistent, or needs correction.

## Escalate

Use when unresolved blocker, customer issue, safety issue, or critical alarm requires ZTE PIC/admin action.

## Manual Check Required

Use when AI cannot safely judge check-out readiness.

## Blocked

Use when site cannot be safely closed or critical unresolved blocker prevents check-out.

## Completed

Use when check-out already completed and confirmed.

## Skipped

Normally not allowed for mandatory check-out unless approved exception exists.

## Not Applicable

Normally not allowed unless project/site scope explicitly confirms no check-out is required.

## Decision Rule

- Mandatory check-out cannot be silently skipped.
- Do not claim messages were forwarded unless user explicitly confirms.
- Do not close session directly.
- Do not recommend session closure if critical unresolved blockers remain.
- Apply 先查后写 before any implied state/session update.
- Apply 先判后推 before recommending `session_closed`.
