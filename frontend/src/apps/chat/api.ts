import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../constants/api'

import {
  ChatCreateState,
  ChatDetails,
  ChatList,
  ChatMessage,
  ChatMessageCreateState,
  ChatNamePatchValues,
} from './types'

interface ChatCreatePayload {
  friendId: number
  name: string
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/chats/` }),
  endpoints: builder => ({
    postChat: builder.mutation<ChatCreateState, ChatCreatePayload>({
      query: ({ friendId, name }) => ({
        url: '/',
        method: 'POST',
        body: {
          virtual_friend_id: friendId,
          name: name,
        },
      }),
    }),
    fetchChatList: builder.query<ChatList[], number>({
      query: friendId => `?virtual_friend_id=${friendId}`,
    }),
    fetchChatDetails: builder.query<ChatDetails, number>({
      query: chatId => `${chatId}`,
    }),
    fetchChatMessages: builder.query<ChatMessage[], number>({
      query: chatId => `${chatId}/messages`,
    }),
    patchChatDetails: builder.mutation<
      void,
      { chatId: number; payload: ChatNamePatchValues }
    >({
      query: ({ chatId, payload }) => ({
        url: `${chatId}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
})

export const {
  usePostChatMutation,
  useFetchChatListQuery,
  useFetchChatDetailsQuery,
  useFetchChatMessagesQuery,
  usePatchChatDetailsMutation,
} = chatApi

type ChatMessageCreatePayload = {
  chatId: number
  text: string
}

export const chatMessageApi = createApi({
  reducerPath: 'chatMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/messages/` }),
  endpoints: builder => ({
    postChatMessage: builder.mutation<
      ChatMessageCreateState,
      ChatMessageCreatePayload
    >({
      query: ({ chatId, text }) => ({
        url: `/`,
        method: 'POST',
        body: {
          chat_id: chatId,
          text: text,
        },
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const { usePostChatMessageMutation } = chatMessageApi
