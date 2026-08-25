from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/incidents", tags=["Incidents"])

class Incident(BaseModel):
    vehicle_id: str
    timestamp: datetime
    severity: str
    root_cause: str
    description: str

@router.get("/list/{vehicle_id}")
async def get_incidents(vehicle_id: str):
    """
    Get all incidents for a vehicle
    """
    return {
        "vehicle_id": vehicle_id,
        "incidents": []
    }

@router.post("/create")
async def create_incident(incident: Incident):
    """
    Create new incident record
    """
    return {
        "status": "created",
        "incident": incident
    }
