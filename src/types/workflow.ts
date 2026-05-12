export type WorkflowStatus = 
  | 'PENDING' 
  | 'UNDER_REVIEW' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'ESCALATED' 
  | 'SLA_RISK' 
  | 'DELAYED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';

export interface Workflow {
  id: string;
  title: string;
  department: string;
  assigned_to: string;
  priority: Priority;
  risk_level: RiskLevel;
  sla_deadline: string;
  delay_hours: number;
  status: WorkflowStatus;
  created_at: string;
  description: string;
}

export interface Task {
  task_id: string;
  workflow_id: string;
  title: string;
  reviewer: string;
  escalation_level: number;
  completion_status: 'PENDING' | 'COMPLETED' | 'FAILED';
  due_date: string;
}

export interface User {
  id: string;
  name: string;
  department: string;
  role: string;
  approval_authority: number;
  avatar?: string;
}

export interface Analytics {
  throughput: number;
  sla_compliance: number;
  bottleneck_score: number;
  escalation_frequency: number;
  active_workflows: number;
  total_processed: number;
  risk_index: number;
  system_health: number;
  ai_confidence: number;
  approval_velocity: number;
}


export interface Notification {
  id: string;
  type: 'ESCALATION' | 'AI_RISK' | 'SLA_BREACH' | 'COMPLETION' | 'REMINDER' | 'ANOMALY';
  title: string;
  message: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  workflow_id?: string;
}
