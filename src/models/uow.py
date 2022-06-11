from __future__ import annotations

from functools import cached_property
from sqlalchemy.ext.asyncio import AsyncSession

from src.crud.owners_crud import OwnersCrud
from src.crud.repositories_crud import RepositoriesCrud


class UnitOfWork:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def __aenter__(self) -> UnitOfWork:
        return self

    async def __aexit__(self, exc_type, exc_value, exc_traceback):
        if exc_type:
            await self.rollback()
        else:
            await self.commit()

    async def commit(self) -> None:
        await self.session.commit()

    async def rollback(self) -> None:
        await self.session.rollback()

    @cached_property
    def repositories(self) -> RepositoriesCrud:
        return RepositoriesCrud(self.session)

    @cached_property
    def owners(self) -> OwnersCrud:
        return OwnersCrud(self.session)

