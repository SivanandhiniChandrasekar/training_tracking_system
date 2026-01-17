from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List



from app.database import SessionLocal
from app import models, schemas
from app.core.security import hash_password
from app.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

# ---------- DB DEPENDENCY ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- CREATE USER ----------
@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # 🔒 Prevent duplicate email
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# ---------- LIST USERS ----------
@router.get("/", response_model=List[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# ---------- CURRENT USER ----------
@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user
