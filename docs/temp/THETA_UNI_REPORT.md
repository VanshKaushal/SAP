# THETA UNI REPORT - Forensic Dead Code Elimination Audit

*This unified report consolidates all forensic scanning, dependency mapping, orphan detection, duplication, authenticity auditing, and safe removal plans for the SAP Cognitive Workflow Orchestra.*

---

## 1. Forensic File Inventory

| Path | Purpose | Imports | Exports | Status |
|---|---|---|---|---|
| backend/__init__.py | Component of backend | 0 | 0 | DEAD |
| backend/ai_engine/engine.py | Component of backend | 2 | 6 | ACTIVE |
| backend/analytics_engine/engine.py | Component of backend | 3 | 4 | ACTIVE |
| backend/api/analytics.py | Component of backend | 5 | 1 | ACTIVE |
| backend/api/copilot.py | Component of backend | 2 | 2 | ACTIVE |
| backend/api/graph.py | Component of backend | 5 | 1 | ACTIVE |
| backend/api/health.py | Component of backend | 3 | 1 | ACTIVE |
| backend/api/notifications.py | Component of backend | 6 | 1 | ACTIVE |
| backend/api/odata_routes.py | Component of backend | 7 | 6 | ACTIVE |
| backend/api/odata_utils.py | Component of backend | 4 | 1 | ACTIVE |
| backend/api/risk_analysis.py | Component of backend | 6 | 1 | ACTIVE |
| backend/api/sap_integration.py | Component of backend | 4 | 2 | ACTIVE |
| backend/api/tasks.py | Component of backend | 6 | 2 | ACTIVE |
| backend/api/workflows.py | Component of backend | 7 | 5 | ACTIVE |
| backend/auth/auth_handler.py | Component of backend | 4 | 5 | ACTIVE |
| backend/config/settings.py | Component of backend | 3 | 1 | ACTIVE |
| backend/engines/notification_engine.py | Component of backend | 4 | 6 | ACTIVE |
| backend/graph_engine/engine.py | Component of backend | 3 | 4 | ACTIVE |
| backend/main.py | Component of backend | 4 | 1 | ACTIVE |
| backend/models/database.py | Component of backend | 4 | 1 | SUSPICIOUS |
| backend/models/workflow.py | Component of backend | 5 | 7 | SUSPICIOUS |
| backend/schemas/cds_views.py | Component of backend | 3 | 6 | ACTIVE |
| backend/schemas/sap_domain.py | Component of backend | 3 | 10 | ACTIVE |
| backend/schemas/workflow.py | Component of backend | 4 | 12 | ACTIVE |
| backend/utils/seed_db.py | Component of backend | 4 | 1 | ACTIVE |
| backend/workflow_engine/engine.py | Component of backend | 4 | 6 | ACTIVE |
| sap-cap/.vscode/tasks.json | Component of sap-cap | 0 | 0 | LIKELY_ACTIVE |
| sap-cap/db/schema.cds | Component of sap-cap | 0 | 0 | LIKELY_ACTIVE |
| sap-cap/package-lock.json | Component of sap-cap | 0 | 0 | LIKELY_ACTIVE |
| sap-cap/package.json | Component of sap-cap | 0 | 0 | LIKELY_ACTIVE |
| sap-cap/srv/workflow-service.cds | Component of sap-cap | 0 | 0 | LIKELY_ACTIVE |
| src/App.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/App.tsx | Component of src | 13 | 0 | LIKELY_ACTIVE |
| src/components/Atmosphere.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/Atmosphere.tsx | Component of src | 2 | 0 | LIKELY_ACTIVE |
| src/components/CommandPalette.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/CommandPalette.tsx | Component of src | 3 | 0 | LIKELY_ACTIVE |
| src/components/DiagnosticOverlay.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/DiagnosticOverlay.tsx | Component of src | 4 | 0 | LIKELY_ACTIVE |
| src/components/EmptyState.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/EmptyState.tsx | Component of src | 4 | 0 | LIKELY_ACTIVE |
| src/components/IntroLoader.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/IntroLoader.tsx | Component of src | 4 | 0 | LIKELY_ACTIVE |
| src/components/Layout.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/Layout.tsx | Component of src | 8 | 0 | LIKELY_ACTIVE |
| src/components/Navbar.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/Navbar.tsx | Component of src | 6 | 0 | LIKELY_ACTIVE |
| src/components/NotificationCenter.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/NotificationCenter.tsx | Component of src | 5 | 0 | LIKELY_ACTIVE |
| src/components/Sidebar.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/Sidebar.tsx | Component of src | 4 | 0 | LIKELY_ACTIVE |
| src/components/SystemHealthBar.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/components/SystemHealthBar.tsx | Component of src | 4 | 0 | LIKELY_ACTIVE |
| src/hooks/useWorkflowStore.ts | Component of src | 5 | 1 | ACTIVE |
| src/index.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/main.tsx | Component of src | 4 | 0 | LIKELY_ACTIVE |
| src/screens/AICopilot.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/AICopilot.tsx | Component of src | 6 | 0 | LIKELY_ACTIVE |
| src/screens/Analytics.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/Analytics.tsx | Component of src | 3 | 0 | LIKELY_ACTIVE |
| src/screens/ApprovalCenter.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/ApprovalCenter.tsx | Component of src | 3 | 0 | LIKELY_ACTIVE |
| src/screens/Dashboard.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/Dashboard.tsx | Component of src | 5 | 0 | LIKELY_ACTIVE |
| src/screens/Landing.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/Landing.tsx | Component of src | 3 | 0 | LIKELY_ACTIVE |
| src/screens/Settings.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/Settings.tsx | Component of src | 2 | 0 | LIKELY_ACTIVE |
| src/screens/WorkflowGraph.css | Component of src | 0 | 0 | LIKELY_ACTIVE |
| src/screens/WorkflowGraph.tsx | Component of src | 6 | 0 | LIKELY_ACTIVE |
| src/services/ApiService.ts | Component of src | 3 | 1 | ACTIVE |
| src/services/WorkflowEngine.ts | Component of src | 3 | 1 | ACTIVE |
| src/types/ai.ts | Component of src | 0 | 4 | LIKELY_ACTIVE |
| src/types/analytics.ts | Component of src | 0 | 6 | LIKELY_ACTIVE |
| src/types/api.ts | Component of src | 0 | 3 | LIKELY_ACTIVE |
| src/types/graph.ts | Component of src | 0 | 3 | LIKELY_ACTIVE |
| src/types/navigation.ts | Component of src | 0 | 1 | LIKELY_ACTIVE |
| src/types/notification.ts | Component of src | 0 | 3 | LIKELY_ACTIVE |
| src/types/settings.ts | Component of src | 0 | 4 | LIKELY_ACTIVE |
| src/types/user.ts | Component of src | 0 | 2 | LIKELY_ACTIVE |
| src/types/workflow.ts | Component of src | 0 | 6 | LIKELY_ACTIVE |
| ui5-approval-center/package.json | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-approval-center/webapp/Component.js | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-approval-center/webapp/controller/App.controller.js | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-approval-center/webapp/index.html | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-approval-center/webapp/manifest.json | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-approval-center/webapp/model/models.js | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-approval-center/webapp/view/App.view.xml | Component of ui5-approval-center | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/package-lock.json | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/package.json | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/webapp/Component.js | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/webapp/controller/App.controller.js | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/webapp/index.html | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/webapp/manifest.json | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/webapp/model/models.js | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |
| ui5-user-management/webapp/view/App.view.xml | Component of ui5-user-management | 0 | 0 | LIKELY_ACTIVE |

