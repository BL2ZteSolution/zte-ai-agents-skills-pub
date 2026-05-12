---
name: pac-review
description: Reviews PAC documentation for completion readiness, evidence consistency, and acceptance risk.
tags:
  - zte
  - site-navigator
  - domain-review
  - pac
  - acceptance
actor: domain-reviewer
version: 0.1.0
---

# PAC Review

## Purpose

Review PAC document readiness and acceptance-related evidence.

## Responsibility Boundary

This skill reviews PAC evidence quality only. It must not claim PAC accepted by customer, update Firebase or iEPMS, replace orchestrator/project controller judgement, call raw APIs, or store raw documents.

## Core Principle

核心原则：先查后写，先判后推。

Check PAC evidence and scope context before implying any update. Judge completeness, defects, acceptance risk, and required action before recommending readiness. Orchestrator remains owner of route, `next_step`, and `state_patch` intent.

## Context Files

- Load `references/review-scope.md` for PAC review boundaries.
- Load `references/evidence-rules.md` when judging PAC evidence.
- Load `references/judgement-criteria.md` before assigning result.
- Load `references/output-schema.md` for structured output.
- Load `references/response-templates.md` for compact responses.

## Output Requirement

Return only the structured domain review JSON defined in `references/output-schema.md`. Do not claim customer acceptance or system update.
