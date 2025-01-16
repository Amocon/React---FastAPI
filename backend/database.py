from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# This would be for example an auroraDB and we get the info with boto3
# SQLite database URL for demonstration:
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)