from fastapi import APIRouter, Body
from backend.ai_engine.engine import AIEngine

router = APIRouter()

@router.post("/query")
async def copilot_query(
    query: str = Body(..., embed=True),
    context: str = Body("", embed=True)
):
    engine = AIEngine()
    response = await engine.generate_copilot_response(context, query)
    return {"response": response}

@router.post("/analyze-bottleneck")
async def analyze_bottleneck(
    workflow_data: str = Body(..., embed=True)
):
    engine = AIEngine()
    analysis = await engine.analyze_bottleneck(workflow_data)
    return {"analysis": analysis}
