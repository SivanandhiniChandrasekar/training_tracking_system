from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext

# ================= CONFIG =================
SECRET_KEY = "supersecretkey"  # ⚠️ move to env later
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# =========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# ================= PASSWORD =================

def hash_password(password: str) -> str:
    # bcrypt hard limit = 72 bytes
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_password = plain_password[:72]
    return pwd_context.verify(plain_password, hashed_password)

# ================= TOKEN ====================

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
