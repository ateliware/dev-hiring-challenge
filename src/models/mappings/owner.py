from sqlalchemy import Column, String
from src.models.mappings.base import BaseMapping
from sqlalchemy.orm import relationship


class Owner(BaseMapping):
    login = Column(String)
    avatar_url = Column(String)
    html_url = Column(String)
    repository = relationship("Repository", back_populates="owner")

