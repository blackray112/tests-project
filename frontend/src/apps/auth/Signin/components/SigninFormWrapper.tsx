import React from 'react'
import { FormTextField } from '@design-system'
import { Button } from '@mui/material'

export const SigninFormWrapper = () => {
  return (
    <>
      <FormTextField label="Email" size="medium" name="email" />
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        sx={{ marginTop: '16px' }}
      >
        Loginasdsa
        asdsad
      </Button>
    </>
  )
}
