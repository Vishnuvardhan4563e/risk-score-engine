import React, { useState, useEffect } from 'react';
import RiskDashboard from './components/RiskDashboard';
import RealTimeAlerts from './components/RealTimeAlerts';
import Analytics from './components/Analytics';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    // TODO: Fetch from backend API
    console.log('App loaded');
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚗 Risk Score Engine</h1>
        <p>AI-Powered Vehicle Accident Prevention</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'alerts' ? 'active' : ''} 
          onClick={() => setActiveTab('alerts')}
        >
          Alerts
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'dashboard' && <RiskDashboard />}
        {activeTab === 'alerts' && <RealTimeAlerts />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}

export default App;
