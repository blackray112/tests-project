import React from 'react'
import { FormTextField } from '@design-system'
import { Button } from '@mui/material'

export const SignupFormWrapper = () => {
  return (
    <>
      <FormTextField
        label="Nickname"
        size="medium"
        name="nickname"
        sx={{ marginBottom: '8px' }}
      />
      <FormTextField label="Email" size="medium" name="email" />
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        sx={{ marginTop: '16px' }}
      >
        Sign Up
      </Button>
    </>
  )
}
