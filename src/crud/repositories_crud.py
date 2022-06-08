from typing import List, Optional

from src.crud.base import BaseCrud
from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
from sqlalchemy.orm import joinedload
from src.models.mappings import Repository
from src.schemas.list_repositories_schemas import ItemRepositories


class RepositoriesCrud(BaseCrud):
    def __init__(self, db: AsyncSession) -> None:
        super().__init__(db, Repository)

    async def create_repository(self, list_repositories: List[ItemRepositories]) -> List[Repository]:
        list_repository_id = [repo["id"] for repo in list_repositories]
        nonexistent_id = await self.exists_repository(list_repository_id)
        all_repositories = [
            Repository(
                id=repo["id"],
                full_name=repo["full_name"],
                name=repo["name"],
                html_url=repo["html_url"],
                owner_id=repo["owner"]["id"],
                language=repo['language'],
            )
            for repo in list_repositories
            if repo["id"] in nonexistent_id
        ]
        self.db.add_all(all_repositories)
        await self.db.flush(all_repositories)
        return all_repositories

    async def get_all_repositories(self) -> List[Repository]:
        query = sa.select(self.model).options(joinedload(Repository.owner))
        res = await self.db.execute(query)
        return res.scalars().all()

    async def exists_repository(self, list_id: List[int]) -> List[int]:
        query = await self.db.execute(sa.select(Repository))
        result_query = query.scalars().all()
        result = [x.id for x in result_query]
        nonexistent_id = list({element for element in list_id if element not in result})
        return nonexistent_id

    async def get_repository_by_id(self, id: int) -> Optional[Repository]:
        query = sa.select(self.model).where(self.model.id == id).options(joinedload(Repository.owner))
        result_query = await self.db.execute(query)
        return result_query.scalars().first()
