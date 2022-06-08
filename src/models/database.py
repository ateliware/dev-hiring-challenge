from sqlalchemy.ext.asyncio import create_async_engine

from src.config.settings import settings

engine = create_async_engine(settings.DATABASE_URL)
