# models.py    → defines the DB table structure (SQLAlchemy)
# schemas.py   → defines what data comes IN and goes OUT (Pydantic)

# UserCreate   → shape of data we RECEIVE  (POST request body)
# UserResponse → shape of data we SEND     (API response)

from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    city: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    city: Optional[str] = None

    class Config:
        from_attributes = True