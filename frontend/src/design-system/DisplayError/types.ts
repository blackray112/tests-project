import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export interface DisplayErrorProps {
  error: FetchBaseQueryError | SerializedError | undefined
}
