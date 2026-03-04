from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.ai_hospital_insights import generate_hospital_insights

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/hospital-insights")

def hospital_insights(db: Session = Depends(get_db)):

    insights = generate_hospital_insights(db)

    return {
        "insights": insights
    }