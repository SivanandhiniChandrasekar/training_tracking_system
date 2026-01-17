from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = (
    "mysql+pymysql://root:root%40123@localhost:3306/training_tracking_system"
)

# ✅ MySQL engine (NO check_same_thread)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True   # ✅ avoids stale connection errors
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
