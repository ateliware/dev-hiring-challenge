import os
import unittest
import pathlib

from dotenv import load_dotenv
env_dir = pathlib.Path(__file__).parents[1]
load_dotenv( os.path.join( env_dir, '.flaskenv' ) )

from models.repository import Repository
from app import db, create_app
from tests.test_db import TestDB

class RepositoryTest(unittest.TestCase):

    def setUp( self ):
        self.test_db = TestDB()
        db_uri = self.test_db.create_db()
        self.app_factory = create_app( SQLALCHEMY_DATABASE_URI=db_uri,
                                       TESTING=True,
                                       SECRET_KEY = 'test_secret' )
        self.app = self.app_factory.test_client()
        with self.app_factory.app_context():
            db.create_all()

    def tearDown( self ):
        with self.app_factory.app_context():
            db.drop_all()
        self.test_db.drop_db()

    def test_respository_1( self ):
        view = self.app.get( '/search' )
        assert 'form' in str( view.data )
    
    def test_respository_2( self ):
        view = self.app.get( '/results' )
        assert 'ul' in str( view.data )