import React from 'react'
import { AccordionSummary, AccordionDetails } from '@mui/material'
import { Form } from '@design-system'
import { virtualFriendValidationSchema } from '@apps/virtual-friend/VirtualFriendValidationSchema'
import { CreateVirtualFriendFormWrapper } from '@apps/virtual-friend/components/CreateVirtualFriendFormWrapper'
import { VirtualFriendFormValues } from '@apps/chat/types'
import {
  StyledAccordion,
  StyledExpandMore,
} from './ChatListPageAccordion.styles'
import { ChatListPageHeader } from '../ChatListPageHeader'

interface ChatListAccordionProps {
  friendId: number
  initialValues: VirtualFriendFormValues
  onSubmit: (payload: VirtualFriendFormValues) => Promise<void>
}

export const ChatListPageAccordion: React.FC<ChatListAccordionProps> = ({
  friendId,
  initialValues,
  onSubmit,
}) => {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<StyledExpandMore />}>
        <ChatListPageHeader
          friendId={friendId}
          virtualFriendName={initialValues?.name}
        />
      </AccordionSummary>

      <AccordionDetails>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={virtualFriendValidationSchema}
        >
          <CreateVirtualFriendFormWrapper />
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  )
}
