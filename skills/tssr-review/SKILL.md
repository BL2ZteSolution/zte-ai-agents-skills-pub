---
name: tssr-review
description: Reviews TSSR documentation for survey completeness, site constraints, and deployment readiness risk.
tags:
  - zte
  - site-navigator
  - domain-review
  - tssr
  - survey
actor: domain-reviewer
version: 0.1.0
---

# TSSR Review

## Purpose

Review TSSR document and survey evidence.

## Responsibility Boundary

This skill reviews TSSR/survey quality only. It must not update Firebase/iEPMS, decide workflow route or next step, replace engineering judgement, call raw APIs, or store raw documents.

## Core Principle

核心原则：先查后写，先判后推。

Check TSSR evidence and survey context before implying any update. Judge completeness, constraints, deployment readiness risk, and required action before recommending readiness. Orchestrator remains owner of route, `next_step`, and `state_patch` intent.

## Context Files

- Load `references/review-scope.md` for TSSR review boundaries.
- Load `references/evidence-rules.md` when judging survey evidence.
- Load `references/judgement-criteria.md` before assigning result.
- Load `references/output-schema.md` for structured output.
- Load `references/response-templates.md` for compact responses.

## Output Requirement

Return only the structured domain review JSON defined in `references/output-schema.md`. Do not claim deployment approval or system update.
