import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Activity,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import './Analytics.css';

const Analytics: React.FC = () => {
  const { workflows, analytics } = useWorkflowStore();

  const deptData = useMemo(() => {
    const counts: Record<string, number> = {};
    (workflows || []).forEach(wf => {
      if (wf?.department) {
        counts[wf.department] = (counts[wf.department] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [workflows]);

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <div className="header-top">
          <div className="title-group">
            <h1 className="text-gradient">WORKFLOW INTELLIGENCE CORTEX</h1>
            <p>Predictive analytics, throughput optimization, and organizational neural mapping.</p>
          </div>
          <div className="header-meta">
            <div className="meta-item">
              <span className="meta-label">LAST REFRESH:</span>
              <span className="meta-value">JUST NOW</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">ENGINE STATUS:</span>
              <span className="meta-value text-accent-teal">STABLE</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary glass" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>EXPORT AUDIT</button>
          <button className="btn-primary accent-glow" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>SCHEDULE REPORT</button>
        </div>
      </header>

      <div className="analytics-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon teal"><Activity size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">System Efficiency</span>
            <span className="stat-value">{(analytics?.throughput ?? 0).toFixed(1)}%</span>
            <span className={`stat-trend ${((analytics?.trend_efficiency ?? 0) >= 0) ? 'up' : 'down'}`}>{((analytics?.trend_efficiency ?? 0) >= 0) ? '+' : ''}{(analytics?.trend_efficiency ?? 0).toFixed(1)}% vs last month</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon blue"><Clock size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Avg. Bottleneck Score</span>
            <span className="stat-value">{(analytics?.bottleneck_score ?? 0).toFixed(1)}</span>
            <span className={`stat-trend ${((analytics?.trend_bottleneck ?? 0) >= 0) ? 'up' : 'down'}`}>{((analytics?.trend_bottleneck ?? 0) >= 0) ? '+' : ''}{(analytics?.trend_bottleneck ?? 0).toFixed(1)}% improvement</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon purple"><ShieldCheck size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Compliance Index</span>
            <span className="stat-value">{(analytics?.sla_compliance ?? 0).toFixed(1)}%</span>
            <span className={`stat-trend ${((analytics?.trend_compliance ?? 0) >= 0) ? 'up' : 'down'}`}>{((analytics?.trend_compliance ?? 0) >= 0) ? '+' : ''}{(analytics?.trend_compliance ?? 0).toFixed(1)}% accuracy</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon blue"><Target size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Processed</span>
            <span className="stat-value">{analytics?.total_processed ?? 0}</span>
            <span className={`stat-trend ${((analytics?.trend_processed ?? 0) >= 0) ? 'up' : 'down'}`}>{((analytics?.trend_processed ?? 0) >= 0) ? '+' : ''}{(analytics?.trend_processed ?? 0).toFixed(1)}% growth</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-item glass-card large scanline-overlay">
          <div className="chart-header">
            <h3>Department Throughput Matrix</h3>
            <Layers size={16} className="text-dim" />
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#606060', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#606060', fontSize: 11}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} barSize={40}>
                  {deptData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#barGradient-${index})`} />
                  ))}
                </Bar>
                <defs>
                  {deptData.map((_, index) => (
                    <linearGradient key={`grad-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0.2} />
                    </linearGradient>
                  ))}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="optimization-insights glass-card">
          <div className="chart-header">
            <h3>AI Optimization Protocol</h3>
            <TrendingUp size={16} className="text-accent-teal" />
          </div>
          <div className="insight-list">
            <div className="insight-entry">
              <div className="entry-marker teal"></div>
              <div className="entry-body">
                <strong>Congestion Mitigation</strong>
                <p>Redirecting Legal approvals to Region-B nodes can reduce latency by 14.2%.</p>
              </div>
            </div>
            <div className="insight-entry">
              <div className="entry-marker purple"></div>
              <div className="entry-body">
                <strong>SLA Risk Detection</strong>
                <p>Anomalous delay patterns detected in Procurement. Suggesting autonomous escalation.</p>
              </div>
            </div>
            <div className="insight-entry">
              <div className="entry-marker blue"></div>
              <div className="entry-body">
                <strong>Predictive Routing</strong>
                <p>Projected 20% volume increase tomorrow. Auto-scaling orchestration capacity.</p>
              </div>
            </div>
          </div>
          <button className="btn-primary full-width mt-4" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>EXECUTE ALL OPTIMIZATIONS</button>
        </div>
      </div>

    </div>
  );
};

export default Analytics;

