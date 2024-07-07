import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { LoaderBox } from './Loader.styles'

const Loader = () => {
  return (
    <LoaderBox>
      <CircularProgress />
    </LoaderBox>
  )
}

export default Loader
