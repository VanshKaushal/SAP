import React from 'react';
import './Atmosphere.css';

const Atmosphere: React.FC = () => {
  return (
    <div className="atmosphere-container">
      {/* Dynamic Background Gradients */}
      <div className="ambient-glows">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
      </div>

      {/* Neural Network Visualization Background */}
      <svg className="neural-overlay" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Animated paths representing neural connections */}
        <path className="neural-path p1" d="M 100 200 Q 300 100 500 200 T 900 200" />
        <path className="neural-path p2" d="M 200 800 Q 400 600 600 800 T 1000 700" />
        <path className="neural-path p3" d="M -100 400 Q 200 500 400 300 T 1100 400" />
        <path className="neural-path p4" d="M 300 -100 Q 500 300 700 100 T 900 600" />

        {/* Pulse nodes */}
        <circle className="pulse-node n1" cx="300" cy="100" r="2" fill="url(#nodeGradient)" />
        <circle className="pulse-node n2" cx="700" cy="500" r="3" fill="url(#nodeGradient)" />
        <circle className="pulse-node n3" cx="100" cy="600" r="2" fill="url(#nodeGradient)" />
        <circle className="pulse-node n4" cx="850" cy="200" r="4" fill="url(#nodeGradient)" />
      </svg>

      {/* Operational Scanning Effect */}
      <div className="scan-line"></div>

      {/* Grid Overlay */}
      <div className="digital-grid"></div>
      
      {/* Vignette for cinematic depth */}
      <div className="vignette"></div>
    </div>
  );
};

export default Atmosphere;
