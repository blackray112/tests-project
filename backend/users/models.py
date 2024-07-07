from typing import TYPE_CHECKING, Self

from fastapi_users_db_sqlmodel import SQLModelBaseUserDB
from sqlmodel import Field, Relationship

from auth.models import OAuthAccount
from common.models import Model

if TYPE_CHECKING:
    from chats.models import VirtualFriend


class User(Model, SQLModelBaseUserDB, table=True):
    email: str = Field(unique=True)
    about: str = None
    nickname: str = Field(unique=True)
    oauth_accounts: list[OAuthAccount] = Relationship(back_populates='user')

    virtual_friends: list['VirtualFriend'] = Relationship(back_populates='user')

    @classmethod
    def get(cls, user_id: int) -> Self:
        return super().get(user_id)
