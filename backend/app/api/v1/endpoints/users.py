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

@router.get("/me", response_model=user_schema.User)
def read_user_me(
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Get current user."""
    return current_user

@router.put("/me", response_model=user_schema.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    user_in: user_schema.UserUpdate,
) -> Any:
    """Update current user."""
    if user_in.email and user_in.email != current_user.email:
        if db.query(User).filter(User.email == user_in.email).first():
            raise HTTPException(
                status_code=400,
                detail="Email already registered",
            )
    
    if user_in.name is not None:
        current_user.name = user_in.name
    if user_in.email is not None:
        current_user.email = user_in.email
    if user_in.password is not None:
        current_user.hashed_password = get_password_hash(user_in.password)
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
