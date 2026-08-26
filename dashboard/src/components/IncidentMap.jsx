import React from 'react';
import { motion } from 'framer-motion';

function IncidentMap() {
  const incidents = [
    { id: 1, title: 'High Speed Zone', severity: 'CRITICAL', speed: 95, time: '2 min ago' },
    { id: 2, title: 'Lane Deviation', severity: 'HIGH', speed: 65, time: '5 min ago' },
    { id: 3, title: 'Tailgating', severity: 'MEDIUM', speed: 50, time: '8 min ago' },
    { id: 4, title: 'Safe Driving', severity: 'LOW', speed: 45, time: '1 min ago' }
  ];

  const getSeverityColor = (severity) => {
    const colors = { 'CRITICAL': '#F44336', 'HIGH': '#FF9800', 'MEDIUM': '#FFC107', 'LOW': '#4CAF50' };
    return colors[severity] || '#667eea';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{
          minHeight: '400px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '3em', marginBottom: '20px' }}>🗺️</div>
          <h3>Map View Coming Soon</h3>
          <p style={{ marginTop: '10px', opacity: 0.8 }}>Integrating Google Maps for real-time tracking</p>
        </div>
      </motion.div>

      {/* Incidents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📍 Recent Incidents ({incidents.length})</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {incidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: `${getSeverityColor(incident.severity)}15`,
                borderLeft: `4px solid ${getSeverityColor(incident.severity)}`,
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: 0, color: '#333', marginBottom: '5px' }}>{incident.title}</h4>
                <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>Coordinates: 40.7128, -74.0060</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>Speed: {incident.speed} km/h</div>
                <span style={{
                  background: getSeverityColor(incident.severity),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85em',
                  fontWeight: '600'
                }}>
                  {incident.severity}
                </span>
              </div>

              <div style={{ fontSize: '0.9em', color: '#666', marginLeft: '20px' }}>
                {incident.time}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderTop: '4px solid #F44336', textAlign: 'center', padding: '30px' }}
        >
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#F44336' }}>3</div>
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>🚨 Critical Zones</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderTop: '4px solid '#4CAF50', textAlign: 'center', padding: '30px' }}
        >
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#4CAF50' }}>12</div>
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>✅ Safe Zones</div>
        </motion.div>
      </div>
    </div>
  );
}

export default IncidentMap;
