from typing import List, Optional

from src.controllers.base import BaseController
from src.models.mappings import Repository
from src.models.uow import UnitOfWork
from src.schemas.find_repositories import FindRepositoriesRequest, RepositoryRequest, FindRepositoryResponse
from src.utils.github.list_repositories import GithubClient
from src.schemas.list_repositories_schemas import ListRepositoriesRequest


class RepositoriesController(BaseController):
    def __init__(self, uow: UnitOfWork):
        super().__init__(uow)

    async def save_repositories(self) -> None:
        async with self.uow as uow:
            languages = ["python", "javascript", "java", "go", "ruby"]
            repositories = []
            for language in languages:
                try:
                    list_repositories = await GithubClient.list_repositories(ListRepositoriesRequest(language=language))
                    list(map(lambda x: x.update({"language": language}), list_repositories["items"]))
                    repositories.extend(list_repositories["items"])
                except Exception:
                    continue
            repositories = [repo for index, repo in enumerate(repositories) if repo not in repositories[index + 1 :]]
            owners = list(map(lambda x: x["owner"], repositories))
            owners = [owner for index, owner in enumerate(owners) if owner not in owners[index + 1 :]]
            await uow.owners.create_owner(owners)
            await uow.repositories.create_repository(repositories)

    async def find_repositories(self) -> List[FindRepositoriesRequest]:
        async with self.uow as uow:
            repositories = await uow.repositories.get_all_repositories()
            languages = list(set([x.language for x in repositories]))
            result = [FindRepositoriesRequest(language=language, repositories=[]) for language in languages]
            for repository in repositories:
                for i in result:
                    if i.language == repository.language:
                        i.repositories.append(RepositoryRequest(id=repository.id, name=repository.name))
            return result

    async def find_repository(self, id: int) -> FindRepositoryResponse:
        async with self.uow as uow:
            result = await uow.repositories.get_repository_by_id(id)
            find_repository = FindRepositoryResponse.from_orm(result)
            return find_repository
