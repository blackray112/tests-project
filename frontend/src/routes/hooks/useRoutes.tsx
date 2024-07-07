import * as React from 'react'
import { useRoutesPaths } from './useRoutesPaths'
import { RouteType } from '../types'
import { NotFoundPage } from '@apps/notFound'
import { ChatCreatePage, ChatListPage, ChatPage } from '@apps/chat'
import {
  VirtualFriendCreatePage,
  VirtualFriendListPage,
} from '@apps/virtual-friend'
import { WelcomePage } from '@apps/welcome'

export const useRoutes = (): RouteType[] => {
  const { routes } = useRoutesPaths()

  return [
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: routes.base(),
      element: <VirtualFriendListPage />,
    },
    {
      path: routes.welcome(),
      element: <WelcomePage />,
    },
    {
      path: routes.createFriend(),
      element: <VirtualFriendCreatePage />,
    },
    {
      path: routes.createChat(),
      element: <ChatCreatePage />,
    },
    {
      path: routes.chats(),
      element: <ChatListPage />,
    },
    {
      path: routes.chat(),
      element: <ChatPage />,
    },

    // {
    //   path: routes.signup(),
    //   element: <SignupPage />,
    // },
    // {
    //   path: routes.signin(),
    //   element: <SigninPage />,
    // },
  ]
}
