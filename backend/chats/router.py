from fastapi import Depends
from sqlalchemy import asc
from starlette.responses import Response

from ai.manager import AIManager
from chats.models import Chat, Message, VirtualFriend
from chats.schemas import (
    ChatCreate,
    ChatGet,
    ChatUpdate,
    MessageCreateAPI,
    MessageGet,
    VirtualFriendCreate,
    VirtualFriendGet,
    VirtualFriendUpdate,
)
from common.router import HandleTrailingSlashRouter
from common.schemas import CreatedResponse
from database.local_session import session

virtual_friend_router = HandleTrailingSlashRouter(prefix='/virtual_friend')


@virtual_friend_router.post('')
def create_virtual_friend(virtual_friend: VirtualFriendCreate) -> CreatedResponse:
    """
    Create a new virtual friend.
    """
    virtual_friend = VirtualFriend.from_orm(virtual_friend)
    virtual_friend.commit()
    return CreatedResponse(id=virtual_friend.id)


@virtual_friend_router.get('')
def get_virtual_friends() -> list[VirtualFriendGet]:
    """
    Retrieve details of all virtual friends.
    """
    virtual_friends = session.query(VirtualFriend).all()
    return [VirtualFriendGet.from_orm(virtual_friend) for virtual_friend in virtual_friends]


@virtual_friend_router.get('/{virtual_friend_id}', responses={404: {'description': 'Virtual Friend not found'}})
def get_virtual_friend(virtual_friend: VirtualFriend = Depends(VirtualFriend.get)) -> VirtualFriendGet:
    """
    Retrieve details of a virtual friend specified by virtual_friend_id.
    """
    return VirtualFriendGet.from_orm(virtual_friend)


@virtual_friend_router.patch('/{virtual_friend_id}', responses={404: {'description': 'Virtual Friend not found'}})
def update_virtual_friend(
        vf: VirtualFriendUpdate, db_vf: VirtualFriend = Depends(VirtualFriend.get),
) -> VirtualFriendUpdate:
    """
    Update the virtual friend if it exists.
    """
    vf = vf.dict(exclude_unset=True)
    db_vf.update_fields(vf, commit=True)
    return VirtualFriendUpdate.from_orm(db_vf)


@virtual_friend_router.delete('/{virtual_friend_id}', responses={404: {'description': 'Virtual Friend not found'}})
def delete_virtual_friend(virtual_friend: VirtualFriend = Depends(VirtualFriend.get)) -> Response:
    """
    Delete the virtual friend if it exists.
    """
    virtual_friend.delete()
    return Response()


chats_router = HandleTrailingSlashRouter(prefix='/chats')


@chats_router.post('')
def create_chat(chat: ChatCreate) -> CreatedResponse:
    """
    Create a new chat.
    """
    chat = Chat.from_orm(chat)
    chat.create()
    return CreatedResponse(id=chat.id)


@chats_router.get('/{chat_id}', responses={404: {'description': 'Chat not found'}})
def get_chat(chat: Chat = Depends(Chat.get)) -> ChatGet:
    """
    Retrieve details of a chat specified by chat_id.
    """
    return ChatGet.from_orm(chat)


@chats_router.get('')
def get_chats(virtual_friend_id: int) -> list[ChatGet]:
    """
    Retrieve details of all chats.
    """
    chats = session.query(Chat).filter(Chat.virtual_friend_id == virtual_friend_id).all()
    return [ChatGet.from_orm(chat) for chat in chats]


@chats_router.patch('/{chat_id}', responses={404: {'description': 'Chat not found'}})
def update_chat(chat: ChatUpdate, db_chat: Chat = Depends(Chat.get)) -> ChatUpdate:
    """
    Update the chat if it exists.
    """
    chat = chat.dict(exclude_unset=True)
    db_chat.update_fields(chat, commit=True)
    return ChatUpdate.from_orm(db_chat)


@chats_router.delete('/{chat_id}', responses={404: {'description': 'Chat not found'}})
def delete_chat(chat: Chat = Depends(Chat.get)) -> dict:
    """
    Delete the chat if it exists.
    """
    chat.delete()
    return {'message': 'Chat deleted successfully'}


@chats_router.get('/{chat_id}/messages', responses={404: {'description': 'Chat not found'}})
def get_chat_messages(chat: Chat = Depends(Chat.get)) -> list[MessageGet]:
    """
    Retrieve the messages of a chat specified by chat_id.
    """
    messages = (
        session.query(Message)
        .filter(Message.chat_id == chat.id)
        .order_by(asc(Message.created))
        .all()
    )
    return [MessageGet.from_orm(message) for message in messages]


messages_router = HandleTrailingSlashRouter(prefix='/messages')


@messages_router.post('')
def send_user_message(message: MessageCreateAPI) -> MessageGet:
    """
    Send a message from a user to a virtual friend.
    """
    chat_id = message.chat_id
    text = message.text
    chat = session.query(Chat).get(chat_id)
    vf = chat.virtual_friend
    user = vf.user
    openai_api_key = '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'
    manager = AIManager(
        openai_api_key=openai_api_key,
        chat_id=chat_id,
        virtual_friend=vf,
        user=user,
        user_text=text,
    )
    bot_message = manager.create_bot_message()
    return MessageGet.from_orm(bot_message)


@messages_router.delete('/{message_id}', responses={404: {'description': 'Message not found'}})
def delete_message(message: Message = Depends(Message.get)) -> dict:
    """
    Delete the message.
    """
    message.delete()
    return {'message': 'Message deleted successfully'}


@messages_router.get('/{message_id}/openai_response', responses={404: {'description': 'Message not found'}})
def openai_response(message: Message = Depends(Message.get)) -> dict:
    """
    Return response JSON for the message.
    """
    return message.openai_response
