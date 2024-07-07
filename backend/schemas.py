
from fastapi_users import schemas
from pydantic import EmailStr


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    nickname: str
    password: str


class UserRead(schemas.BaseUser[int]):
    id: int
    email: EmailStr
    nickname: str
