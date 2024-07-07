import React from 'react'
import { useFormikContext } from 'formik'
import { FormControl, FormHelperText } from '@mui/material'
import { StyledTextareaAutosize } from './FormTextarea.styles'

export type FormTextareaProps = {
  name: string
  label: string
  type?: string
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
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

  const handleChange = event => {
    const rawValue = event.target.value
    const value = rest.type === 'number' ? Number(rawValue) : rawValue
    setFieldValue(name, value)
  }

  const handleBlur = () => {
    setFieldTouched(name)
  }

  return (
    <FormControl error={error} fullWidth>
      <StyledTextareaAutosize
        aria-label={label}
        placeholder={label}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default FormTextarea
