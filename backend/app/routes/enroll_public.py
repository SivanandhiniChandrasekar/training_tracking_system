from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(tags=["Enroll"])

# @router.post("/enroll", response_model=schemas.EnrollmentResponse)
# def enroll_course_query(
#     employee_id: int,
#     course_id: int,
#     db: Session = Depends(get_db)
# ):
#     new_enroll = models.Enrollment(
#         user_id=employee_id,
#         course_id=course_id
#     )
#     db.add(new_enroll)
#     db.commit()
#     db.refresh(new_enroll)
#     return new_enroll
