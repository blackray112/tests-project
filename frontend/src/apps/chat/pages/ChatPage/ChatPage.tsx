import React, { useState, ChangeEvent } from 'react'
import { useLocation, useParams } from 'react-router'
import {
  useFetchChatDetailsQuery,
  useFetchChatMessagesQuery,
  usePatchChatDetailsMutation,
  usePostChatMessageMutation,
} from '../../api'
import { Loader, DisplayError } from '@design-system'
import {
  ChatPageContainer,
  ChatPageMessagesContainer,
  StyledContainer,
} from './ChatPage.styles'
import { ChatPageForm, ChatPageMessages } from '@apps/chat/components'
import { ChatPageCardTitle } from './components/ChatPageCardTitle'
import { ChatNamePatchValues } from '@apps/chat/types'
import { LocationState } from './types'
import { useScrollToBottom } from 'src/hooks'

export const ChatPage: React.FC = () => {
  const { id } = useParams()
  const [messageText, setMessageText] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const chatState = useFetchChatDetailsQuery(Number(id))
  const messagesState = useFetchChatMessagesQuery(Number(id))
  const location = useLocation()
  const virtualFriend = (location.state as LocationState)?.virtualFriend
  const [postChatMessage, { isLoading }] = usePostChatMessageMutation()
  const [patchChatDetails, patchChatDetailsResult] =
    usePatchChatDetailsMutation()

  const handleNewMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value)
  }

  const handleNewMessageSubmit = async () => {
    if (id) {
      try {
        await postChatMessage({
          chatId: Number(id),
          text: messageText,
        }).unwrap()
        messagesState.refetch()
      } catch (err) {
        throw new Error(err)
      }
      setMessageText('')
    }
  }

  const toggleNameEditing = () => setIsEditing(prev => !prev)

  const cancelEditing = () => setIsEditing(false)

  const onChatNameUpdate = async (payload: ChatNamePatchValues) => {
    try {
      await patchChatDetails({
        chatId: Number(id),
        payload,
      }).unwrap()
      setIsEditing(false)
      chatState.refetch()
    } catch (err) {
      throw new Error(err)
    }
  }

  const chatContainerRef = useScrollToBottom(messagesState.data)

  const renderContent = () => {
    if (
      chatState.isLoading ||
      messagesState.isLoading ||
      patchChatDetailsResult.isLoading
    ) {
      return <Loader />
    }

    if (
      chatState.isError ||
      messagesState.isError ||
      patchChatDetailsResult.isError
    ) {
      return (
        <DisplayError
          error={
            chatState.error ||
            messagesState.error ||
            patchChatDetailsResult.error
          }
        />
      )
    }

    if (chatState.data && messagesState.data) {
      const { data: chat } = chatState
      const { data: messages } = messagesState

      return (
        <ChatPageContainer>
          <ChatPageCardTitle
            virtualFriend={virtualFriend}
            chat={chat}
            isEditing={isEditing}
            toggleNameEditing={toggleNameEditing}
            onCancel={cancelEditing}
            onChatNameUpdate={onChatNameUpdate}
          />

          <ChatPageMessagesContainer ref={chatContainerRef}>
            <ChatPageMessages
              isMessagesExist={!!messagesState?.data.length}
              messages={messages}
            />
          </ChatPageMessagesContainer>

          <ChatPageForm
            isLoading={isLoading}
            messageText={messageText}
            handleNewMessageChange={handleNewMessageChange}
            handleNewMessageSubmit={handleNewMessageSubmit}
          />
        </ChatPageContainer>
      )
    }

    return null
  }

  return <StyledContainer>{renderContent()}</StyledContainer>
}
