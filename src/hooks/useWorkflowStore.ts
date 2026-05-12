import { useState, useEffect } from 'react';
import { apiService } from '../services/ApiService';
import { Workflow, Analytics, Notification } from '../types/workflow';

export const useWorkflowStore = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [wfData, analyticsData, notificationsData] = await Promise.all([
        apiService.getWorkflows(),
        apiService.getAnalytics(),
        apiService.getNotifications()
      ]);
      setWorkflows(wfData);
      setAnalytics(analyticsData);
      setNotifications(notificationsData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data from backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

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
