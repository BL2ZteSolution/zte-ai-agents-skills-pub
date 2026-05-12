# Check-in Context Rules

## Purpose

Define context and risk rules for Step 1: Check-in Report.

## Evidence Requirement

No arrival/check-in evidence is required for Step 1.

Do not require the user to prove arrival before preparing check-in drafts. If the user asks for check-in or the orchestrator routes to Step 1 with sufficient site context, treat the check-in request as enough to prepare the check-in drafts unless a blocker or mismatch is present.

## Required Context

- Site ID, site code, or link ID is available.
- Site/session context is known or can be checked by orchestrator.
- Team/PIC/time may use placeholders when not available and the orchestrator allows placeholders.

## Weak Context

- "Done" without context.
- Site code is missing or ambiguous.
- Team/PIC is missing when the local reporting format does not allow placeholders.

## Invalid Context

- Wrong site.
- Access is blocked.
- Site cannot be identified.
- User reports cancellation or no access.

## Missing Context

Context is missing when site/session context or required reporting details are not available.

## Message Draft Rules

- Prepare drafts when site context is sufficient.
- Use placeholders for optional team/PIC/time fields if the orchestrator allows placeholders.
- Do not generate drafts for wrong-site, access-blocked, or unknown-site cases.

## Risk Flags

- `missing_site_context`
- `site_mismatch`
- `access_blocked`
- `wrong_site`
- `missing_team_or_pic`
- `manual_verification_required`

## Decision Notes

- Do not mark Proceed unless exactly two check-in drafts can be prepared.
- Do not mark Pending only because arrival evidence is absent.
- When unsure, use Pending or Manual Check Required.
- If provided check-in details are wrong or insufficient, use Rework.
- Follow 核心原则：先查后写，先判后推。
