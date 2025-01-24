from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[int] = None

class ResetPassword(BaseModel):
    email: str

class ChangePassword(BaseModel):
    token: str
    new_password: str
    confirm_password: str
