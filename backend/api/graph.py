from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.models.workflow import Workflow as WorkflowModel
from backend.graph_engine.engine import GraphEngine

router = APIRouter()

@router.get("/")
def get_graph_data(db: Session = Depends(get_db)):
    workflows = db.query(WorkflowModel).all()
    engine = GraphEngine()
    topology = engine.generate_workflow_topology(workflows)
    risk_analysis = engine.analyze_risk_propagation(workflows)
    
    return {
        "topology": topology,
        "risk_analysis": risk_analysis
    }
