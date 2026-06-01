from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Phase 3: CDS-Inspired Analytics Layer

class Z_WORKFLOW_ANALYTICS(BaseModel):
    WorkflowID: str
    Status: str
    Department: str
    RiskLevel: Optional[str]
    DelayHours: int
    TotalTasks: int

class Z_APPROVAL_QUEUE(BaseModel):
    WorkitemID: str
    WorkflowHeaderID: str
    AssignedProcessor: str
    ProcessingStatus: str
    Priority: str
    Deadline: Optional[datetime]

class Z_RISK_MONITORING(BaseModel):
    DiagnosticID: int
    EvaluationTime: datetime
    AggregatedRiskScore: float
    SystemHealthIndicator: float
    AICertitudeLevel: float

class Z_USER_WORKLOAD(BaseModel):
    BusinessPartnerID: str
    ActiveWorkitems: int
    AvgProcessingTime: float

class Z_SLA_PERFORMANCE(BaseModel):
    WorkflowHeaderID: str
    IsBreached: bool
    DelayDuration: int

class Z_AI_DIAGNOSTICS(BaseModel):
    DiagnosticID: int
    WorkflowID: Optional[str]
    Timestamp: datetime
    Severity: str
    Message: str
