import random

from polyfactory import Ignore, Use

from chats.enums import MessageType
from chats.models import Chat, Message, VirtualFriend
from common.factories import Factory, faker, post_gen


class ChatFactory(Factory[Chat]):
    __model__ = Chat

    name = Use(lambda: f'chat {int(random.random() * 100)}')


class VirtualFriendFactory(Factory[VirtualFriend]):
    __model__ = VirtualFriend

    name = Use(
        lambda: f'{random.choice(["John", "Jane", "Jack"])} {int(random.random() * 100)}',
    )

    @staticmethod
    @post_gen('include_chats', True)  # noqa: FBT003
    def create_chats(friend: VirtualFriend, create: bool) -> None:  # noqa: FBT001
        if not create:
            return

        friend.chats = ChatFactory.batch(
            random.randint(1, 2), virtual_friend_id=friend.id,
        )


class MessageFactory(Factory[Message]):
    __model__ = Message

    openai_response = Ignore()

    type = Use(random.choice, list(MessageType))
    text = Use(faker.sentence)
