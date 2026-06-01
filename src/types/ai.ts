export interface AICopilotResponse {
  response: string;
  context_detected: string[];
  confidence_score: number;
  suggested_actions?: string[];
}

export interface RiskAnalysisResult {
  risk_score: number;
  factors: string[];
  mitigation_strategy: string;
  anomaly_detected: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  status?: 'typing' | 'done' | 'error';
  timestamp?: string;
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
