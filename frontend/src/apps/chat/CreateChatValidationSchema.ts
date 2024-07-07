import * as Yup from 'yup'

export const createChatValidationSchema = Yup.object().shape({
  name: Yup.string().min(2).required('Friend needs a name'),
})