---

## 2. Dependency Graph

```mermaid
graph TD
    NotificationCenter_tsx --> NotificationCenter_css
    Sidebar_tsx --> navigation
    App_tsx --> Landing
    Analytics_tsx --> useWorkflowStore
    tasks_py --> backend_models_database
    workflows_py --> sqlalchemy_orm
    workflow_py --> datetime
    analytics_py --> sqlalchemy_orm
    NotificationCenter_tsx --> react
    health_py --> fastapi
    NotificationCenter_tsx --> lucide_react
    useWorkflowStore_ts --> workflow
    odata_routes_py --> backend_models
    risk_analysis_py --> sqlalchemy_orm
    engine_py --> backend_engines_notification_engine
    workflows_py --> backend_models_database
    App_tsx --> Settings
    App_tsx --> Analytics
    Landing_tsx --> react
    notification_engine_py --> datetime
    Sidebar_tsx --> Sidebar_css
    health_py --> psutil
    DiagnosticOverlay_tsx --> react
    Layout_tsx --> navigation
    database_py --> sqlalchemy_orm
    cds_views_py --> datetime
    Layout_tsx --> Navbar
    database_py --> backend_config_settings
    settings_py --> pydantic_settings
    notifications_py --> fastapi
    notifications_py --> backend_schemas_workflow
    engine_py --> datetime
    Layout_tsx --> Atmosphere
    WorkflowGraph_tsx --> WorkflowGraph_css
    odata_routes_py --> backend_schemas
    Settings_tsx --> Settings_css
    workflows_py --> backend_workflow_engine_engine
    workflows_py --> typing
    Sidebar_tsx --> react
    WorkflowGraph_tsx --> react_force_graph_2d
    graph_py --> backend_models_database
    useWorkflowStore_ts --> notification
    settings_py --> dotenv
    main_py --> backend_api
    ApiService_ts --> analytics
    App_tsx --> ApprovalCenter
    EmptyState_tsx --> framer_motion
    workflow_py --> pydantic
    Landing_tsx --> Landing_css
    workflows_py --> backend_models_workflow
    App_tsx --> IntroLoader
    Atmosphere_tsx --> react
    workflow_py --> sqlalchemy_orm
    IntroLoader_tsx --> react
    AICopilot_tsx --> ai
    useWorkflowStore_ts --> react
    SystemHealthBar_tsx --> SystemHealthBar_css
    EmptyState_tsx --> EmptyState_css
    WorkflowGraph_tsx --> react
    Dashboard_tsx --> framer_motion
    IntroLoader_tsx --> lucide_react
    useWorkflowStore_ts --> analytics
    SystemHealthBar_tsx --> react
    graph_py --> fastapi
    CommandPalette_tsx --> react
    ApprovalCenter_tsx --> ApprovalCenter_css
    AICopilot_tsx --> framer_motion
    EmptyState_tsx --> react
    cds_views_py --> pydantic
    AICopilot_tsx --> useWorkflowStore
    Layout_tsx --> Sidebar
    DiagnosticOverlay_tsx --> DiagnosticOverlay_css
    tasks_py --> backend_models_workflow
    Navbar_tsx --> lucide_react
    Dashboard_tsx --> SystemHealthBar
    sap_domain_py --> pydantic
    CommandPalette_tsx --> CommandPalette_css
    odata_utils_py --> sqlalchemy
    graph_py --> backend_graph_engine_engine
    odata_routes_py --> typing
    App_tsx --> App_css
    useWorkflowStore_ts --> ApiService
    odata_routes_py --> fastapi
    main_tsx --> react
    Navbar_tsx --> NotificationCenter
    DiagnosticOverlay_tsx --> lucide_react
    workflow_py --> backend_models_database
    Navbar_tsx --> react
    workflows_py --> fastapi
    WorkflowEngine_ts --> workflow
    analytics_py --> backend_analytics_engine_engine
    IntroLoader_tsx --> framer_motion
    ApiService_ts --> notification
    odata_routes_py --> backend_api_odata_utils
    seed_db_py --> random
    tasks_py --> backend_schemas_workflow
    seed_db_py --> datetime
    tasks_py --> sqlalchemy_orm
    odata_utils_py --> sqlalchemy_orm
    workflows_py --> backend_schemas_workflow
    Atmosphere_tsx --> Atmosphere_css
    Dashboard_tsx --> useWorkflowStore
    risk_analysis_py --> backend_graph_engine_engine
    engine_py --> backend_config_settings
    workflow_py --> typing
    Dashboard_tsx --> react
    ApprovalCenter_tsx --> react
    workflow_py --> sqlalchemy_sql
    graph_py --> sqlalchemy_orm
    AICopilot_tsx --> AICopilot_css
    App_tsx --> Layout
    workflow_py --> sqlalchemy
    WorkflowGraph_tsx --> lucide_react
    Navbar_tsx --> Navbar_css
    auth_handler_py --> typing
    odata_routes_py --> sqlalchemy_orm
    WorkflowEngine_ts --> notification
    ApprovalCenter_tsx --> useWorkflowStore
    copilot_py --> backend_ai_engine_engine
    main_tsx --> client
    notifications_py --> sqlalchemy_orm
    sap_domain_py --> typing
    Landing_tsx --> framer_motion
    App_tsx --> framer_motion
    NotificationCenter_tsx --> framer_motion
    Analytics_tsx --> react
    main_py --> fastapi
    Settings_tsx --> react
    copilot_py --> fastapi
    engine_py --> networkx
    Layout_tsx --> CommandPalette
    notifications_py --> backend_models_database
    sap_integration_py --> backend_models_database
    AICopilot_tsx --> react
    notifications_py --> backend_models_workflow
    sap_integration_py --> fastapi
    seed_db_py --> backend_models_database
    Dashboard_tsx --> Dashboard_css
    SystemHealthBar_tsx --> framer_motion
    NotificationCenter_tsx --> notification
    analytics_py --> fastapi
    App_tsx --> react
    sap_integration_py --> backend_models_workflow
    sap_integration_py --> sqlalchemy_orm
    main_py --> uvicorn
    IntroLoader_tsx --> IntroLoader_css
    Layout_tsx --> framer_motion
    graph_py --> backend_models_workflow
    Sidebar_tsx --> framer_motion
    engine_py --> httpx
    App_tsx --> Dashboard
    App_tsx --> AICopilot
    risk_analysis_py --> backend_models_database
    WorkflowGraph_tsx --> useWorkflowStore
    WorkflowEngine_ts --> analytics
    database_py --> sqlalchemy
    database_py --> sqlalchemy_ext_declarative
    cds_views_py --> typing
    AICopilot_tsx --> ApiService
    SystemHealthBar_tsx --> lucide_react
    engine_py --> typing
    health_py --> time
    EmptyState_tsx --> lucide_react
    analytics_py --> backend_models_workflow
    CommandPalette_tsx --> framer_motion
    engine_py --> backend_models_workflow
    notification_engine_py --> backend_models_workflow
    Layout_tsx --> Layout_css
    App_tsx --> navigation
    Analytics_tsx --> Analytics_css
    risk_analysis_py --> backend_ai_engine_engine
    notification_engine_py --> sqlalchemy_orm
    odata_routes_py --> backend_models_database
    workflow_py --> backend_models_workflow
    WorkflowGraph_tsx --> graph
    analytics_py --> backend_models_database
    seed_db_py --> backend_models_workflow
    notifications_py --> typing
    DiagnosticOverlay_tsx --> framer_motion
    workflow_py --> enum
    odata_utils_py --> fastapi
    tasks_py --> fastapi
    tasks_py --> typing
    auth_handler_py --> jose
    risk_analysis_py --> fastapi
    ApiService_ts --> workflow
    App_tsx --> WorkflowGraph
    settings_py --> os
    odata_utils_py --> typing
    main_tsx --> App_tsx
    Navbar_tsx --> DiagnosticOverlay
    risk_analysis_py --> backend_models_workflow
    auth_handler_py --> fastapi_security
    main_tsx --> index_css
    notification_engine_py --> uuid
    sap_domain_py --> datetime
    Navbar_tsx --> useWorkflowStore
    main_py --> fastapi_middleware_cors
    engine_py --> sqlalchemy_orm
    Layout_tsx --> react
```

