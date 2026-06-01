from backend.models.database import SessionLocal, engine, Base
from backend.models.workflow import Workflow, Task, WorkflowStatus, PriorityLevel, Notification
from datetime import datetime, timedelta
import random


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing data
    db.query(Task).delete()
    db.query(Workflow).delete()
    db.query(Notification).delete()

    departments = ['Finance', 'Procurement', 'Legal', 'HR', 'Operations']
    priorities = [PriorityLevel.LOW, PriorityLevel.MEDIUM,
                  PriorityLevel.HIGH, PriorityLevel.CRITICAL]
    statuses = [WorkflowStatus.PENDING, WorkflowStatus.UNDER_REVIEW,
                WorkflowStatus.APPROVED, WorkflowStatus.SLA_RISK]

    workflows = []
    for i in range(20):
        dept = departments[i % len(departments)]
        wf = Workflow(
            id=f"WF-{1000 + i}",
            title=f"{dept} Approval #{i + 100}",
            department=dept,
            assigned_to=f"User {random.randint(1, 10)}",
            priority=random.choice(priorities),
            risk_level="MEDIUM",
            sla_deadline=datetime.now() + timedelta(days=random.randint(1, 5)),
            delay_hours=random.randint(0, 10),
            status=random.choice(statuses),
            description=f"Enterprise workflow for {dept} process optimization and audit.",
            created_at=datetime.now() - timedelta(days=random.randint(1, 7))
        )
        db.add(wf)
        workflows.append(wf)

    db.commit()

    # Add some tasks
    for wf in workflows:
        for j in range(random.randint(1, 3)):
            task = Task(
                task_id=f"T-{wf.id}-{j}",
                workflow_id=wf.id,
                reviewer=f"Reviewer {random.randint(1, 5)}",
                completion_status="PENDING" if wf.status != WorkflowStatus.APPROVED else "COMPLETED"
            )
            db.add(task)

    # Add initial notifications
    for i in range(5):
        notification = Notification(
            id=f"NT-{1000 + i}",
            severity="INFO" if i > 1 else "CRITICAL",
            message=f"System update for workflow WF-{1000+i}",
            type="INFO" if i > 1 else "SLA_BREACH",
            title="System Alert",
            workflow_id=f"WF-{1000+i}",
            timestamp=datetime.now()
        )
        db.add(notification)

    db.commit()
    db.close()
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed()
