import { styled } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export const StyledLink = styled(RouterLink)({
  backgroundColor: 'transparent',
  fontSize: '16px',
  fontWeight: '700',
  borderRadius: '4px',
  textTransform: 'capitalize',
  textDecoration: 'none',
  color: 'var(--black)',
  '&:hover': {
    color: 'var(--main-blue)',
    transition: 'var(--duration-short)',
  },
})
