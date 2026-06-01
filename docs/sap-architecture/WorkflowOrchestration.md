# Workflow Orchestration Architecture

This aligns the custom AI workflow engine with **SAP Build Process Automation** paradigms.

## Conceptual Mapping

| Existing Platform Concept | SAP Build Process Automation Concept |
|--------------------------|--------------------------------------|
| Workflow Instance        | Process Instance |
| Step / Task              | Automation Step / User Task |
| Approval Gate            | Approval Form |
| AI Evaluation            | Intelligent Scenario / Business Rule |
| Error State              | Exception / Escalation |

## Orchestration Flow

1. **Trigger**: An external event or API call initiates a `WorkflowHeader`.
2. **Evaluation**: The AI Copilot and Risk Engine act as dynamic "Business Rules" to evaluate the payload.
3. **Routing**: The workflow is routed to the appropriate `ApprovalQueue` based on the evaluated risk score.
4. **Execution (User Task)**: A business user processes the task via the Fiori-styled Approval Center.
5. **Completion**: The `WorkflowItem` is marked complete, triggering downstream actions.

## Advanced Features
- **Dynamic Escalation**: If SLA limits are breached (monitored via `Z_SLA_PERFORMANCE`), the system automatically re-routes the task to higher-level queues.
