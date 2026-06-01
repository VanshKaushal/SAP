# OData Service Map

The **SAP Cognitive Workflow Orchestra** exposes business entities via OData-compliant REST endpoints.

## Base URL
`/odata/`

## Entity Sets

### `/odata/Workflows`
- **Description**: Manages `WorkflowHeader` and `WorkflowItem` entities.
- **Supported Query Options**: `$filter`, `$top`, `$skip`, `$orderby`
- **Example**: `/odata/Workflows?$filter=status eq 'PENDING'&$top=10`

### `/odata/Approvals`
- **Description**: Exposes the `ApprovalQueue` tailored for the Fiori Worklist.
- **Supported Query Options**: `$filter`, `$top`, `$skip`
- **Example**: `/odata/Approvals?$filter=priority eq 'HIGH'`

### `/odata/Users`
- **Description**: Manages `BusinessPartner` and system user entities.
- **Supported Query Options**: `$filter`, `$top`, `$skip`

### `/odata/RiskAnalysis`
- **Description**: Exposes `Z_RISK_MONITORING` CDS-style analytical views.
- **Supported Query Options**: `$top`, `$orderby`

### `/odata/SystemHealth`
- **Description**: Exposes `Z_AI_DIAGNOSTICS` views.

## Architecture Mapping
The OData layer is built on top of FastAPI, utilizing custom middleware to parse OData `$xyz` query parameters and translate them into SQLAlchemy query builder syntax.
