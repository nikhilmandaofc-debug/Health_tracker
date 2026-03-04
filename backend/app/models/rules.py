from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base


class TriageRule(Base):

    __tablename__ = "triage_rules"

    id = Column(Integer, primary_key=True)

    parameter = Column(String)

    operator = Column(String)

    threshold = Column(Float)

    category = Column(String)

    ward = Column(String)