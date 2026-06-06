from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dao.database import get_db
from schemas import UserCreate, UserResponse
from services import user_service
from logger import get_logger

logger = get_logger(__name__)

router = APIRouter()

@router.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    logger.info("GET /users called")
    return user_service.get_all_users(db)

@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"POST /user called with name: {user.name}")
    return user_service.cerate_user(db, user)

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    logger.info(f"DELETE /users/{user_id} called")
    return user_service.delete_user(db, user_id)