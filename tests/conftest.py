from datetime import datetime
import pytest
from project import create_app
from project.models.database import db, History


@pytest.fixture(scope='module')
def test_search():
    flask_app = create_app('flask_test.cfg')

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client  # this is where the testing happens!


@pytest.fixture(scope='module')
def init_database(test_client):
    # Create the database and the database table
    db.create_all()

    # Insert user data
    history1 = History(email='tester01@gmail.com', fullname='FlaskIsAwesome', language='Python',
                       url='https://github.com/donnemartin', description='Learn how to design large-scale systems. '
                                                                         'Prep for the system design interview.',
                       date=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

    history2 = History(email='tester02@gmail.com', fullname='Postgres SQL', language='SQL',
                       url='https://github.com/sqlpostgres', description='Automatic SQL injection and database '
                                                                         'takeover tool ',
                       date=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

    db.session.add(history1)
    db.session.add(history2)

    # Commit the changes for the users
    db.session.commit()

    yield  # this is where the testing happens!

    db.drop_all()
