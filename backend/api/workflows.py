from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.models.database import get_db
from backend.models.workflow import Workflow as WorkflowModel
from backend.schemas.workflow import Workflow, WorkflowCreate
from backend.workflow_engine.engine import WorkflowEngine

router = APIRouter()

@router.get("/", response_model=List[Workflow])
def get_workflows(db: Session = Depends(get_db)):
    workflows = db.query(WorkflowModel).all()
    # Process each workflow through the engine to update status based on SLAs
    engine = WorkflowEngine(db)
    for wf in workflows:
        engine.process_workflow(wf.id)
    return workflows

@router.post("/", response_model=Workflow)
def create_workflow(workflow: WorkflowCreate, db: Session = Depends(get_db)):
    db_workflow = WorkflowModel(**workflow.model_dump())
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    return db_workflow

@router.get("/{workflow_id}", response_model=Workflow)
def get_workflow(workflow_id: str, db: Session = Depends(get_db)):
    workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow

@router.post("/{workflow_id}/approve")
def approve_workflow(workflow_id: str, db: Session = Depends(get_db)):
    engine = WorkflowEngine(db)
    workflow = engine.approve_workflow(workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return {"status": "success", "new_status": workflow.status}

@router.post("/{workflow_id}/escalate")
def escalate_workflow(workflow_id: str, db: Session = Depends(get_db)):
    engine = WorkflowEngine(db)
    workflow = engine.trigger_escalation(workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return {"status": "success", "new_status": workflow.status}
