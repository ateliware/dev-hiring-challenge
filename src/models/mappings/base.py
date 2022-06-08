import re

import sqlalchemy as sa
from sqlalchemy.orm import declarative_mixin, declared_attr
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime, BigInteger
from sqlalchemy.ext.declarative import as_declarative



def camel_to_snake(name: str):
    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()


@declarative_mixin
class TableNameMixin:
    @declared_attr
    def __tablename__(cls) -> str:
        return camel_to_snake(cls.__name__)


@as_declarative()
class BaseMapping(TableNameMixin):
    id = Column(BigInteger, primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    