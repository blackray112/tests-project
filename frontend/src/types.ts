import { IDLE, LOADING, FAILED, SUCCEEDED } from './apps/constants/constants'

export type DefaultFetchingState =
  | typeof IDLE
  | typeof LOADING
  | typeof SUCCEEDED
  | typeof FAILED

export type DefaultError = {
  detail: string
}

export type DefaultState = {
  status: DefaultFetchingState
  error?: DefaultError
}
