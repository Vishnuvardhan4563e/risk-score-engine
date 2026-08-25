import pytest

def test_sensor_data_structure(sample_sensor_data):
    """Test sensor data has required fields"""
    required_fields = ["vehicle_id", "speed", "acceleration", "steering_angle"]
    for field in required_fields:
        assert field in sample_sensor_data

def test_risk_prediction_structure(sample_risk_prediction):
    """Test risk prediction structure"""
    assert 0 <= sample_risk_prediction["risk_score"] <= 1
    assert sample_risk_prediction["alert_level"] in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    assert sample_risk_prediction["confidence"] > 0

def test_incident_creation(sample_incident):
    """Test incident data structure"""
    assert sample_incident["vehicle_id"]
    assert sample_incident["severity"] in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
