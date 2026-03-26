from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBCourse, DBUser
from schemas import Course, CourseCreate
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/courses", tags=["courses"])

@router.get("", response_model=List[Course])
def get_courses(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBCourse).filter(DBCourse.deleted_at == None).all()

@router.post("", response_model=Course)
def create_course(course: CourseCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_course = DBCourse(
        title=course.title,
        description=course.description,
        teacher_id=course.teacher_id,
        status=course.status
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.put("/{course_id}", response_model=Course)
def update_course(course_id: str, course: CourseCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_course = db.query(DBCourse).filter(DBCourse.id == course_id, DBCourse.deleted_at == None).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db_course.title = course.title
    db_course.description = course.description
    db_course.teacher_id = course.teacher_id
    db_course.status = course.status
    
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/{course_id}")
def delete_course(course_id: str, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_course = db.query(DBCourse).filter(DBCourse.id == course_id, DBCourse.deleted_at == None).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db_course.deleted_at = datetime.datetime.utcnow()
    db.commit()
    return {"message": "Course deleted"}
