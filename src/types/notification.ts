export type NotificationType = 
  | 'ESCALATION' 
  | 'AI_RISK' 
  | 'SLA_BREACH' 
  | 'COMPLETION' 
  | 'REMINDER' 
  | 'ANOMALY';

export type NotificationSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  severity: NotificationSeverity;
  workflow_id?: string;
}
