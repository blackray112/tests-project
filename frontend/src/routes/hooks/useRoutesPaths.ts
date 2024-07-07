import * as React from 'react'
import { pathMaker } from '../pathMaker'

export const useRoutesPaths = () => {
  return React.useMemo(
    () => ({
      routes: {
        base: pathMaker('/'),
        welcome: pathMaker('/welcome'),
        createFriend: pathMaker('/create-friend'),
        createChat: pathMaker('/create-chat'),
        chats: pathMaker('/chats'),
        chat: pathMaker('/chats/:id'),
        signup: pathMaker('/sign-up'),
        signin: pathMaker('/sign-in'),
      },
    }),
    [],
  )
}
