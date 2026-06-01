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

// WorkflowRisk contract as requested in m.md
export interface WorkflowRisk {
  workflow_id: string;
  risk_score: number;
  indicators: string[];
  last_analyzed: string;
}