---

## 3. Orphan Detection Report

This report documents orphaned artifacts (files imported nowhere, unused components) found during the forensic audit. No deletions will occur based on this report alone; it serves as input to the Safe Removal Plan.

### Identified Orphans

**Files**
1. `backend/__init__.py`
   - **Reason**: 0 imports, 0 exports. Empty initialization file not required by FastAPI runtime or Python 3.3+.
   - **Status**: Orphan.

**Unused Code (Fixed previously)**
- Unused icons in `src/components/Sidebar.tsx`.
- Unused variables `approveWorkflow`, `rejectWorkflow`, `pendingWorkflows` in `src/screens/ApprovalCenter.tsx`.

### Conclusion
The frontend is surprisingly clean post-Enterprise Hardening. The backend has minor structural orphans. 

---

## 4. Duplicate Implementation Detection

This report identifies duplicated business logic, data models, and services caused by the hybrid architecture state (running both legacy React/FastAPI and modern UI5/CAP stacks).

### Identified Duplications

**1. Data Models**
- **Legacy**: `backend/models/workflow.py` (SQLAlchemy models)
- **Modern**: `sap-cap/db/schema.cds` (CDS models)
- **Recommendation**: Canonical implementation should be the CDS models. However, removing the SQLAlchemy models requires a massive refactor of the FastAPI engines. 

