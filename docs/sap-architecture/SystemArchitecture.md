# SAP Cognitive Workflow Orchestra: System Architecture

## Target Architecture

```mermaid
graph TD
    subgraph SAP UI5 / Fiori Layer
        Dashboard[Overview Page]
        ApprovalCenter[Worklist: Approval Center]
        UserMgmt[Object Management: Users]
    end

    subgraph SAP BTP Connectivity
        OData[OData V4 Service Layer]
        CDS[CDS-Inspired Analytics Views]
    end

    subgraph SAP Workflow Architecture
        WorkflowEngine[Workflow Orchestration Engine]
        RiskEngine[Risk Intelligence Engine]
        AICopilot[AI Copilot Layer]
    end

    subgraph Persistence Layer
        DB[(PostgreSQL / SQLite)]
        Models[SAP Domain Models]
    end

    Dashboard --> OData
    ApprovalCenter --> OData
    UserMgmt --> OData

    OData --> WorkflowEngine
    OData --> CDS
    
    WorkflowEngine --> RiskEngine
    WorkflowEngine --> AICopilot
    
    WorkflowEngine --> Models
    RiskEngine --> Models
    CDS --> Models
    Models --> DB
```

### Components:
- **Presentation**: OpenUI5 integrated into React shell, providing authentic Fiori design elements.
- **Service**: FastAPI acting as an OData V4 compliant service provider, facilitating `$filter`, `$skip`, and `$top` operations.
- **Orchestration**: Core Python engine mapping state transitions to SAP Build Process Automation concepts.
- **Intelligence**: AI modules assessing risk and providing copilot functionalities, seamlessly integrated into the approval workflow.
- **Persistence**: Relational database leveraging SQLAlchemy with CDS-style view wrappers (`Z_...`).
