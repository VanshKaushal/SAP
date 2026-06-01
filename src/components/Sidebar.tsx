import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Network, 
  MessageSquare, 
  CheckSquare, 
  BarChart3, 
  ShieldAlert, 
  Activity, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';
import type { Screen } from '../types/navigation';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activeScreen, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workflow-graph', label: 'Workflow Graph', icon: Network },
    { id: 'ai-copilot', label: 'AI Copilot', icon: MessageSquare },
    { id: 'approval-center', label: 'Approval Center', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="brand">
            <span className="brand-logo">S</span>
            <span className="brand-name">COGNITIVE</span>
          </div>
        )}
        <button className="collapse-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id as Screen)}
              title={collapsed ? item.label : ''}
            >
              <div className="nav-icon">
                <Icon size={20} />
              </div>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="active-indicator" 
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {!collapsed ? (
          <div className="user-profile glass-card">
            <div className="avatar">VK</div>
            <div className="user-info">
              <span className="user-name">Vansh Kaushal</span>
              <span className="user-role">Enterprise Admin</span>
            </div>
          </div>
        ) : (
          <div className="avatar small">VK</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
