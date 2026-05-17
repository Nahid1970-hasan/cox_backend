import React from 'react'
import { StyledCheckbox } from './style/Checkbox_styled'

/**
 * Checkbox used by DataGrid (header / row selection).
 */
export function Checkbox({ checked, onClick, size, selectColor, hoverColor }) {
  return (
    <StyledCheckbox size={size} selectColor={selectColor} hoverColor={hoverColor}>
      <input
        type="checkbox"
        checked={!!checked}
        readOnly
        onClick={onClick}
        aria-checked={!!checked}
      />
      <span className="material-icons md-15">
        {checked ? 'check_box' : 'check_box_outline_blank'}
      </span>
    </StyledCheckbox>
  )
}

export default Checkbox
