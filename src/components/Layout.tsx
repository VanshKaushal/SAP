import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Atmosphere from './Atmosphere';
import CommandPalette from './CommandPalette';

import { Screen } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandAction = (actionId: string) => {
    switch(actionId) {
      case 'focus-graph': onNavigate('workflow-graph'); break;
      case 'open-copilot': onNavigate('ai-copilot'); break;
      case 'settings': onNavigate('settings'); break;
      default: console.log('Action:', actionId);
    }
  };

  return (
    <div className="layout-container">
      {/* Global Immersive Atmosphere */}
      <Atmosphere />

      
      <Sidebar 
        collapsed={isSidebarCollapsed} 
        setCollapsed={setIsSidebarCollapsed} 
        activeScreen={currentScreen}
        onNavigate={onNavigate}
      />
      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <main className="screen-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ height: '100%', width: '100%' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)}
        onAction={handleCommandAction}
      />
    </div>

  );
};

export default Layout;
