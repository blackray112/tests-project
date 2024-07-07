import React from 'react'
import { Form } from '@design-system'
import { SigninFormWrapper } from './SigninFormWrapper'
import { SigninProps } from '@apps/auth/types'
import { signinValidationSchema } from '../SigninValidationSchema'
import { Box, Typography } from '@mui/material'

interface SigniFormProps {
  onSubmit: (values: SigninProps) => Promise<void>
}

const initialValues = {
  email: '',
}

export const SigninForm: React.FC<SigniFormProps> = ({ onSubmit }) => {
  return (
    <Box padding={2}>
      <Typography variant="h5" component="h5" mb={2} sx={{ color: '#9c27b0' }}>
        Sign in
      </Typography>

      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signinValidationSchema}
      >
        <SigninFormWrapper />
      </Form>
    </Box>
  )
}
