import React from 'react'
import { Link, Logo } from '@design-system'
import { useRoutesPaths } from 'src/routes'
import {
  WelcomeHeaderContainer,
  WelcomeNavigation,
  WelcomeSignupActions,
} from './WelcomePageHeader.styles'

export const WelcomePageHeader = () => {
  const { routes } = useRoutesPaths()

  return (
    <WelcomeHeaderContainer>
      <Link path={routes.base()}>
        <Logo />
      </Link>
      <WelcomeNavigation>
        <Link path={routes.base()}>Top Friends</Link>
        <Link path={routes.base()}>Welcome</Link>
        <Link path={routes.base()}>About us</Link>
        <Link path={routes.base()}>Contacts</Link>
        <Link path={routes.base()}>Blog</Link>
      </WelcomeNavigation>
      <WelcomeSignupActions>
        <Link path={routes.signin()}>Sign in</Link>
        <Link path={routes.signup()}>Sign up</Link>
      </WelcomeSignupActions>
    </WelcomeHeaderContainer>
  )
}
