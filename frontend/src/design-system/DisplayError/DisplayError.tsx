import React from 'react'
import { StyledErrorBox } from './DisplayError.styles'
import { Typography } from '@mui/material'
import { DisplayErrorProps } from './types'

const DisplayError: React.FC<DisplayErrorProps> = ({ error }) => {
  return (
    <StyledErrorBox>
      <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>
    </StyledErrorBox>
  )
}

export default DisplayError
