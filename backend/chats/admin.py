from sqladmin import ModelView

from chats.models import Chat, Message, VirtualFriend


class VirtualFriendAdminView(ModelView, model=VirtualFriend):
    column_list = '__all__'


class ChatAdminView(ModelView, model=Chat):
    column_list = '__all__'


class MessageAdminView(ModelView, model=Message):
    column_list = '__all__'
