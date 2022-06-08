from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates

from src.controllers.dependencies.controllers import repositories_controller
from src.controllers.repositories_controller import RepositoriesController

router = APIRouter()
templates = Jinja2Templates(directory="templates")


@router.get("/list", response_class=HTMLResponse)
async def read_item(request: Request, repository_controller: RepositoriesController = Depends(repositories_controller)):
    await repository_controller.save_repositories()
    result = await repository_controller.find_repositories()
    return templates.TemplateResponse("list.html", {"request": request, "repositories_language": result})


@router.get("/search", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("search.html", {"request": request})


@router.get("/item/{id}", response_class=HTMLResponse)
async def read_item(
    request: Request, id: int, repository_controller: RepositoriesController = Depends(repositories_controller)
):
    result = await repository_controller.find_repository(id)
    return templates.TemplateResponse("item.html", {"request": request, "result": result})
