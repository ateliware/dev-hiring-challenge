import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, create_engine, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

Base = declarative_base()

class Repository(Base):
    __tablename__ = 'repository'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    repository_data = relationship('Repository_Data_info', back_populates="repository")

    def __init__(self, name):
        self.name = name

class Repository_Data_info(Base):
    __tablename__ = 'repository_data_info'
    id = Column(Integer, primary_key = True)
    detail_id = Column(Integer, nullable = False)
    name = Column(String(255))
    description = Column(String(5000), nullable = False)
    url_repository = Column(String(255), nullable = False)
    repository_id = Column(Integer, ForeignKey('repository.id', ondelete='CASCADE'))
    repository = relationship(Repository, lazy='subquery', backref=backref('repository_data_info', cascade='all,delete'))

    def __init__(self, detail_id, name, description, url_repository, repository_id):
        self.detail_id = detail_id
        self.name = name
        self.description = description
        self.url_repository = url_repository
        self.repository_id = repository_id

engine = create_engine('mysql://repositories:Qn6V73_68f~z@den1.mysql1.gear.host:3306/Repositories', echo=False)
Base.metadata.create_all(engine)
