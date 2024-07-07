import { Box, Typography, styled } from '@mui/material'

export const HelperTipBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  color: 'gray',
  padding: '8px',
  borderRadius: '5px',
}))

export const HelperTipText = styled(Typography)({
  fontSize: '14px',
})

export const HelperTipIcon = styled('div')({
  fontSize: '30px',
  marginRight: '8px',
})
