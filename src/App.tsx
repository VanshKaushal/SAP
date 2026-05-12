import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import WorkflowGraph from './screens/WorkflowGraph';
import AICopilot from './screens/AICopilot';
import Analytics from './screens/Analytics';
import ApprovalCenter from './screens/ApprovalCenter';
import Settings from './screens/Settings';
import Landing from './screens/Landing';
import IntroLoader from './components/IntroLoader';
import './App.css';

export type Screen = 'dashboard' | 'workflow-graph' | 'ai-copilot' | 'analytics' | 'approval-center' | 'risk-monitoring' | 'system-health' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  if (isLoading) {
    return <IntroLoader onComplete={() => setIsLoading(false)} />;
  }

  if (!hasEntered) {
    return <Landing onStart={() => setHasEntered(true)} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'workflow-graph':
        return <WorkflowGraph />;
      case 'ai-copilot':
        return <AICopilot />;
      case 'analytics':
        return <Analytics />;
      case 'approval-center':
        return <ApprovalCenter />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
