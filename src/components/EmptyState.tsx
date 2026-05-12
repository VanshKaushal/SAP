import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, Sparkles } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message: string;
  type?: 'success' | 'info' | 'ai';
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, type = 'info' }) => {
  const Icon = type === 'success' ? ShieldCheck : type === 'ai' ? Sparkles : Info;

  return (
    <motion.div 
      className="empty-state-container glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`empty-icon ${type}`}>
        <Icon size={32} />
      </div>
      <div className="empty-content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      <div className="empty-footer">
        <div className="diag-line"></div>
        <span>SYSTEM_STATUS: NOMINAL</span>
      </div>
    </motion.div>
  );
};

export default EmptyState;
