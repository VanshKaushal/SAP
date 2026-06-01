# SAP Build Process Automation Mapping

This document maps the core execution elements of the SAP Cognitive Workflow Orchestra to the standard terminology and features of **SAP Build Process Automation**.

## Concepts

### 1. Business Processes (Workflows)
In the platform, a `WorkflowHeader` represents an instance of an overarching Business Process. Like SAP Build, this process is modeled as a sequence of steps, gates, and conditions.

### 2. Business Rules (AI & Risk Engines)
Instead of static decision tables, this platform leverages the **Risk Intelligence Engine** and **AI Copilot** as dynamic Business Rules. They evaluate context in real-time, determine risk vectors (`Z_RISK_MONITORING`), and make autonomous routing decisions before escalating to a human user.

### 3. Forms and User Tasks (Approval Center)
The Fiori-styled `ApprovalCenter` serves as the universal inbox for "User Tasks." It handles forms securely, exposing required data via the OData `/odata/Approvals` endpoint.

### 4. Visibility Scenarios (Analytics Dashboard)
The `Z_WORKFLOW_ANALYTICS` and `Z_SLA_PERFORMANCE` views serve the exact function of Process Visibility Scenarios, giving stakeholders real-time insights into process health, bottlenecks, and KPIs.

## Key Differences & Enhancements
- **AI-Native Runtime**: Standard SAP Build relies heavily on declarative rules. Our architecture embeds LLM and Graph-based inference natively in the routing pipeline.
- **OpenUI5 Extensibility**: The platform supports hybrid rendering (React + OpenUI5), allowing standard SAP extensions while keeping edge performance optimized.
