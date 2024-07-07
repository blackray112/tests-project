import * as React from 'react'
import { Form as FormikForm, FormikProps } from 'formik'

export type RenderProp<FormValues> = (
  props: FormikProps<FormValues>,
) => React.ReactNode

export interface CommonProps<FormValues> {
  children: React.ReactNode | RenderProp<FormValues>
  outsideValues?: Partial<FormValues>
  onValueChange?: (values: FormValues) => void
  className?: string
  skipDirtyCheck?: boolean
}

interface Props<FormValues> extends CommonProps<FormValues> {
  formikProps: FormikProps<FormValues>
}

function FormRenderProp<FormValues>({
  formikProps,
  children,
  outsideValues,
  onValueChange,
  className,
  skipDirtyCheck,
}: Props<FormValues>) {
  const { setFieldValue, values, dirty } = formikProps

  React.useEffect(() => {
    if (onValueChange && (dirty || skipDirtyCheck)) {
      onValueChange(values)
    }
  }, [values, onValueChange, dirty, skipDirtyCheck])

  React.useEffect(() => {
    if (outsideValues) {
      Object.keys(outsideValues).forEach(key => {
        setFieldValue(key, outsideValues[key])
      })
    }
  }, [outsideValues, setFieldValue])

  return (
    <FormikForm noValidate={true} className={className}>
      {typeof children === 'function' ? children(formikProps) : children}
    </FormikForm>
  )
}

export default FormRenderProp
