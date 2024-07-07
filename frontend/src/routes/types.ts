import { RouteObject } from 'react-router-dom'
import { useRoutesPaths } from './hooks'

export interface RouteType extends RouteObject {
  children?: RouteType[]
  path: string
  element: React.ReactNode
}

export type RoutesPaths = ReturnType<typeof useRoutesPaths>
