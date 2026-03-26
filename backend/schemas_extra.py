from pydantic import BaseModel
from typing import List

class PaymentCreate(BaseModel):
    student_id: str
    amount: float
    status: str

class Payment(PaymentCreate):
    id: str
    date: str
    class Config:
        from_attributes = True

class SalaryCreate(BaseModel):
    teacher_id: str
    month: int
    year: int
    amount: float
    hourly_rate_snapshot: float
    status: str

class Salary(SalaryCreate):
    id: str
    class Config:
        from_attributes = True

class RewardCreate(BaseModel):
    name: str
    cost_coins: int
    stock: int

class Reward(RewardCreate):
    id: str
    class Config:
        from_attributes = True

class CoinTransaction(BaseModel):
    student_id: str
    amount: int
    reason: str
