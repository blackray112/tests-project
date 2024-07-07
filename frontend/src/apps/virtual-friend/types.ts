import { DefaultState } from '../../types'

export interface CreateVirtualFriend {
  user_id: number
  name: string
  gpt_description: string
}

export type VirtualFriendCreateState = DefaultState

export interface VirtualFriend {
  id: number
  name: string
  gpt_description: string
  short_description: string
  long_description: string
  user_id?: number
}

export interface VirtualFriendListState extends DefaultState {
  list: VirtualFriend[]
}
