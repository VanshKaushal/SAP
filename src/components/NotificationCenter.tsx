import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Clock, Info, AlertTriangle } from 'lucide-react';
import type { Notification } from '../types/notification';
import './NotificationCenter.css';

interface NotificationCenterProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications = [], 
  isOpen, 
  onClose 
}) => {
  const safeNotifications = notifications ?? [];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="notification-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="notification-center glass"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="center-header">
              <h3>SYSTEM INTELLIGENCE FEED</h3>
              <button className="close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="center-stats">
              <div className="stat">
                <span className="val">{safeNotifications.length}</span>
                <span className="lbl">Total Alerts</span>
              </div>
              <div className="stat danger">
                <span className="val">{safeNotifications.filter(n => n?.severity === 'CRITICAL').length}</span>
                <span className="lbl">Critical</span>
              </div>
            </div>

            <div className="notification-list">
              {safeNotifications.map((notification) => {
                const Icon = notification?.severity === 'CRITICAL' ? ShieldAlert : 
                             notification?.type === 'ANOMALY' ? AlertTriangle :
                             notification?.type === 'SLA_BREACH' ? Clock : Info;
                
                return (
                  <motion.div 
                    key={notification?.id} 
                    className={`notification-item ${notification?.severity?.toLowerCase() ?? 'info'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="item-icon">
                      <Icon size={16} />
                    </div>
                    <div className="item-content">
                      <div className="item-header">
                        <span className="item-type">{notification?.type}</span>
                        <span className="item-time">
                          {notification?.timestamp ? new Date(notification.timestamp).toLocaleTimeString() : 'N/A'}
                        </span>
                      </div>
                      <h4 className="item-title">{notification?.title}</h4>
                      <p className="item-msg">{notification?.message}</p>
                      {notification?.workflow_id && (
                        <button className="item-action">INSPECT {notification.workflow_id}</button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <footer className="center-footer">
              <button className="clear-btn">MARK ALL AS READ</button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
