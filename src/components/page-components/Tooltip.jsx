import React, { useState } from 'react'
import { TooltipWrapper, TooltipTarget, TooltipBox } from './style/Tooltip_styled'

/**
 * Simple hover tooltip for DataGrid headers and icon actions.
 */
export function Tooltip({
  children,
  title,
  position = 'top',
  background,
  color,
  headerTitle,
}) {
  const [open, setOpen] = useState(false)
  if (!title) return children
  return (
    <TooltipWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <TooltipTarget
        as="span"
        background={background}
        color={color}
        headerTitle={headerTitle}
      >
        {children}
      </TooltipTarget>
      {open ? <TooltipBox position={position}>{title}</TooltipBox> : null}
    </TooltipWrapper>
  )
}

export default Tooltip
