from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Float, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.models.database import Base
import enum


class WorkflowStatus(str, enum.Enum):
    PENDING = "PENDING"
    UNDER_REVIEW = "UNDER_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    ESCALATED = "ESCALATED"
    SLA_RISK = "SLA_RISK"
    DELAYED = "DELAYED"


class PriorityLevel(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    status = Column(SQLAlchemyEnum(WorkflowStatus),
                    default=WorkflowStatus.PENDING)
    department = Column(String)
    assigned_to = Column(String)
    priority = Column(SQLAlchemyEnum(PriorityLevel),
                      default=PriorityLevel.MEDIUM)
    risk_level = Column(String)
    sla_deadline = Column(DateTime)
    delay_hours = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    description = Column(String)

    tasks = relationship("Task", back_populates="workflow")


class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(String, primary_key=True, index=True)
    workflow_id = Column(String, ForeignKey("workflows.id"))
    reviewer = Column(String)
    completion_status = Column(String)

    workflow = relationship("Workflow", back_populates="tasks")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String)
    department = Column(String)
    approval_authority = Column(Float)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, index=True)
    severity = Column(String)
    message = Column(String)
    type = Column(String)
    title = Column(String)
    workflow_id = Column(String, nullable=True)
    timestamp = Column(DateTime, server_default=func.now())


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, server_default=func.now())
    throughput = Column(Float)
    sla_compliance = Column(Float)
    bottleneck_score = Column(Float)
    risk_index = Column(Float)
    system_health = Column(Float)
    ai_confidence = Column(Float)
