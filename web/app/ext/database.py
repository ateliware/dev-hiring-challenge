from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import create_database, database_exists

db = SQLAlchemy()

def init_app(app):
    url = app.config.get('SQLALCHEMY_DATABASE_URI') 
    if not database_exists(url):
        create_database(url)  
          
    db.init_app(app)

