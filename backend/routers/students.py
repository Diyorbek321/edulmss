from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBStudent, DBUser
from schemas import Student, StudentCreate
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/students", tags=["students"])

@router.get("", response_model=List[Student])
def get_students(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBStudent).filter(DBStudent.deleted_at == None).all()

@router.post("", response_model=Student)
def create_student(student: StudentCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_student = DBStudent(
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        phone=student.phone,
        status=student.status,
        joined_date=datetime.datetime.utcnow().strftime("%Y-%m-%d")
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@router.put("/{student_id}", response_model=Student)
def update_student(student_id: str, student: StudentCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_student = db.query(DBStudent).filter(DBStudent.id == student_id, DBStudent.deleted_at == None).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db_student.first_name = student.first_name
    db_student.last_name = student.last_name
    db_student.email = student.email
    db_student.phone = student.phone
    db_student.status = student.status
    
    db.commit()
    db.refresh(db_student)
    return db_student

@router.delete("/{student_id}")
def delete_student(student_id: str, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_student = db.query(DBStudent).filter(DBStudent.id == student_id, DBStudent.deleted_at == None).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db_student.deleted_at = datetime.datetime.utcnow()
    db.commit()
    return {"message": "Student deleted"}
