from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from database import SessionLocal
from models import DBUser
from schemas import LoginRequest, AuthResponse, RefreshRequest, User
from security import verify_password, create_access_token, SECRET_KEY, ALGORITHM
from dependencies import get_db, get_current_user
import jwt

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.email == req.email, DBUser.deleted_at == None).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.id}, expires_delta=timedelta(hours=24))
    return {
        "user": {
            "id": user.id, "email": user.email, "full_name": user.full_name, 
            "role": user.role, "avatar": user.avatar
        },
        "access_token": access_token,
        "refresh_token": "mock-refresh"
    }

@router.post("/refresh")
def refresh_token(req: RefreshRequest, db: Session = Depends(get_db)):
    if req.refresh_token == "mock-refresh":
        access_token = create_access_token(data={"sub": "1"}, expires_delta=timedelta(hours=24))
        return {"access_token": access_token, "refresh_token": "mock-refresh"}
    raise HTTPException(status_code=401, detail="Invalid refresh token")

@router.get("/me", response_model=User)
def get_me(current_user: DBUser = Depends(get_current_user)):
    return current_user
