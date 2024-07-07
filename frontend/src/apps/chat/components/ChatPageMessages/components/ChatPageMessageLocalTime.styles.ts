import { MessageType } from '@apps/chat/types'
import { styled, Typography } from '@mui/material'
import { ChatPageMessagesTimeProps } from './types'

const authorTimeColor = {
  [MessageType.USER]: 'green',
  [MessageType.BOT]: 'blue',
}

export const ChatPageMessagesTime = styled(
  Typography,
)<ChatPageMessagesTimeProps>(({ type }) => ({
  color: authorTimeColor[type],
  fontSize: '12px',
  fontWeight: '700',
}))
