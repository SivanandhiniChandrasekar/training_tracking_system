from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import VideoCreate
from app.models import CourseVideo

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

@router.post("/{course_id}/videos")
def add_video(course_id: str, video: VideoCreate, db: Session = Depends(get_db)):
    new_video = CourseVideo(
        course_id=course_id,
        title=video.title,
        url=video.url
    )
    db.add(new_video)
    db.commit()
    db.refresh(new_video)
    return new_video


@router.get("/{course_id}/videos")
def get_videos(course_id: str, db: Session = Depends(get_db)):
    return db.query(CourseVideo).filter(
        CourseVideo.course_id == course_id
    ).all()
