from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()
# If you want to change something in the models, you can do it here.
# For applying the changes to the database, you need to create a new migration.
# This is done with alembic. You can find more information in the official documentation. https://alembic.sqlalchemy.org/en/latest/

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)