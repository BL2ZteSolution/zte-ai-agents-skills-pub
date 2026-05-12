# ZTE Site AI Navigator Skill Roadmap

## 0. Purpose

This roadmap is the reference plan for rebuilding the ZTE Site AI Navigator skill system.

It is designed so that any future AI chat, Codex session, or OpenClaw agent can continue the work without depending on previous conversation history.

---

## 1. Core Architecture Decision

The project should not be built as one heavy guidebook skill.

The correct architecture is:

```text
Site AI Navigator = System
Orchestrator Skill = Routing / state / next action
Step Skills = Individual workflow step execution
System Skills = API and data access
Domain Skills = Deep quality review
Firebase = State/session/job storage
```

Responsibility split:

```text
zte-site-navigator-orchestrator
= Decide current step, route task, control context, generate next action

step-*
= Validate and guide one workflow step only

firebase-db
= Raw Firebase GET/PATCH only

iepms-system / fbr-check / iepms-fishbone-data-checker
= Query iEPMS/FBR facts and return compact JSON

tipic-system / l1-report-review / ehs-review / pac-review
= Deep AI review and structured quality judgement
```

---

## 2. Repository Strategy

Do not directly rewrite the old skill as the main implementation.

Recommended strategy:

```text
Old skill = frozen legacy source
New skill = clean orchestrator from zero
```

Recommended structure:

```text
skills/
├── zte-subcon-guidebook/              # old legacy source, keep for reference
└── zte-site-navigator-orchestrator/   # new clean orchestrator skill
```

The old `zte-subcon-guidebook` should not be deleted.  
It should be used only to extract step logic into `legacy-step-rules.md` and later standalone step skills.

---

## 3. Final Target Skill System

Long-term target structure:

```text
skills/
├── zte-site-navigator-orchestrator/
├── step-check-in/
├── step-dptw/
├── step-ehs/
├── step-material-scan/
├── step-l1-before-photo/
├── step-installation/
├── step-integration/
├── step-alarm-check/
├── step-l1-submission/
├── step-decom/
├── step-housekeeping/
├── step-check-out/
├── l1-report-review/
├── ehs-review/
├── pac-review/
├── firebase-db/
├── iepms-system/
├── iepms-fishbone-data-checker/
├── tipic-system/
└── noc-system/
```

---

## 4. Phase 1 — Create Orchestrator Skill

### Objective

Create a new clean skill:

```text
zte-site-navigator-orchestrator/
```

This skill is the routing and control layer only.

It must not contain full Step 0–12 prompt logic.

### Required structure

```text
zte-site-navigator-orchestrator/
├── SKILL.md
├── references/
│   ├── workflow-map.md
│   ├── state-model.md
│   ├── routing-rules.md
│   ├── result-status.md
│   ├── action-registry.md
│   ├── context-loading-policy.md
│   ├── output-format.md
│   └── legacy-step-rules.md
```

### Key rules

Do:

```text
- Create new orchestrator skill from zero
- Keep old zte-subcon-guidebook unchanged
- Use old skill only as reference
- Document Step 0–12 workflow map
- Define state model
- Define routing rules
- Define action registry
- Define context loading policy
- Define output format
```

Do not:

```text
- Create hooks
- Create runtime fast path
- Create SQLite
- Create Firebase implementation
- Implement iEPMS API client
- Create standalone step skills yet
- Delete old prompt/ or references/
- Hardcode Firebase URL
```

### Phase 1 success criteria

Phase 1 is done when:

```text
- zte-site-navigator-orchestrator exists
- SKILL.md is lightweight and orchestrator-focused
- references/ contains all 8 required files
- Step 0–12 workflow is mapped
- action-registry.md shows how future system/step/domain skills will be called
- context-loading-policy.md prevents large prompt loading
- legacy-step-rules.md preserves old rules only as fallback
```

---

## 5. Phase 2 — Extract Legacy Rules

### Objective

Convert the old guidebook content into compact fallback rules.

Source:

```text
zte-subcon-guidebook/prompt/
zte-subcon-guidebook/references/
TEMP_STEP_COMBINED.md, if available
```

Target:

```text
zte-site-navigator-orchestrator/references/legacy-step-rules.md
```

### Rules

The legacy file should be compact.

It should not copy all old prompt content blindly.

It should summarize each step:

```text
- Step number
- Step name
- Purpose
- Required input
- Completion condition
- Skip/risk rule
- Backend/system dependency
- Next step
```

### Phase 2 success criteria

```text
- legacy-step-rules.md contains Step 0–12 summary
- old prompt files remain preserved
- orchestrator does not load legacy-step-rules.md by default
- legacy rules are clearly marked as fallback only
```

