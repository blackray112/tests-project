import React from 'react'
import {
  ChatPageMessageBox,
  ChatPageMessagesPaper,
} from './ChatPageMessages.styles'
import { Avatar } from '@design-system'
import { Typography } from '@mui/material'
import { ChatPageMessagesProps } from './types'
import { ChatPageMessageLocalTime } from './components/ChatPageMessagesLocalTime'

export const ChatPageMessages: React.FC<ChatPageMessagesProps> = ({
  isMessagesExist,
  messages,
}) => {
  if (!isMessagesExist) {
    return <Typography variant="h6">No messages yet</Typography>
  }

  return (
    <>
      {messages.map(message => (
        <ChatPageMessageBox key={message.id} type={message.type}>
          <Avatar message={message} />

          <ChatPageMessagesPaper variant="outlined" type={message.type}>
            <Typography>{message.text}</Typography>
            <ChatPageMessageLocalTime
              dateTimeString={message.created}
              type={message.type}
            />
          </ChatPageMessagesPaper>
        </ChatPageMessageBox>
      ))}
    </>
  )
}
