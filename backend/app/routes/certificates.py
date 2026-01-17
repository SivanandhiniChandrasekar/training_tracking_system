from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import uuid
from datetime import datetime

from app.dependencies import get_current_user
from app.database import get_db
from app import models, schemas
from app.utils.certificate_pdf import generate_certificate_pdf
from app.utils.email import send_certificate_email

router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"]
)

# ---------------------------------
# 1️⃣ GENERATE CERTIFICATE
# POST /certificates/generate
# ---------------------------------
@router.post("/generate", response_model=schemas.CertificateResponse)
def generate_certificate(
    cert: schemas.CertificateCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # ✅ Check enrollment
    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == cert.course_id
    ).first()

    if not enrollment:
        raise HTTPException(
            status_code=400,
            detail="User is not enrolled in this course"
        )

    # ✅ Auto mark completed
    enrollment.completed = True
    db.commit()

    # ✅ Prevent duplicate certificate
    existing = db.query(models.Certificate).filter(
        models.Certificate.user_id == current_user.id,
        models.Certificate.course_id == cert.course_id
    ).first()

    if existing:
        return existing

    # ✅ Create certificate record
    certificate = models.Certificate(
        user_id=current_user.id,
        course_id=cert.course_id,
        issued_at=datetime.utcnow(),
        certificate_code=str(uuid.uuid4())
    )

    db.add(certificate)
    db.commit()
    db.refresh(certificate)

    # ✅ Get course
    course = db.query(models.Course).filter(
        models.Course.id == cert.course_id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # ✅ Generate PDF
    file_path = generate_certificate_pdf(
        certificate_id=certificate.id,
        user_name=current_user.name,
        course_name=course.title
    )

    # ✅ Send email with PDF (CORRECT PLACE ✅)
    send_certificate_email(
        to_email=current_user.email,
        user_name=current_user.name,
        course_name=course.title,
        pdf_path=file_path
    )

    return certificate


# ---------------------------------
# 2️⃣ GET MY CERTIFICATES
# GET /certificates/me
# ---------------------------------
@router.get(
    "/me",
    response_model=list[schemas.CertificateMeResponse]
)
def get_my_certificates(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    results = (
        db.query(
            models.Certificate.id,
            models.Certificate.course_id,
            models.Course.title.label("course_title"),
            models.Certificate.issued_at
        )
        .join(models.Course, models.Course.id == models.Certificate.course_id)
        .filter(models.Certificate.user_id == current_user.id)
        .all()
    )

    return [
        {
            "id": cert.id,
            "course_id": cert.course_id,
            "course_title": cert.course_title,
            "issued_at": cert.issued_at,
            "download_url": f"http://127.0.0.1:8000/certificates/{cert.id}/download",
        }
        for cert in results
    ]


# ---------------------------------
# 3️⃣ DOWNLOAD CERTIFICATE
# GET /certificates/{id}/download
# ---------------------------------
@router.get("/{certificate_id}/download")
def download_certificate(
    certificate_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    certificate = db.query(models.Certificate).filter(
        models.Certificate.id == certificate_id,
        models.Certificate.user_id == current_user.id
    ).first()

    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")

    user = db.query(models.User).filter(
        models.User.id == certificate.user_id
    ).first()

    course = db.query(models.Course).filter(
        models.Course.id == certificate.course_id
    ).first()

    if not user or not course:
        raise HTTPException(status_code=404, detail="User or Course not found")

    file_path = generate_certificate_pdf(
        certificate_id=certificate.id,
        user_name=user.name,
        course_name=course.title
    )

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=f"certificate_{certificate.id}.pdf"
    )
