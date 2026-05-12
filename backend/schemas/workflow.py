from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from backend.models.workflow import WorkflowStatus, PriorityLevel

class TaskBase(BaseModel):
    reviewer: str
    completion_status: str

class TaskCreate(TaskBase):
    task_id: str
    workflow_id: str

class Task(TaskBase):
    task_id: str
    workflow_id: str

    class Config:
        from_attributes = True

class WorkflowBase(BaseModel):
    title: str
    department: str
    assigned_to: str
    priority: PriorityLevel
    risk_level: str
    sla_deadline: datetime
    description: str

class WorkflowCreate(WorkflowBase):
    id: str

class Workflow(WorkflowBase):
    id: str
    status: WorkflowStatus
    delay_hours: int
    created_at: datetime
    tasks: List[Task] = []

    class Config:
        from_attributes = True

class Notification(BaseModel):
    id: str
    severity: str
    message: str
    type: str
    title: str
    workflow_id: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True

class Analytics(BaseModel):
    throughput: float
    sla_compliance: float
    bottleneck_score: float
    risk_index: float
    system_health: float
    ai_confidence: float
    timestamp: Optional[datetime] = None

    class Config:
        from_attributes = True
