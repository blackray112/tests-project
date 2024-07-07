import { DefaultState } from '../../types'

export interface CreateChat {
  virtual_friend_id: number
  name: string
  gpt_description: string
}

export type ChatCreateState = DefaultState

export interface ChatList {
  id: number
  name: string
  gpt_description: string
}

export interface ChatListState extends DefaultState {
  list: ChatList[]
}

export enum MessageType {
  SYSTEM = 'system',
  BOT = 'ai',
  USER = 'human',
}

export interface ChatMessage {
  chat_id: number
  created: string
  id: number
  modified: string
  openai_response: {}
  text: string
  type: MessageType
}

export interface ChatDetails {
  id: number
  name: string
  messages?: ChatMessage[]
}

export interface ChatState {
  chat: DefaultState & {
    details: ChatDetails | null
  }
  messages: DefaultState & {
    list: ChatMessage[]
  }
}

export interface ChatMessageCreate {
  chat_id: number
  text: string
}

export type ChatMessageCreateState = DefaultState

export interface VirtualFriendFormValues {
  userId: number
  name: string
  gpt_description: string
  short_description?: string
  long_description?: string
}

export interface ChatNamePatchValues {
  name: string
  notes: string
}
