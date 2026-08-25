import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const ML_API_URL = process.env.REACT_APP_ML_API_URL || 'http://localhost:8001';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

export const mlApi = axios.create({
  baseURL: ML_API_URL,
  timeout: 10000
});

// Backend endpoints
export const getSensorData = (vehicleId) => api.get(`/api/sensors/status/${vehicleId}`);
export const getIncidents = (vehicleId) => api.get(`/api/incidents/list/${vehicleId}`);
export const createIncident = (data) => api.post('/api/incidents/create', data);

// ML endpoints
export const predictRisk = (data) => mlApi.post('/predict-risk', data);

// Error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