**2. OData Endpoints**
- **Legacy**: `backend/api/odata_routes.py` (Fake FastAPI OData layer)
- **Modern**: `sap-cap/srv/workflow-service.cds` (True SAP CAP OData V4 layer)
- **Recommendation**: Canonical implementation is CAP. The legacy FastAPI OData endpoints should be removed.

**3. Database Configurations**
- **Legacy**: `backend/models/database.py` (SQLAlchemy engine configuration)
- **Modern**: `sap-cap/package.json` (`@cap-js/sqlite` config pointing to shared DB)
- **Recommendation**: Both are technically needed right now to connect their respective servers to the shared SQLite database. Do not delete either.

---

## 5. SAP Authenticity & Cleanup Audit

This audit targets legacy Python and React code that was originally built to mimic SAP functionality before true SAP capabilities were introduced.

### Identified Mock SAP Artifacts

**Fake SAP Integration Handlers**
- `backend/api/sap_integration.py`
  - **Purpose**: A mock API router pretending to integrate with SAP ECC/S4.
  - **Verdict**: Safe to remove, as true SAP integration now occurs via BTP/CAP.

**Fake OData Layer**
- `backend/api/odata_routes.py`
- `backend/api/odata_utils.py`
  - **Purpose**: Python files manually parsing `$filter` and `$expand` strings to mimic OData.
  - **Verdict**: Replaceable. True OData V4 is now handled autonomously by SAP CAP.

