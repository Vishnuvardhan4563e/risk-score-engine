from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/sensors", tags=["Sensors"])

class SensorData(BaseModel):
    vehicle_id: str
    speed: float
    acceleration: float
    steering_angle: float
    timestamp: datetime
    gps_latitude: float
    gps_longitude: float

@router.post("/data")
async def receive_sensor_data(data: SensorData):
    """
    Receive real-time sensor data from vehicle
    """
    print(f"Received data from {data.vehicle_id}: Speed={data.speed}")
    return {
        "status": "received",
        "vehicle_id": data.vehicle_id,
        "timestamp": data.timestamp
    }

@router.get("/status/{vehicle_id}")
async def get_sensor_status(vehicle_id: str):
    """
    Get current sensor status for a vehicle
    """
    return {
        "vehicle_id": vehicle_id,
        "status": "connected",
        "last_update": datetime.now()
    }
