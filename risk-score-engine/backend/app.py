from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="Risk Score Engine API",
    description="AI-Powered Vehicle Risk Scoring System",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes when ready
# from routes import sensors, predictions, incidents
# app.include_router(sensors.router)
# app.include_router(predictions.router)
# app.include_router(incidents.router)

@app.get("/")
async def root():
    return {
        "message": "Risk Score Engine API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
