import React from 'react'
import { Form } from '@design-system'
import { SignupUser } from '@apps/auth/types'
import { SignupFormWrapper } from './SignupFormWrapper'
import { Box, Typography } from '@mui/material'
import { signupValidationSchema } from '../SignUpValidationSchema'

interface SignupFormProps {
  onSubmit: (values: SignupUser) => Promise<void>
}

const initialValues = {
  email: '',
  nickname: '',
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  return (
    <Box padding={2}>
      <Typography variant="h5" component="h5" mb={2} sx={{ color: '#9c27b0' }}>
        Sign up
      </Typography>

      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signupValidationSchema}
      >
        <SignupFormWrapper />
      </Form>
    </Box>
  )
}
