import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { virtualFriendApi } from './apps/virtual-friend/api'
import { chatApi, chatMessageApi } from './apps/chat/api'

export const store = configureStore({
  reducer: {
    [virtualFriendApi.reducerPath]: virtualFriendApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [chatMessageApi.reducerPath]: chatMessageApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      virtualFriendApi.middleware,
      chatApi.middleware,
      chatMessageApi.middleware,
    ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
