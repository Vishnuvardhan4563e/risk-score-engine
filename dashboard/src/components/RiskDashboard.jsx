import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import dataService from '../services/dataService';
import 'react-circular-progressbar/dist/styles.css';

function RiskDashboard() {
  const [riskData, setRiskData] = useState({
    risk_score: 0.65,
    alert_level: 'MEDIUM',
    confidence: 0.92,
    root_cause: 'Speeding'
  });

  const [sensorData, setSensorData] = useState({
    speed: 65,
    acceleration: 1.5,
    steering_angle: 15,
    lane_deviation: 0.2
  });

  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const tsData = dataService.generateTimeSeriesData(24);
    setTimeSeriesData(tsData);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newSensorData = {
          speed: Math.random() * 100 + 20,
          acceleration: Math.random() * 5 - 2.5,
          steering_angle: Math.random() * 45 - 22.5,
          lane_deviation: Math.random() * 1
        };

        setSensorData(newSensorData);

        const prediction = await dataService.predictRisk(newSensorData);
        setRiskData(prediction.data);

        setTimeSeriesData(prev => {
          const newData = [...prev];
          newData.shift();
          newData.push({
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            riskScore: prediction.data.risk_score,
            incidents: Math.floor(Math.random() * 5),
            alerts: Math.floor(Math.random() * 8)
          });
          return newData;
        });

        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (level) => {
    const colors = { 'LOW': '#4CAF50', 'MEDIUM': '#FFC107', 'HIGH': '#FF9800', 'CRITICAL': '#F44336' };
    return colors[level] || '#667eea';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5em', color: '#333' }}>📊 Real-Time Risk Assessment</h2>
        <div style={{ fontSize: '0.9em', color: '#666' }}>Last updated: {lastUpdate.toLocaleTimeString()}</div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
        style={{
          background: `linear-gradient(135deg, ${getAlertColor(riskData.alert_level)}33 0%, rgba(255,255,255,0.9) 100%)`,
          borderLeft: `4px solid ${getAlertColor(riskData.alert_level)}`,
          padding: '30px'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px', alignItems: 'center' }}>
          <div style={{ height: '200px' }}>
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
                trailColor: '#ddd'
              })}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '1.8em', marginBottom: '10px', color: '#333' }}>
              {riskData.alert_level} Risk Level
            </h3>
            <p style={{ fontSize: '1em', color: '#666', marginBottom: '15px' }}>
              {riskData.alert_level === 'LOW' && '✅ Safe driving conditions'}
              {riskData.alert_level === 'MEDIUM' && '⚠️ Monitor driving behavior'}
              {riskData.alert_level === 'HIGH' && '⛔ Immediate attention required'}
              {riskData.alert_level === 'CRITICAL' && '🚨 Take corrective action'}
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ background: '#f0f0f0', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9em' }}>
                Root Cause: {riskData.root_cause}
              </span>
              <span style={{ background: '#f0f0f0', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9em' }}>
                Confidence: {(riskData.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Risk Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 style={{ marginBottom: '20px', color: '#333' }}>📈 Risk Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 1]} />
              <Tooltip formatter={(value) => value.toFixed(2)} />
              <Area type="monotone" dataKey="riskScore" stroke="#FF6B6B" fillOpacity={1} fill="url(#colorRisk)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 style={{ marginBottom: '20px', color: '#333' }}>🚨 Alerts Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="alerts" fill="#FF9800" name="Alerts" />
              <Bar dataKey="incidents" fill="#F44336" name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Sensor Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📡 Sensor Data</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #FF6B6B' }}>
            <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>🚗 Speed</div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#FF6B6B' }}>
              {sensorData.speed.toFixed(1)}<span style={{ fontSize: '0.6em' }}>km/h</span>
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #FFC107' }}>
            <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>⚡ Acceleration</div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#FFC107' }}>
              {Math.abs(sensorData.acceleration).toFixed(2)}<span style={{ fontSize: '0.6em' }}>m/s²</span>
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
            <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>🔄 Steering</div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#2196F3' }}>
              {Math.abs(sensorData.steering_angle).toFixed(1)}<span style={{ fontSize: '0.6em' }}>°</span>
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #4CAF50' }}>
            <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>🛣️ Lane Dev</div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#4CAF50' }}>
              {sensorData.lane_deviation.toFixed(2)}<span style={{ fontSize: '0.6em' }}>m</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RiskDashboard;
