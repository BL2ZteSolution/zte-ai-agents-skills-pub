# Greeting Status Policy

## Purpose

Step 0 `greeting_status` is the Greeting and Minimum Site Context Check. It is handled by standalone skill `step-greeting-status` and is the first workflow step for arrival-style chat messages before Step 1 `check_in_report`.

The orchestrator routes this step to `step-greeting-status`. The step skill greets the user, extracts site code/link ID, identifies arrival/start/resume intent, collects minimum arrival context, and prepares the workflow for check-in.

## Arrival Trigger Examples

Route these messages to Step 0 `greeting_status` first:
- I have arrived site SITE-100
- I reached site SITE-100
- Arrived at site SITE-100
- Reached site SITE-100
- At site SITE-100
- Site team arrived SITE-100
- Team reached site SITE-100 link LNK-100
- We are at site, link LNK-100

If the message includes arrival wording but no site code/link ID, remain in Step 0 and ask for the missing site reference.

## Minimum Arrival Context Fields

Minimum context should be compact. Use only the fields needed to prepare check-in and route the next decision:
- `site_code`
- `link_id`
- `arrival_time`
- `team_or_subcon_pic`
- `access_or_safety_issue_status`
- `site_id`
- `project_code`
- `scope`
- `region`
- `site_name`
- `source`
- `checked_at`

Not every site-data field is mandatory for every project. At minimum, the Step 0 result needs enough site identity and arrival context to avoid wrong-site or unsafe check-in handoff.

## Missing Info Handling

If site code/link ID is missing:
- Ask the user for site code or link ID.
- Do not route to `step-check-in`.
- Do not prepare check-in drafts.

If arrival time, team/subcon PIC, or access/safety issue status is missing:
- Ask only for the missing minimum arrival context.
- Do not route to `step-check-in` until the Step 0 result allows progression.

If the provided site reference cannot be matched:
- Return Pending or Manual Check Required.
- Ask for a clearer site code/link ID or ZTE PIC/admin confirmation.
- Do not store raw iEPMS response.

If the compact context has a site mismatch or ambiguity:
- Keep the decision in Step 0.
- Add risk flag such as `site_mismatch` or `manual_verification_required`.
- Do not proceed to Step 1 until the mismatch is resolved.

## Fishbone Context Use

`check_iepms_fishbone_data` through `iepms-fishbone-data-checker` is the default source for minimum site context during Step 0 when Firebase state does not already contain enough compact site facts.

The checker should return compact site facts only, such as:
- matched site code/link ID
- project/scope summary
- region or site name if needed
- missing fields
- mismatch/risk flags
- recommended clarification

Do not load, store, or expose raw iEPMS response, raw fishbone payload, credentials, backend URLs, or full API output.

## Proceed To Check-in

Proceed from `greeting_status` to `check_in_report` only when:
- the user intent is arrival/check-in/start-work related
- site code/link ID or equivalent site identity is available
- `arrival_time` is available or can be safely inferred from message/session time
- `team_or_subcon_pic` is available or explicitly not required by local format
- `access_or_safety_issue_status` is known
- minimum site context is resolved from state or compact fishbone facts
- no wrong-site, access-blocked, cancellation, or ambiguity risk blocks the handoff

When these conditions are met, `step-greeting-status` may recommend `check_in_report`, and the orchestrator may route to `step-check-in` with `call_step_check_in`.

## Core Rule

Preserve 核心原则：先查后写，先判后推.

- Check current state and compact site facts before writing or preparing a state patch.
- Judge minimum context and risk before routing to Step 1.
