import { DefaultState } from '../../types'

export interface User {
  id: number
  email: string
  about: string
}

export interface UserState extends DefaultState {
  user: User | null
}
