import pytest

@pytest.fixture
def sample_sensor_data():
    return {
        "vehicle_id": "test_vehicle_001",
        "speed": 60.5,
        "acceleration": 2.1,
        "steering_angle": 15.3,
        "lane_deviation": 0.2,
        "gps_latitude": 40.7128,
        "gps_longitude": -74.0060
    }

@pytest.fixture
def sample_risk_prediction():
    return {
        "risk_score": 0.65,
        "alert_level": "MEDIUM",
        "time_to_incident": 2.3,
        "confidence": 0.92
    }

@pytest.fixture
def sample_incident():
    return {
        "vehicle_id": "test_vehicle_001",
        "severity": "HIGH",
        "root_cause": "Speeding",
        "description": "Vehicle was speeding in a school zone"
    }
