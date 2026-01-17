from pydantic import BaseModel

class EnrollmentCreate(BaseModel):
    course_id: int


class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    completed: bool

    class Config:
        from_attributes = True
