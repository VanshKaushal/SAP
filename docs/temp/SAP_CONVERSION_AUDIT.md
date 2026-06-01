# SAP Conversion Audit

## Overview
This document evaluates the state of the "SAP Cognitive Workflow Orchestra" prior to its true SAP transformation. The project is currently built on a non-SAP tech stack mimicking an SAP environment.

## Current Backend Architecture
- **Framework**: FastAPI (Python)
- **Database ORM**: SQLAlchemy
- **Database Engine**: SQLite (`sap_orchestra.db`)
- **Key Modules**:
  - `workflow_engine`: Orchestrates approvals and workflows.
  - `ai_engine`: Integrates OpenRouter for AI inference.
  - `graph_engine`: NetworkX graph processing.
  - `analytics_engine`: Computes SLAs and risks.

## Current Frontend Architecture
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS
- **Libraries**: `react-force-graph-2d`, `recharts`, `framer-motion`
- **Key Screens**: Dashboard, Workflows, Approvals, Intelligence.

## Mock SAP Artifacts & Technical Debt
- **Fake SAP Models**: Data structures use names like "SLAProfile" and "Workflow" but run purely on SQLAlchemy.
- **Disconnected Data**: Front-end state relies on standard REST endpoints without OData v4 conventions ($filter, $top, $expand).
- **Hardcoded Values**: Likely present in demo data. Needs full audit during Phase 9.

## Risks & Considerations
- Retaining React platform while introducing OpenUI5 requires running multiple frontend services or serving them side-by-side.
- Synchronizing the SQLite database between FastAPI (Python) and CAP (Node.js) requires careful connection handling.
