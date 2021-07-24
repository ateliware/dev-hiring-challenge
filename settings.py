import os
SECRET_KEY = os.getenv( 'APP_SECRET_KEY' )
DB_HOST = os.environ.get( 'DB_HOST' )
DB_USERNAME = os.environ.get( 'DB_USERNAME' )
DB_PASSWORD = os.environ.get( 'DB_PASSWORD' )
DB_NAME = os.environ.get( 'DB_NAME' )
DB_URI = 'postgresql://%s:%s@%s:5432/%s' % ( DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME )
SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = True
