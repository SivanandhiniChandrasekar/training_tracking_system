from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ---------- USERS ----------
class UserCreate(BaseModel):
    name: str
    email: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


# ---------- COURSES ----------
class CourseCreate(BaseModel):
    title: str
    description: str


class CourseResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True


# ---------- ENROLLMENTS ----------
class EnrollmentCreate(BaseModel):
    user_id: int
    course_id: int


class EnrollmentComplete(BaseModel):
    enrollment_id: int


class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


# ---------- CERTIFICATES ----------
class CertificateCreate(BaseModel):
    user_id: int
    course_id: int


class CertificateResponse(BaseModel):
    id: int
    course_id: int
    course_title: str
    issued_at: datetime
    download_url: str

    class Config:
        from_attributes = True

