from pydantic import BaseModel

class ItemBase(BaseModel):
    name: str
    description: str | None = None

class ItemCreate(ItemBase):
    """Used when creating an Item."""
    pass

class ItemOut(ItemBase):
    """Used when reading or returning an Item."""
    id: int

    class Config:
        orm_mode = True
