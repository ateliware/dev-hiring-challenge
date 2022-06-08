from sqlalchemy.ext.asyncio import AsyncSession

from src.models.database import engine
from src.models.uow import UnitOfWork


async def get_uow():
    session = AsyncSession(engine, expire_on_commit=True)
    try:
        yield UnitOfWork(session)
    finally:
        await session.close()
