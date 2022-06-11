from uuid import uuid4

from fastapi.testclient import TestClient
from lxml import html, etree
import os
import pytest

from pytest_mock import MockerFixture

repos_response = [{
    "language": "python",
    "repositories": [{"id": str(uuid4()), "name": "ola"}],
}]

pytestmark = pytest.mark.asyncio


async def test_route_search(client: TestClient):
    response = client.get("/search")
    assert response.status_code == 200
    parsed_file = html.parse(os.path.join(os.getcwd(), "templates", "search.html")).getroot()
    parsed_response = html.document_fromstring(response.content.decode("utf-8"))
    assert (
        parsed_file.get_element_by_id("nav-link").text_content()
        == parsed_response.get_element_by_id("nav-link").text_content()
    )


async def test_route_list(client: TestClient):
    response = client.get("/list")
    assert response.status_code == 200


async def test_route_item(client: TestClient):
    response = client.get(f"/item/{uuid4()}")
    assert response.status_code == 422
