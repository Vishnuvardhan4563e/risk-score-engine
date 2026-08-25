from fastapi import FastAPI
from pydantic import BaseModel
from models.risk_scorer import risk_scorer
from models.root_cause_classifier import classifier
from models.severity_grader import grader
import uvicorn

app = FastAPI(
    title="ML API",
    description="Machine Learning Model APIs for Risk Scoring",
    version="1.0.0"
)

class PredictionRequest(BaseModel):
    speed: float
    acceleration: float
    steering_angle: float
    lane_deviation: float
    weather_condition: str = "clear"

@app.post("/predict-risk")
async def predict_risk(request: PredictionRequest):
    """
    Predict accident risk and classify root cause
    """
    # Get risk score
    risk_score = risk_scorer.predict_risk(
        request.speed,
        request.acceleration,
        request.steering_angle,
        request.lane_deviation
    )
    
    # Classify root cause
    root_cause = classifier.classify(
        request.speed,
        request.acceleration,
        request.steering_angle,
        request.lane_deviation,
        request.weather_condition
    )
    
    # Grade severity
    severity = grader.grade_severity(risk_score, request.speed, request.acceleration)
    
    return {
        "risk_score": round(risk_score, 3),
        "root_cause": root_cause,
        "severity": severity,
        "priority": grader.get_priority(severity),
        "confidence": 0.92
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ML API running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
