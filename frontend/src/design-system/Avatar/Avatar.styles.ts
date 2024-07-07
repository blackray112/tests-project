import { MessageType } from '@apps/chat/types'
import { Avatar as MuiAvatar, styled } from '@mui/material'
import { StyledAvatarProps } from './types'

const avatarColors = {
  [MessageType.SYSTEM]: 'red',
  [MessageType.BOT]: 'blue',
}

export const StyledAvatar = styled(MuiAvatar)<StyledAvatarProps>(
  ({ type }) => ({
    backgroundColor: avatarColors[type] || 'green',
    margin: '0 8px',
  }),
)
