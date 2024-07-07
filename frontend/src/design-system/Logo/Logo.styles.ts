import { styled } from '@mui/material'

export const LogoWrapper = styled('div')({
  position: 'relative',
  width: '50px',
  height: '75px',
})

export const LogoTextMain = styled('h2')({
  fontSize: '50px',
  position: 'absolute',
  background: 'var(--gradient-blue)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

export const LogoText = styled(LogoTextMain)({
  top: '13px',
  marginLeft: '13px',
  transform: 'rotate(180deg)',
  background: 'var(--gradient-violet)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})
