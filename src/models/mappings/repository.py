from sqlalchemy import Column, ForeignKey, String, BigInteger
from src.models.mappings.base import BaseMapping
from sqlalchemy.orm import relationship


class Repository(BaseMapping):
    name = Column(String)
    full_name = Column(String)
    html_url = Column(String)
    language = Column(String)
    owner_id = Column(BigInteger, ForeignKey("owner.id"))
    owner = relationship("Owner", back_populates="repository")
