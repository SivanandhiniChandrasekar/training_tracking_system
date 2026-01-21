from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.course_videos import router as course_videos_router
from app.database import Base, engine

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Training & Course API")

# CORS (REQUIRED for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(course_videos_router)

# Root endpoint (prevents blank page)
@app.get("/")
def root():
    return {"status": "Backend running successfully"}
