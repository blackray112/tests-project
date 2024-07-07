import React from 'react'
import { useAppDispatch } from '../../../../hooks'
import { loginUser } from '../../slices/login'
import { SigninForm } from '../components/SigninForm'
import { SigninProps } from '@apps/auth/types'

export const SigninPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = async (values: SigninProps) => {
    dispatch(loginUser(values))
  }

  return <SigninForm onSubmit={onSubmit} />
}
