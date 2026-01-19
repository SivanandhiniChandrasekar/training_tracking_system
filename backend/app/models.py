from sqlalchemy import Column, Integer, String
from app.database import Base

class CourseVideo(Base):
    __tablename__ = "course_videos"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(String, index=True)
    title = Column(String)
    url = Column(String)
