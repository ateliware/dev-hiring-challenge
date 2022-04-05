# https://docs.djangoproject.com/pt-br/2.2/internals/contributing/writing-code/unit-tests/
# https://docs.python.org/3/library/unittest.html#assert-methods
# https://docs.djangoproject.com/pt-br/2.2/topics/testing/advanced/#topics-testing-code-coverage
# https://coverage.readthedocs.io/en/6.3.2/excluding.html
# coverage run --source='.' manage.py test searchapp
# coverage report
from .urls import *
from .list import *
from .models import *
