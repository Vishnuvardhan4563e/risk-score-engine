export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export const ML_API_URL = process.env.REACT_APP_ML_API_URL || 'http://localhost:8001';
export const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';

export const ALERT_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export const SEVERITY_COLORS = {
  LOW: '#4CAF50',
  MEDIUM: '#FFC107',
  HIGH: '#FF9800',
  CRITICAL: '#F44336'
};

export const ROOT_CAUSES = [
  'Speeding',
  'Distraction',
  'Impaired Driving',
  'Lane Violation',
  'Tailgating',
  'Weather Impact',
  'Road Hazard'
];
