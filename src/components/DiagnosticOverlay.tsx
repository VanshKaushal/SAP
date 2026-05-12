import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Network, X } from 'lucide-react';
import './DiagnosticOverlay.css';

interface DiagnosticOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiagnosticOverlay: React.FC<DiagnosticOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="diagnostic-overlay glass"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      drag
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
    >
      <header className="diag-header">
        <div className="diag-title">
          <Terminal size={14} />
          <span>SYSTEM DIAGNOSTICS</span>
        </div>
        <button className="diag-close" onClick={onClose}><X size={14} /></button>
      </header>
      
      <div className="diag-content">
        <div className="diag-section">
          <div className="section-title"><Cpu size={12} /> NEURAL PROCESSING</div>
          <div className="diag-bar"><div className="fill" style={{ width: '64%' }}></div></div>
          <div className="diag-meta">CORE_LOAD: 64.2% | AVG_LATENCY: 12ms</div>
        </div>

        <div className="diag-section">
          <div className="section-title"><Database size={12} /> ORCHESTRATION SYNC</div>
          <div className="diag-bar"><div className="fill teal" style={{ width: '98%' }}></div></div>
          <div className="diag-meta">SYNC_STATUS: OPTIMAL | LAST_BLOCK: 0.4s ago</div>
        </div>

        <div className="diag-section">
          <div className="section-title"><Network size={12} /> NODE TOPOLOGY</div>
          <div className="diag-meta">ACTIVE_NODES: 124 | PEERS: 12 | DROP_RATE: 0.02%</div>
        </div>

        <div className="diag-console">
          <div className="console-line">[10:48:12] Initializing cognitive override...</div>
          <div className="console-line">[10:48:14] Neural path optimized for DE-FRA-01.</div>
          <div className="console-line">[10:48:18] Global sync established.</div>
          <div className="console-line text-accent-cyan">[10:48:22] AI Agent Beta: Optimization complete.</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiagnosticOverlay;
