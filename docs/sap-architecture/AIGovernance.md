# AI Governance and Compliance Architecture

The **SAP Cognitive Workflow Orchestra** embeds AI within the workflow without compromising enterprise security or auditability.

## AI Copilot Integration
The AI Copilot acts as a specialized assistant within the Fiori Approval Center. It provides context to the `ApprovalUser` but does not execute decisions autonomously without human-in-the-loop validation, adhering to SAP's trustworthy AI principles.

## Traceability & Auditing
Every AI prediction or evaluation (e.g., Risk Intelligence Engine score) is logged into the `Z_AI_DIAGNOSTICS` CDS view, mapped to a specific `WorkflowItem`.

## Architecture Flow
```mermaid
sequenceDiagram
    participant User as Business User
    participant OData as OData Service
    participant Engine as Workflow Engine
    participant AI as AI Copilot
    participant DB as Persistence

    User->>OData: Evaluate WorkflowItem
    OData->>Engine: Trigger Evaluation
    Engine->>AI: Request Risk Assessment
    AI-->>Engine: Return Score & Confidence
    Engine->>DB: Log to Z_AI_DIAGNOSTICS
    Engine-->>OData: Assessment Results
    OData-->>User: Display in Fiori UI
```
