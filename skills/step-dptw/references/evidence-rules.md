# DPTW Evidence Rules

## Purpose

Define acceptable, weak, invalid, and missing evidence for Step 2: DPTW Login.

## Acceptable Evidence

- User explicitly confirms DPTW/CDPTW login completed with clear step context.
- Screenshot shows DPTW/CDPTW login status completed.
- Permit/login reference is provided with matching site context.
- Admin or ZTE PIC confirms DPTW login is done.
- Current state snapshot confirms DPTW step is completed for the same site/session.

## Weak Evidence

- "Done" without DPTW step context.
- Screenshot is not clearly related to DPTW/CDPTW.
- Site code, link ID, or permit reference is unclear.
- Confirmation does not identify the site.
- Evidence appears old or does not match the current work cycle.
- Message mentions permit generally but does not confirm login status.

## Invalid Evidence

- DPTW is not logged in.
- DPTW login failed.
- Permit is rejected.
- Screenshot belongs to another site.
- Permit or login is expired.
- User says they cannot login.
- Access or permit is blocked.
- Screenshot or text indicates pending approval instead of completed login.

## Missing Evidence

Evidence is missing when:
- No DPTW/CDPTW confirmation is provided.
- No screenshot, permit/login reference, or admin/ZTE PIC confirmation is provided.
- Site/session context is not enough to link evidence to the current workflow.

## Screenshot Evidence Rules

- Screenshot should visibly relate to DPTW/CDPTW.
- Screenshot should show completed/login-success status or equivalent clear confirmation.
- Screenshot should match the current site, permit, user, or work cycle when such fields are visible.
- If screenshot is cropped, blurry, old, wrong-site, or ambiguous, use Rework or Manual Check Required.

## Text Confirmation Rules

- Accept explicit text such as "DPTW login done", "CDPTW done", or "permit login completed" when site/session context is sufficient.
- Treat generic "done" as weak evidence unless the preceding orchestrator prompt clearly asked for DPTW login.
- If user says "cannot login", "failed", "rejected", "expired", or "blocked", do not proceed.

## Risk Flags

- `missing_site_context`
- `missing_dptw_evidence`
- `unclear_screenshot`
- `site_mismatch`
- `expired_or_invalid_dptw`
- `dptw_login_failed`
- `permit_blocker`
- `safety_or_access_risk`
- `manual_verification_required`

## Evidence Decision Notes

- Do not mark Proceed unless evidence is clear enough.
- When unsure, use Pending or Manual Check Required.
- If submitted evidence exists but is unclear or wrong, use Rework.
- If a permit/access blocker exists, use Blocked or Escalate according to severity.
- Follow 核心原则：先查后写，先判后推。
