import { ChangeEvent } from 'react'

export interface ChatPageFormProps {
  isLoading: boolean
  messageText: string
  handleNewMessageChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNewMessageSubmit: () => Promise<void>
}
