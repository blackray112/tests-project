import { Box, styled } from '@mui/material'

const PageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1135px',
  margin: '0 auto',
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1600px',
  },
}))

export default PageContainer
