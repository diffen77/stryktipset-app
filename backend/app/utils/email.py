from typing import Any, Dict, Optional
import logging

logger = logging.getLogger(__name__)

async def send_email(
    email_to: str,
    subject_template: str = "",
    html_template: str = "",
    environment: Dict[str, Any] = {},
) -> bool:
    """Mock email sending function that just logs the email."""
    logger.info(f"Would send email to {email_to}")
    logger.info(f"Subject: {subject_template}")
    logger.info(f"Content: {html_template}")
    return True

async def send_reset_password_email(email_to: str, token: str, username: str) -> bool:
    """Send password reset email to user."""
    subject = "Password recovery"
    
    html_template = f"""
        <p>Password Reset</p>
        <p>Hi {username},</p>
        <p>You have requested to reset your password. Please use the following token to reset your password:</p>
        <p>{token}</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Thanks,</p>
        <p>The team</p>
    """
    
    return await send_email(
        email_to=email_to,
        subject_template=subject,
        html_template=html_template
    )