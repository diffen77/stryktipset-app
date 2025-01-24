from sqlalchemy import Boolean, Column, String, Integer, DateTime, ForeignKey, JSON, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)
    draw_number = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    picks = Column(JSON, nullable=False)  # Store picks as JSON: {"1": ["1"], "2": ["1", "X"], ...}
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    paid = Column(Boolean, default=False)
    payment_amount = Column(Numeric(10, 2), default=50.00)
    correct_picks = Column(Integer, default=0)
    prize_amount = Column(Numeric(10, 2), nullable=True)
    
    # Relationships
    user = relationship("User", backref="coupons")

class DrawResult(Base):
    __tablename__ = "draw_results"

    id = Column(Integer, primary_key=True, index=True)
    draw_number = Column(Integer, nullable=False, unique=True)
    results = Column(JSON, nullable=True)  # Store results as JSON
    live_results = Column(JSON, nullable=True)  # Store live results as JSON
    reg_close_time = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, nullable=False)  # Open, Closed, Live, Finished
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
