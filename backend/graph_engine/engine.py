import networkx as nx
from typing import List, Dict
from backend.models.workflow import Workflow, WorkflowStatus


class GraphEngine:
    def __init__(self):
        self.graph = nx.DiGraph()

    def generate_workflow_topology(self, workflows: List[Workflow]) -> Dict:
        self.graph.clear()

        nodes = []
        links = []

        # Departments as primary clusters
        departments = list(set([w.department for w in workflows]))
        for dept in departments:
            nodes.append({
                "id": dept,
                "type": "DEPARTMENT",
                "label": dept,
                "val": 25,
                "color": "#4A90E2"
            })

        for wf in workflows:
            # Workflow Nodes
            is_critical = wf.status in [
                WorkflowStatus.ESCALATED, WorkflowStatus.SLA_RISK]
            nodes.append({
                "id": wf.id,
                "type": "WORKFLOW",
                "label": wf.id,
                "title": wf.title,
                "status": wf.status,
                "val": 15 if is_critical else 10,
                "priority": wf.priority,
                "color": "#F5A623" if is_critical else "#7ED321"
            })

            # Edge from Dept to Workflow
            links.append({
                "source": wf.department,
                "target": wf.id,
                "type": "OWNERSHIP",
                "value": 1
            })
            self.graph.add_edge(wf.department, wf.id)

            # logical connections based on department dependencies
            # e.g., Finance depends on Procurement and Operations
            if wf.department == "Finance":
                for other_wf in workflows:
                    if other_wf.department in ["Procurement", "Operations"] and other_wf.id != wf.id:
                        links.append({
                            "source": other_wf.id,
                            "target": wf.id,
                            "type": "DEPENDENCY",
                            "value": 2
                        })
                        self.graph.add_edge(other_wf.id, wf.id)

        # Bottleneck detection using Betweenness Centrality
        centrality = nx.betweenness_centrality(self.graph)
        bottlenecks = [node for node,
                       score in centrality.items() if score > 0.1]

        return {
            "nodes": nodes,
            "links": links,
            "metadata": {
                "density": round(nx.density(self.graph), 4),
                "clusters": len(departments),
                "bottlenecks": bottlenecks,
                "critical_nodes": [w.id for w in workflows if w.status in [WorkflowStatus.ESCALATED, WorkflowStatus.SLA_RISK]]
            }
        }

    def analyze_risk_propagation(self, workflows: List[Workflow]):
        # Calculate how risk in one node affects the whole network
        critical_nodes = [w.id for w in workflows if w.status in [
            WorkflowStatus.ESCALATED, WorkflowStatus.SLA_RISK]]

        impacted_nodes = set()
        for node in critical_nodes:
            if node in self.graph:
                # Find all nodes that depend on this critical node (successors in DiGraph)
                impacted_nodes.update(nx.descendants(self.graph, node))

        return {
            "risk_source_count": len(critical_nodes),
            "propagation_impact_count": len(impacted_nodes),
            "impacted_nodes": list(impacted_nodes),
            "system_risk_score": (len(critical_nodes) * 2 + len(impacted_nodes)) / (len(workflows) if workflows else 1)
        }
