import * as Yup from 'yup'

export const signinValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
})
