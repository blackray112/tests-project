import { styled, Box, Typography, Button } from '@mui/material'

export const NotFoundContainer = styled(Box)({
  width: '100vw',
  height: '100vw',
  maxHeight: '100vh',
  padding: '2vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})

export const NotFoundLetterO = styled(Box)({
  width: '18vw',
  height: '19vw',
  borderRadius: '20px',
  background: '#5647FE',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '10px 10px 0 10px',
})

export const NotFoundLetterOImage = styled('img')({
  width: '100%',
  height: '100%',
})

export const NotFoundWrapper = styled(Box)({
  position: 'relative',
  textAlign: 'center',
})

export const NotFoundTypoGradient = styled(Typography)({
  background: 'var(--gradient-blue)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

export const NotFoundOops = styled(NotFoundTypoGradient)({
  fontSize: '7vw',
  marginBottom: '1vw',
  lineHeight: '1',
})

export const NotFoundText = styled(Typography)({
  fontSize: '1.2vw',
  marginBottom: '2vw',
})

export const NotFoundTypo = styled(NotFoundTypoGradient)({
  fontSize: '26vw',
  lineHeight: '.8',
  letterSpacing: '2vw',
})

export const NotFoundButton = styled(Button)({
  background: '#5647FE',
  borderRadius: '20px',
  fontSize: '1vw',
  fontWeight: '500',
  lineHeight: '1',
  padding: '1.5vw',
  minWidth: '22vw',
  width: 'fit-content',
  marginTop: '3vw',
  color: '#fff',
  fontFamily: 'Montserrat, sans-serif !important',
  textTransform: 'initial',
  '&:hover': {
    background: '#3DDCFF',
    cursor: 'pointer',
  },
})
