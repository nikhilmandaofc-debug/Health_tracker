from app.db.database import engine
from app.models import user, patient, vitals, rules, triage_result, audit


def init_db():
    user.Base.metadata.create_all(bind=engine)