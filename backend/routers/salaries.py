from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBSalary, DBUser, DBTeacher
from schemas_extra import Salary, SalaryCreate
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/salaries", tags=["salaries"])

@router.get("", response_model=List[Salary])
def get_salaries(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBSalary).all()

@router.post("", response_model=Salary)
def create_salary(salary: SalaryCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    # Salary Snapshotting Rule
    teacher = db.query(DBTeacher).filter(DBTeacher.id == salary.teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
        
    db_salary = DBSalary(
        teacher_id=salary.teacher_id,
        month=salary.month,
        year=salary.year,
        amount=salary.amount,
        hourly_rate_snapshot=teacher.hourly_rate, # Snapshot taken here
        status=salary.status
    )
    db.add(db_salary)
    db.commit()
    db.refresh(db_salary)
    return db_salary
