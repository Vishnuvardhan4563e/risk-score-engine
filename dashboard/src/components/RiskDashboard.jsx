import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiTrendingUp, FiClock, FiTarget } from 'react-icons/fi';

function RiskDashboard({ riskData }) {
  const getAlertColor = (level) => {
    switch(level) {
      case 'LOW': return '#4CAF50';
      case 'MEDIUM': return '#FFC107';
      case 'HIGH': return '#FF9800';
      case 'CRITICAL': return '#F44336';
      default: return '#667eea';
    }
  };

  const getAlertBg = (level) => {
    switch(level) {
      case 'LOW': return 'rgba(76, 175, 80, 0.1)';
      case 'MEDIUM': return 'rgba(255, 193, 7, 0.1)';
      case 'HIGH': return 'rgba(255, 152, 0, 0.1)';
      case 'CRITICAL': return 'rgba(244, 67, 54, 0.1)';
      default: return 'rgba(102, 126, 234, 0.1)';
    }
  };

  return (
    <div className="risk-dashboard">
      {/* Main Risk Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{
          background: `linear-gradient(135deg, ${getAlertColor(riskData.alert_level)}33 0%, rgba(255,255,255,0.8) 100%)`,
          borderLeft: `4px solid ${getAlertColor(riskData.alert_level)}`
        }}
      >
        <div className="card-header">
          <h2 className="card-title">Current Risk Assessment</h2>
          <span className={`badge badge-${riskData.alert_level.toLowerCase()}`}>
            {riskData.alert_level}
          </span>
        </div>

        <div className="risk-display">
          <div className="risk-circle">
            <CircularProgressbar
              value={riskData.risk_score * 100}
              text={`${(riskData.risk_score * 100).toFixed(0)}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'round',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: getAlertColor(riskData.alert_level),
                textColor: getAlertColor(riskData.alert_level),
                trailColor: '#ddd',
                backgroundColor: '#f5f5f5',
              })}
            />
          </div>

          <div className="risk-info">
            <h3>Risk Level: {riskData.alert_level}</h3>
            <p className="risk-description">
              {riskData.alert_level === 'LOW' && 'Safe driving conditions detected'}
              {riskData.alert_level === 'MEDIUM' && 'Moderate risk - monitor driving behavior'}
              {riskData.alert_level === 'HIGH' && 'High risk - immediate attention needed'}
              {riskData.alert_level === 'CRITICAL' && 'Critical situation - take corrective action'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid-3">
        {/* Time to Incident */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card"
          style={{ borderLeftColor: '#FF6B6B' }}
        >
          <div className="metric-label">⏱️ Time to Incident</div>
          <div className="metric-value">
            {riskData.time_to_incident.toFixed(1)}
            <span className="metric-unit">seconds</span>
          </div>
          <div className="metric-change">📉 Decreasing trend</div>
        </motion.div>

        {/* Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card"
          style={{ borderLeftColor: '#51CF66' }}
        >
          <div className="metric-label">🎯 Model Confidence</div>
          <div className="metric-value">
            {(riskData.confidence * 100).toFixed(0)}
            <span className="metric-unit">%</span>
          </div>
          <div className="metric-change">📈 High accuracy</div>
        </motion.div>

        {/* Alert Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card"
          style={{ borderLeftColor: getAlertColor(riskData.alert_level) }}
        >
          <div className="metric-label">🚨 Alert Status</div>
          <div className="metric-value">{riskData.alert_level}</div>
          <div className="metric-change">Last update: Just now</div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="card-title">Risk Score Progression</h3>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${riskData.risk_score * 100}%` }}
          ></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#666' }}>
          <span>Safe (0%)</span>
          <span>Moderate (50%)</span>
          <span>Critical (100%)</span>
        </div>
      </motion.div>
    </div>
  );
}

export default RiskDashboard;
