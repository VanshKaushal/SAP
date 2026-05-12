import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Command, 
  Zap, 
  Activity, 
  ShieldAlert, 
  Network, 
  MessageSquare,
  Settings,
  ChevronRight,
  Terminal
} from 'lucide-react';
import './CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onAction }) => {
  const [query, setQuery] = useState('');
  
  const commands = [
    { id: 'focus-graph', label: 'Focus Neural Graph', icon: Network, category: 'Navigation', shortcut: 'G' },
    { id: 'open-copilot', label: 'Launch AI Copilot', icon: MessageSquare, category: 'Navigation', shortcut: 'C' },
    { id: 'risk-analysis', label: 'Run Risk Analysis', icon: ShieldAlert, category: 'Intelligence', shortcut: 'R' },
    { id: 'optimize-workflow', label: 'Optimize Workflow Paths', icon: Zap, category: 'Actions', shortcut: 'O' },
    { id: 'system-diag', label: 'Open System Diagnostics', icon: Terminal, category: 'System', shortcut: 'D' },
    { id: 'settings', label: 'Orchestration Settings', icon: Settings, category: 'System', shortcut: ',' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // This will be handled by the parent
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="command-palette-overlay">
          <motion.div 
            className="command-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="command-palette-window glass"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="search-area">
              <Search size={20} className="search-icon" />
              <input 
                autoFocus
                type="text" 
                placeholder="Type a command or search..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="command-hint">ESC to close</div>
            </div>

            <div className="command-list">
              {filteredCommands.length > 0 ? (
                <div className="command-results">
                  {['Navigation', 'Intelligence', 'Actions', 'System'].map(category => {
                    const categoryCmds = filteredCommands.filter(c => c.category === category);
                    if (categoryCmds.length === 0) return null;
                    
                    return (
                      <div key={category} className="command-group">
                        <div className="group-label">{category}</div>
                        {categoryCmds.map(cmd => (
                          <button 
                            key={cmd.id} 
                            className="command-item"
                            onClick={() => {
                              onAction(cmd.id);
                              onClose();
                            }}
                          >
                            <div className="cmd-left">
                              <cmd.icon size={16} />
                              <span>{cmd.label}</span>
                            </div>
                            <div className="cmd-right">
                              <div className="shortcut-key">⌘{cmd.shortcut}</div>
                              <ChevronRight size={14} className="arrow" />
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-results">No commands found for "{query}"</div>
              )}
            </div>

            <footer className="command-footer">
              <div className="footer-item">
                <Command size={12} />
                <span>Commands</span>
              </div>
              <div className="footer-item">
                <ChevronRight size={12} />
                <span>Navigate</span>
              </div>
              <div className="footer-item">
                <Activity size={12} />
                <span>System Active</span>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
