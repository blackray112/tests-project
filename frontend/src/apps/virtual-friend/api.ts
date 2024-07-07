import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../constants/api'
import { VirtualFriend, VirtualFriendCreateState } from './types'

type VirtualFriendCreatePayload = {
  userId: number
  name: string
  gpt_description: string
  short_description?: string
  long_description?: string
}

type VirtualFriendPatchPayload = {
  name: string
  gpt_description: string
  short_description?: string
  long_description?: string
}

export const virtualFriendApi = createApi({
  reducerPath: 'virtualFriendApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/virtual_friend/` }),
  endpoints: builder => ({
    postVirtualFriend: builder.mutation<
      VirtualFriendCreateState,
      VirtualFriendCreatePayload
    >({
      query: ({
        userId,
        name,
        gpt_description,
        short_description,
        long_description,
      }) => ({
        url: '/',
        method: 'POST',
        body: {
          user_id: userId,
          name: name,
          gpt_description: gpt_description,
          short_description,
          long_description,
        },
      }),
    }),
    fetchVirtualFriendList: builder.query<VirtualFriend[], void>({
      query: () => '/',
    }),
    fetchVirtualFriendById: builder.query<VirtualFriend, number>({
      query: virtualFriendId => `/${virtualFriendId}`,
    }),
    patchVirtualFriend: builder.mutation<
      VirtualFriend,
      { virtualFriendId: number; payload: VirtualFriendPatchPayload }
    >({
      query: ({ virtualFriendId, payload }) => ({
        url: `/${virtualFriendId}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  usePostVirtualFriendMutation,
  useFetchVirtualFriendListQuery,
  useFetchVirtualFriendByIdQuery,
  usePatchVirtualFriendMutation,
} = virtualFriendApi
