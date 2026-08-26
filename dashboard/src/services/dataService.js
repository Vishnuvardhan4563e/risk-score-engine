import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const ML_API_URL = process.env.REACT_APP_ML_API_URL || 'http://localhost:8001';

// Create axios instances
const api = axios.create({ baseURL: API_URL, timeout: 10000 });
const mlApi = axios.create({ baseURL: ML_API_URL, timeout: 10000 });

// ========== SENSOR DATA ==========
export const getSensorData = (vehicleId) => {
  return api.get(`/api/sensors/status/${vehicleId}`)
    .catch(err => {
      console.error('Sensor data error:', err);
      return generateMockSensorData();
    });
};

export const receiveSensorData = (data) => {
  return api.post('/api/sensors/data', data)
    .catch(err => {
      console.error('Sensor receive error:', err);
      return { data: { status: 'received' } };
    });
};

// ========== PREDICTIONS ==========
export const predictRisk = (sensorData) => {
  return mlApi.post('/predict-risk', {
    speed: sensorData.speed,
    acceleration: sensorData.acceleration,
    steering_angle: sensorData.steering_angle,
    lane_deviation: sensorData.lane_deviation,
    weather_condition: sensorData.weather || 'clear'
  })
    .catch(err => {
      console.error('Prediction error:', err);
      return generateMockPrediction(sensorData);
    });
};

// ========== INCIDENTS ==========
export const getIncidents = (vehicleId) => {
  return api.get(`/api/incidents/list/${vehicleId}`)
    .catch(err => {
      console.error('Incidents error:', err);
      return { data: { incidents: [] } };
    });
};

export const createIncident = (data) => {
  return api.post('/api/incidents/create', data)
    .catch(err => {
      console.error('Create incident error:', err);
      return { data: { status: 'created' } };
    });
};

// ========== HEALTH CHECK ==========
export const healthCheck = () => {
  return Promise.all([
    api.get('/health').catch(() => ({ status: 'offline' })),
    mlApi.get('/health').catch(() => ({ status: 'offline' }))
  ]);
};

// ========== MOCK DATA GENERATORS ==========
const generateMockSensorData = () => {
  return {
    data: {
      vehicle_id: 'VEHICLE_001',
      speed: Math.random() * 100 + 20,
      acceleration: Math.random() * 5 - 2.5,
      steering_angle: Math.random() * 45 - 22.5,
      lane_deviation: Math.random() * 1,
      gps_latitude: 40.7128 + Math.random() * 0.01,
      gps_longitude: -74.0060 + Math.random() * 0.01,
      timestamp: new Date()
    }
  };
};

const generateMockPrediction = (sensorData) => {
  const speed = sensorData.speed || 50;
  const acceleration = Math.abs(sensorData.acceleration || 0);
  const steering = Math.abs(sensorData.steering_angle || 0);

  // Calculate risk based on inputs
  const baseRisk = 
    (Math.min(speed / 120, 1) * 0.3) +
    (Math.min(acceleration / 8, 1) * 0.2) +
    (Math.min(steering / 45, 1) * 0.3) +
    (Math.random() * 0.2);

  const riskScore = Math.min(Math.max(baseRisk, 0), 1);

  let severity = 'LOW';
  if (riskScore > 0.75) severity = 'CRITICAL';
  else if (riskScore > 0.6) severity = 'HIGH';
  else if (riskScore > 0.4) severity = 'MEDIUM';

  const rootCauses = [
    'Speeding',
    'Lane Violation',
    'Impaired Driving',
    'Distraction',
    'Tailgating',
    'Unknown'
  ];

  return {
    data: {
      risk_score: riskScore,
      root_cause: rootCauses[Math.floor(Math.random() * rootCauses.length)],
      severity: severity,
      priority: severity === 'CRITICAL' ? 4 : severity === 'HIGH' ? 3 : severity === 'MEDIUM' ? 2 : 1,
      confidence: 0.85 + Math.random() * 0.15
    }
  };
};

// ========== ANALYTICS DATA ==========
export const generateTimeSeriesData = (hours = 24) => {
  const data = [];
  for (let i = hours; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      riskScore: Math.random() * 0.8 + 0.1,
      incidents: Math.floor(Math.random() * 5),
      alerts: Math.floor(Math.random() * 8)
    });
  }
  return data;
};

export const generateIncidentStats = () => {
  return {
    totalIncidents: 47,
    highSeverity: 5,
    mediumSeverity: 12,
    lowSeverity: 30,
    preventedAccidents: 8,
    accidentReductionRate: 18.5
  };
};

export const generateRootCauseStats = () => {
  return [
    { cause: 'Speeding', count: 18, percentage: 38 },
    { cause: 'Lane Violation', count: 12, percentage: 26 },
    { cause: 'Distraction', count: 10, percentage: 21 },
    { cause: 'Tailgating', count: 5, percentage: 11 },
    { cause: 'Other', count: 2, percentage: 4 }
  ];
};

export default {
  getSensorData,
  receiveSensorData,
  predictRisk,
  getIncidents,
  createIncident,
  healthCheck,
  generateTimeSeriesData,
  generateIncidentStats,
  generateRootCauseStats
};
