import React from 'react'
import { FormTextField, FormTextarea, HelperTip } from '@design-system'
import { Button } from '@mui/material'
import { Info, AlertOctagon } from 'react-feather'
import { gptDescriptionHelperTip, nameHelperTip } from './static'

export const CreateVirtualFriendFormWrapper: React.FC = () => {
  return (
    <>
      <FormTextField
        label="Name"
        size="medium"
        name="name"
        sx={{ marginBottom: '8px' }}
      />

      <HelperTip icon={<Info />}>{nameHelperTip}</HelperTip>

      <FormTextarea
        label="GPT description"
        name="gpt_description"
        minRows={5}
      />

      <HelperTip icon={<AlertOctagon />}>{gptDescriptionHelperTip}</HelperTip>

      <FormTextarea
        label="Short description"
        name="short_description"
        minRows={10}
      />
      <FormTextarea
        label="Long description"
        name="long_description"
        minRows={15}
      />

      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        sx={{ marginTop: '16px' }}
      >
        Submit
      </Button>
    </>
  )
}
