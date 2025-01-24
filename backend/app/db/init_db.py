from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.user import User
from app.core import security
import logging

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    # Create admin user if it doesn't exist
    logger.info(f"Checking for admin user: {settings.ADMIN_EMAIL}")
    admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
    if not admin:
        logger.info("Admin user not found, creating...")
        admin = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=security.get_password_hash(settings.ADMIN_PASSWORD),
            is_superuser=True,
            is_active=True
        )
        db.add(admin)
        db.commit()
        logger.info(f"Created admin user: {settings.ADMIN_EMAIL}")
    else:
        logger.info("Admin user already exists")
