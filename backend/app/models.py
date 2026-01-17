from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey



# ---------- USERS ----------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)


# ---------- COURSES ----------
class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)


# ---------- ENROLLMENTS ----------
class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    status = Column(String(50))






# ---------- CERTIFICATES ----------


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    issue_date = Column(Date)
    expiry_date = Column(Date, nullable=True)
    certificate_code = Column(String(50), unique=True)

