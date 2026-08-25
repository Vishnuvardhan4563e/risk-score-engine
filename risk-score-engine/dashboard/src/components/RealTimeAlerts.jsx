import React, { useState } from 'react';

function RealTimeAlerts() {
  const [alerts] = useState([
    { id: 1, type: 'HIGH_SPEED', message: 'Speed exceeds safe limit', timestamp: new Date(), severity: 'HIGH' },
    { id: 2, type: 'LANE_DEVIATION', message: 'Lane deviation detected', timestamp: new Date(), severity: 'MEDIUM' },
    { id: 3, type: 'TAILGATING', message: 'Unsafe following distance', timestamp: new Date(), severity: 'HIGH' }
  ]);

  return (
    <div className="alerts-container">
      <h2>Real-Time Alerts</h2>
      <div className="alerts-list">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.severity.toLowerCase()}`}>
              <p><strong>{alert.type}</strong></p>
              <p>{alert.message}</p>
              <small>{alert.timestamp.toLocaleTimeString()}</small>
            </div>
          ))
        ) : (
          <p>No active alerts</p>
        )}
      </div>
    </div>
  );
}

export default RealTimeAlerts;
