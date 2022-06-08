from pydantic import BaseModel


class Base(BaseModel):
    class Config(BaseModel.Config):
        orm_mode = True
