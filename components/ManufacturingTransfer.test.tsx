import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ManufacturingTransfer from './ManufacturingTransfer'

describe('ManufacturingTransfer', () => {
  it('switches the active transfer gate', () => {
    render(<ManufacturingTransfer />)

    const readiness = screen.getByRole('tab', { name: /Production readiness review/ })
    const masterRecord = screen.getByRole('tab', { name: /Device master record/ })
    expect(readiness).toHaveAttribute('aria-selected', 'true')

    fireEvent.click(masterRecord)
    expect(masterRecord).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('full production recipe')
  })

  it('supports arrow-key navigation between gates', () => {
    render(<ManufacturingTransfer />)

    const readiness = screen.getByRole('tab', { name: /Production readiness review/ })
    fireEvent.keyDown(readiness, { key: 'ArrowRight' })

    expect(screen.getByRole('tab', { name: /Device master record/ })).toHaveFocus()
    expect(screen.getByRole('tab', { name: /Device master record/ })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })
})
