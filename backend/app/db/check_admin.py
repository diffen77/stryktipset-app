from app.db.database import SessionLocal
from app.models.user import User
from app.core.config import settings

def check_admin():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if admin:
            print(f"Admin user exists: {admin.email}")
            print(f"Is superuser: {admin.is_superuser}")
            print(f"Is active: {admin.is_active}")
            print(f"Role: {admin.role}")
            print(f"Status: {admin.status}")
        else:
            print("Admin user does not exist")
    finally:
        db.close()

if __name__ == "__main__":
    check_admin()
