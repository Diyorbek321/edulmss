from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime

from database import SessionLocal
from models import DBGroup, DBUser
from schemas import Group, GroupCreate
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/groups", tags=["groups"])

@router.get("", response_model=List[Group])
def get_groups(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBGroup).filter(DBGroup.deleted_at == None).all()

@router.post("", response_model=Group)
def create_group(group: GroupCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_group = DBGroup(
        name=group.name,
        course_id=group.course_id,
        schedule=group.schedule,
        status=group.status
    )
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

@router.put("/{group_id}", response_model=Group)
def update_group(group_id: str, group: GroupCreate, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_group = db.query(DBGroup).filter(DBGroup.id == group_id, DBGroup.deleted_at == None).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    db_group.name = group.name
    db_group.course_id = group.course_id
    db_group.schedule = group.schedule
    db_group.status = group.status
    
    db.commit()
    db.refresh(db_group)
    return db_group

@router.delete("/{group_id}")
def delete_group(group_id: str, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    db_group = db.query(DBGroup).filter(DBGroup.id == group_id, DBGroup.deleted_at == None).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    db_group.deleted_at = datetime.datetime.utcnow()
    db.commit()
    return {"message": "Group deleted"}
