from datetime import UTC, datetime
from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient
from freezegun import freeze_time
from sqlmodel import col

from chats.enums import MessageType
from chats.factories import ChatFactory, MessageFactory, VirtualFriendFactory
from chats.models import Chat, Message, VirtualFriend
from database.local_session import session
from main import app
from users.factories import UserFactory
from users.models import User

client = TestClient(app)


class BaseApiTest:
    def make_error(self, field: str, msg: str, err_type: str):
        return {'loc': ['body', field], 'msg': msg, 'type': err_type}


# class TestAuthApi(BaseApiTest):
#     def test_signup(self) -> None:
#         # Test successful signup
#         user_data = {
#             "email": str(uuid.uuid4()) + "test@example.com",
#             "nickname": "testuser",
#         }
#         response = client.post("/signup", json=user_data)
#         assert response.status_code == 200
#         assert response.json() == {"message": "User created successfully"}
#
#     def test_signup_email_already_exists(self) -> None:
#         # Test signup with email that already exists
#         user = UserFactory.build()
#         user_data = {"email": user.email}
#         response = client.post("/signup", json=user_data)
#         assert response.status_code == 400
#         assert response.json() == {"detail": "Email already registered"}
#
#     def test_signup_nickname_already_exists(self) -> None:
#         # Test signup with nickname that already exists
#         user = UserFactory.build()
#         user_data = {"nickname": user.nickname}
#         response = client.post("/signup", json=user_data)
#         assert response.status_code == 400
#         assert response.json() == {"detail": "Nickname already registered"}
#
#     def test_login(self) -> None:
#         # Test successful login
#         user = UserFactory.build()
#         user_data = {"email": user.email}
#         response = client.post("/login", json=user_data)
#         assert response.status_code == 200
#         assert response.json() == {"message": "User logged in successfully"}
#
#         # Test login with non-existent email
#         user_data = {"email": str(uuid.uuid4()) + "test@example.com"}
#         response = client.post("/login", json=user_data)
#         assert response.status_code == 400
#         assert response.json() == {"detail": "Invalid email"}
#
#
# class TestUserApi(BaseApiTest):
#     def test_get_user(self) -> None:
#         # Test getting an existing user
#         user = UserFactory.build()
#         response = client.get(f"/users/{user.id}")
#         assert response.status_code == 200
#         assert response.json()["email"] == user.email
#         assert response.json()["nickname"] == user.nickname
#
#         # Test getting a non-existent user
#         last_user_id = session.query(User).order_by(col(User.id).desc()).first().id
#         response = client.get(f"/users/{last_user_id + 1}")
#         assert response.status_code == 404
#         assert response.json() == {"detail": "User not found"}
#
#     def test_update_user(self) -> None:
#         # Test updating an existing user
#         user = UserFactory.build()
#         user_data = {
#             "about": "I am a test user",
#             "nickname": "testuser_test",
#             "email": "testtest@gmail.com",
#         }
#         response = client.patch(f"/users/{user.id}", json=user_data)
#         assert response.status_code == 200
#         assert response.json() == {
#             "id": user.id,
#             "about": "I am a test user",
#             "nickname": "testuser_test",
#             "email": "testtest@gmail.com",
#         }
#
#         # Test updating a non-existent user
#         last_user_id = session.query(User).order_by(col(User.id).desc()).first().id
#         response = client.patch(f"/users/{last_user_id + 1}", json=user_data)
#         assert response.status_code == 404
#         assert response.json() == {"detail": "User not found"}


