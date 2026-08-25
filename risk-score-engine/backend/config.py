import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://dev:dev123@localhost:5432/risk_engine")
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    DEBUG = os.getenv("DEBUG", True)
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
