from fastapi_users import FastAPIUsers
from httpx_oauth.clients.google import GoogleOAuth2

from auth.backends import auth_backend
from common.router import HandleTrailingSlashRouter
from settings import settings
from users.manager import get_user_manager
from users.models import User
from users.schemas import UserCreate, UserRead

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

google_oauth_client = GoogleOAuth2(
    settings.GOOGLE_CLIENT_ID,
    settings.GOOGLE_CLIENT_SECRET,
)

auth_router = HandleTrailingSlashRouter(prefix='/auth')

auth_router.include_router(fastapi_users.get_auth_router(auth_backend))
auth_router.include_router(fastapi_users.get_register_router(UserRead, UserCreate))
auth_router.include_router(fastapi_users.get_reset_password_router())
auth_router.include_router(fastapi_users.get_verify_router(UserRead))
auth_router.include_router(
    fastapi_users.get_oauth_router(google_oauth_client, auth_backend, settings.SECRET),
    prefix='/google',
)
