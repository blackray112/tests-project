import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePostChatMutation, useFetchChatListQuery } from '../api' // adjust this to point to your root reducer file
import { useRoutesPaths } from 'src/routes'
import { Form, FormSubmit, Loader } from '@design-system'
import { Box, Typography } from '@mui/material'
import { createChatValidationSchema } from '../CreateChatValidationSchema'
import { CreateChatFormWrapper } from '../components'

interface FormValues {
  friendId: number
  name: string
}

const initialValues = { friendId: 1, name: '' }

export const ChatCreatePage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { routes } = useRoutesPaths()
  const friendId = Number(searchParams.get('friendId'))
  const [postChat, { isLoading, isError, error, isSuccess }] =
    usePostChatMutation()
  const fetchChatListQuery = useFetchChatListQuery(friendId)

  useEffect(() => {
    if (isSuccess) {
      navigate(routes.base())
    }
  }, [routes, navigate, isSuccess])

  const onSubmit: FormSubmit<FormValues> = async values => {
    try {
      const result = await postChat(values).unwrap()
      if (result) {
        fetchChatListQuery.refetch()
        navigate(routes.chats({}, { friendId }))
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    console.log(error)
    return <div>Error: some error</div>
  }

  return (
    <Box padding={2}>
      <Typography variant="h5" component="h5" mb={2} sx={{ color: '#9c27b0' }}>
        Create chat
      </Typography>

      <Form
        initialValues={{ ...initialValues, friendId }}
        onSubmit={onSubmit}
        validationSchema={createChatValidationSchema}
      >
        <CreateChatFormWrapper />
      </Form>
    </Box>
  )
}
