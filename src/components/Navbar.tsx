import React from 'react';
import { Search, Bell, Activity, Terminal, ShieldAlert } from 'lucide-react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import NotificationCenter from './NotificationCenter';
import DiagnosticOverlay from './DiagnosticOverlay';
import './Navbar.css';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { workflows, analytics, notifications } = useWorkflowStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isDiagOpen, setIsDiagOpen] = React.useState(false);
  
  const riskCount = (workflows ?? []).filter(w => w.status === 'SLA_RISK' || w.status === 'ESCALATED').length;
  const criticalNotifications = (notifications ?? []).filter(n => n.severity === 'CRITICAL').length;

  return (
    <header className="navbar glass">
      <div className="navbar-left">
        <div className="status-item">
          <Activity size={16} className="text-accent-teal" />
          <span className="status-label">ORCHESTRATION: </span>
          <span className="status-value">{(analytics?.throughput ?? 0) > 80 ? 'OPTIMAL' : 'DEGRADED'}</span>
          <div className="live-indicator pulse" />
        </div>
        <div className="status-item">
          <ShieldAlert size={16} className={riskCount > 0 ? 'text-danger' : ''} />
          <span className="status-label">RISK INDEX: </span>
          <span className="status-value">{(analytics?.risk_index ?? 0).toFixed(0)}%</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-bar glass-card" onClick={onOpenCommandPalette}>
          <Search size={18} />
          <input type="text" placeholder="Press ⌘K to start orchestrating..." readOnly />
          <div className="search-shortcut">⌘ K</div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="live-counters">
          <div className="counter-item">
            <span className="counter-value">{(workflows ?? []).length}</span>
            <span className="counter-label">Active</span>
          </div>
          <div className="counter-item danger">
            <span className="counter-value">{riskCount}</span>
            <span className="counter-label">Risks</span>
          </div>
        </div>
        
        <button 
          className={`nav-action-btn ${criticalNotifications > 0 ? 'has-alerts' : ''}`}
          onClick={() => setIsNotificationsOpen(true)}
        >
          <Bell size={20} />
          {criticalNotifications > 0 && <span className="notification-badge">{criticalNotifications}</span>}
        </button>
        <button 
          className={`nav-action-btn ${isDiagOpen ? 'active' : ''}`}
          onClick={() => setIsDiagOpen(!isDiagOpen)}
        >
          <Terminal size={20} />
        </button>
        <div className="nav-divider" />
        <div className="enterprise-badge">
          COGNITIVE OPERATING SYSTEM
        </div>
      </div>

      <NotificationCenter 
        notifications={notifications} 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <DiagnosticOverlay 
        isOpen={isDiagOpen} 
        onClose={() => setIsDiagOpen(false)} 
      />
    </header>

  );
};


export default Navbar;

