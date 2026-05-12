import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  ChevronRight, 
  Network, 
  ShieldCheck, 
  BarChart3, 
  Zap 
} from 'lucide-react';
import './Landing.css';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">
          <BrainCircuit className="text-accent-blue" />
          <span>SAP COGNITIVE</span>
        </div>
        <div className="nav-links">
          <a href="#vision">Vision</a>
          <a href="#orchestration">Orchestration</a>
          <a href="#intelligence">Intelligence</a>
          <button className="btn-login glass" onClick={onStart}>Enter Platform</button>
        </div>
      </nav>

      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="badge glass">99.9% AUTONOMOUS ORCHESTRATION</div>
          <h1 className="text-gradient">The Neural Backbone of Enterprise Operations</h1>
          <p>Orchestrate global SAP workflows with predictive AI intelligence. Eliminate bottlenecks, enforce SLA precision, and visualize organizational throughput in real-time.</p>
          <div className="hero-actions">
            <button className="btn-primary accent-glow" onClick={onStart}>
              Launch Orchestrator <ChevronRight size={18} />
            </button>
            <button className="btn-secondary glass">Watch Demo</button>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="visual-ring outer"></div>
          <div className="visual-ring inner"></div>
          <div className="neural-core">
            <BrainCircuit size={120} className="core-icon" />
          </div>
        </motion.div>
      </section>

      <section className="features-grid">
        <div className="feature-card glass">
          <Network className="text-accent-blue" />
          <h3>Neural Workflow Mapping</h3>
          <p>Real-time dependency graphs that visualize the pulse of your entire enterprise.</p>
        </div>
        <div className="feature-card glass">
          <ShieldCheck className="text-accent-teal" />
          <h3>Autonomous SLA Enforcement</h3>
          <p>Predictive risk detection that prevents breaches before they impact the bottom line.</p>
        </div>
        <div className="feature-card glass">
          <BarChart3 className="text-accent-purple" />
          <h3>Executive Intelligence</h3>
          <p>Bloomberg-grade analytics for the next generation of operational leadership.</p>
        </div>
        <div className="feature-card glass">
          <Zap className="text-accent-cyan" />
          <h3>Cognitive Automation</h3>
          <p>Self-optimizing workflow paths powered by secure enterprise AI models.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-line"></div>
        <div className="footer-content">
          <span>© 2026 SAP COGNITIVE ORCHESTRA</span>
          <div className="footer-meta">
            <span>SECURE NODE: DE-FRA-01</span>
            <span>SYSTEM_STABLE: 100%</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
