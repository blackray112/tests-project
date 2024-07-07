from fastapi import HTTPException
from pydantic import EmailStr, validator

from common.schemas import Schema
from database.local_session import session
from users.models import User


class UserSignup(Schema):
    email: EmailStr
    nickname: str

    @validator('email')
    def email_already_registered(cls, email: EmailStr) -> EmailStr:
        if session.query(User).filter(User.email == email).first():
            raise HTTPException(status_code=400, detail='Email already registered')
        return email

    @validator('nickname')
    def nickname_already_registered(cls, nickname: str) -> str:
        if session.query(User).filter(User.nickname == nickname).first():
            raise HTTPException(status_code=400, detail='Nickname already registered')
        return nickname


class UserLogin(Schema):
    email: EmailStr

    @validator('email')
    def email_not_registered(cls, v: EmailStr) -> EmailStr:
        if not session.query(User).filter(User.email == v).first():
            raise HTTPException(status_code=400, detail='Invalid email')
        return v
