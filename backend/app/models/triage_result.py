from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base


class TriageResult(Base):

    __tablename__ = "triage_results"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))

    category = Column(String)

    ai_reasoning = Column(String)