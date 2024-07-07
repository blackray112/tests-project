import { ChatMessage } from '@apps/chat/types'

export interface ChatPageMessagesProps {
  isMessagesExist: boolean
  messages: ChatMessage[]
}

export interface ChatPageMessageProps {
  type: string
}