class TestVirtualFriendApi(BaseApiTest):
    def test_create_virtual_friend(self) -> None:
        # Test successful creation of virtual friend
        user = UserFactory.build()

        virtual_friend_data = {
            'name': 'John Doe',
            'user_id': user.id,
            'gpt_description': 'A virtual friend',
        }

        response = client.post('/virtual_friend', json=virtual_friend_data)
        assert response.status_code == 200
        assert 'id' in response.json()

        # Test creation of virtual friend with non-existent user_id
        last_user_id = session.query(User).order_by(col(User.id).desc()).first().id
        virtual_friend_data = {
            'name': 'John Doe',
            'user_id': last_user_id + 1,
            'gpt_description': 'A virtual friend',
        }

        response = client.post('/virtual_friend', json=virtual_friend_data)
        assert response.status_code == 404
        assert response.json() == {'detail': 'User not found'}

    def test_get_virtual_friend(self) -> None:
        # Test getting an existing virtual friend
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )

        response = client.get(f'/virtual_friend/{virtual_friend.id}')
        assert response.status_code == 200
        virtual_friend = response.json()
        assert virtual_friend['name'] == 'John Doe'
        # Test getting a non-existent virtual friend

        last_virtual_friend_id = (
            session.query(VirtualFriend)
            .order_by(col(VirtualFriend.id).desc())
            .first()
            .id
        )
        response = client.get(f'/virtual_friend/{last_virtual_friend_id + 1}')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Virtual Friend not found'}

    def test_virtual_friend_list(self) -> None:
        # Test getting a list of virtual people
        user = UserFactory.build()
        VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual person',
        )
        VirtualFriendFactory.build(
            user=user,
            name='Jane adam',
            gpt_description='A virtual person 2',
        )

        response = client.get('/virtual_friend')
        assert response.status_code == 200
        data = response.json()
        assert data[-1]['name'] == 'Jane adam'

    def test_update_virtual_friend(self) -> None:
        # Test updating an existing virtual friend
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )

        virtual_friend_data = {
            'name': 'John Doe',
            'user_id': user.id,
            'gpt_description': 'A virtual friend Sam',
        }

        response = client.patch(
            f'/virtual_friend/{virtual_friend.id}',
            json=virtual_friend_data,
        )
        assert response.status_code == 200
        data = response.json()
        assert data['gpt_description'] == 'A virtual friend Sam'

        # Test updating a non-existent virtual friend
        last_virtual_friend_id = (
            session.query(VirtualFriend)
            .order_by(col(VirtualFriend.id).desc())
            .first()
            .id
        )
        response = client.patch(
            f'/virtual_friend/{last_virtual_friend_id + 1}',
            json=virtual_friend_data,
        )
        assert response.status_code == 404
        assert response.json() == {'detail': 'Virtual Friend not found'}

    def test_delete_virtual_friend(self) -> None:
        # Test deleting an existing virtual friend
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )

        response = client.delete(f'/virtual_friend/{virtual_friend.id}')
        assert response.status_code == 200

        # Test deleting a non-existent virtual friend
        assert session.query(VirtualFriend).count() == 0
        response = client.delete('/virtual_friend/1337')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Virtual Friend not found'}


class TestChatApi(BaseApiTest):
    def test_create_chat(self) -> None:
        # Test successful creation of chat
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )

        chat_data = {
            'virtual_friend_id': virtual_friend.id,
            'name': 'chat with John Doe',
        }

        response = client.post('/chats', json=chat_data)
        assert response.status_code == 200
        assert 'id' in response.json()

        # Test creation of chat with non-existent virtual_friend_id
        last_virtual_friend_id = (
            session.query(VirtualFriend)
            .order_by(col(VirtualFriend.id).desc())
            .first()
            .id
        )
        chat_data = {
            'user_id': user.id,
            'virtual_friend_id': last_virtual_friend_id + 1,
            'name': 'chat with John Doe',
        }

        response = client.post('/chats', json=chat_data)
        assert response.status_code == 404
        assert response.json() == {'detail': 'Virtual Friend not found'}

        # test creation of chat without name
        chat_data = {
            'virtual_friend_id': virtual_friend.id,
        }

        response = client.post('/chats', json=chat_data)
        assert response.status_code == 422
        assert response.json() == {
            'detail': [
                self.make_error('name', 'field required', 'value_error.missing'),
            ],
        }

    def test_chat_list(self) -> None:
        # Test getting a list of chats
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual person',
        )
        VirtualFriendFactory.build(
            user=user,
            name='Jane adam',
            gpt_description='A virtual person 2',
        )
        ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')
        ChatFactory.build(virtual_friend=virtual_friend, name='chat 2')

        response = client.get(f'/chats?virtual_friend_id={virtual_friend.id}')
        assert response.status_code == 200
        data = response.json()
        assert data[0]['virtual_friend_id'] == virtual_friend.id

        # Test getting a list of chats with non-existent virtual_friend_id
        last_virtual_friend_id = (
            session.query(VirtualFriend)
            .order_by(col(VirtualFriend.id).desc())
            .first()
            .id
        )
        response = client.get(f'/chats?virtual_friend_id={last_virtual_friend_id + 1}')
        assert response.status_code == 200
        assert response.json() == []

    def test_get_chat(self) -> None:
        # Test getting an existing chat
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual person',
        )
        chat = ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')

        with freeze_time('2023-01-01 12:00:00'):
            message_old = MessageFactory.build(chat_id=chat.id)
        with freeze_time('2023-01-01 13:00:00'):
            MessageFactory.build(chat_id=chat.id)
        message_old.update_fields(
            {'modified': datetime(2023, 2, 2, 23, 55, 59, tzinfo=UTC)},
            commit=True,
        )

        response = client.get(f'/chats/{chat.id}')
        assert response.status_code == 200
        chat = response.json()
        assert chat['virtual_friend_id'] == virtual_friend.id
        assert chat['name'] == 'chat 1'
        # assert chat['last_updated_at'] == message_new.created.strftime("%Y-%m-%dT%H:%M:%S")

        # Test getting a non-existent chat
        last_chat_id = session.query(Chat).order_by(col(Chat.id).desc()).first().id
        response = client.get(f'/chats/{last_chat_id + 1}')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Chat not found'}

    def test_delete_chat(self) -> None:
        # Test deleting an existing chat
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual person',
        )
        chat = ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')

        response = client.delete(f'/chats/{chat.id}')
        assert response.status_code == 200
        assert response.json() == {'message': 'Chat deleted successfully'}

        # Test deleting a non-existent chat
        last_chat_id = session.query(Chat).order_by(col(Chat.id).desc()).first().id
        response = client.delete(f'/chats/{last_chat_id + 1}')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Chat not found'}

    def test_update_chat_with_notes(self) -> None:
        # Create a new chat record with required fields
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )
        chat = ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')

        chat_data = {
            'notes': 'Some notes',
        }

        response = client.patch(f'/chats/{chat.id}', json=chat_data)
        assert response.status_code == 200
        assert response.json()['notes'] == 'Some notes'

        # Try to update a non-existent chat
        chat_data = {
            'chat_id': 123456,
            'notes': 'Some notes',
        }

        last_chat_id = session.query(Chat).order_by(col(Chat.id).desc()).first().id
        response = client.patch(f'/chats/{last_chat_id + 1}', json=chat_data)
        assert response.status_code == 404
        assert response.json() == {'detail': 'Chat not found'}


