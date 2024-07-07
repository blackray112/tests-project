import { PageContainer } from '@design-system'
import { List, styled } from '@mui/material'

export const WelcomeHeaderContainer = styled(PageContainer)({
  paddingTop: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
})

export const WelcomeNavigation = styled(List)({
  display: 'flex',
  gap: '50px',
})

export const WelcomeSignupActions = styled(List)({
  display: 'flex',
  gap: '20px',
})
