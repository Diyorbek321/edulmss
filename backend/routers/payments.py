from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBPayment, DBUser, DBStudent
from schemas_extra import Payment, PaymentCreate
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/payments", tags=["payments"])

@router.get("", response_model=List[Payment])
def get_payments(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBPayment).filter(DBPayment.deleted_at == None).all()

@router.post("", response_model=Payment)
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_payment = DBPayment(
        student_id=payment.student_id,
        amount=payment.amount,
        status=payment.status
    )
    db.add(db_payment)
    
    # Update student balance
    student = db.query(DBStudent).filter(DBStudent.id == payment.student_id).first()
    if student and payment.status == "SUCCESS":
        student.balance += payment.amount
        
    db.commit()
    db.refresh(db_payment)
    return db_payment
