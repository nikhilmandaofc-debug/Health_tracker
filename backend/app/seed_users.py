from app.db.database import SessionLocal
from app.models.user import User

db = SessionLocal()

admin = User(
    email="admin@hospital.com",
    password="admin123",
    role="admin"
)

manager = User(
    email="manager@hospital.com",
    password="manager123",
    role="manager"
)

db.add(admin)
db.add(manager)

db.commit()

print("Users inserted successfully!")