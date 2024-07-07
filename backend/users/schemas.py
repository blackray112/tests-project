from fastapi_users.schemas import BaseUser, BaseUserCreate
from pydantic import EmailStr

from common.schemas import GetSchema, Schema


class UserGet(GetSchema):
    email: EmailStr
    about: str | None
    nickname: str


class UserUpdate(Schema):
    about: str = None
    nickname: str = None
    email: EmailStr = None


class UserCreate(BaseUserCreate):
    email: EmailStr
    nickname: str
    password: str


class UserRead(BaseUser[int]):
    id: int
    email: EmailStr
    nickname: str
