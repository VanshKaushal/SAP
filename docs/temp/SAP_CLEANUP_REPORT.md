# SAP Authenticity & Cleanup Audit

## Overview
This audit targets legacy Python and React code that was originally built to mimic SAP functionality before true SAP capabilities were introduced.

## Identified Mock SAP Artifacts

### Fake SAP Integration Handlers
- `backend/api/sap_integration.py`
  - **Purpose**: A mock API router pretending to integrate with SAP ECC/S4.
  - **Verdict**: Safe to remove, as true SAP integration now occurs via BTP/CAP.

### Fake OData Layer
- `backend/api/odata_routes.py`
- `backend/api/odata_utils.py`
  - **Purpose**: Python files manually parsing `$filter` and `$expand` strings to mimic OData.
  - **Verdict**: Replaceable. True OData V4 is now handled autonomously by SAP CAP.

### Fake SAP Data Models
- `backend/models/workflow.py` (Entities named `SLAProfile`, `RiskAssessment`)
  - **Verdict**: Still needed for the Python `ai_engine` and `risk_engine`. Cannot safely remove without breaking the backend.

## Actionable Strategy
The mock API routes (`sap_integration.py`, `odata_routes.py`, `odata_utils.py`) are prime candidates for cleanup, provided they are unhooked from `backend/main.py`.
