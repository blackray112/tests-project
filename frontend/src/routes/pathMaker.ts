import { generatePath } from 'react-router'

export const pathMaker = (path: string) => {
  return (
    params?: { [key: string]: string | number },
    query?: { [key: string]: string | number },
  ) => {
    if (params) {
      const stringifiedParams: Record<string, string> = params
        ? Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)]),
          )
        : {}

      path = generatePath(path, stringifiedParams)
    }

    if (query) {
      const stringifiedQuery: Record<string, string> = query
        ? Object.fromEntries(
            Object.entries(query).map(([k, v]) => [k, String(v)]),
          )
        : {}

      const queryString = new URLSearchParams(stringifiedQuery).toString()
      path += `?${queryString}`
    }

    return path
  }
}
