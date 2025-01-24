from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ....api import deps
from ....core.security import get_password_hash
from ....schemas import user as user_schema
from ....models.user import User, UserStatus, UserRole

router = APIRouter()

@router.post("/register", response_model=user_schema.User)
def register_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: user_schema.UserCreate,
) -> Any:
    """Register new user."""
    if user_in.password != user_in.password_confirm:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match",
        )
    
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    user = User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=get_password_hash(user_in.password),
        is_active=True,
        is_superuser=False,
        role=UserRole.USER,
        status=UserStatus.ACTIVE
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
