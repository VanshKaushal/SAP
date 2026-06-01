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
  trend_active: number;
  trend_delayed: number;
  trend_sla: number;
  trend_risk: number;
  trend_efficiency: number;
  trend_bottleneck: number;
  trend_compliance: number;
  trend_processed: number;
}

export interface DepartmentMetrics {
  department: string;
  throughput: number;
  sla_compliance: number;
  active_cases: number;
}

export interface SLAStatus {
  on_time: number;
  at_risk: number;
  breached: number;
}

export interface WorkflowMetrics {
  total_active: number;
  avg_cycle_time: number;
  sla_breach_rate: number;
  bottleneck_index: number;
}

export interface AIInsight {
  id: string;
  type: 'OPTIMIZATION' | 'RISK' | 'PREDICTION';
  title: string;
  description: string;
  confidence: number;
  impact_score: number;
  action_label?: string;
}

export interface RiskAnalysis {
  workflow_id: string;
  overall_score: number;
  risk_factors: {
    category: string;
    score: number;
    description: string;
  }[];
  recommendation: string;
}
