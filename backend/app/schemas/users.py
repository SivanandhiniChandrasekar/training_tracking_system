from pydantic import BaseModel

# -------------------------
# REQUEST SCHEMA
# -------------------------
class UserCreate(BaseModel):
    name: str
    email: str
    password: str


# -------------------------
# RESPONSE SCHEMA
# -------------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    
    class Config:
        from_attributes = True