class TestMessageApi(BaseApiTest):
    @patch('chats.router.AIManager')
    def test_send_user_message(self, mock_ai_manager: MagicMock) -> None:
        # Test successful sending of user message
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual person',
        )
        chat = ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')
        # Mock AIManager instance and its create_bot_message method
        mock_manager = mock_ai_manager.return_value
        mock_manager.create_bot_message.return_value = Message(
            id=1,
            chat_id=chat.id,
            type=MessageType.AI,
            text='Hello! How are you doing today?',
            openai_response={},
        )

        message_data = {
            'chat_id': chat.id,
            'text': 'Hello friend!',
        }

        response = client.post('/messages', json=message_data)

        assert response.status_code == 200
        assert response.json()['chat_id'] == chat.id
        assert response.json()['type'] == MessageType.AI
        assert response.json()['text'] == 'Hello! How are you doing today?'
        assert response.json()['type'] == 'ai'

        # Assert that create_bot_message was called once
        mock_manager.create_bot_message.assert_called_once()

    def test_delete_message(self) -> None:
        # Test deleting an existing message
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )
        chat = ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')
        message = MessageFactory.build(chat_id=chat.id)

        response = client.delete(f'/messages/{message.id}')
        assert response.status_code == 200
        assert response.json() == {'message': 'Message deleted successfully'}

        # Test deleting a non-existent message
        message = MessageFactory.build(chat_id=chat.id)
        last_message_id = (
            session.query(Message).order_by(col(Message.id).desc()).first().id
        )
        response = client.delete(f'/messages/{last_message_id + 1}')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Message not found'}

    def test_get_messages(self) -> None:
        # Test getting messages for a chat
        user = UserFactory.build()
        virtual_friend = VirtualFriendFactory.build(
            user=user,
            name='John Doe',
            gpt_description='A virtual friend',
        )
        chat = ChatFactory.build(virtual_friend=virtual_friend, name='chat 1')
        MessageFactory.build(chat_id=chat.id, text='Hello friend!')
        MessageFactory.build(chat_id=chat.id, text='How are you doing?')

        response = client.get(f'/chats/{chat.id}/messages')
        assert response.status_code == 200
        assert len(response.json()) == 2

        # Test getting messages for a non-existent chat
        response = client.get(f'/chats/{chat.id + 1}/messages')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Chat not found'}


class TestSessionApi(BaseApiTest):
    def test_session_failure(self):
        # TODO @vpnvsk: reimplement this test
        # https://app.clickup.com/t/862k7raed
        pass
