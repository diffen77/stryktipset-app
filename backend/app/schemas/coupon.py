from pydantic import BaseModel, validator
from typing import Dict, List, Optional
from datetime import datetime
from decimal import Decimal

class CouponBase(BaseModel):
    draw_number: int
    picks: Dict[str, List[str]]

    @validator('picks')
    def validate_picks(cls, v):
        for match_number, picks in v.items():
            if not match_number.isdigit() or int(match_number) < 1 or int(match_number) > 13:
                raise ValueError("Match number must be between 1 and 13")
            if not all(pick in ['1', 'X', '2'] for pick in picks):
                raise ValueError("Picks must be '1', 'X', or '2'")
            if len(picks) > 2:
                raise ValueError("Maximum 2 picks per match")
        
        double_picks = sum(1 for picks in v.values() if len(picks) == 2)
        if double_picks > 4:
            raise ValueError("Maximum 4 matches with double picks allowed")
        return v

class CouponCreate(CouponBase):
    pass

class CouponUpdate(BaseModel):
    paid: Optional[bool] = None
    correct_picks: Optional[int] = None
    prize_amount: Optional[Decimal] = None

class CouponInDBBase(CouponBase):
    id: int
    user_id: int
    created_at: datetime
    paid: bool
    payment_amount: Decimal
    correct_picks: int
    prize_amount: Optional[Decimal] = None

    class Config:
        from_attributes = True

class Coupon(CouponInDBBase):
    pass

class DrawResultBase(BaseModel):
    draw_number: int
    reg_close_time: datetime
    status: str
    results: Optional[Dict] = None
    live_results: Optional[Dict] = None

class DrawResultCreate(DrawResultBase):
    pass

class DrawResultUpdate(BaseModel):
    results: Optional[Dict] = None
    live_results: Optional[Dict] = None
    status: Optional[str] = None

class DrawResult(DrawResultBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