**Fake SAP Data Models**
- `backend/models/workflow.py` (Entities named `SLAProfile`, `RiskAssessment`)
  - **Verdict**: Still needed for the Python `ai_engine` and `risk_engine`. Cannot safely remove without breaking the backend.

### Actionable Strategy
The mock API routes (`sap_integration.py`, `odata_routes.py`, `odata_utils.py`) are prime candidates for cleanup, provided they are unhooked from `backend/main.py`.

---

## 6. Safe Removal Plan

This plan aggregates candidates for deletion based on the Orphan, Duplicate, and Authenticity reports. Each file is assigned a risk level. **Only files classified as LOW risk may be automatically deleted by Antigravity.**

### Deletion Candidates

**1. `backend/__init__.py`**
- **Reason**: Empty python package marker, unreferenced, 0 imports/exports.
- **Dependencies**: None.
- **Risk Level**: **LOW**

**2. `backend/api/sap_integration.py`**
- **Reason**: Mock SAP integration layer.
- **Dependencies**: Included in `backend/main.py` routers.
- **Risk Level**: **MEDIUM** (Requires modifying `main.py` to prevent crash on boot).

**3. `backend/api/odata_routes.py` & `backend/api/odata_utils.py`**
- **Reason**: Fake Python OData endpoints superseded by CAP.
- **Dependencies**: Included in `backend/main.py` routers.
- **Risk Level**: **MEDIUM** (Requires safely unhooking from `main.py`).

**4. `backend/models/workflow.py`**
- **Reason**: SQLAlchemy models replicating SAP CDS schemas.
- **Dependencies**: Required by `workflow_engine`, `risk_engine`, `ai_engine`.
- **Risk Level**: **CRITICAL** (Deleting this will completely destroy the backend).

**5. `backend/models/database.py`**
- **Reason**: SQLAlchemy DB connection.
- **Dependencies**: Used globally across all Python modules.
- **Risk Level**: **CRITICAL** (Do not touch).

### User Action Required
Please review these classifications. If you approve, I will proceed with **Phase 7** to automatically delete ONLY the **LOW risk** item (`backend/__init__.py`). If you wish to upgrade the MEDIUM risk items to LOW so they can be removed (along with editing `main.py`), please advise.
