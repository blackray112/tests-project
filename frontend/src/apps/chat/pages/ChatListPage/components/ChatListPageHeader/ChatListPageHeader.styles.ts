import { Box, Typography, styled } from '@mui/material'

export const StyledHeaderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})

export const StyledHeaderLinksContainer = styled(Box)({
  display: 'flex',
  gap: '0 16px',
})

export const StyledHeaderTip = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  letterSpacing: '3px',
})
