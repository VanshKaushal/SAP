from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.models.workflow import Workflow as WorkflowModel
from backend.analytics_engine.engine import AnalyticsEngine

router = APIRouter()

@router.get("/")
def get_analytics(db: Session = Depends(get_db)):
    workflows = db.query(WorkflowModel).all()
    engine = AnalyticsEngine()
    metrics = engine.calculate_metrics(workflows)
    return metrics
