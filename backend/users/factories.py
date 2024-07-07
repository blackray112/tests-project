from polyfactory import Use

from chats.models import VirtualFriend  # noqa: F401, if creating user we need to import VirtualFriend for relationship
from common.factories import Factory, faker
from users.models import User


class UserFactory(Factory[User]):
    __model__ = User

    email = Use(faker.ascii_safe_email)
