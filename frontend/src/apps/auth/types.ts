import { DefaultState } from '../../types'

export interface SignupUser {
  email: string
  nickname: string
}

export type SignupState = DefaultState

export interface SigninProps {
  email: string
}

export type LoginState = DefaultState
