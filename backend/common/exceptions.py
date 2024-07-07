from typing import TYPE_CHECKING, Any

from fastapi.exceptions import HTTPException

if TYPE_CHECKING:
    from chats.models import Model

class AppException(HTTPException):
    status_code: int = 500

    def __init__(self) -> None:
        super().__init__(type(self).status_code, self.message())

    def message(self) -> str:
        return 'App Exception'


class ModelException(AppException):
    model: 'Model'
    def __init__(self, model: 'Model') -> None:
        self.model = model
        super().__init__()

    def message(self) -> str:
        return 'Model Exception'


class InvalidIdException(ModelException):
    status_code = 404

    def message(self) -> str:
        return f'{self.model.repr_for_user()} not found'


class CommitException(ModelException):
    params: list[Any]

    def __init__(self, model: 'Model', params: list[Any]) -> None:
        self.params = params
        super().__init__(model)


class UpdateException(CommitException):
    def message(self) -> str:
        return f"{self.model.repr_for_user()} can't be updated"


class CreateException(CommitException):
    def message(self) -> str:
        return f"{self.model.repr_for_user()} can't be created"
