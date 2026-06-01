import React from 'react';
import { 
  AlertTriangle,
  Filter
} from 'lucide-react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import './ApprovalCenter.css';

const ApprovalCenter: React.FC = () => {
  const { workflows } = useWorkflowStore();
  const safeWorkflows = workflows ?? [];

  const escalations = safeWorkflows.filter(w => w?.status === 'ESCALATED').length;

  return (
    <div className="approval-center-container">
      <header className="approval-header">
        <div className="title-group">
          <h1 className="text-gradient">APPROVAL ORCHESTRATION</h1>
          <p>Global authorization layer with autonomous risk assessment and SLA enforcement.</p>
        </div>
        <div className="header-actions">
          <div className="filter-group glass">
            <Filter size={16} />
            <span>SORT: PRIORITY</span>
          </div>
          <button className="btn-primary accent-glow" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>BATCH AUTHORIZE</button>
        </div>
      </header>

      <div className="approval-queue glass-card" style={{ padding: 0, overflow: 'hidden', height: '600px' }}>
        <iframe 
          src="/openui5-approval/index.html" 
          title="OpenUI5 Approval Center"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      <div className="approval-insights">
        <div className="insight-box glass-card">
          <div className="insight-header">
            <AlertTriangle size={18} className="text-warning" />
            <h4>Critical Escalations</h4>
          </div>
          <p>{escalations} workflows have exceeded standard SLA and require immediate executive override.</p>
          <button className="override-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>VIEW ESCALATIONS</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCenter;

