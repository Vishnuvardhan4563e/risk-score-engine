import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import dataService from '../services/dataService';

function Analytics() {
  const [stats] = useState(dataService.generateIncidentStats());
  const [rootCauses] = useState(dataService.generateRootCauseStats());
  const [severityTrend, setSeverityTrend] = useState([]);

  useEffect(() => {
    const trend = Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      critical: Math.floor(Math.random() * 5),
      high: Math.floor(Math.random() * 8),
      medium: Math.floor(Math.random() * 15),
      low: Math.floor(Math.random() * 20)
    }));
    setSeverityTrend(trend);
  }, []);

  const COLORS = ['#F44336', '#FF9800', '#FFC107', '#4CAF50', '#2196F3'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2 style={{ fontSize: '1.5em', color: '#333' }}>📊 Analytics Dashboard</h2>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderTop: '4px solid #FF6B6B', textAlign: 'center', padding: '30px' }}
        >
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#FF6B6B' }}>{stats.totalIncidents}</div>
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>Total Incidents</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderTop: '4px solid #F44336', textAlign: 'center', padding: '30px' }}
        >
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#F44336' }}>{stats.highSeverity}</div>
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>Critical</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderTop: '4px solid #4CAF50', textAlign: 'center', padding: '30px' }}
        >
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#4CAF50' }}>{stats.preventedAccidents}</div>
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>Prevented Accidents</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderTop: '4px solid #2196F3', textAlign: 'center', padding: '30px' }}
        >
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#2196F3' }}>{stats.accidentReductionRate}%</div>
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>Reduction Rate</div>
        </motion.div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Root Causes Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 style={{ marginBottom: '20px', color: '#333' }}>🔍 Root Causes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={rootCauses} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="count">
                {rootCauses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Severity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 style={{ marginBottom: '20px', color: '#333' }}>📈 Severity Breakdown</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ background: 'rgba(244, 67, 54, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #F44336', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9em', color: '#666' }}>Critical</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#F44336' }}>{stats.highSeverity}</div>
            </div>
            <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #4CAF50', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9em', color: '#666' }}>Low</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#4CAF50' }}>{stats.lowSeverity}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Severity Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 30-Day Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={severityTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="critical" stackId="a" fill="#F44336" name="Critical" />
            <Bar dataKey="high" stackId="a" fill="#FF9800" name="High" />
            <Bar dataKey="medium" stackId="a" fill="#FFC107" name="Medium" />
            <Bar dataKey="low" stackId="a" fill="#4CAF50" name="Low" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Root Causes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 style={{ marginBottom: '20px', color: '#333' }}>🏆 Top Root Causes</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Rank</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Cause</th>
              <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600' }}>Count</th>
              <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {rootCauses.map((cause, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '15px' }}>#{index + 1}</td>
                <td style={{ padding: '15px' }}>{cause.cause}</td>
                <td style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>{cause.count}</td>
                <td style={{ padding: '15px', textAlign: 'center', fontWeight: '600', color: '#667eea' }}>{cause.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default Analytics;
