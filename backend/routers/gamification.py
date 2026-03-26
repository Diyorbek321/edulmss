from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBReward, DBUser, DBStudent
from schemas_extra import Reward, RewardCreate, CoinTransaction
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/gamification", tags=["gamification"])

@router.get("/rewards", response_model=List[Reward])
def get_rewards(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBReward).all()

@router.post("/rewards", response_model=Reward)
def create_reward(reward: RewardCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_reward = DBReward(
        name=reward.name,
        cost_coins=reward.cost_coins,
        stock=reward.stock
    )
    db.add(db_reward)
    db.commit()
    db.refresh(db_reward)
    return db_reward

@router.post("/coins")
def add_deduct_coins(transaction: CoinTransaction, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    student = db.query(DBStudent).filter(DBStudent.id == transaction.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
        
    student.coins += transaction.amount
    db.commit()
    return {"message": "Coins updated successfully", "new_balance": student.coins}
