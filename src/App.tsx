import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

import type { Screen } from './types/navigation';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

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
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loader" exit={{ opacity: 0 }}>
          <IntroLoader onComplete={() => setIsLoading(false)} />
        </motion.div>
      ) : !hasEntered ? (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Landing onStart={() => setHasEntered(true)} />
        </motion.div>
      ) : (
        <motion.div key="platform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', width: '100%' }}>
          <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
            {renderScreen()}
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
