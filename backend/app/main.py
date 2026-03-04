from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.models import user
from app.models import patient
from app.models import vitals
from app.models import rules
from app.models import triage_result
from app.models import audit
from app.models.patient import Patient
from app.db.database import engine

from app.routers import auth_router
from app.routers import patient_router
from app.routers import rule_router
from app.routers import doctor_router
from app.routers import wards
from app.routers import ai_insights_router


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router.router)
app.include_router(patient_router.router)
app.include_router(rule_router.router)
app.include_router(doctor_router.router)
app.include_router(wards.router)
app.include_router(ai_insights_router.router)

# Create tables
user.Base.metadata.create_all(bind=engine)
Patient.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "AI Smart Triage Backend Running"}