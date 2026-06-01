import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, ShieldCheck, Cpu } from 'lucide-react';
import './SystemHealthBar.css';

interface SystemHealthBarProps {
  health: number;
  confidence: number;
  velocity: number;
}

const SystemHealthBar: React.FC<SystemHealthBarProps> = ({ 
  health = 0, 
  confidence = 0, 
  velocity = 0 
}) => {
  return (
    <div className="system-health-bar glass">
      <div className="health-item">
        <Activity size={14} className="text-accent-teal" />
        <span className="label">SYSTEM STATUS:</span>
        <span className="value">OPERATIONAL</span>
        <div className="status-indicator online"></div>
      </div>
      
      <div className="divider"></div>

      <div className="health-item">
        <Cpu size={14} className="text-accent-blue" />
        <span className="label">ENGINE HEALTH:</span>
        <span className="value">
          {typeof health === 'number' ? health.toFixed(1) : '0.0'}%
        </span>
        <div className="mini-progress">
          <motion.div 
            className="progress-fill" 
            animate={{ width: `${typeof health === 'number' ? health : 0}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <div className="divider"></div>

      <div className="health-item">
        <ShieldCheck size={14} className="text-accent-purple" />
        <span className="label">AI CONFIDENCE:</span>
        <span className="value">
          {typeof confidence === 'number' ? confidence.toFixed(1) : '0.0'}%
        </span>
      </div>

      <div className="divider"></div>

      <div className="health-item">
        <Zap size={14} className="text-accent-cyan" />
        <span className="label">ORCHESTRATION VELOCITY:</span>
        <span className="value">
          {typeof velocity === 'number' ? velocity.toFixed(2) : '0.00'}x
        </span>
      </div>
    </div>
  );
};

export default SystemHealthBar;
