from sqlalchemy.orm import Session
from backend.models.workflow import Notification, Workflow
from datetime import datetime
import uuid


class NotificationEngine:
    def __init__(self, db: Session):
        self.db = db

    def create_notification(self, title: str, message: str, severity: str, type: str, workflow_id: str = None):
        notification = Notification(
            id=f"NT-{uuid.uuid4().hex[:8].upper()}",
            title=title,
            message=message,
            severity=severity,
            type=type,
            workflow_id=workflow_id,
            timestamp=datetime.now()
        )
        self.db.add(notification)
        self.db.commit()
        return notification

    def trigger_sla_breach(self, workflow: Workflow):
        return self.create_notification(
            title="SLA Breach Alert",
            message=f"Workflow {workflow.id} ({workflow.title}) has breached its SLA deadline.",
            severity="CRITICAL",
            type="SLA_BREACH",
            workflow_id=workflow.id
        )

    def trigger_escalation(self, workflow: Workflow):
        return self.create_notification(
            title="Escalation Triggered",
            message=f"Workflow {workflow.id} has been escalated due to prolonged delay.",
            severity="HIGH",
            type="ESCALATION",
            workflow_id=workflow.id
        )

    def trigger_anomaly(self, message: str):
        return self.create_notification(
            title="AI Anomaly Detected",
            message=message,
            severity="WARNING",
            type="AI_ANOMALY"
        )
