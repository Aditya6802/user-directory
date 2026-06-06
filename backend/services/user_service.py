from sqlalchemy.orm import Session
from repositories import user_repository
from schemas import UserCreate
from fastapi import HTTPException
from logger import get_logger

logger = get_logger(__name__)

def get_all_users(db: Session):
    logger.info("Executing get_all_users method")
    return user_repository.get_all_users(db)

def cerate_user(db: Session, user= UserCreate):
    logger.info("Executing creat_user method")
    return user_repository.create_user(db, user)

def delete_user(db: Session, user_id: int):
    logger.info(f"Executing delete_user method with id: {user_id}")
    user = user_repository.delete_user(db, user_id)
    if not user:
        logger.warning(f"User with id: {user_id} not found")
        raise HTTPException(status_code=404, detail="User not found")
    logger.info(f"User with id: {user_id} deleted successfully")
    return {"message: User deleted successfully"}
