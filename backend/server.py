from fastapi import FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
import dependencies

# Import routes
from routes_public import router as public_router
from routes_admin import router as admin_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Set database in dependencies
dependencies.set_db(db)

# Create the main app
app = FastAPI(
    title="BUMDes Desa Sale API",
    description="API for BUMDes Desa Sale Management System",
    version="1.0.0"
)

# Include routers
app.include_router(public_router)
app.include_router(admin_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.get("/")
async def root():
    return {
        "message": "BUMDes Desa Sale API",
        "version": "1.0.0",
        "status": "running"
    }

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()