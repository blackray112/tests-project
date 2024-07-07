import unittest
from unittest import mock
from unittest.mock import MagicMock, patch

from langchain.schema import LLMResult

from ai.classes import (
    CustomCallbackHandler,
    CustomConversationChain,
    ShortChatMessageHistory,
    ShortConversationBufferMemory,
)
from ai.manager import AIManager
from chats.enums import MessageType
from chats.models import Message


class TestAIManager(unittest.TestCase):
    @patch('ai.manager.CustomConversationChain')
    @patch('ai.manager.CustomCallbackHandler')
    def test_create_bot_message(self, mock_chain: MagicMock, mock_handler: MagicMock):
        # Create mock objects and set return values
        mock_handler.return_value = MagicMock()
        mock_chain.return_value = MagicMock(run=MagicMock(), callbacks=[mock_handler])
        chat_memory = MagicMock()
        chat_memory.new_bot_message = MagicMock()

        # Create mock objects for virtual_friend and user, and set required fields
        mock_virtual_friend = MagicMock()
        mock_virtual_friend.name = 'Virtual Friend'
        mock_virtual_friend.gpt_description = 'A virtual friend'
        mock_virtual_friend.short_description = 'Short description'
        mock_virtual_friend.long_description = 'Full description'

        mock_user = MagicMock()
        mock_user.email = 'user@example.com'
        mock_user.about = 'About the user'
        mock_user.nickname = 'User'
        mock_user.hashed_password = 'hashed_password'  # noqa: S105
        mock_user.is_active = True
        mock_user.is_superuser = False
        mock_user.is_verified = True

        # Create an instance of AIManager
        manager = AIManager(
            openai_api_key='API_KEY',
            chat_id=1,
            virtual_friend=mock_virtual_friend,
            user=mock_user,
            user_text='Hello',
        )
        manager.short_memory.chat_memory = chat_memory

        # Call the method we want to test
        message = manager.create_bot_message()

        # Assert that the correct methods are called and the return value is correct
        mock_chain.assert_called_once_with(
            history=mock.ANY,
        )

        assert message == chat_memory.new_bot_message


# DEFERRED TESTS
# class TestLongVectorStoreRetrieverMemory(unittest.TestCase):
#
#     @patch('ai.classes.VectorStoreRetrieverMemory')
#     def test_save_context(self, mock_vector_store_retriever_memory):
#         # Create an instance of LongVectorStoreRetrieverMemory
#         memory = LongVectorStoreRetrieverMemory(ai_prefix='AI', human_prefix='Human')
#
#         # Set the inputs and outputs for the save_context method
#         inputs = {'input': 'Hello'}
#         outputs = {'response': 'Hi'}
#
#         # Call the save_context method
#         memory.save_context(inputs, outputs)
#
#         # Assert that the add_documents method of the vector store retriever is called with the correct arguments
#         mock_vector_store_retriever_memory.return_value.add_documents.assert_called_once_with(
#             [{'Human': 'Hello', 'AI': 'Hi'}]
#         )


class TestShortChatMessageHistory(unittest.TestCase):
    @patch('ai.classes.session')
    @patch('ai.classes.asc')
    def test_messages(self, mock_asc: MagicMock, mock_session: MagicMock):
        # Create a mock Message object
        mock_message = MagicMock()
        mock_message.type = MessageType.CHAT
        mock_message.text = 'System message'

        # Create a mock UnaryExpression object for the desc function
        mock_desc_expression = MagicMock()

        # Set the return value of the mock desc function
        mock_asc.return_value = mock_desc_expression

        # Set the return value of the query method of the mock session
        query = mock_session.query.return_value
        filtered_query = query.filter_by.return_value
        ordered_query = filtered_query.order_by.return_value
        limited_query = ordered_query.limit.return_value
        limited_query.all.return_value = [mock_message]

        # Create an instance of ShortChatMessageHistory
        chat_message_history = ShortChatMessageHistory(chat_id=1)

        # Call the messages property
        messages = chat_message_history.messages

        # Assert that the query method of the mock session is called with the correct arguments
        mock_session.query.assert_called_once_with(Message)
        query = mock_session.query.return_value
        query.filter_by.assert_called_once_with(chat_id=1)
        query.filter_by.return_value.order_by.assert_called_once_with(
            mock_desc_expression,
        )
        query.filter_by.return_value.order_by.return_value.limit.assert_called_once_with(
            6,
        )
        query.filter_by.return_value.order_by.return_value.limit.return_value.all.assert_called_once()

        # Assert that the return value is correct
        assert len(messages) == 1
        assert messages[0].type == MessageType.CHAT
        assert messages[0].content == 'System message'


class TestShortConversationBufferMemory(unittest.TestCase):
    @patch('ai.classes.ShortChatMessageHistory')
    def test_short_memory(self, mock_short_chat_message_history: MagicMock):
        # Create an instance of ShortChatMessageHistory with the correct chat_id
        chat_history_instance = ShortChatMessageHistory(chat_id=1)

        # Set the return_value of the mock object to the real instance
        mock_short_chat_message_history.return_value = chat_history_instance

        # Create an instance of ShortConversationBufferMemory
        memory = ShortConversationBufferMemory(
            chat_memory=mock_short_chat_message_history.return_value,
        )

        # Call the short_memory property
        short_memory = memory.chat_memory

        # Assert that the return value is correct
        assert short_memory == chat_history_instance


class TestCustomConversationChain(unittest.TestCase):
    def test_validate_prompt_input_variables(self):
        # Create a dictionary of values to pass to the root_validator
        values = {
            'memory': MagicMock(memory_variables=['long_memory', 'short_memory']),
            'input_key': 'input',
            'prompt': MagicMock(
                input_variables=['long_memory', 'short_memory', 'input', 'description'],
            ),
        }

        # Call the validate_prompt_input_variables method with the values dictionary
        result = CustomConversationChain.validate_prompt_input_variables(values)

        # Assert that the result is the same as the input values
        assert result == values


class TestCustomCallbackHandler(unittest.TestCase):
    def test_on_llm_end(self):
        # Create a mock ShortChatMessageHistory object
        mock_history = ShortChatMessageHistory(chat_id=1)

        # Create an instance of CustomCallbackHandler
        callback_handler = CustomCallbackHandler(history=mock_history)

        # Create a mock LLMResult object
        mock_response = MagicMock(spec=LLMResult)
        mock_response.llm_output = {'response': 'Hi'}

        # Call the on_llm_end method with the mock response
        callback_handler.on_llm_end(mock_response)

        # Assert that the generation_info property of the mock history is set correctly
        assert mock_history.generation_info == mock_response.llm_output
