import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib

class RiskScorer:
    """
    Predicts accident risk score (0-1) based on driving behavior
    """
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        
    def preprocess(self, features):
        """Normalize input features"""
        return self.scaler.fit_transform(features)
    
    def predict_risk(self, speed, acceleration, steering_angle, lane_deviation):
        """
        Predict accident risk score (0-1)
        
        Input features:
        - speed: current vehicle speed (km/h)
        - acceleration: rate of acceleration (m/s²)
        - steering_angle: steering deviation (degrees)
        - lane_deviation: deviation from lane center (meters)
        
        Returns: Risk score between 0 and 1
        """
        # Placeholder logic (will be replaced by trained model)
        risk_score = (
            min(speed / 100, 1.0) * 0.3 +           # Speed component
            abs(acceleration) / 10 * 0.2 +          # Acceleration component
            abs(steering_angle) / 45 * 0.3 +        # Steering component
            lane_deviation * 0.2                    # Lane deviation component
        )
        
        return min(max(risk_score, 0), 1)
    
    def save_model(self, path):
        """Save trained model"""
        joblib.dump(self.model, path)
    
    def load_model(self, path):
        """Load trained model"""
        self.model = joblib.load(path)

# Initialize global scorer instance
risk_scorer = RiskScorer()
