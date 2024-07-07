from typing import TYPE_CHECKING

from fastapi_users_db_sqlmodel import SQLModelBaseOAuthAccount
from sqlmodel import Column, Field, ForeignKey, Integer, Relationship

from common.models import Model

if TYPE_CHECKING:
    from users.models import User


class OAuthAccount(Model, SQLModelBaseOAuthAccount, table=True):
    user_id: int = Field(sa_column=Column('user_id', Integer, ForeignKey('user.id', ondelete='CASCADE')))
    user: 'User' = Relationship(back_populates='oauth_accounts')
