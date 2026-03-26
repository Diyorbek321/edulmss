from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import DBStudent, DBTeacher, DBCourse, DBGroup, DBUser
from schemas import Stats
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])

@router.get("/stats", response_model=Stats)
def get_stats(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return {
        "total_students": db.query(DBStudent).filter(DBStudent.deleted_at == None).count(),
        "total_teachers": db.query(DBTeacher).filter(DBTeacher.deleted_at == None).count(),
        "total_courses": db.query(DBCourse).filter(DBCourse.deleted_at == None).count(),
        "active_groups": db.query(DBGroup).filter(DBGroup.status == "ACTIVE", DBGroup.deleted_at == None).count()
    }
