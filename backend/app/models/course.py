from sqlalchemy import Column, Integer, String
from app.database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
