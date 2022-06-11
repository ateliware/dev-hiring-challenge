from typing import Generator

from fastapi.testclient import TestClient
from src.main import app
import pytest


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c
