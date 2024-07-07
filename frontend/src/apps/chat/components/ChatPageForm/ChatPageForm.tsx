import React from 'react'
import { Form, TextField } from '@design-system'
import { Button } from '@mui/material'
import { ChatPageFormBox } from './ChatPageForm.styles'
import { ChatPageFormProps } from './types'

export const ChatPageForm: React.FC<ChatPageFormProps> = ({
  isLoading,
  messageText,
  handleNewMessageChange,
  handleNewMessageSubmit,
}) => {
  return (
    <Form onSubmit={handleNewMessageSubmit} initialValues={{ newMessage: '' }}>
      <ChatPageFormBox>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New Message"
          name="newMessage"
          value={messageText}
          onChange={handleNewMessageChange}
          style={{ marginRight: '16px' }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !messageText.length}
        >
          Send
        </Button>
      </ChatPageFormBox>
    </Form>
  )
}
