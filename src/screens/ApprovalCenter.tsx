import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  Filter,
  MoreVertical,
  ShieldAlert
} from 'lucide-react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import './ApprovalCenter.css';

const ApprovalCenter: React.FC = () => {
  const { workflows, approveWorkflow, rejectWorkflow } = useWorkflowStore();
  const safeWorkflows = workflows ?? [];

  const pendingWorkflows = safeWorkflows.filter(w => w?.status !== 'APPROVED' && w?.status !== 'REJECTED');
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

      <div className="approval-queue glass-card">
        <div className="queue-header">
          <div className="col">ID</div>
          <div className="col">Workflow Details</div>
          <div className="col">Priority</div>
          <div className="col">Cognitive Risk</div>
          <div className="col">SLA Time</div>
          <div className="col">Actions</div>
        </div>
        <div className="queue-body">
          <AnimatePresence>
            {(pendingWorkflows ?? []).map((item) => (
              <motion.div 
                key={item?.id} 
                className="queue-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                layout
              >
                <div className="col id-cell">{item?.id}</div>
                <div className="col detail-cell">
                  <span className="item-title">{item?.title}</span>
                  <span className="item-requester">{item?.department}</span>
                </div>
                <div className="col priority-cell">
                  <span className={`priority-tag ${(item?.priority ?? 'MEDIUM').toLowerCase()}`}>
                    {item?.priority ?? 'MEDIUM'}
                  </span>
                </div>
                <div className="col risk-cell">
                  <div className={`risk-badge ${item?.status === 'SLA_RISK' ? 'high' : 'medium'}`}>
                    <ShieldAlert size={12} />
                    {item?.status === 'SLA_RISK' ? 'CRITICAL' : 'ELEVATED'}
                  </div>
                </div>
                <div className="col sla-cell">
                  <div className="sla-monitor">
                    <Clock size={12} className={item?.status === 'SLA_RISK' ? 'text-danger' : 'text-accent-teal'} />
                    <span className={item?.status === 'SLA_RISK' ? 'text-danger' : ''}>
                      {item?.status === 'SLA_RISK' ? '00:14:22' : '04:22:15'}
                    </span>
                  </div>
                  <div className="sla-bar">
                    <div className={`sla-fill ${item?.status === 'SLA_RISK' ? 'danger' : 'optimal'}`} style={{ width: item?.status === 'SLA_RISK' ? '92%' : '45%' }}></div>
                  </div>
                </div>

                <div className="col actions-cell">
                  <button 
                    className="action-icon approve" 
                    title="Approve"
                    onClick={() => item?.id && approveWorkflow(item.id)}
                  >
                    <CheckCircle2 size={18} />
                  </button>
                  <button 
                    className="action-icon reject" 
                    title="Reject"
                    onClick={() => item?.id && rejectWorkflow(item.id)}
                  >
                    <XCircle size={18} />
                  </button>
                  <button className="action-icon info" title="Details" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}><ExternalLink size={18} /></button>
                  <button className="action-icon more" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}><MoreVertical size={18} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
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

