from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Resource(Base):

    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)       # Oxygen, ICU Beds, Ventilator

    total = Column(Integer)     # total capacity

    used = Column(Integer)      # used capacity