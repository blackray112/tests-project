import React from 'react'
import { HelperTip } from '@design-system'
import { Button } from '@mui/material'
import { Info } from 'react-feather'
import {
  CreateChatButtons,
  CreateChatTextField,
} from './CreateChatFormWrapper.styles'
import { CreateChatFormWrapperProps } from './types'

export const CreateChatFormWrapper: React.FC<CreateChatFormWrapperProps> = ({
  onCancel,
}) => {
  return (
    <>
      <CreateChatTextField label="Name" size="medium" name="name" />

      <HelperTip icon={<Info />}>
        You should create a chat name wisely, so the name should says what the
        chat about, for example: First Chat, with better story, with adding some
        traits and etc.
      </HelperTip>

      <CreateChatButtons>
        <Button type="submit" variant="outlined" color="secondary">
          Submit
        </Button>

        {onCancel && (
          <Button
            variant="outlined"
            color="primary"
            onClick={onCancel}
            sx={{ marginLeft: '16px' }}
          >
            Cancel
          </Button>
        )}
      </CreateChatButtons>
    </>
  )
}
