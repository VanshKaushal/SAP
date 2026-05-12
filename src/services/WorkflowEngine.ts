import { Workflow, WorkflowStatus, Analytics, Notification, Task } from '../types/workflow';

class WorkflowEngine {
  private workflows: Workflow[] = [];
  private notifications: Notification[] = [];
  private analytics: Analytics = {
    throughput: 85,
    sla_compliance: 92,
    bottleneck_score: 12,
    escalation_frequency: 5,
    active_workflows: 0,
    total_processed: 1240,
    risk_index: 18,
    system_health: 98.4,
    ai_confidence: 94.2,
    approval_velocity: 4.2,
  };

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.generateInitialData();
    this.startSimulation();
  }

  private generateInitialData() {
    const departments = ['Finance', 'Procurement', 'Legal', 'HR', 'Operations'];
    const priorities: Workflow['priority'][] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const statuses: WorkflowStatus[] = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'SLA_RISK'];

    for (let i = 0; i < 20; i++) {
      this.workflows.push(this.createMockWorkflow(i));
    }
    this.analytics.active_workflows = this.workflows.length;
  }

  private createMockWorkflow(index: number): Workflow {
    const departments = ['Finance', 'Procurement', 'Legal', 'HR', 'Operations'];
    const priorities: Workflow['priority'][] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const statuses: WorkflowStatus[] = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'SLA_RISK'];
    
    return {
      id: `WF-${1000 + index}`,
      title: `${departments[index % departments.length]} Approval #${index + 100}`,
      department: departments[index % departments.length],
      assigned_to: `User ${Math.floor(Math.random() * 10) + 1}`,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      risk_level: 'MEDIUM',
      sla_deadline: new Date(Date.now() + Math.random() * 86400000 * 3).toISOString(),
      delay_hours: Math.floor(Math.random() * 10),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      created_at: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      description: `Enterprise workflow for ${departments[index % departments.length]} process optimization and audit.`,
    };
  }

  private startSimulation() {
    setInterval(() => {
      this.simulateUpdates();
      if (Math.random() > 0.85) this.triggerRandomAnomaly();
      this.notifyListeners();
    }, 4000); // High-frequency updates for demo feel
  }

  private triggerRandomAnomaly() {
    const anomalies = [
      { title: 'Neural Path Congestion', msg: 'High latency detected in Frankfurt-DE nodes.' },
      { title: 'Predictive SLA Breach', msg: 'Multiple workflows in Procurement trending towards breach.' },
      { title: 'Orchestration Sync Lag', msg: 'Global state synchronization delayed by 400ms.' }
    ];
    const anomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
    
    this.notifications.unshift({
      id: `AN-${Date.now()}`,
      type: 'ANOMALY',
      title: anomaly.title,
      message: anomaly.msg,
      timestamp: new Date().toISOString(),
      severity: 'CRITICAL'
    });
  }


  private simulateUpdates() {
    // Randomly update a workflow status
    if (Math.random() > 0.7) {
      const index = Math.floor(Math.random() * this.workflows.length);
      const wf = this.workflows[index];
      
      const statusTransitions: Record<WorkflowStatus, WorkflowStatus[]> = {
        'PENDING': ['UNDER_REVIEW', 'SLA_RISK'],
        'UNDER_REVIEW': ['APPROVED', 'REJECTED', 'ESCALATED', 'SLA_RISK'],
        'APPROVED': ['APPROVED'],
        'REJECTED': ['REJECTED'],
        'ESCALATED': ['UNDER_REVIEW', 'SLA_RISK'],
        'SLA_RISK': ['DELAYED', 'ESCALATED', 'UNDER_REVIEW'],
        'DELAYED': ['ESCALATED', 'UNDER_REVIEW']
      };

      const possibleNext = statusTransitions[wf.status];
      const nextStatus = possibleNext[Math.floor(Math.random() * possibleNext.length)];
      
      if (nextStatus !== wf.status) {
        wf.status = nextStatus;
        this.addNotificationForStatusChange(wf);
      }
    }

    // Update analytics
    this.analytics.risk_index = Math.max(0, Math.min(100, this.analytics.risk_index + (Math.random() * 4 - 2)));
    this.analytics.throughput = Math.max(0, Math.min(100, this.analytics.throughput + (Math.random() * 2 - 1)));
    this.analytics.system_health = Math.max(90, Math.min(100, this.analytics.system_health + (Math.random() * 0.4 - 0.2)));
    this.analytics.ai_confidence = Math.max(85, Math.min(99, this.analytics.ai_confidence + (Math.random() * 0.2 - 0.1)));
    this.analytics.approval_velocity = Math.max(1, Math.min(10, this.analytics.approval_velocity + (Math.random() * 0.5 - 0.25)));
    this.analytics.active_workflows = this.workflows.length;
  }

  private addNotificationForStatusChange(wf: Workflow) {
    const notification: Notification = {
      id: `NT-${Date.now()}`,
      type: wf.status === 'ESCALATED' ? 'ESCALATION' : wf.status === 'SLA_RISK' ? 'SLA_BREACH' : 'INFO' as any,
      title: `Workflow ${wf.id} Updated`,
      message: `${wf.title} is now ${wf.status}`,
      timestamp: new Date().toISOString(),
      severity: (wf.status === 'ESCALATED' || wf.status === 'SLA_RISK') ? 'CRITICAL' : 'INFO',
      workflow_id: wf.id
    };
    this.notifications.unshift(notification);
    if (this.notifications.length > 50) this.notifications.pop();
  }

  // API Methods
  getWorkflows() { return [...this.workflows]; }
  getAnalytics() { return { ...this.analytics }; }
  getNotifications() { return [...this.notifications]; }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(l => l());
  }

  approveWorkflow(id: string) {
    const wf = this.workflows.find(w => w.id === id);
    if (wf) {
      wf.status = 'APPROVED';
      this.addNotificationForStatusChange(wf);
      this.notifyListeners();
    }
  }

  rejectWorkflow(id: string) {
    const wf = this.workflows.find(w => w.id === id);
    if (wf) {
      wf.status = 'REJECTED';
      this.addNotificationForStatusChange(wf);
      this.notifyListeners();
    }
  }
}

export const workflowEngine = new WorkflowEngine();
