from typing import Self

import requests
from fastapi import Depends, HTTPException, Request, status
from fastapi_users import BaseUserManager, IntegerIDMixin, exceptions
from fastapi_users_db_sqlmodel import SQLModelUserDatabase

from database.engine import get_user_db
from settings import settings
from users.models import User


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.SECRET
    verification_token_secret = settings.SECRET

    async def on_after_register(
        self,
        user: User,
        request: Request | None = None,  # noqa: ARG002
    ) -> None:
        print(f'User {user.id} has registered.')  # noqa: T201

    async def on_after_forgot_password(
        self,
        user: User,
        token: str,
        request: Request | None = None,  # noqa: ARG002
    ) -> None:
        print(  # noqa: T201
            f'User {user.id} has forgot their password. Reset token: {token}',
        )

    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Request | None = None,  # noqa: ARG002
    ) -> None:
        print(  # noqa: T201
            f'Verification requested for user {user.id}. Verification token: {token}',
        )

    @staticmethod
    def get_nickname(access_token: str) -> str:
        userinfo_endpoint = 'https://www.googleapis.com/oauth2/v3/userinfo'
        headers = {'Authorization': f'Bearer {access_token}'}

        userinfo_response = requests.get(userinfo_endpoint, headers=headers, timeout=5)
        if userinfo_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Failed to fetch user info',
            )

        userinfo = userinfo_response.json()
        return userinfo['name']

    @staticmethod
    def check_association(associate_by_email: bool) -> None:  # noqa: FBT001
        if not associate_by_email:
            raise exceptions.UserAlreadyExists

    async def create_oauth_account(  # noqa: PLR0913
        self,
        account_email: str,
        is_verified_by_default: bool,  # noqa: FBT001
        access_token: str,
        oauth_account_dict: dict,
        request: Request | None = None,
    ) -> User:
        password = self.password_helper.generate()
        user_dict = {
            'email': account_email,
            'hashed_password': self.password_helper.hash(password),
            'is_verified': is_verified_by_default,
            'nickname': self.get_nickname(access_token),
        }
        user = await self.user_db.create(user_dict)
        user = await self.user_db.add_oauth_account(user, oauth_account_dict)
        await self.on_after_register(user, request)

        return user

    async def associate_oauth_account(
        self,
        account_email: str,
        associate_by_email: bool,  # noqa: FBT001
        oauth_account_dict: dict,
    ) -> User:
        user = await self.get_by_email(account_email)
        self.check_association(associate_by_email)
        return await self.user_db.add_oauth_account(user, oauth_account_dict)

    async def update_oauth_account(
        self,
        user: User,
        account_id: str,
        oauth_name: str,
        oauth_account_dict: dict,
    ) -> User:
        for existing_oauth_account in user.oauth_accounts:
            if (
                existing_oauth_account.account_id == account_id
                and existing_oauth_account.oauth_name == oauth_name
            ):
                user = await self.user_db.update_oauth_account(
                    user,
                    existing_oauth_account,
                    oauth_account_dict,
                )

        return user

    async def oauth_callback(  # noqa: PLR0913
        self: Self,
        oauth_name: str,
        access_token: str,
        account_id: str,
        account_email: str,
        expires_at: int | None = None,
        refresh_token: str | None = None,
        request: Request | None = None,
        *,
        associate_by_email: bool = False,
        is_verified_by_default: bool = False,
    ) -> User:
        oauth_account_dict = {
            'oauth_name': oauth_name,
            'access_token': access_token,
            'account_id': account_id,
            'account_email': account_email,
            'expires_at': expires_at,
            'refresh_token': refresh_token,
        }

        try:
            user = await self.get_by_oauth_account(oauth_name, account_id)
        except exceptions.UserNotExists:
            try:
                user = await self.associate_oauth_account(
                    account_email,
                    associate_by_email,
                    oauth_account_dict,
                )
            except exceptions.UserNotExists:
                user = await self.create_oauth_account(
                    account_email,
                    is_verified_by_default,
                    access_token,
                    oauth_account_dict,
                    request,
                )
        else:
            # Update oauth
            user = await self.update_oauth_account(
                user,
                account_id,
                oauth_name,
                oauth_account_dict,
            )

        return user


async def get_user_manager(
    user_db: SQLModelUserDatabase = Depends(get_user_db),
) -> UserManager:
    yield UserManager(user_db)
