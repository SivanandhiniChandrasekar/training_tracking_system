from datetime import datetime
from pydantic import BaseModel
from typing import Optional


# ---------- REQUEST ----------
class CertificateCreate(BaseModel):
    course_id: int


# ---------- INTERNAL / GENERIC RESPONSE ----------
class CertificateResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    issued_at: Optional[datetime]
    certificate_code: Optional[str]

    class Config:
        from_attributes = True


# ---------- USER CERTIFICATE LIST (/certificates/me) ----------
class CertificateMeResponse(BaseModel):
    id: int
    course_id: int
    course_title: str
    issued_at: Optional[datetime]
    download_url: str

class CertificateValidityResponse(BaseModel):
    certificate_code: str
    is_valid: bool
    issued_at: datetime
    expiry_date: datetime
    reason: str