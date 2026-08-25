import numpy as np

class RootCauseClassifier:
    """
    Classifies the root cause of risky driving behavior
    """
    def __init__(self):
        self.model = None
        self.causes = [
            "Speeding",
            "Distraction",
            "Impaired Driving",
            "Lane Violation",
            "Tailgating",
            "Weather Impact",
            "Road Hazard"
        ]
        
    def classify(self, speed, acceleration, steering_angle, lane_deviation, weather_condition="clear"):
        """
        Classify root cause of risky driving
        
        Returns: String indicating the root cause
        """
        # Placeholder classification logic
        if speed > 80:
            return "Speeding"
        elif abs(steering_angle) > 30:
            return "Lane Violation"
        elif abs(acceleration) > 5:
            return "Impaired Driving"
        elif lane_deviation > 0.5:
            return "Distraction"
        else:
            return "Unknown"
    
    def get_all_causes(self):
        """Return list of all possible causes"""
        return self.causes

# Initialize global classifier instance
classifier = RootCauseClassifier()