---

## 6. Phase 3 — Create First Standalone Step Skill

### Recommended first step skill

Start with:

```text
step-dptw/
```

Reason:

```text
- Simple logic
- Mandatory step
- Easy to test
- Strong control rule
- Good proof of standalone step skill design
```

### Suggested structure

```text
step-dptw/
├── SKILL.md
└── references/
    ├── evidence-rules.md
    ├── pass-fail-criteria.md
    └── response-templates.md
```

### Responsibility

`step-dptw` should only answer:

```text
Can Step 2: DPTW Login proceed or not?
```

It should output:

```json
{
  "step": "dptw_login",
  "result": "Proceed | Pending | Rework | Escalate | Manual Check Required",
  "missing_items": [],
  "risk_flags": [],
  "required_action": "",
  "next_step": "ehs_login",
  "whatsapp_message": ""
}
```

### Phase 3 success criteria

```text
- step-dptw exists
- orchestrator routing-rules.md points DPTW-related messages to step-dptw
- step-dptw does not access raw Firebase/iEPMS API
- step-dptw returns compact structured result
```

---

## 7. Phase 4 — Create Priority Step Skills

After `step-dptw`, create:

```text
step-check-in/
step-alarm-check/
step-check-out/
```

Priority reason:

```text
step-check-in = starts formal reporting flow
step-alarm-check = critical risk control
step-check-out = closes site activity and requires progress/risk summary
```

### Each step skill should follow this structure

```text
step-{name}/
├── SKILL.md
└── references/
    ├── evidence-rules.md
    ├── pass-fail-criteria.md
    └── response-templates.md
```

### Phase 4 success criteria

```text
- core mandatory/critical steps are standalone
- orchestrator routes to standalone skills instead of legacy fallback
- each step skill is small and single-purpose
```

---

## 8. Phase 5 — Connect System Skills

### Objective

Connect system data through lightweight action registry, not heavy context loading.

System skills:

```text
firebase-db
fbr-check
iepms-system
iepms-fishbone-data-checker
iepms-writter / iepms-data-writter
tipic-system
noc-system
```

### System skill rule

System skills must act as connectors/adapters.

They should:

```text
- Query or update system data
- Normalize response
- Return compact JSON
```

They should not:

```text
- Make final workflow decision
- Load business SOP
- Generate long explanation
- Replace step skill validation
```

### Firebase boundary

Firebase is accessed only through `firebase-db`:

```text
readFirebase {relative_path}
writeFirebase {relative_path} "{json_payload}"
```

Rules:

```text
- No Firebase URL in orchestrator
- No PUT
- No DELETE
- PATCH only through firebase-db
- GET only through firebase-db
- Relative paths only
```

### Phase 5 success criteria

```text
- action-registry.md maps system actions clearly
- orchestrator can describe when to call each system skill
- no raw Firebase/iEPMS/TIPIC API details are loaded by default
```

---

## 9. Phase 6 — Firebase State Model and Job Queue

### Objective

Implement or align Firebase state management.

Canonical site state should follow:

```json
{
  "site_id": "",
  "link_id": "",
  "site_code": "",
  "scope": "",
  "project_code": "",
  "current_step": "",
  "current_step_id": 0,
  "overall_status": "not_started | in_progress | blocked | completed",
  "session": {
    "session_id": "",
    "sender": "",
    "role": "subcon | admin | zte_pic",
    "channel": "whatsapp",
    "status": "active | closed"
  },
  "steps": {},
  "site_data": {},
  "risks": [],
  "next_action": "",
  "last_ai_decision": "",
  "last_ai_response": "",
  "updated_at": ""
}
```

Recommended relative Firebase paths:

```text
siteNavigator/sessionsBySender/{sender}
siteNavigator/sites/{site_id}/state
siteNavigator/sites/{site_id}/stepEvents/{event_id}
siteNavigator/sites/{site_id}/messageLogs/{message_id}
siteNavigator/jobs/{job_id}
siteNavigator/sites/{site_id}/jobs/{job_id}
siteNavigator/dashboard/sites/{site_id}
siteNavigator/sites/{site_id}/risks/{risk_id}
siteNavigator/sites/{site_id}/fbrCache
```

### Phase 6 success criteria

```text
- Firebase state schema is stable
- async job records are defined
- message logs and step events are defined
- no Firebase URL leaks into orchestrator
```

---

## 10. Phase 7 — Hook Fast Path

### Objective

Only after orchestrator and state model are stable, implement OpenClaw hook fast path.

Hook location should normally be:

