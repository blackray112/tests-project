import React from 'react'
import { StyledLink } from './StyledLink'
import { LinkProps } from './types'

const Link: React.FC<LinkProps> = ({ path, children }) => {
  return <StyledLink to={path}>{children}</StyledLink>
}

export default Link
