import aiohttp

from src.schemas.list_repositories_schemas import ListRepositoriesResponse, ListRepositoriesRequest
from src.config.settings import settings


class GithubClient:
    @staticmethod
    async def list_repositories(request: ListRepositoriesRequest) -> ListRepositoriesResponse:
        headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        async with aiohttp.ClientSession(headers=headers) as session:
            url = settings.GITHUB_URL + f"?q=language:{request.language}&sort=stars&per_page=5"
            async with session.get(url) as r:
                response = await r.json()
                try:
                    if r.status != 200:
                        raise Exception
                    return response
                except ValueError as e:
                    raise Exception(e)
