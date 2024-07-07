import { Box, styled } from '@mui/material'
import { PenTool } from 'react-feather'

export const ChatPageCardTitleWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: '16px',
})

export const ChatPageCardTitleEditWrapper = styled(ChatPageCardTitleWrapper)({
  justifyContent: 'center',
})

export const ChatPageCardEditIcon = styled(PenTool)({
  width: '20px',
  height: '20px',
  marginLeft: '8px',
  transition: '.5s',
  cursor: 'pointer',
  '&:hover': {
    color: 'blue',
  },
})
