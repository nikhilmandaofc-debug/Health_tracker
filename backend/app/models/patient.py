from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Patient(Base):

    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    age = Column(Integer)
    gender = Column(String)

    doctor = Column(String)
    ward = Column(String)

    heart_rate = Column(Integer)
    oxygen_level = Column(Integer)
    temperature = Column(Integer)
    blood_pressure = Column(Integer)

    severity = Column(String)
    status = Column(String, default="Admitted")