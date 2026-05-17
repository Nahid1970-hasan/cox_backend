import React from 'react'
import { StyledIconButton } from './style/IcontButton_styled'

/**
 * Icon-sized control for DataGrid headers and row actions (styled-components theme).
 */
export function IconButton({ children, onClick, color = 'girdHeaderFont', type = 'button', style, ...rest }) {
  return (
    <StyledIconButton
      as="button"
      type={type}
      color={color}
      onClick={onClick}
      style={{ border: 'none', background: 'transparent', cursor: 'pointer', font: 'inherit', ...style }}
      {...rest}
    >
      {children}
    </StyledIconButton>
  )
}

export default IconButton