```text
<workspace>/hooks/zte-site-navigator-fast-reply/
├── HOOK.md
└── handler.ts or handler.js
```

### Hook responsibilities

```text
- Parse WhatsApp message
- Detect sender/site/intent
- Use in-memory state if available
- Generate immediate short reply
- Queue Firebase write/job
- Avoid LLM before first reply for common cases
```

### Hook must not

```text
- Read all prompt/reference files
- Call slow iEPMS synchronously
- Hardcode Firebase URL
- Use SQLite
- Wait for backend checks before first reply
```

### Phase 7 success criteria

```text
- Hook is discovered by OpenClaw
- Hook replies quickly or safely prepares state
- Fast path does not break normal agent path
- Firebase writes are delegated to firebase-db or queued
```

---

## 11. Phase 8 — Domain Review Skills

### Objective

Add deep review capabilities separately from workflow control.

Domain skills:

```text
l1-report-review/
ehs-review/
pac-review/
as-built-review/
tssr-review/
pathloss-review/
```

These should not live inside the orchestrator.

### Domain skill output

Each should return structured output:

```json
{
  "result": "Pass | Conditional Pass | Pending | Reject",
  "defects": [],
  "missing_evidence": [],
  "risk_level": "",
  "required_action": "",
  "summary": ""
}
```

### Phase 8 success criteria

```text
- report/photo reviews do not bloat orchestrator context
- orchestrator routes to domain skill only when required
- review results can update Firebase state or step events
```

---

## 12. Context Management Principle

The context rule for the entire project:

```text
Never load the whole system.
Load only the current decision slice.
```

Always load for orchestrator:

```text
- SKILL.md
- workflow-map.md
- state-model.md
- routing-rules.md
- result-status.md
- action-registry.md
- output-format.md
```

Load only on demand:

```text
- current step skill
- current domain skill
- legacy-step-rules.md fallback
- specific system action summary
```

Do not load by default:

```text
- old prompt/ folder
- old step references
- all step skills
- raw API docs
- raw API responses
- full WhatsApp history
- unrelated review rules
```

---

## 13. Step 0–12 Workflow Reference

```text
Step 0: Greeting and Status
- Start session
- Resolve role and site
- Get compact status snapshot when available
- Next: Step 1

Step 1: Check-in Report
- Generate/confirm arrival report
- Exactly two WhatsApp messages: CelcomDigi NOC and ZTE Safety
- User must manually forward both
- Next: Step 2

Step 2: DPTW Login
- Confirm CDPTW login
- Mandatory
- Next: Step 3

Step 3: EHS Login
- Complete/verify EHS check
- Conditional but safety-critical
- Next: Step 4

Step 4: Material Scan
- Confirm MOS/material scan
- Conditional
- Next: Step 5

Step 5: L1 Before Photo
- Capture before-work evidence
- Critical before installation
- Next: Step 6

Step 6: Installation
- Physical installation
- Optional/long-running
- Next: Step 7

Step 7: Integration
- Commissioning/NMS visibility
- Optional/long-running
- Next: Step 8

Step 8: Alarm Check
- Confirm no blocking alarm
- Critical before leaving site
- Next: Step 9

Step 9: L1 Submission with After Photo
- Submit after photos/L1
- Optional but important
- Next: Step 10

Step 10: Decommissioning Check
- Required only when SOW/scope requires decom
- Next: Step 11

Step 11: Housekeeping
- Clean and restore site
- Critical before check-out
- Next: Step 12

Step 12: Check-out Report
- Show progress and risk summary
- Generate exactly two check-out messages
- User must manually forward both
- Close session after confirmation
```

---

## 14. Recommended Execution Order

```text
P1. Create zte-site-navigator-orchestrator
P2. Extract legacy rules into legacy-step-rules.md
P3. Create step-dptw
P4. Create step-check-in
P5. Create step-alarm-check
P6. Create step-check-out
P7. Connect firebase-db action pattern
P8. Connect fbr-check / iEPMS snapshot action
P9. Add remaining step skills
P10. Add hook fast path
P11. Add domain review skills
P12. Optimize dashboards and async jobs
```

---

## 15. Main Safety Rules

```text
- Do not hardcode Firebase URL
- Do not use PUT or DELETE for Firebase
- Do not create SQLite
- Do not delete old skill files prematurely
- Do not merge all steps back into orchestrator
- Do not let system skills make workflow decisions
- Do not let step skills perform raw API integration
- Do not let orchestrator do deep report review
```

---

## 16. Immediate Next Action

Start with Phase 1:

```text
Create zte-site-navigator-orchestrator/
with SKILL.md and 8 reference files.
```

Do not modify old `zte-subcon-guidebook` yet.

