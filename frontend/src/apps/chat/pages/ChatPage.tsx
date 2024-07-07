import React, { useState, useEffect, useRef } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { useParams } from 'react-router'
import { MessageType } from '../types'
import {
  useFetchChatDetailsQuery,
  useFetchChatMessagesQuery,
  usePostChatMessageMutation,
} from '../api'
import { Loader } from '@design-system'

const ChatPage = () => {
  const { id } = useParams()

  const [messageText, setMessageText] = useState('')

  const chatState = useFetchChatDetailsQuery(Number(id))
  const messagesState = useFetchChatMessagesQuery(Number(id))
  const [postChatMessage, { isLoading }] = usePostChatMessageMutation()

  const handleNewMessageChange = event => {
    setMessageText(event.target.value)
  }

  const handleNewMessageSubmit = async event => {
    event.preventDefault()
    if (id) {
      try {
        await postChatMessage({
          chatId: Number(id),
          text: messageText,
        }).unwrap()
        messagesState.refetch()
      } catch (err) {
        throw new Error(err)
      }
      setMessageText('')
    }
  }

  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messagesState.data])

  const renderContent = () => {
    if (chatState.isLoading || messagesState.isLoading) {
      return <Loader />
    }

    if (chatState.isError || messagesState.isError) {
      return (
        <Typography variant="h6">Failed to load chat or messages</Typography>
      )
    }

    if (chatState.data && messagesState.data) {
      const { data: chatData } = chatState
      const { data: messagesData } = messagesState

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h4">{chatData.name}</Typography>
          <Box
            ref={chatContainerRef}
            sx={{ mt: 2, mb: 3, overflowY: 'auto', flex: '1 1 auto' }}
          >
            {messagesData.length ? (
              messagesData.map(message => (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
                  key={message.id}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        message.type === MessageType.SYSTEM
                          ? 'red'
                          : message.type === MessageType.BOT
                          ? 'blue'
                          : 'green',
                    }}
                  >
                    {message.type[0]}
                  </Avatar>
                  <Paper variant="outlined" sx={{ p: 2, ml: 2, flex: 1 }}>
                    <Typography>{message.text}</Typography>
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography variant="h6">No messages yet</Typography>
            )}
          </Box>

          <form
            onSubmit={handleNewMessageSubmit}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newMessage"
              label="New Message"
              name="newMessage"
              value={messageText}
              onChange={handleNewMessageChange}
              style={{ marginRight: '16px' }}
            />

            {isLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
            )}
          </form>
        </Box>
      )
    }

    return null
  }

  return (
    <Container sx={{ height: '100vh', overflow: 'hidden' }}>
      {renderContent()}
    </Container>
  )
}

export default ChatPage
