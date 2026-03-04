from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.rules import TriageRule
from app.services.ai_rule_service import generate_rule_from_prompt

router = APIRouter(prefix="/rules", tags=["Rules"])


@router.get("/")
def get_rules(db: Session = Depends(get_db)):
    return db.query(TriageRule).all()


@router.post("/agent")
def ai_rule_agent(data: dict, db: Session = Depends(get_db)):

    prompt = data.get("prompt")

    rule_data = generate_rule_from_prompt(prompt)

    rule = TriageRule(
        parameter=rule_data["parameter"],
        operator=rule_data["operator"],
        threshold=rule_data["threshold"],
        category=rule_data["category"],
        ward=rule_data["ward"]
    )

    db.add(rule)
    db.commit()
    db.refresh(rule)

    return {
        "message": "Rule created successfully",
        "rule": rule_data
    }