from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Doctor(Base):

    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    ward = Column(String)

    # used for AI load balancing
    active_patients = Column(Integer, default=0)