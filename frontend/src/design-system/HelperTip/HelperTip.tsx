import React from 'react'
import { HelperTipProps } from './types'
import { HelperTipBox, HelperTipIcon, HelperTipText } from './HelperTip.styles'

const HelperTip: React.FC<HelperTipProps> = ({ children, icon }) => {
  return (
    <HelperTipBox>
      {icon && <HelperTipIcon>{icon}</HelperTipIcon>}
      <HelperTipText>{children}</HelperTipText>
    </HelperTipBox>
  )
}

export default HelperTip
