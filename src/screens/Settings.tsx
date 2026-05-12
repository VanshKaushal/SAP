import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Shield, 
  Network, 
  Eye, 
  Zap,
  Lock,
  Globe,
  Database
} from 'lucide-react';
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <div className="settings-container">
      <header className="settings-header">
        <div className="title-group">
          <h1 className="text-gradient">SYSTEM CONFIGURATION</h1>
          <p>Global orchestration parameters and neural network tuning.</p>
        </div>
      </header>

      <div className="settings-grid">
        <div className="settings-sidebar glass">
          <button className="side-item active"><Cpu size={16} /> Neural Engine</button>
          <button className="side-item"><Shield size={16} /> Security & Auth</button>
          <button className="side-item"><Network size={16} /> Graph Topology</button>
          <button className="side-item"><Database size={16} /> Data Persistence</button>
          <button className="side-item"><Globe size={16} /> Global Regions</button>
        </div>

        <div className="settings-main glass-card">
          <div className="section">
            <h3>Neural Orchestration Core</h3>
            <div className="control-group">
              <div className="control-label">
                <span className="label">Cognitive Confidence Threshold</span>
                <span className="desc">Minimum confidence required for autonomous workflow approval.</span>
              </div>
              <input type="range" className="range-input" defaultValue={85} />
            </div>

            <div className="control-group">
              <div className="control-label">
                <span className="label">Predictive Escalation</span>
                <span className="desc">Auto-escalate workflows with >60% SLA risk probability.</span>
              </div>
              <div className="toggle-switch active"></div>
            </div>
          </div>

          <div className="section">
            <h3>Graph Intelligence Rendering</h3>
            <div className="control-group">
              <div className="control-label">
                <span className="label">Neural Pulse Intensity</span>
                <span className="desc">Visual intensity of risk propagation waves in the graph.</span>
              </div>
              <input type="range" className="range-input" defaultValue={40} />
            </div>

            <div className="control-group">
              <div className="control-label">
                <span className="label">Dynamic Clustering</span>
                <span className="desc">Enable real-time node grouping based on operational affinity.</span>
              </div>
              <div className="toggle-switch"></div>
            </div>
          </div>

          <div className="section">
            <h3>Infrastructure & API</h3>
            <div className="api-key-input">
              <div className="input-header">
                <Lock size={14} />
                <span>ORCHESTRATOR_API_KEY</span>
              </div>
              <div className="input-wrapper">
                <input type="password" value="••••••••••••••••••••••••••••••••" readOnly />
                <button className="copy-btn">REGENERATE</button>
              </div>
            </div>
          </div>

          <footer className="settings-footer">
            <button className="btn-secondary">Discard Changes</button>
            <button className="btn-primary accent-glow">Save Configuration</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Settings;
