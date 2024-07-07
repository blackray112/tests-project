import React from 'react'
import { Typography, CardContent } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRoutesPaths } from 'src/routes'
import { DisplayError, Loader } from '@design-system'
import { useFetchChatListQuery } from '../../api'
import {
  useFetchVirtualFriendByIdQuery,
  usePatchVirtualFriendMutation,
} from '@apps/virtual-friend/api'
import { ChatListPageBox, ChatListPageCard } from './ChatListPage.styles'
import { ChatListPageAccordion } from './components'
import { VirtualFriendFormValues } from '@apps/chat/types'

export const ChatListPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { routes } = useRoutesPaths()
  const friendId = Number(searchParams.get('friendId'))
  const {
    data: chatList,
    isFetching: isChatListFetching,
    isError: isChatListError,
    error: chatListError,
  } = useFetchChatListQuery(friendId)

  const {
    data: virtualFriend,
    isFetching: isVirtualFriendFetching,
    isError: isVirtualFriendError,
    error: virtualFriendError,
    refetch: refetchVirtualFriend,
  } = useFetchVirtualFriendByIdQuery(friendId)

  const [
    patchVirtualFriend,
    {
      isLoading: isPatchVirtualFriendLoading,
      isError: isPatchVirtualFriendError,
      error: patchVirtualFriendError,
    },
  ] = usePatchVirtualFriendMutation()

  const initialValues = {
    userId: friendId,
    name: virtualFriend?.name || '',
    gpt_description: virtualFriend?.gpt_description || '',
    short_description: virtualFriend?.short_description || '',
    long_description: virtualFriend?.long_description || '',
  }

  const handleOpenChat = (id: number) => {
    const url = routes.chat({ id })
    navigate(url, { state: { virtualFriend: virtualFriend } })
  }

  if (
    isChatListFetching ||
    isVirtualFriendFetching ||
    isPatchVirtualFriendLoading
  ) {
    return <Loader />
  }

  if (isChatListError || isVirtualFriendError || isPatchVirtualFriendError) {
    return (
      <DisplayError
        error={chatListError || virtualFriendError || patchVirtualFriendError}
      />
    )
  }

  const onSubmit = async (payload: VirtualFriendFormValues) => {
    try {
      const result = await patchVirtualFriend({
        virtualFriendId: friendId,
        payload,
      }).unwrap()
      if (result) {
        refetchVirtualFriend()
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <ChatListPageBox>
      <ChatListPageAccordion
        friendId={friendId}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />

      {chatList?.map((chat, _) => (
        <ChatListPageCard key={chat.id} onClick={() => handleOpenChat(chat.id)}>
          <CardContent>
            <Typography variant="h6">{chat.name}</Typography>
          </CardContent>
        </ChatListPageCard>
      ))}
    </ChatListPageBox>
  )
}
