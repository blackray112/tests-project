import * as Yup from 'yup'

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  nickname: Yup.string().min(2).required('Nickname is required'),
})
