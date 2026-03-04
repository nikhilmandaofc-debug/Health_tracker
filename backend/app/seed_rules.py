from app.db.database import SessionLocal
from app.models.rules import TriageRule

db = SessionLocal()

rules = [

    TriageRule(parameter="oxygen_level", operator="<", threshold=90, category="Critical"),

    TriageRule(parameter="heart_rate", operator=">", threshold=120, category="Critical"),

    TriageRule(parameter="temperature", operator=">", threshold=101, category="Moderate"),

]

db.add_all(rules)

db.commit()

print("Rules seeded")