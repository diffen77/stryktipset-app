from pydantic_settings import BaseSettings
from typing import Optional, List
import secrets

class Settings(BaseSettings):
    PROJECT_NAME: str = "Stryktipset App"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:mysecretpassword@localhost:5432/stryktipset"
    
    # CORS
    BACKEND_CORS_ORIGINS: str = ""

    @property
    def BACKEND_CORS_ORIGINS_LIST(self) -> List[str]:
        if not self.BACKEND_CORS_ORIGINS:
            return []
        return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",")]
    
    # Email
    SMTP_TLS: bool = True
    SMTP_PORT: Optional[int] = None
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = None
    
    # Svenska Spel API
    SVENSKA_SPEL_API_URL: str = "https://api.spela.svenskaspel.se/draw/1/stryktipset/draws"
    
    # Admin User
    ADMIN_EMAIL: str = "diffen@me.com"
    ADMIN_PASSWORD: str = "Password8"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
