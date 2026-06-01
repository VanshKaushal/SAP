from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import List

from backend.models.database import get_db
from backend.models import workflow as db_models
from backend.schemas import sap_domain, cds_views
from backend.api.odata_utils import apply_odata_query

router = APIRouter()

@router.get("/Workflows", response_model=List[sap_domain.WorkflowHeader])
def get_odata_workflows(request: Request, db: Session = Depends(get_db)):
    """OData endpoint for WorkflowHeader"""
    query = db.query(db_models.Workflow)
    query = apply_odata_query(query, db_models.Workflow, request)
    return query.all()

@router.get("/Approvals", response_model=List[cds_views.Z_APPROVAL_QUEUE])
def get_odata_approvals(request: Request, db: Session = Depends(get_db)):
    """OData endpoint for Z_APPROVAL_QUEUE"""
    query = db.query(db_models.Task, db_models.Workflow).join(
        db_models.Workflow, db_models.Task.workflow_id == db_models.Workflow.id
    )
    
    # Simple query parsing (custom for join)
    query_params = request.query_params
    if "$top" in query_params:
        query = query.limit(int(query_params["$top"]))
    if "$skip" in query_params:
        query = query.offset(int(query_params["$skip"]))
        
    results = query.all()
    response = []
    for task, wf in results:
        response.append(cds_views.Z_APPROVAL_QUEUE(
            WorkitemID=task.task_id,
            WorkflowHeaderID=task.workflow_id,
            AssignedProcessor=task.reviewer,
            ProcessingStatus=task.completion_status,
            Priority=wf.priority.value if hasattr(wf.priority, 'value') else wf.priority,
            Deadline=wf.sla_deadline
        ))
    return response

@router.get("/Users", response_model=List[sap_domain.BusinessPartner])
def get_odata_users(request: Request, db: Session = Depends(get_db)):
    """OData endpoint for BusinessPartner"""
    query = db.query(db_models.User)
    query = apply_odata_query(query, db_models.User, request)
    return query.all()

@router.get("/RiskAnalysis", response_model=List[sap_domain.RiskAssessment])
def get_odata_risk_analysis(request: Request, db: Session = Depends(get_db)):
    """OData endpoint for RiskAnalysis"""
    query = db.query(db_models.Analytics)
    query = apply_odata_query(query, db_models.Analytics, request)
    return query.all()

@router.get("/SystemHealth", response_model=List[cds_views.Z_AI_DIAGNOSTICS])
def get_odata_system_health(request: Request, db: Session = Depends(get_db)):
    """OData endpoint for Z_AI_DIAGNOSTICS"""
    query = db.query(db_models.Notification)
    query = apply_odata_query(query, db_models.Notification, request)
    
    results = query.all()
    response = []
    for notif in results:
        response.append(cds_views.Z_AI_DIAGNOSTICS(
            DiagnosticID=notif.id,
            WorkflowID=notif.workflow_id,
            Timestamp=notif.timestamp,
            Severity=notif.severity,
            Message=notif.message
        ))
    return response

@router.get("/Analytics", response_model=List[cds_views.Z_WORKFLOW_ANALYTICS])
def get_odata_analytics(request: Request, db: Session = Depends(get_db)):
    """OData endpoint for Z_WORKFLOW_ANALYTICS"""
    query = db.query(db_models.Workflow)
    query = apply_odata_query(query, db_models.Workflow, request)
    
    results = query.all()
    response = []
    for wf in results:
        response.append(cds_views.Z_WORKFLOW_ANALYTICS(
            WorkflowID=wf.id,
            Status=wf.status.value if hasattr(wf.status, 'value') else wf.status,
            Department=wf.department,
            RiskLevel=wf.risk_level,
            DelayHours=wf.delay_hours,
            TotalTasks=len(wf.tasks) if wf.tasks else 0
        ))
    return response
