from fastapi import Depends

from src.controllers.dependencies.common import get_uow
from src.controllers.repositories_controller import RepositoriesController


def repositories_controller(uow=Depends(get_uow)) -> RepositoriesController:
    return RepositoriesController(uow)