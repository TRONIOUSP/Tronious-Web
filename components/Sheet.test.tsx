import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sheet from './Sheet'

describe('Sheet', () => {
  it('renders the doc number, truncated sheet title, rev and status', () => {
    render(<Sheet doc="WEB-001" sheetTitle={'a'.repeat(40)}><p>content</p></Sheet>)
    expect(screen.getByText('WEB-001')).toBeInTheDocument()
    expect(screen.getByText('a'.repeat(32) + '…')).toBeInTheDocument()
    expect(screen.getByText('A · Draft')).toBeInTheDocument()
    expect(screen.getByText('Content placeholders')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
