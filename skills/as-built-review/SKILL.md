---
name: as-built-review
description: Reviews as-built documentation for site/scope consistency, completeness, and handover readiness.
tags:
  - zte
  - site-navigator
  - domain-review
  - as-built
  - documentation
actor: domain-reviewer
version: 0.1.0
---

# As-Built Review

## Purpose

Review as-built documentation for completion and handover readiness.

## Responsibility Boundary

This skill reviews as-built documentation quality only. It must not update Firebase/iEPMS, decide workflow step, replace orchestrator or step skills, call raw APIs, run OCR/model pipelines, or store raw documents.

## Core Principle

核心原则：先查后写，先判后推。

Check as-built evidence and site/scope context before implying any update. Judge completeness, defects, handover risk, and required action before recommending readiness. Orchestrator remains owner of route, `next_step`, and `state_patch` intent.

## Context Files

- Load `references/review-scope.md` for as-built review boundaries.
- Load `references/evidence-rules.md` when judging evidence.
- Load `references/judgement-criteria.md` before assigning result.
- Load `references/output-schema.md` for structured output.
- Load `references/response-templates.md` for compact responses.

## Output Requirement

Return only the structured domain review JSON defined in `references/output-schema.md`. Do not claim handover acceptance or system update.
