"""
This file (test_models.py) contains the unit tests for the models.py file.
"""
import json
from datetime import datetime
from types import SimpleNamespace

import requests

from project.models.repository import Repo
from project.models.database import History


def test_repository():
    """
    GIVEN a Repo model
    WHEN a new Repo is created
    THEN check the fields are defined correctly
    """
    sample = dict(language='Python', full_name='FlaskIsAwesome', html_url='https://github.com/donnemartin',
                  stargazers_count='123450', description='Learn how to design large-scale systems. '
                                                         'Prep for the system design interview.')

    data = json.dumps(sample, indent=5)
    data = json.loads(data, object_hook=lambda d: SimpleNamespace(**d))
    repo = Repo(data)
    assert repo.language == 'Python'
    assert repo.full_name == 'FlaskIsAwesome'
    assert repo.html_url == 'https://github.com/donnemartin'
    assert repo.stargazers_count == '123450'
    assert repo.description == 'Learn how to design large-scale systems. Prep for the system design interview.'


def test_history():
    """
    GIVEN a History model
    WHEN a new History is created
    THEN check the fields are defined correctly
    """

    history = History(email='tester01@gmail.com', fullname='FlaskIsAwesome', language='Python',
                      url='https://github.com/donnemartin', description='Learn how to design large-scale systems. '
                                                                        'Prep for the system design interview.',
                      date=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

    assert history.email == 'tester01@gmail.com'
    assert history.fullname == 'FlaskIsAwesome'
    assert history.language == 'Python'
    assert history.url == 'https://github.com/donnemartin'
    assert history.description == 'Learn how to design large-scale systems. Prep for the system design interview.'
    assert history.date == datetime.now().strftime("%d/%m/%Y %H:%M:%S")
