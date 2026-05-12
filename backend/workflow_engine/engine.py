from sqlalchemy.orm import Session
from backend.models.workflow import Workflow, WorkflowStatus, PriorityLevel
from backend.engines.notification_engine import NotificationEngine
from datetime import datetime, timedelta

class WorkflowEngine:
    def __init__(self, db: Session):
        self.db = db
        self.notification_engine = NotificationEngine(db)

    def process_workflow(self, workflow_id: str):
        workflow = self.db.query(Workflow).filter(Workflow.id == workflow_id).first()
        if not workflow:
            return None

        # SLA Breach Logic
        if workflow.status != WorkflowStatus.APPROVED and workflow.status != WorkflowStatus.REJECTED:
            if workflow.sla_deadline < datetime.now():
                if workflow.status != WorkflowStatus.SLA_RISK and workflow.status != WorkflowStatus.ESCALATED:
                    workflow.status = WorkflowStatus.SLA_RISK
                    self.notification_engine.trigger_sla_breach(workflow)
                
                workflow.delay_hours = int((datetime.now() - workflow.sla_deadline).total_seconds() / 3600)
                
                # Auto-Escalation Trigger
                if workflow.delay_hours > 24 and workflow.status != WorkflowStatus.ESCALATED:
                    workflow.status = WorkflowStatus.ESCALATED
                    self.notification_engine.trigger_escalation(workflow)

        self.db.commit()
        return workflow

    def trigger_escalation(self, workflow_id: str):
        workflow = self.db.query(Workflow).filter(Workflow.id == workflow_id).first()
        if workflow and workflow.status != WorkflowStatus.ESCALATED:
            workflow.status = WorkflowStatus.ESCALATED
            self.notification_engine.trigger_escalation(workflow)
            self.db.commit()
        return workflow

    def approve_workflow(self, workflow_id: str):
        workflow = self.db.query(Workflow).filter(Workflow.id == workflow_id).first()
        if workflow:
            workflow.status = WorkflowStatus.APPROVED
            self.db.commit()
        return workflow

    def reject_workflow(self, workflow_id: str):
        workflow = self.db.query(Workflow).filter(Workflow.id == workflow_id).first()
        if workflow:
            workflow.status = WorkflowStatus.REJECTED
            self.db.commit()
        return workflow
