import React, { useState, useEffect } from 'react';

function RiskDashboard() {
  const [riskData, setRiskData] = useState({
    risk_score: 0.65,
    alert_level: 'MEDIUM',
    time_to_incident: 2.3,
    confidence: 0.92
  });

  useEffect(() => {
    // TODO: Fetch from ML API
    console.log('Risk Dashboard loaded');
  }, []);

  return (
    <div className="risk-dashboard">
      <div className="risk-card">
        <h2>Current Risk Score</h2>
        <div className="risk-score-display">
          <div className="risk-meter">
            <div 
              className={`risk-indicator ${riskData.alert_level.toLowerCase()}`}
              style={{width: `${riskData.risk_score * 100}%`}}
            >
            </div>
          </div>
          <p className="risk-value">{(riskData.risk_score * 100).toFixed(1)}%</p>
          <p className="alert-level">{riskData.alert_level}</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Time to Incident</h3>
          <p className="metric-value">{riskData.time_to_incident}s</p>
        </div>
        <div className="metric-card">
          <h3>Confidence</h3>
          <p className="metric-value">{(riskData.confidence * 100).toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}

export default RiskDashboard;
