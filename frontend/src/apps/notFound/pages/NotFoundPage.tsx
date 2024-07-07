import React from 'react'
import {
  NotFoundContainer,
  NotFoundTypo,
  NotFoundWrapper,
  NotFoundOops,
  NotFoundText,
  NotFoundButton,
  NotFoundLetterO,
  NotFoundLetterOImage,
} from './NotFoundPage.styles'
import { useRoutesPaths } from 'src/routes'
import { useNavigate } from 'react-router'
import { NotFoundIcon } from 'src/assets/icons'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { routes } = useRoutesPaths()

  const handleClick = () => navigate(routes.base())

  return (
    <NotFoundContainer>
      <NotFoundOops variant="h3" as="h3">
        Oops...
      </NotFoundOops>
      <NotFoundText>On this page you are alone</NotFoundText>
      <NotFoundWrapper>
        <NotFoundTypo variant="h2" as="h2">
          404
        </NotFoundTypo>
        <NotFoundLetterO>
          <NotFoundLetterOImage src={NotFoundIcon} alt="Not found icon" />
        </NotFoundLetterO>
      </NotFoundWrapper>
      <NotFoundButton onClick={handleClick}>Go back home</NotFoundButton>
    </NotFoundContainer>
  )
}
