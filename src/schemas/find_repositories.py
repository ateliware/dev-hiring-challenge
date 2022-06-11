from typing import List, Optional

from src.schemas.base import Base


class RepositoryRequest(Base):
    id: int
    name: str


class FindRepositoriesRequest(Base):
    language: str
    repositories: Optional[List[RepositoryRequest]]


class FindOwnerResponse(Base):
    id: int
    login: str
    avatar_url: str
    html_url: str


class FindRepositoryResponse(Base):
    id: int
    name: str
    full_name: str
    html_url: str
    language: str
    owner: FindOwnerResponse
    