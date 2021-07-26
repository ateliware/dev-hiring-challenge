from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 

db = SQLAlchemy()

def create_app(**config_overrides):
   app = Flask(__name__)
    
   app.config.from_pyfile( 'settings.py' )
   app.config.update( config_overrides )
    
   db.init_app( app )
   migrate = Migrate( app, db )
    
   from controllers.repository_search import repositories
   app.register_blueprint( repositories )
    
   return app

if __name__ == "__main__":
   app = create_app()
   app.run( host='0.0.0.0', port=5000 )
