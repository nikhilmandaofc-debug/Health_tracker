from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.ward import Ward

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/wards")
def get_wards(db: Session = Depends(get_db)):
    return db.query(Ward).all()


@router.post("/wards")
def create_ward(data: dict, db: Session = Depends(get_db)):

    ward = Ward(name=data["name"])
    db.add(ward)
    db.commit()
    db.refresh(ward)

    return ward