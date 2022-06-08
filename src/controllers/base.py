from src.models.uow import UnitOfWork


class BaseController:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow
