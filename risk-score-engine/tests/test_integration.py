"""
Integration tests for backend and ML
"""

import pytest

def test_full_prediction_flow(sample_sensor_data):
    """Test complete prediction flow"""
    # TODO: Test integration between backend and ML
    assert sample_sensor_data["vehicle_id"]

def test_api_connectivity():
    """Test API connectivity"""
    # TODO: Test backend API health
    pass
