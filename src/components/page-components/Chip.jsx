import React from 'react'
import { StyledChip } from './style/Chip_styled'

export function Chip({ label, color }) {
  return (
    <StyledChip color={color}>
      <span>{label}</span>
    </StyledChip>
  )
}

export default Chip
