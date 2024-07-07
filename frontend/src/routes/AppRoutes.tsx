import * as React from 'react'
import { RouterController } from './RouterController'
import { useRoutes } from './hooks'

const AppRoutes = () => {
  const routes = useRoutes()

  return <RouterController routes={routes} />
}

export default AppRoutes
