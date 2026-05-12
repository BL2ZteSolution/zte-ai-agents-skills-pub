---
name: pathloss-review
description: Reviews Pathloss-related evidence for microwave link planning consistency and technical readiness risk.
tags:
  - zte
  - site-navigator
  - domain-review
  - pathloss
  - microwave
actor: domain-reviewer
version: 0.1.0
---

# Pathloss Review

## Purpose

Review Pathloss-related evidence and microwave planning consistency.

## Responsibility Boundary

This skill reviews Pathloss evidence quality only. It must not run Pathloss software, calculate final RF design, claim engineering approval, update iEPMS/Firebase, replace MW planning engineer judgement, call raw APIs, or store raw files.

## Core Principle

核心原则：先查后写，先判后推。

Check Pathloss evidence and link context before implying any update. Judge completeness, link consistency, technical readiness risk, and required action before recommending readiness. Orchestrator remains owner of route, `next_step`, and `state_patch` intent.

## Context Files

- Load `references/review-scope.md` for Pathloss review boundaries.
- Load `references/evidence-rules.md` when judging planning evidence.
- Load `references/judgement-criteria.md` before assigning result.
- Load `references/output-schema.md` for structured output.
- Load `references/response-templates.md` for compact responses.

## Output Requirement

Return only the structured domain review JSON defined in `references/output-schema.md`. Do not claim engineering approval or system update.
