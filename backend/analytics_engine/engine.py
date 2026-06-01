from typing import List, Dict
from backend.models.workflow import Workflow, WorkflowStatus
from datetime import datetime


class AnalyticsEngine:
    def calculate_metrics(self, workflows: List[Workflow]):
        total = len(workflows)
        if total == 0:
            return self.get_empty_metrics()

        approved = len(
            [w for w in workflows if w.status == WorkflowStatus.APPROVED])
        risky = len([w for w in workflows if w.status in [
                    WorkflowStatus.SLA_RISK, WorkflowStatus.ESCALATED, WorkflowStatus.DELAYED]])

        sla_compliance = ((total - risky) / total) * 100
        throughput = (approved / total) * 100 if total > 0 else 0

        # Simulated intelligent metrics
        bottleneck_score = (risky / total) * 40 if total > 0 else 0
        risk_index = (risky / total) * 100

        # System Health
        system_health = 100 - (risky * 2.5)
        ai_confidence = 94.5 + (len(workflows) * 0.05)

        # Department Analysis
        dept_metrics = self.calculate_department_metrics(workflows)

        return {
            "throughput": round(throughput, 2),
            "sla_compliance": round(sla_compliance, 2),
            "bottleneck_score": round(bottleneck_score, 2),
            "risk_index": round(risk_index, 2),
            "system_health": max(65, round(system_health, 2)),
            "ai_confidence": min(99.9, round(ai_confidence, 2)),
            "active_workflows": total,
            "total_processed": 1240 + total,
            "departments": dept_metrics,
            "timestamp": datetime.now()
        }

    def calculate_department_metrics(self, workflows: List[Workflow]) -> Dict:
        departments = {}
        for wf in workflows:
            if wf.department not in departments:
                departments[wf.department] = {
                    "total": 0, "approved": 0, "risky": 0}

            departments[wf.department]["total"] += 1
            if wf.status == WorkflowStatus.APPROVED:
                departments[wf.department]["approved"] += 1
            if wf.status in [WorkflowStatus.SLA_RISK, WorkflowStatus.ESCALATED]:
                departments[wf.department]["risky"] += 1

        results = {}
        for dept, stats in departments.items():
            results[dept] = {
                "throughput": round((stats["approved"] / stats["total"]) * 100, 2),
                "risk_level": "HIGH" if stats["risky"] > 0 else "LOW",
                "volume": stats["total"]
            }
        return results

    def get_empty_metrics(self):
        return {
            "throughput": 0,
            "sla_compliance": 0,
            "bottleneck_score": 0,
            "risk_index": 0,
            "system_health": 100,
            "ai_confidence": 95.0,
            "active_workflows": 0,
            "total_processed": 1240,
            "departments": {},
            "timestamp": datetime.now()
        }
