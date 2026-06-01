import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import workflows, tasks, analytics, copilot, graph, health, notifications, risk_analysis, sap_integration, odata_routes

app = FastAPI(
    title="SAP Cognitive Workflow Orchestra API",
    description="Enterprise AI-native workflow intelligence system backend.",
    version="2.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(
    workflows.router, prefix="/api/workflows", tags=["Workflows"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
app.include_router(
    analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(copilot.router, prefix="/api/copilot", tags=["AI Copilot"])
app.include_router(graph.router, prefix="/api/graph",
                   tags=["Graph Intelligence"])
app.include_router(health.router, prefix="/api/system-health",
                   tags=["System Health"])
app.include_router(notifications.router,
                   prefix="/api/notifications", tags=["Notifications"])
app.include_router(risk_analysis.router,
                   prefix="/api/risk-analysis", tags=["Risk Analysis"])
app.include_router(sap_integration.router,
                   prefix="/api/sap", tags=["SAP Integration"])
app.include_router(odata_routes.router, prefix="/odata", tags=["OData Services"])


@app.get("/")
async def root():
    return {
        "status": "operational",
        "system": "SAP Cognitive Workflow Orchestra",
        "version": "2.0.0",
        "intelligence_layer": "AI-Native"
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
