import React from 'react'
import { useLocalTime } from 'src/hooks'
import { ChatPageMessageLocalTimeProps } from './types'
import { ChatPageMessagesTime } from './ChatPageMessageLocalTime.styles'

export const ChatPageMessageLocalTime: React.FC<
  ChatPageMessageLocalTimeProps
> = ({ dateTimeString, type }) => {
  const localDateTime = useLocalTime(dateTimeString)

  return (
    <ChatPageMessagesTime type={type}>{localDateTime}</ChatPageMessagesTime>
  )
}
