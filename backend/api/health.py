from fastapi import APIRouter
import psutil
import time

router = APIRouter()

start_time = time.time()

@router.get("/")
def get_system_health():
    return {
        "uptime": int(time.time() - start_time),
        "cpu_usage": psutil.cpu_percent(),
        "memory_usage": psutil.virtual_memory().percent,
        "status": "HEALTHY",
        "services": {
            "workflow_engine": "ACTIVE",
            "ai_engine": "ACTIVE",
            "graph_engine": "ACTIVE",
            "db_connection": "CONNECTED"
        }
    }
