"""
This file contains the functional tests for the pages blueprint.

These tests use GETs and POSTs to different URLs to check for the proper behavior
of the pages blueprint.
"""
from project import create_app


def test_search_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')

    # Create a test search using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.get('/')
        assert response.status_code == 200
        assert b'email' in response.data
        assert b'lang_one' in response.data
        assert b'lang_two' in response.data
        assert b'lang_three' in response.data
        assert b'lang_four' in response.data
        assert b'lang_five' in response.data
        assert b'submit' in response.data


def test_search_post():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/search' page is posted to (POST)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')

    # Create a test search using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.post('/search', data=dict(email='nrodriguez02@gmail.com', lang_one='Python',
                                                         lang_two='PHP', lang_three='C', lang_four='C#',
                                                         lang_five='SQL'))
        assert response.status_code == 200
        assert b"showing the two best ranked" in response.data


def test_history_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')

    # Create a test history using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.get('/history/')
        assert response.status_code == 200
