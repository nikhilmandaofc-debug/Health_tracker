from sqlalchemy import Column, Integer, Float, ForeignKey
from app.db.database import Base


class Vitals(Base):

    __tablename__ = "vitals"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))

    heart_rate = Column(Float)

    oxygen_level = Column(Float)

    blood_pressure = Column(Float)

    temperature = Column(Float)