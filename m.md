MISSION: SAP COGNITIVE WORKFLOW ORCHESTRA — FORENSIC DEAD CODE ELIMINATION AUDIT

CRITICAL OBJECTIVE

Perform a full forensic analysis of the entire repository.

DO NOT add features.

DO NOT redesign UI.

DO NOT modify business logic unless required.

The sole mission is:

Identify and safely remove:

* dead files
* dead folders
* dead imports
* dead exports
* dead components
* dead services
* dead hooks
* dead routes
* dead APIs
* dead models
* dead CSS
* dead assets
* duplicate implementations
* abandoned SAP mock layers

WITHOUT breaking:

* React frontend
* FastAPI backend
* SAP CAP backend
* OpenUI5 applications
* OData services
* AI Copilot
* Workflow Engine
* Risk Engine
* Analytics Engine

==================================================
PHASE 1 — REPOSITORY FORENSICS
==============================

Generate:

FORENSIC_FILE_INVENTORY.md

Scan every file.

Classify each file as:

ACTIVE
LIKELY_ACTIVE
SUSPICIOUS
DEAD
UNKNOWN

Include:

* path
* purpose
* references
* import count
* export count

==================================================
PHASE 2 — DEPENDENCY GRAPH
==========================

Build complete dependency graph.

Frontend:

* React
* TypeScript
* Hooks
* Components
* Services

Backend:

* FastAPI
* SQLAlchemy
* Engines
* APIs

SAP:

* CAP
* CDS
* OData
* OpenUI5

Generate:

DEPENDENCY_GRAPH.md

==================================================
PHASE 3 — ORPHAN DETECTION
==========================

Identify:

Files imported nowhere.

Components rendered nowhere.

Routes navigated nowhere.

Hooks consumed nowhere.

Services called nowhere.

Models instantiated nowhere.

CSS loaded nowhere.

Assets referenced nowhere.

Generate:

ORPHAN_REPORT.md

DO NOT DELETE YET.

==================================================
PHASE 4 — DUPLICATE IMPLEMENTATION DETECTION
============================================

Search for:

Duplicate:

* types
* interfaces
* APIs
* stores
* hooks
* workflow models
* approval models
* analytics models

Generate:

DUPLICATE_REPORT.md

Recommend canonical implementation.

==================================================
PHASE 5 — SAP AUTHENTICITY AUDIT
================================

Locate:

Legacy SAP mocks.

Legacy fake OData.

Legacy SAP-themed placeholders.

Legacy SAP simulation files.

Determine:

Still needed
Replaceable
Safe to remove

Generate:

SAP_CLEANUP_REPORT.md

==================================================
PHASE 6 — SAFE REMOVAL PLAN
===========================

Before deleting anything:

Produce:

SAFE_REMOVAL_PLAN.md

For each candidate:

File
Reason
Dependencies
Risk Level

Risk Levels:

LOW
MEDIUM
HIGH
CRITICAL

Only LOW files may be automatically removed.

==================================================
PHASE 7 — AUTOMATED LOW-RISK CLEANUP
====================================

Remove ONLY:

* unused imports
* unused exports
* unreachable utilities
* abandoned CSS
* unused assets
* duplicate reports

DO NOT touch:

WorkflowEngine

RiskEngine

NotificationEngine

AIEngine

CAP

CDS

OData

OpenUI5

Authentication

Shared persistence

==================================================
PHASE 8 — VALIDATION LOOP
=========================

After EVERY deletion:

Run:

npm run build

TypeScript check

Lint

FastAPI startup

CAP startup

OpenUI5 startup

If any failure occurs:

Restore deleted artifact.

Reclassify.

Retry.

==================================================
PHASE 9 — FINAL CERTIFICATION
=============================

Generate:

CLEANUP_CERTIFICATION.md

Include:

Files removed

Files retained

Risk items remaining

Storage saved

Dependency improvements

Technical debt reduction

==================================================
SUCCESS CRITERIA
================

Project must:

Compile successfully

Run successfully

Pass validation

Retain all functionality

Reduce technical debt

Provide evidence for every deletion

No assumptions.

No speculative deletions.

No bulk removal.

Every deletion must be justified and validated.


Do not let Antigravity auto-delete anything classified as MEDIUM, HIGH, or CRITICAL risk. Require it to generate reports first. In projects that have undergone multiple AI-driven refactors, the most dangerous files are often the ones that appear unused but are loaded dynamically, imported indirectly, or required by runtime configuration.