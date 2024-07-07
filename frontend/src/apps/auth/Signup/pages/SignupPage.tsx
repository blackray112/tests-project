import React from 'react'
import { signupUser } from '@apps/auth/slices/signup'
import { SignupUser } from '@apps/auth/types'
import { SignupForm } from '../components/SignupForm'
import { useAppDispatch } from 'src/hooks'

export const SignupPage = () => {
  const dispatch = useAppDispatch()

  const handleSignUp = async (formData: SignupUser) => {
    dispatch(signupUser(formData))
  }

  return <SignupForm onSubmit={handleSignUp} />
}
