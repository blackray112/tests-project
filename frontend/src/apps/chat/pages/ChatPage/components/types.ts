import { ChatDetails, ChatNamePatchValues } from '@apps/chat/types'
import { VirtualFriend } from '@apps/virtual-friend/types'

export interface ChatPageCardTitleProps {
  virtualFriend: VirtualFriend
  chat: ChatDetails
  isEditing: boolean
  toggleNameEditing: () => void
  onCancel: () => void
  onChatNameUpdate: (payload: ChatNamePatchValues) => Promise<void>
}
