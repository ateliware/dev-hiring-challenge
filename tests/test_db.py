import os
from flask_sqlalchemy import sqlalchemy

class TestDB:
    def __init__( self ):
        db_host = os.environ['DB_HOST']
        db_username = os.environ['DB_USERNAME']
        db_password = os.environ['DB_PASSWORD']
        self.db_name = os.environ['DB_NAME'] + '_test'
        self.db_uri = 'postgresql://%s:%s@%s:5432' % ( db_username, db_password, db_host )

    def create_db( self ):
        engine = sqlalchemy.create_engine( self.db_uri )
        conn = engine.connect()
        conn.execute( 'COMMIT' )
        conn.execute( 'CREATE DATABASE ' + self.db_name )
        conn.close()
        return self.db_uri + '/' + self.db_name

    def drop_db( self ):
        engine = sqlalchemy.create_engine( self.db_uri )
        conn = engine.connect()
        conn.execute( 'COMMIT' )
        conn.execute( 'DROP DATABASE ' + self.db_name )
        conn.close()