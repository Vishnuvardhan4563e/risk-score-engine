import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

function RealTimeAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'CRITICAL',
      title: 'High Speed Detected',
      message: 'Vehicle speed exceeds safe limit (95 km/h)',
      timestamp: new Date(),
      icon: <FiAlertTriangle />
    },
    {
      id: 2,
      type: 'WARNING',
      title: 'Lane Deviation',
      message: 'Unsafe lane change detected',
      timestamp: new Date(Date.now() - 30000),
      icon: <FiAlertCircle />
    },
    {
      id: 3,
      type: 'INFO',
      title: 'Routine Check',
      message: 'All systems operating normally',
      timestamp: new Date(Date.now() - 60000),
      icon: <FiCheckCircle />
    }
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'CRITICAL': return '#F44336';
      case 'WARNING': return '#FF9800';
      case 'INFO': return '#2196F3';
      default: return '#667eea';
    }
  };

  const getAlertBg = (type) => {
    switch(type) {
      case 'CRITICAL': return 'rgba(244, 67, 54, 0.1)';
      case 'WARNING': return 'rgba(255, 152, 0, 0.1)';
      case 'INFO': return 'rgba(33, 150, 243, 0.1)';
      default: return 'rgba(102, 126, 234, 0.1)';
    }
  };

  return (
    <div className="alerts-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card"
      >
        <div className="card-header">
          <h2 className="card-title">🚨 Real-Time Alerts</h2>
          <span className="badge">{alerts.length} Active</span>
        </div>

        <div className="alerts-list">
          <AnimatePresence>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="alert-item"
                  style={{
                    background: getAlertBg(alert.type),
                    borderLeftColor: getAlertColor(alert.type)
                  }}
                >
                  <div className="alert-icon" style={{ color: getAlertColor(alert.type) }}>
                    {alert.icon}
                  </div>

                  <div className="alert-content">
                    <h4 className="alert-title">{alert.title}</h4>
                    <p className="alert-message">{alert.message}</p>
                    <span className="alert-time">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <button
                    className="alert-close"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <FiX />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <FiCheckCircle size={48} />
                <p>No active alerts</p>
                <span>System operating normally</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default RealTimeAlerts;
