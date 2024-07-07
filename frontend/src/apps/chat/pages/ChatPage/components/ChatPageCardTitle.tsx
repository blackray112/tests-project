import React from 'react'
import { Form } from '@design-system'
import {
  ChatPageCardEditIcon,
  ChatPageCardTitleEditWrapper,
  ChatPageCardTitleWrapper,
} from './ChatPageCardTitle.styles'
import { createChatValidationSchema } from '@apps/chat/CreateChatValidationSchema'
import { Typography } from '@mui/material'
import { CreateChatFormWrapper } from '@apps/chat/components'
import { ChatPageCardTitleProps } from './types'

export const ChatPageCardTitle: React.FC<ChatPageCardTitleProps> = ({
  virtualFriend,
  chat,
  isEditing,
  toggleNameEditing,
  onCancel,
  onChatNameUpdate,
}) => {
  const initialValues = {
    name: chat.name,
    notes: '',
  }
  const displayName = `${virtualFriend.name}: ${chat.name}`

  if (isEditing) {
    return (
      <ChatPageCardTitleEditWrapper>
        <Form
          initialValues={initialValues}
          onSubmit={onChatNameUpdate}
          validationSchema={createChatValidationSchema}
        >
          <CreateChatFormWrapper onCancel={onCancel} />
        </Form>
      </ChatPageCardTitleEditWrapper>
    )
  }
  return (
    <ChatPageCardTitleWrapper>
      <Typography variant="h4">{displayName}</Typography>
      <ChatPageCardEditIcon onClick={toggleNameEditing} />
    </ChatPageCardTitleWrapper>
  )
}
