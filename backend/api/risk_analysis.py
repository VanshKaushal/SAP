from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.models.workflow import Workflow
from backend.graph_engine.engine import GraphEngine
from backend.ai_engine.engine import AIEngine

router = APIRouter()


@router.get("/")
async def get_risk_analysis(db: Session = Depends(get_db)):
    workflows = db.query(Workflow).all()
    graph_engine = GraphEngine()

    # Pre-generate topology for propagation analysis
    graph_engine.generate_workflow_topology(workflows)
    propagation = graph_engine.analyze_risk_propagation(workflows)

    # Get AI Insights
    ai_engine = AIEngine()
    risk_summary = f"System has {len(workflows)} active workflows. {propagation['risk_source_count']} are in critical state, impacting {propagation['propagation_impact_count']} downstream processes."
    ai_analysis = await ai_engine.get_completion(f"Provide an executive risk analysis for this enterprise orchestration state: {risk_summary}", "risk_analysis")

    return {
        "propagation": propagation,
        "ai_analysis": ai_analysis,
        "critical_paths": [w.id for w in workflows if w.status in ["ESCALATED", "SLA_RISK"]],
        "system_vulnerability_score": round(propagation["system_risk_score"] * 100, 2)
    }
