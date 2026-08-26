import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiAlertTriangle, FiActivity, FiMap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import RiskDashboard from './components/RiskDashboard';
import RealTimeAlerts from './components/RealTimeAlerts';
import Analytics from './components/Analytics';
import IncidentMap from './components/IncidentMap';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [riskData, setRiskData] = useState({
    risk_score: 0.65,
    alert_level: 'MEDIUM',
    time_to_incident: 2.3,
    confidence: 0.92
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRiskData(prev => ({
        ...prev,
        risk_score: Math.random() * 0.8 + 0.1,
        confidence: Math.random() * 0.2 + 0.85,
        time_to_incident: Math.random() * 5 + 1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiActivity /> },
    { id: 'alerts', label: 'Alerts', icon: <FiAlertTriangle /> },
    { id: 'analytics', label: 'Analytics', icon: <FiTrendingUp /> },
    { id: 'map', label: 'Map', icon: <FiMap /> }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="header-content"
        >
          <div className="header-title">
            <h1>🚗 Risk Score Engine</h1>
            <p>AI-Powered Vehicle Accident Prevention System</p>
          </div>
          <div className="header-status">
            <div className="status-badge">
              <span className="status-dot"></span>
              All Systems Online
            </div>
          </div>
        </motion.div>
      </header>

      {/* Navigation */}
      <nav className="app-nav">
        <div className="nav-container">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="app-content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <RiskDashboard riskData={riskData} />}
          {activeTab === 'alerts' && <RealTimeAlerts />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'map' && <IncidentMap />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Risk Score Engine © 2024 | AI-Powered Safety System</p>
      </footer>
    </div>
  );
}

export default App;
