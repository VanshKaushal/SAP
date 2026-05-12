import { useState, useEffect } from 'react';
import { workflowEngine } from '../services/WorkflowEngine';
import { Workflow, Analytics, Notification } from '../types/workflow';

export const useWorkflowStore = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(workflowEngine.getWorkflows());
  const [analytics, setAnalytics] = useState<Analytics>(workflowEngine.getAnalytics());
  const [notifications, setNotifications] = useState<Notification[]>(workflowEngine.getNotifications());

  useEffect(() => {
    const unsubscribe = workflowEngine.subscribe(() => {
      setWorkflows(workflowEngine.getWorkflows());
      setAnalytics(workflowEngine.getAnalytics());
      setNotifications(workflowEngine.getNotifications());
    });

    return unsubscribe;
  }, []);

  return {
    workflows,
    analytics,
    notifications,
    approveWorkflow: (id: string) => workflowEngine.approveWorkflow(id),
    rejectWorkflow: (id: string) => workflowEngine.rejectWorkflow(id),
  };
};
