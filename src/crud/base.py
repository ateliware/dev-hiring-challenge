import math
from typing import Any, Callable, Dict, Optional, Type, TypeVar, Union, Generic

import sqlalchemy as sa
from sqlalchemy import asc, desc
from sqlalchemy.orm import Query
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.base import BaseModel as BaseAppModel
from src.models.mappings.base import BaseMapping


AppModelType = TypeVar("AppModelType", bound=BaseAppModel)
MappingType = TypeVar("MappingType", bound=BaseMapping)


class BaseCrud(Generic[MappingType]):
    def __init__(self, db: AsyncSession, model: Type[MappingType]):
        self.db = db
        self.model = model

    async def create(self, obj: MappingType) -> MappingType:
        self.db.add(obj)
        await self.db.flush([obj])
        return obj

    async def get_by_id(self, id: Any) -> Optional[MappingType]:
        query = sa.select(self.model).where(self.model.id == id)
        res = await self.db.execute(query)
        return res.scalar()
