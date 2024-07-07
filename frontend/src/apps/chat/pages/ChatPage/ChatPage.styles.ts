import { styled, Box, Container } from '@mui/material'

export const ChatPageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
})

export const ChatPageMessagesContainer = styled(Box)({
  margin: '8px 0 12px 0',
  overflowY: 'auto',
  flex: '1 1 auto',
})

export const StyledContainer = styled(Container)({
  height: '100vh',
  overflow: 'hidden',
})
