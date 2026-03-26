from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBAttendance, DBUser
from schemas import AttendanceBatch
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/attendance", tags=["attendance"])

@router.post("/batch")
def submit_attendance(batch: AttendanceBatch, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    for record in batch.records:
        # Check if exists
        existing = db.query(DBAttendance).filter(
            DBAttendance.student_id == record.student_id,
            DBAttendance.group_id == batch.group_id,
            DBAttendance.date == batch.date
        ).first()
        
        if existing:
            existing.status = record.status
        else:
            new_record = DBAttendance(
                student_id=record.student_id,
                group_id=batch.group_id,
                date=batch.date,
                status=record.status
            )
            db.add(new_record)
    db.commit()
    return {"message": "Attendance saved successfully"}
