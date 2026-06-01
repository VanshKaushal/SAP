import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/ApiService';
import type { Workflow } from '../types/workflow';
import type { Analytics } from '../types/analytics';
import type { Notification } from '../types/notification';

export const useWorkflowStore = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    throughput: 0,
    sla_compliance: 0,
    bottleneck_score: 0,
    escalation_frequency: 0,
    active_workflows: 0,
    total_processed: 0,
    risk_index: 0,
    system_health: 0,
    ai_confidence: 0,
    approval_velocity: 0,
    trend_active: 0,
    trend_delayed: 0,
    trend_sla: 0,
    trend_risk: 0,
    trend_efficiency: 0,
    trend_bottleneck: 0,
    trend_compliance: 0,
    trend_processed: 0
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [wfData, analyticsData, notificationsData] = await Promise.all([
        apiService.getWorkflows(),
        apiService.getAnalytics(),
        apiService.getNotifications()
      ]);
      if (wfData && Array.isArray(wfData)) {
        setWorkflows(prev => JSON.stringify(prev) === JSON.stringify(wfData) ? prev : wfData);
      }
      if (analyticsData && typeof analyticsData === 'object') {
        setAnalytics(prev => JSON.stringify(prev) === JSON.stringify(analyticsData) ? prev : analyticsData as Analytics);
      }
      if (notificationsData && Array.isArray(notificationsData)) {
        setNotifications(prev => JSON.stringify(prev) === JSON.stringify(notificationsData) ? prev : notificationsData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data from backend:", error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    workflows,
    analytics,
    notifications,
    loading,
    approveWorkflow: async (id: string) => {
      await apiService.approveWorkflow(id);
      fetchData();
    },
    rejectWorkflow: async (id: string) => {
      await apiService.rejectWorkflow(id);
      fetchData();
    },
  };
};
