from fastapi import APIRouter, HTTPException
from app.db.database import SessionLocal
from app.models.user import User

router = APIRouter()

@router.post("/login")
def login(data: dict):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data["email"],
        User.password == data["password"],
        User.role == data["role"]
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "role": user.role
    }