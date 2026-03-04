from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Ward(Base):

    __tablename__ = "wards"

    id = Column(Integer, primary_key=True)

    name = Column(String)