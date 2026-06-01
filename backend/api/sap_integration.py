from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.models.workflow import Workflow

router = APIRouter()


@router.get("/odata/v2/Workflows")
def get_odata_workflows(db: Session = Depends(get_db)):
    """
    Mock SAP OData V2 Service Endpoint
    """
    workflows = db.query(Workflow).all()

    # Format according to OData V2 JSON format
    results = []
    for wf in workflows:
        results.append({
            "__metadata": {
                "id": f"Workflows('{wf.id}')",
                "uri": f"/odata/v2/Workflows('{wf.id}')",
                "type": "SAP.Orchestra.Workflow"
            },
            "ID": wf.id,
            "Title": wf.title,
            "Department": wf.department,
            "Status": wf.status,
            "Priority": wf.priority,
            "SLADeadline": wf.sla_deadline.isoformat() if wf.sla_deadline else None
        })

    return {
        "d": {
            "results": results
        }
    }


@router.get("/cds/views/WorkflowAnalytics")
def get_cds_workflow_analytics(db: Session = Depends(get_db)):
    """
    Mock SAP ABAP CDS View result
    """
    # This would typically be a complex SQL query in SAP
    workflows = db.query(Workflow).all()

    return [
        {
            "WorkflowUUID": wf.id,
            "Criticality": 3 if wf.status == "ESCALATED" else (2 if wf.status == "SLA_RISK" else 1),
            "ProcessingTime": wf.delay_hours,
            "ResponsibleParty": wf.assigned_to
        }
        for wf in workflows
    ]
