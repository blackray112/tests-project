import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouteType } from './types'

export interface RoutesProps {
  children?: React.ReactNode
  routes: RouteType[]
}

export const RouterController: React.FC<RoutesProps> = ({
  children,
  routes,
}) => {
  const routeMapper = React.useCallback((route: RouteType, index: number) => {
    return (
      <Route
        key={route.path ?? `index-route-${index}`}
        path={route.path}
        element={route.element}
        caseSensitive={route.caseSensitive}
        index={route.index}
      />
    )
  }, [])

  return (
    <Routes>
      {children}
      {routes.map(routeMapper)}
    </Routes>
  )
}
