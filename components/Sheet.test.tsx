import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sheet from './Sheet'

describe('Sheet', () => {
  it('renders its children', () => {
    render(<Sheet doc="WEB-001"><p>content</p></Sheet>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('exposes the document number as a data attribute', () => {
    const { container } = render(<Sheet doc="WEB-001"><p>content</p></Sheet>)
    expect(container.firstElementChild).toHaveAttribute('data-doc', 'WEB-001')
  })

  it('renders no title block', () => {
    render(<Sheet doc="WEB-001"><p>content</p></Sheet>)
    expect(screen.queryByText('A · Draft')).not.toBeInTheDocument()
    expect(screen.queryByText('Content placeholders')).not.toBeInTheDocument()
  })
})
