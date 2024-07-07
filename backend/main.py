import sentry_sdk
from fastapi import FastAPI
from sqladmin import Admin
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, RedirectResponse
from starlette.staticfiles import StaticFiles

from auth.router import auth_router
from chats.admin import ChatAdminView, MessageAdminView, VirtualFriendAdminView
from chats.router import chats_router, messages_router, virtual_friend_router
from common.custom_swagger import get_swagger_ui_html
from database.engine import engine
from database.local_session import LocalSessionMiddleware
from settings import settings
from users.admin import UserAdminView
from users.router import users_router

if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production,
        traces_sample_rate=1.0,
    )

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
app.add_middleware(LocalSessionMiddleware)


@app.get('/', include_in_schema=False)
async def redirect_docs() -> RedirectResponse:
    return RedirectResponse(app.docs_url)


@app.get('/docs', include_in_schema=False)
async def custom_swagger_ui_html() -> HTMLResponse:
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title='Chit Chat API',
        swagger_custom_css_url='/static/swagger.css',
    )

@app.get('/sentry-debug')
async def trigger_error():  # noqa: ANN201
    return 1 / 0


app.include_router(auth_router, tags=['Auth'])
app.include_router(users_router, tags=['Users'])
app.include_router(virtual_friend_router, tags=['Virtual friends'])
app.include_router(chats_router, tags=['Chats'])
app.include_router(messages_router, tags=['Messages'])

admin = Admin(app, engine)

admin.add_view(VirtualFriendAdminView)
admin.add_view(ChatAdminView)
admin.add_view(MessageAdminView)
admin.add_view(UserAdminView)
