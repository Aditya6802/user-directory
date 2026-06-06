from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from logger import get_logger

logger = get_logger(__name__)

def get_all_users(db: Session):
    logger.info("Fetching all the users from the Database")
    users = db.query(User).all()
    logger.info(f"Found {len(users)} users")
    return users

def create_user(db: Session, user: UserCreate):
    logger.info(f"Creating new user with name: {user.name}")
    new_user = User(
        name = user.name,
        email = user.email,
        city = user.city
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    logger.info(f"User created successfully with id: {new_user.id}")
    return new_user

def delete_user(db: Session, user_id: int):
    logger.info("Deleteing user with id: {user_id}")
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        logger.info(f"User with id: {user_id} deleted successfully")
    else:
        logger.warning(f"User with id: {user_id} not found in database")
    return user
