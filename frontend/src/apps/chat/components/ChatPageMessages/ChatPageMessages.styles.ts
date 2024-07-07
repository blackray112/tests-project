import { MessageType } from '@apps/chat/types'
import { styled, Box, Paper } from '@mui/material'
import { ChatPageMessageProps } from './types'

const author = {
  [MessageType.USER]: 'row-reverse',
  [MessageType.BOT]: 'row',
}

const authorMobile = {
  [MessageType.USER]: 'flex-end',
  [MessageType.BOT]: 'flex-start',
}

export const ChatPageMessageBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'type',
})<ChatPageMessageProps>(({ type }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '16px',
  flexDirection: author[type],
  '@media (max-width: 600px)': {
    alignItems: authorMobile[type],
    flexDirection: 'column',
    gap: '10px',
  },
}))

export const ChatPageMessagesPaper = styled(Paper, {
  shouldForwardProp: prop => prop !== 'type',
})<ChatPageMessageProps>(({ type }) => ({
  width: 'fit-content',
  maxWidth: '80%',
  padding: '16px',
  margin: '0 16px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  flexDirection: author[type],
  '@media (max-width: 600px)': {
    width: '100%',
    maxWidth: '85%',
    flexDirection: 'column',
  },
}))
