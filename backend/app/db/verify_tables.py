from sqlalchemy import inspect
from app.db.database import engine, SessionLocal
from app.models.base import Base
from app.models.user import User
from app.models.coupon import Coupon, DrawResult
from app.core.config import settings
from app.db.init_db import init_db

def verify_tables(force_recreate=False):
    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()
    
    print("Checking database tables...")
    print(f"Found tables: {existing_tables}")
    
    if force_recreate:
        print("Force recreating all tables...")
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
        print("Tables recreated successfully")
    else:
        required_tables = ['users', 'coupons', 'draw_results']
        missing_tables = [table for table in required_tables if table not in existing_tables]
        
        if missing_tables:
            print(f"Missing tables: {missing_tables}")
            print("Creating all tables...")
            Base.metadata.create_all(bind=engine)
            print("Tables created successfully")
        else:
            print("All required tables exist")
    
    # Initialize admin user
    db = SessionLocal()
    init_db(db)
    db.close()

if __name__ == "__main__":
    verify_tables(force_recreate=True)
