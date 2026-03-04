from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.patient import Patient
from app.services.triage_service import evaluate_patient

router = APIRouter()


@router.post("/triage")
def triage_patient(data: dict, db: Session = Depends(get_db)):

    # -----------------------------
    # Extract Patient Info
    # -----------------------------
    name = data.get("name", "")
    age = int(data.get("age") or 0)
    gender = data.get("gender", "")

    heart_rate = int(data.get("heart_rate") or 0)
    oxygen_level = int(data.get("oxygen_level") or 0)
    temperature = float(data.get("temperature") or 0)
    blood_pressure = data.get("blood_pressure", "")

    vitals = {
        "heart_rate": heart_rate,
        "oxygen_level": oxygen_level,
        "temperature": temperature
    }

    # -----------------------------
    # Evaluate Rules
    # -----------------------------
    result = evaluate_patient(db, vitals)

    severity = result["severity"]
    ward = result["ward"]
    doctor = result["doctor"]
    reasons = result["reasons"]

    # -----------------------------
    # Save Patient
    # -----------------------------
    patient = Patient(
        name=name,
        age=age,
        gender=gender,

        heart_rate=heart_rate,
        oxygen_level=oxygen_level,
        temperature=temperature,
        blood_pressure=blood_pressure,

        severity=severity,
        ward=ward,
        doctor=doctor,

        status="Admitted"
    )

    db.add(patient)
    db.commit()

    # -----------------------------
    # Response
    # -----------------------------
    return {
        "severity": severity,
        "ward": ward,
        "doctor": doctor,
        "reasons": reasons
    }


@router.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return patients


@router.put("/patients/{patient_id}/status")
def update_status(patient_id: int, status: str, db: Session = Depends(get_db)):

    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        return {"error": "Patient not found"}

    patient.status = status
    db.commit()

    return {"message": "Status updated"}