import { DefaultState } from './types'
import { IDLE } from './apps/constants/constants'

export const DefaultInitialState: DefaultState = {
  status: IDLE,
  error: undefined,
}
