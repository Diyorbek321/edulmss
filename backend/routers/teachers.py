from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBTeacher, DBUser
from schemas import Teacher, TeacherCreate
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/teachers", tags=["teachers"])

@router.get("", response_model=List[Teacher])
def get_teachers(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBTeacher).filter(DBTeacher.deleted_at == None).all()

@router.post("", response_model=Teacher)
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_teacher = DBTeacher(
        first_name=teacher.first_name,
        last_name=teacher.last_name,
        email=teacher.email,
        subject=teacher.subject,
        status=teacher.status,
        base_salary=teacher.base_salary,
        hourly_rate=teacher.hourly_rate
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

@router.put("/{teacher_id}", response_model=Teacher)
def update_teacher(teacher_id: str, teacher: TeacherCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_teacher = db.query(DBTeacher).filter(DBTeacher.id == teacher_id, DBTeacher.deleted_at == None).first()
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    db_teacher.first_name = teacher.first_name
    db_teacher.last_name = teacher.last_name
    db_teacher.email = teacher.email
    db_teacher.subject = teacher.subject
    db_teacher.status = teacher.status
    db_teacher.base_salary = teacher.base_salary
    db_teacher.hourly_rate = teacher.hourly_rate
    
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

@router.delete("/{teacher_id}")
def delete_teacher(teacher_id: str, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_teacher = db.query(DBTeacher).filter(DBTeacher.id == teacher_id, DBTeacher.deleted_at == None).first()
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    db_teacher.deleted_at = datetime.datetime.utcnow()
    db.commit()
    return {"message": "Teacher deleted"}
