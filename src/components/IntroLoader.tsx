import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Cpu, ShieldCheck, Activity } from 'lucide-react';
import './IntroLoader.css';

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [steps, setSteps] = useState([
    { id: 1, label: 'Initializing Neural Core...', status: 'waiting' },
    { id: 2, label: 'Synchronizing Global Workflows...', status: 'waiting' },
    { id: 3, label: 'Bootstrapping AI Orchestrator...', status: 'waiting' },
    { id: 4, label: 'Establishing Secure Protocol...', status: 'waiting' },
  ]);

  useEffect(() => {
    const runSequence = async () => {
      for (let i = 0; i < steps.length; i++) {
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'loading' } : s));
        await new Promise(r => setTimeout(r, 800));
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'complete' } : s));
      }
      setTimeout(onComplete, 500);
    };

    runSequence();
  }, []);

  return (
    <div className="intro-loader">
      <div className="loader-content">
        <motion.div 
          className="loader-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="logo-ring"></div>
          <BrainCircuit size={48} className="logo-icon" />
        </motion.div>

        <div className="loader-brand">
          <h1 className="text-gradient">SAP COGNITIVE</h1>
          <p>WORKFLOW ORCHESTRA v2.0</p>
        </div>

        <div className="loader-steps">
          {steps.map((step) => (
            <div key={step.id} className={`loader-step ${step.status}`}>
              <div className="step-indicator">
                {step.status === 'complete' ? <ShieldCheck size={14} /> : 
                 step.status === 'loading' ? <Activity size={14} className="spinning" /> : 
                 <Cpu size={14} />}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="loader-footer">
          <div className="system-scanline"></div>
          <span>SECURE ENTERPRISE NODE: DE-FRA-01</span>
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
