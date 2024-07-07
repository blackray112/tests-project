import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFetchVirtualFriendListQuery } from '../api'
import { useRoutesPaths } from 'src/routes'
import { DisplayError, Link, Loader } from '@design-system'

export const VirtualFriendListPage: React.FC = () => {
  const { data, isLoading, isError, error } = useFetchVirtualFriendListQuery()
  const navigate = useNavigate()
  const { routes } = useRoutesPaths()

  const handleOpenChatList = (id: number) => {
    navigate(routes.chats({}, { friendId: id }))
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <DisplayError error={error} />
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Link path={routes.createFriend()}>Add New Friend</Link>

      {data?.map((friend, index) => (
        <Card
          key={index}
          onClick={() => handleOpenChatList(friend.id)}
          style={{ margin: '10px', width: '100%', cursor: 'pointer' }}
        >
          <CardContent>
            <Typography variant="h6">{friend.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
