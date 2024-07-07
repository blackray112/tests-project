import React from 'react'
import { useNavigate } from 'react-router-dom' // adjust this to point to your root reducer file
import {
  useFetchVirtualFriendListQuery,
  usePostVirtualFriendMutation,
} from '../../api'
import { useRoutesPaths } from 'src/routes'
import { Form, Loader } from '@design-system'
import { virtualFriendValidationSchema } from '../../VirtualFriendValidationSchema'
import { CreateVirtualFriendFormWrapper } from '../../components/CreateVirtualFriendFormWrapper'
import { Box, Typography } from '@mui/material'
import { VirtualFriendFormValues } from '@apps/chat/types'
import { initialValues } from './static'

export const VirtualFriendCreatePage: React.FC = () => {
  const navigate = useNavigate()
  const { routes } = useRoutesPaths()
  const [postVirtualFriend, { isLoading, isError, error }] =
    usePostVirtualFriendMutation()
  const fetchVirtualFriendListQuery = useFetchVirtualFriendListQuery()

  const onSubmit = async (values: VirtualFriendFormValues) => {
    try {
      const result = await postVirtualFriend(values).unwrap()
      if (result) {
        fetchVirtualFriendListQuery.refetch()
        navigate(routes.base())
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError && error) {
    console.log(error)
    return <div>Error: some error</div>
  }

  return (
    <Box padding={2}>
      <Typography variant="h5" component="h5" mb={2} sx={{ color: '#9c27b0' }}>
        Create friend
      </Typography>

      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={virtualFriendValidationSchema}
      >
        <CreateVirtualFriendFormWrapper />
      </Form>
    </Box>
  )
}
