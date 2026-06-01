import type { Workflow } from '../types/workflow';
import type { Analytics } from '../types/analytics';
import type { Notification } from '../types/notification';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  async getWorkflows(): Promise<Workflow[]> {
    const response = await fetch(`${API_BASE_URL}/workflows/`);
    return response.json();
  }

  async getAnalytics(): Promise<Analytics> {
    const response = await fetch(`${API_BASE_URL}/analytics/`);
    return response.json();
  }

  async getNotifications(): Promise<Notification[]> {
    const response = await fetch(`${API_BASE_URL}/notifications/`);
    return response.json();
  }

  async approveWorkflow(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/workflows/${id}/approve`, { method: 'POST' });
  }

  async rejectWorkflow(id: string): Promise<void> {
    // Reusing approve logic for now as rejected endpoint isn't explicitly defined in my first pass
    await fetch(`${API_BASE_URL}/workflows/${id}/escalate`, { method: 'POST' });
  }

  async getGraphData(): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}/graph/`);
    return response.json();
  }

  async queryCopilot(query: string, context: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/copilot/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, context })
    });
    const data = await response.json();
    return data.response;
  }
}

export const apiService = new ApiService();
