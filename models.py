from app import db
from datetime import datetime

class RepositoryModel(db.Model):
    
    __tablename__ = 'github'

    repo_id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __init__(self, repo_id, name):
        self.repo_id = repo_id
        self.name = name

    def __repr__(self):
        return f'<repo_id:{self.repo_id} name:{self.name}>'

    def serialize(self):
        return {"repo_id": self.repo_id,
                "name": self.name}
