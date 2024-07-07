from typing import TYPE_CHECKING, Generic

from pydantic import BaseModel, ConstrainedInt

from common.models import ModelTypeVar

if TYPE_CHECKING:
    from pydantic.typing import CallableGenerator


class Schema(BaseModel):
    class Config:
        orm_mode = True


class GetSchema(Schema):
    id: int


class PrimaryKeyRelatedField(Generic[ModelTypeVar], ConstrainedInt):
    id: int
    model: type[ModelTypeVar]

    def __class_getitem__(cls, model: type[ModelTypeVar]) -> type:
        new_cls = type(f'{cls.__name__}WithModel', (cls,), {})
        new_cls.model = model
        return new_cls

    @classmethod
    def __get_validators__(cls) -> 'CallableGenerator':
        yield cls.validate

    @classmethod
    def validate(cls, v: int) -> int:
        cls.model.get(v)
        return v


class CreatedResponse(BaseModel):
    id: int
