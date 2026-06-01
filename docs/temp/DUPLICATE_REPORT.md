# Duplicate Implementation Detection

## Overview
This report identifies duplicated business logic, data models, and services caused by the hybrid architecture state (running both legacy React/FastAPI and modern UI5/CAP stacks).

## Identified Duplications

### 1. Data Models
- **Legacy**: `backend/models/workflow.py` (SQLAlchemy models)
- **Modern**: `sap-cap/db/schema.cds` (CDS models)
- **Recommendation**: Canonical implementation should be the CDS models. However, removing the SQLAlchemy models requires a massive refactor of the FastAPI engines. 

### 2. OData Endpoints
- **Legacy**: `backend/api/odata_routes.py` (Fake FastAPI OData layer)
- **Modern**: `sap-cap/srv/workflow-service.cds` (True SAP CAP OData V4 layer)
- **Recommendation**: Canonical implementation is CAP. The legacy FastAPI OData endpoints should be removed.

### 3. Database Configurations
- **Legacy**: `backend/models/database.py` (SQLAlchemy engine configuration)
- **Modern**: `sap-cap/package.json` (`@cap-js/sqlite` config pointing to shared DB)
- **Recommendation**: Both are technically needed right now to connect their respective servers to the shared SQLite database. Do not delete either.
