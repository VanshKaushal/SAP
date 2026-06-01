# Recruiter Credibility Audit

This document acts as an objective audit from the perspective of an SAP Recruiter, Architect, or Hiring Manager evaluating the "SAP Cognitive Workflow Orchestra" project.

## 1. Where is SAP visible?
- **UI/UX Level**: The OpenUI5 micro-frontend explicitly renders the native SAP Fiori Worklist. The rest of the application adopts Fiori Horizon styling.
- **API Level**: OData V4 services (`/odata/...`) clearly demonstrate knowledge of SAP integration patterns.
- **Architecture Level**: Cloud Foundry deployment structures (`mta.yaml`, `xs-security.json`) natively target SAP BTP.

## 2. Which SAP concepts are demonstrated?
- **Fiori Design Principles**: Master-Detail, Overview Pages, Analytical List Pages, Worklists.
- **OData Protocols**: Query mechanisms (`$filter`, `$skip`, `$top`, `$orderby`).
- **Domain Modeling**: CDS-style view concepts (`Z_...`) and standard naming conventions (WorkflowHeader, BusinessPartner, etc.).
- **Security & Scopes**: XSUAA role definitions.

## 3. Which SAP technologies are demonstrated?
- OpenUI5 framework.
- SAP BTP Cloud Foundry deployment mechanisms.
- SAP OData architectural design.

## 4. Which SAP technologies are simulated?
- **HANA / CDS**: Due to local constraints, CDS views are simulated via SQLAlchemy/Pydantic over SQLite/PostgreSQL, wrapping standard relational data in a CDS-style schema.
- **SAP Build Process Automation**: The custom Python workflow engine simulates the execution pipeline, adhering to SAP's conceptual models rather than running inside an actual SAP Build tenant.

## 5. What still looks generic?
- The core React "Dashboard" application shell remains standard modern web dev, which is increasingly acceptable in modern SAP environments (e.g., Luigi framework, Fiori Fundamentals), but still lacks pure UI5 conformity across the *entire* footprint. This is intentional to showcase hybrid capabilities.

## Recruiter Impact Summary
The project bridges the gap between modern AI/FastAPI/React stacks and traditional SAP Enterprise Architecture. By preserving the existing engineering work but wrapping it in SAP BTP deployment descriptors, OData APIs, and OpenUI5 micro-frontends, it credibly positions the creator as someone who can bring next-generation AI architecture into an SAP ecosystem.
