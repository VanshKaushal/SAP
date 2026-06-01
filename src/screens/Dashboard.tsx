import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import SystemHealthBar from '../components/SystemHealthBar';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import './Dashboard.css';

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ElementType;
  color: string;
}

const KPICard = ({ title, value, trend, icon: Icon, color }: KPICardProps) => (
  <motion.div 
    className="kpi-card glass-card glow-border"
    whileHover={{ y: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="kpi-header">
      <div className={`kpi-icon ${color}`}>
        <Icon size={20} />
      </div>
      <div className="kpi-trend">
        {(trend ?? 0) > 0 ? <ArrowUpRight size={14} className="text-success" /> : <ArrowDownRight size={14} className="text-danger" />}
        <span className={(trend ?? 0) > 0 ? 'text-success' : 'text-danger'}>{Math.abs(trend ?? 0).toFixed(1)}%</span>
      </div>
    </div>
    <div className="kpi-body">
      <motion.span 
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="kpi-value"
      >
        {value}
      </motion.span>
      <span className="kpi-title">{title}</span>
    </div>
    <div className="kpi-footer">
      <div className="sparkline-container">
        <motion.div 
          className="sparkline-bar"
          animate={{ scaleY: [0.5, 1.2, 0.8, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: `var(--accent-${color})` }}
        />
        <div className="sparkline-trend">PREDICTIVE: +4.2% next 4h</div>
      </div>
    </div>
  </motion.div>
);




const Dashboard: React.FC = () => {
  const { workflows, analytics, notifications } = useWorkflowStore();

  const chartData = useMemo(() => {
    const throughput = analytics?.throughput ?? 0;
    return [
      { name: '00:00', value: 400 + (throughput * 2) },
      { name: '04:00', value: 300 + (throughput * 1.5) },
      { name: '08:00', value: 600 + (throughput * 3) },
      { name: '12:00', value: 800 + (throughput * 4) },
      { name: '16:00', value: 500 + (throughput * 2.5) },
      { name: '20:00', value: 900 + (throughput * 4.5) },
      { name: '23:59', value: 1100 + (throughput * 5) },
    ];
  }, [analytics?.throughput]);

  const safeWorkflows = workflows ?? [];
  const delayedWorkflows = safeWorkflows.filter(w => w?.status === 'DELAYED' || w?.status === 'SLA_RISK').length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="header-main"
        >
          <div className="title-group">
            <h1 className="text-gradient">EXECUTIVE COMMAND CENTER</h1>
            <p>Global AI-Native Workflow Orchestration & Neural Intelligence Intelligence</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary glass" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>EXPORT AUDIT</button>
            <button className="btn-primary accent-glow" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>INITIATE OPTIMIZATION</button>
          </div>
        </motion.div>
        
        {analytics && (
          <SystemHealthBar 
            health={analytics?.system_health ?? 0} 
            confidence={analytics?.ai_confidence ?? 0}
            velocity={analytics?.approval_velocity ?? 0}
          />
        )}
      </header>

      <div className="kpi-grid">
        <KPICard title="Active Workflows" value={safeWorkflows.length} trend={analytics?.trend_active ?? 0} icon={Zap} color="blue" />
        <KPICard title="Delayed Approvals" value={delayedWorkflows} trend={analytics?.trend_delayed ?? 0} icon={Clock} color="purple" />
        <KPICard title="SLA Compliance" value={`${(analytics?.sla_compliance ?? 0).toFixed(1)}%`} trend={analytics?.trend_sla ?? 0} icon={TrendingUp} color="teal" />
        <KPICard title="Risk Index" value={(analytics?.risk_index ?? 0).toFixed(0)} trend={analytics?.trend_risk ?? 0} icon={AlertCircle} color="red" />
      </div>

      <div className="dashboard-main-grid">
        <div className="chart-section glass-card">
          <div className="section-header">
            <h3>Workflow Throughput</h3>
            <div className="time-range">Live: 24 Hours</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#606060', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#606060', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: 'var(--accent-blue)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="activity-stream glass-card">
          <div className="section-header">
            <h3>Live Activity Stream</h3>
            <div className="live-indicator pulse" />
          </div>
          <div className="stream-items">
            <AnimatePresence initial={false}>
              {(notifications ?? []).slice(0, 8).map((notification) => (
                <motion.div 
                  key={notification?.id} 
                  className={`stream-item ${notification?.severity?.toLowerCase() ?? 'info'}`}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                >
                  <div className="stream-marker" />
                  <div className="stream-content">
                    <span className="stream-time">
                      {notification?.timestamp 
                        ? new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                        : 'N/A'
                      }
                    </span>
                    <p><strong>{notification?.title}</strong></p>
                    <p className="stream-msg">{notification?.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="ai-insight-panel glass-card">
          <div className="section-header">
            <h3>AI Orchestrator Insights</h3>
            <Zap size={16} className="text-accent-blue" />
          </div>
          <div className="insight-content">
            <div className="insight-card highlight">
              <div className="insight-icon">💡</div>
              <div className="insight-text">
                <strong>Optimization Opportunity</strong>
                <p>Bottleneck detected in {safeWorkflows[0]?.department || 'Procurement'}. Redirecting approvals to Agent-Beta could reduce SLA latency by 14%.</p>
                <button className="insight-action">APPLY OPTIMIZATION</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
