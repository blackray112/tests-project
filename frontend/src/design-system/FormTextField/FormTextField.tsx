// TODO: Add Debounce text change
// TODO: Fix validation before user click to Field
import * as React from 'react'
import { TextFieldProps } from '@mui/material/TextField'
import { useFormikContext } from 'formik'
import TextField from '../TextField'

export type FormTextFieldProps = {
  name: string
}

export type CustomFormTextFieldProps = TextFieldProps & FormTextFieldProps

const FormTextField: React.FC<CustomFormTextFieldProps> = ({
  name,
  disabled,
  ...rest
}) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    values,
    isSubmitting,
    touched,
    submitCount,
  } = useFormikContext<{}>()
  const error =
    errors[name] && (touched[name] || isSubmitting || submitCount > 0)
  const errorMessage = (error ? errors[name] : undefined) as string

  const handleType = event => {
    const rawValue = event.target.value
    const value = rest.type === 'number' ? Number(rawValue) : rawValue
    setFieldValue(name, value)
  }

  const handleBlur = () => {
    setFieldTouched(name)
  }

  return (
    <TextField
      aria-label={name}
      name={name}
      value={values[name]}
      error={!!error}
      helperText={errorMessage}
      onBlur={handleBlur}
      fullWidth
      onChange={handleType}
      disabled={disabled || isSubmitting}
      {...rest}
    />
  )
}

export default FormTextField
