export interface GraphNode {
  id: string;
  label?: string;
  type?: 'workflow' | 'task' | 'user' | 'department';
  status?: string;
  risk_score?: number;
  val?: number;
  name?: string;
  title?: string;
  color?: string;
  group?: number;
  priority?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  type?: 'dependency' | 'escalation' | 'ownership';
  value?: number;
  color?: string;
  curvature?: number;
  dashed?: boolean;
}

export interface WorkflowGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
