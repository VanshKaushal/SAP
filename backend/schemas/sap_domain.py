from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Phase 4: SAP Domain Modeling
class WorkflowHeader(BaseModel):
    id: str
    title: str
    status: str
    department: str
    priority: str
    risk_level: Optional[str]
    created_at: datetime
    description: Optional[str]

    class Config:
        orm_mode = True
        from_attributes = True

class WorkflowItem(BaseModel):
    task_id: str
    workflow_id: str
    reviewer: str
    completion_status: str

    class Config:
        orm_mode = True
        from_attributes = True

class ApprovalQueue(BaseModel):
    task_id: str
    workflow_id: str
    reviewer: str
    completion_status: str
    workflow_title: Optional[str] = None
    priority: Optional[str] = None
    risk_level: Optional[str] = None
    sla_deadline: Optional[datetime] = None

    class Config:
        orm_mode = True
        from_attributes = True

class BusinessPartner(BaseModel):
    id: int
    email: str
    role: str
    department: str
    approval_authority: float

    class Config:
        orm_mode = True
        from_attributes = True

class RiskAssessment(BaseModel):
    id: int
    timestamp: datetime
    risk_index: float
    ai_confidence: float

    class Config:
        orm_mode = True
        from_attributes = True
