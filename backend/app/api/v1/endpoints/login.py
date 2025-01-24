from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ....core import security
from ....core.config import settings
from ....api import deps
from ....schemas import token
from ....models.user import User
from ....utils.email import send_reset_password_email
import secrets

router = APIRouter()

@router.post("/login/access-token", response_model=token.Token)
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """OAuth2 compatible token login, get an access token for future requests."""
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400, detail="Incorrect email or password"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=400, detail="User is not active"
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/password-recovery/{email}")
def recover_password(email: str, db: Session = Depends(deps.get_db)) -> Any:
    """Password Recovery"""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    
    reset_token = secrets.token_urlsafe(32)
    user.reset_password_token = reset_token
    user.reset_password_expires = timedelta(hours=24)
    db.commit()
    
    send_reset_password_email(email=email, token=reset_token)
    
    return {"msg": "Password recovery email sent"}

@router.post("/reset-password/")
def reset_password(
    token_data: token.ChangePassword, db: Session = Depends(deps.get_db)
) -> Any:
    """Reset password"""
    if token_data.new_password != token_data.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match",
        )
    
    user = db.query(User).filter(
        User.reset_password_token == token_data.token
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid token",
        )
    
    user.hashed_password = security.get_password_hash(token_data.new_password)
    user.reset_password_token = None
    user.reset_password_expires = None
    db.commit()
    
    return {"msg": "Password updated successfully"}
