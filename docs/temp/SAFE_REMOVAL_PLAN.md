# Safe Removal Plan

## Overview
This plan aggregates candidates for deletion based on the Orphan, Duplicate, and Authenticity reports. Each file is assigned a risk level. **Only files classified as LOW risk may be automatically deleted by Antigravity.**

## Deletion Candidates

### 1. `backend/__init__.py`
- **Reason**: Empty python package marker, unreferenced, 0 imports/exports.
- **Dependencies**: None.
- **Risk Level**: **LOW**

### 2. `backend/api/sap_integration.py`
- **Reason**: Mock SAP integration layer.
- **Dependencies**: Included in `backend/main.py` routers.
- **Risk Level**: **MEDIUM** (Requires modifying `main.py` to prevent crash on boot).

### 3. `backend/api/odata_routes.py` & `backend/api/odata_utils.py`
- **Reason**: Fake Python OData endpoints superseded by CAP.
- **Dependencies**: Included in `backend/main.py` routers.
- **Risk Level**: **MEDIUM** (Requires safely unhooking from `main.py`).

### 4. `backend/models/workflow.py`
- **Reason**: SQLAlchemy models replicating SAP CDS schemas.
- **Dependencies**: Required by `workflow_engine`, `risk_engine`, `ai_engine`.
- **Risk Level**: **CRITICAL** (Deleting this will completely destroy the backend).

### 5. `backend/models/database.py`
- **Reason**: SQLAlchemy DB connection.
- **Dependencies**: Used globally across all Python modules.
- **Risk Level**: **CRITICAL** (Do not touch).

## User Action Required
Please review these classifications. If you approve, I will proceed with **Phase 7** to automatically delete ONLY the **LOW risk** item (`backend/__init__.py`). If you wish to upgrade the MEDIUM risk items to LOW so they can be removed (along with editing `main.py`), please advise.
