from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models
from app.utils.email import (
    send_certificate_expiry_reminder,
    send_certificate_expired_email
)

REMINDER_DAYS = 30


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# JOB 1: Expiry Reminder
# -----------------------------
def certificate_expiry_reminder_job():
    db: Session = next(get_db())

    reminder_date = datetime.utcnow() + timedelta(days=REMINDER_DAYS)

    certificates = db.query(models.Certificate).filter(
        models.Certificate.expiry_date.date() == reminder_date.date()
    ).all()

    for cert in certificates:
        user = db.query(models.User).get(cert.user_id)
        course = db.query(models.Course).get(cert.course_id)

        send_certificate_expiry_reminder(
            to_email=user.email,
            user_name=user.name,
            course_name=course.title,
            expiry_date=cert.expiry_date
        )


# -----------------------------
# JOB 2: Expired Certificates
# -----------------------------
def certificate_expired_job():
    db: Session = next(get_db())

    now = datetime.utcnow()

    certificates = db.query(models.Certificate).filter(
        models.Certificate.expiry_date < now
    ).all()

    for cert in certificates:
        user = db.query(models.User).get(cert.user_id)
        course = db.query(models.Course).get(cert.course_id)

        send_certificate_expired_email(
            to_email=user.email,
            user_name=user.name,
            course_name=course.title
        )
