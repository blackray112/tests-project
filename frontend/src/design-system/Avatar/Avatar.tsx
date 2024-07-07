import React from 'react'
import { ChatMessage } from '@apps/chat/types'
import { StyledAvatar } from './Avatar.styles'

interface AvatarProps {
  message: ChatMessage
}

const Avatar: React.FC<AvatarProps> = ({ message }) => {
  return <StyledAvatar type={message.type}>{message.type[0]}</StyledAvatar>
}

export default Avatar
