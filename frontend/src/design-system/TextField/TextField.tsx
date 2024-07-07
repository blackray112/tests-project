import * as React from 'react'
import { TextFieldProps } from '@mui/material/TextField'
import MuiTextField from '@mui/material/TextField'

const TextField: React.FC<TextFieldProps> = props => {
  return (
    <MuiTextField
      {...props}
      InputLabelProps={{
        style: {
          pointerEvents: 'auto',
        },
      }}
      label={props.label}
    />
  )
}

export default TextField
