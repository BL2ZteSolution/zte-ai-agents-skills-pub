---
name: l1-report-review
description: Reviews L1 report and before/after photo evidence for completeness, quality, and workflow readiness.
tags:
  - zte
  - site-navigator
  - domain-review
  - l1
  - report-review
actor: domain-reviewer
version: 0.1.0
---

# L1 Report Review

## Purpose

Review L1 report evidence and related before/after photo evidence.

## Responsibility Boundary

This skill reviews L1 evidence quality only. It returns structured review judgement with defects, missing evidence, risk level, required action, and workflow recommendation.

It must not update Firebase, update iEPMS, decide workflow `current_step`, replace `step-l1-before-photo` or `step-l1-submission`, claim customer acceptance, call raw APIs, or store raw files/responses.

## Core Principle

核心原则：先查后写，先判后推。

Check evidence and review context before implying any update. Judge completeness, defects, risk level, and required action before recommending workflow readiness. Orchestrator remains owner of route, `next_step`, and `state_patch` intent.

## Context Files

- Load `references/review-scope.md` for L1 review boundaries.
- Load `references/evidence-rules.md` when judging submitted report/photo evidence.
- Load `references/judgement-criteria.md` before assigning result.
- Load `references/output-schema.md` for structured output.
- Load `references/response-templates.md` for compact responses.

## Output Requirement

Return only the structured domain review JSON defined in `references/output-schema.md`. Keep user-facing summary concise and do not claim Firebase/iEPMS update success.
