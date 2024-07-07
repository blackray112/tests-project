import React from 'react'
import { useRoutesPaths } from 'src/routes'
import { Link } from '@design-system'
import {
  StyledHeaderContainer,
  StyledHeaderLinksContainer,
  StyledHeaderTip,
} from './ChatListPageHeader.styles'

interface HeaderProps {
  virtualFriendName: string | undefined
  friendId: number
}

export const ChatListPageHeader: React.FC<HeaderProps> = ({
  virtualFriendName,
  friendId,
}) => {
  const { routes } = useRoutesPaths()

  return (
    <StyledHeaderContainer>
      {virtualFriendName}
      <StyledHeaderTip>Open to update friend`s data</StyledHeaderTip>
      <StyledHeaderLinksContainer>
        <Link path={routes.base()}>Back to Friends List</Link>
        <Link path={routes.createChat({}, { friendId })}>Create New Chat</Link>
      </StyledHeaderLinksContainer>
    </StyledHeaderContainer>
  )
}
