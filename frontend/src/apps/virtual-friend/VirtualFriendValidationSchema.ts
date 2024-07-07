import * as Yup from 'yup'

export const virtualFriendValidationSchema = Yup.object().shape({
  userId: Yup.number()
    .required('ID is required')
    .positive('ID must be a positive number'),
  name: Yup.string().min(2).required('Friend needs a name'),
  gpt_description: Yup.string().required(
    'Friend needs a data to form character',
  ),
})
