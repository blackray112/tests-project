// @ts-nocheck
import React from 'react'
import {
  useFormikContext,
  Field,
  Formik,
  FormikProps,
  FormikHelpers,
  FieldProps,
  getIn,
} from 'formik'
import FormRenderProp, { CommonProps } from './FormRenderProp'

export type FormSubmit<FormValues> = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
) => Promise<void>

export type FormProps<FormValues> = FormikProps<FormValues>

export type FormFieldProps<V = any, FormValues = any> = FieldProps<
  V,
  FormValues
>

export const useFormContext = useFormikContext
export const FormField = Field
export const getFormFieldValue = getIn

export interface FormComponentProps<FormValues>
  extends CommonProps<FormValues> {
  initialValues: FormValues
  onSubmit: FormSubmit<FormValues>
  validationSchema?: any
  onReset?: (values: FormValues) => void
}

function Form<FormValues>({
  children,
  onSubmit,
  onReset,
  onValueChange,
  initialValues,
  validationSchema,
  outsideValues,
  className,
  skipDirtyCheck,
}: FormComponentProps<FormValues>) {
  const handleSubmit: FormSubmit<FormValues> = async (values, formikBag) => {
    await onSubmit(values, formikBag)
    formikBag.setSubmitting(false)
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onReset={onReset}
    >
      {formikProps => (
        <FormRenderProp<FormValues>
          formikProps={formikProps}
          outsideValues={outsideValues}
          onValueChange={onValueChange}
          className={className}
          skipDirtyCheck={skipDirtyCheck}
        >
          {children}
        </FormRenderProp>
      )}
    </Formik>
  )
}

export default Form
