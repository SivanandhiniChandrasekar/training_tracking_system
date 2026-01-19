from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import course_videos
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(course_videos.router)
