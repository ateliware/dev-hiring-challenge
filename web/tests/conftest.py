import pytest
from flask import current_app
from app.app import create_app
from app.ext.database import db
from app.ext.commands import create_db , drop_db


@pytest.fixture(scope="module")
def app():
    """ Instance main app with active test """
    app = create_app(True)
    with app.app_context():
        drop_db()
        create_db()      
    yield app

@pytest.fixture(scope="module")
def db(app,db):
    """ Instantiate test database """
    with app.app_context():
        yield db

@pytest.fixture(scope="module")
def config(app):
    """ Configuration attributes """
    with app.app_context():
        return current_app.config
