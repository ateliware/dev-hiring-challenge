from typing import List

from src.crud.base import BaseCrud
from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
from src.models.mappings import Owner
from src.schemas.list_repositories_schemas import OwnerRepositories


class OwnersCrud(BaseCrud):
    def __init__(self, db: AsyncSession) -> None:
        super().__init__(db, Owner)

    async def create_owner(self, list_owners: List[OwnerRepositories]) -> List[Owner]:
        list_owner_id = [repo["id"] for repo in list_owners]
        nonexistent_id = await self.exists_owner(list_owner_id)
        all_owners = [
            Owner(
                id=repo["id"],
                login=repo["login"],
                avatar_url=repo["avatar_url"],
                html_url=repo["html_url"],
            )
            for repo in list_owners
            if repo["id"] in nonexistent_id
        ]
        self.db.add_all(all_owners)
        await self.db.flush(all_owners)
        return all_owners

    async def exists_owner(self, list_id: List[int]) -> List[int]:
        query = await self.db.execute(sa.select(Owner))
        result_query = query.scalars().all()
        result = [x.id for x in result_query]
        nonexistent_id = list({element for element in list_id if element not in result})
        return nonexistent_id
