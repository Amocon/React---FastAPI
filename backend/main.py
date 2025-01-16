from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from starlette import status
import models
import schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
# Create database tables if they do not exist.
# (Normally, for production, use Alembic migrations instead of .create_all)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",  # Sometimes you might use this too
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],     # or restrict to ["GET", "POST"] etc.
    allow_headers=["*"],
)

# Dependency: Get DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/items", response_model=schemas.ItemOut)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    """
    Create a new item in the database.
    """
    print(item)
    db_item = models.Item(name=item.name, description=item.description)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/{item_id}", response_model=schemas.ItemOut)
def read_item(item_id: int, db: Session = Depends(get_db)):
    """
    Read a single item by its ID.
    """
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not db_item:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Item not found"}
        )
    return db_item

@app.get("/items", response_model=list[schemas.ItemOut])
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Read multiple items with pagination (skip & limit).
    """
    items = db.query(models.Item).offset(skip).limit(limit).all()
    return items

@app.delete("/items/{item_id}", response_model=schemas.ItemOut)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """
    Delete an item by its ID.
    Returns the deleted item, or 404 if not found.
    """
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not db_item:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Item not found"}
        )
    # Delete from DB
    db.delete(db_item)
    db.commit()
    return db_item