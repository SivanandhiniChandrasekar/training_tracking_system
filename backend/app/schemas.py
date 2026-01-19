from pydantic import BaseModel

class VideoCreate(BaseModel):
    title: str
    url: str
