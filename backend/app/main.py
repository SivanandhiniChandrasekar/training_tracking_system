from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.courses import router as courses_router
from app.routes.certificates import router as certificates_router
from app.routes.enrollments import router as enrollments_router
from apscheduler.schedulers.background import BackgroundScheduler

# -------------------------------
# CREATE DB TABLES
# -------------------------------
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Certificate Generation System")


# -------------------------------
# CORS CONFIG (🔥 FIXED)
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# -------------------------------
# ROUTERS
# -------------------------------
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(courses_router)
app.include_router(certificates_router)
app.include_router(enrollments_router)


# -------------------------------
# HEALTH CHECK
# -------------------------------
@app.get("/")
def root():
    return {"message": "Backend running"}

@app.get("/health")
def health():
    return {"status": "OK"}

from app.core.certificate_cron import (
    certificate_expiry_reminder_job,
    certificate_expired_job
)

scheduler = BackgroundScheduler()

scheduler.add_job(
    certificate_expiry_reminder_job,
    "cron",
    hour=9
)

scheduler.add_job(
    certificate_expired_job,
    "cron",
    hour=10
)

scheduler.start()