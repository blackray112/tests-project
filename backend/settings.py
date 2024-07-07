import os
from enum import Enum

from pydantic import BaseSettings


class EnvironmentType(str, Enum):
    PROD = 'prod'
    TEST = 'test'
    DEV = 'dev'


class Settings(BaseSettings):
    SECRET: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    SENTRY_DSN: str = ''

    db_username: str
    db_password: str
    db_name: str
    db_host: str
    db_port: str


class DevSettings(Settings):
    SECRET = 'SECRET'  # noqa: S105
    GOOGLE_CLIENT_ID = (
        '666076947933-ct4opnkct8nfcskqn79onoa8at0bj9eq.apps.googleusercontent.com'
    )
    GOOGLE_CLIENT_SECRET = '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'  # noqa: S105

    db_username = 'user'
    db_password = 'password'  # noqa: S105
    db_name = 'mydatabase'
    db_host = 'db'
    db_port = '5432'


class TestSettings(DevSettings):
    db_name = 'mydatabase_test'


class ProdSettings(Settings):
    SENTRY_DSN: str = 'https://c2d59edd4669dd0d08c4177b8d662a4e@o4505677338116096.ingest.sentry.io/4505677339688960'

    class Config:
        env_file = '.env.prod'


env = os.getenv('ENV')

match env:
    case EnvironmentType.PROD:
        settings = ProdSettings()
    case EnvironmentType.TEST:
        settings = TestSettings()
    case _:
        settings = DevSettings()

__all__ = ['settings']
