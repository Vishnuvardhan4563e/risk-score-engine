import React from 'react';

function Analytics() {
  const stats = {
    total_incidents: 47,
    high_severity: 5,
    medium_severity: 12,
    low_severity: 30,
    accident_prevention_rate: 18.5
  };

  return (
    <div className="analytics-container">
      <h2>Analytics & Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Incidents</h3>
          <p className="stat-value">{stats.total_incidents}</p>
        </div>
        <div className="stat-card">
          <h3>High Severity</h3>
          <p className="stat-value">{stats.high_severity}</p>
        </div>
        <div className="stat-card">
          <h3>Prevention Rate</h3>
          <p className="stat-value">{stats.accident_prevention_rate}%</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
