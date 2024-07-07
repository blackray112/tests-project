from fastapi import APIRouter

from auth.router import fastapi_users
from users.schemas import UserRead, UserUpdate

users_router = APIRouter(prefix='/users')
users_router.include_router(fastapi_users.get_users_router(UserRead, UserUpdate))
