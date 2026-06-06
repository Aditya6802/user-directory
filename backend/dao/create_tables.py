from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import sys

# Add backend/ to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from database import Base
from models import User

# Point to .env in backend/ folder
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

NEON_DATABASE_URL = os.getenv("NEON_DATABASE_URL")

# Debug - print the URL being used
print(f"Connecting to: {NEON_DATABASE_URL}")

engine = create_engine(NEON_DATABASE_URL)

Base.metadata.create_all(bind=engine)

print("Tables created on Neon successfully!")