import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import JumpNav from './JumpNav'

describe('JumpNav', () => {
  it('renders a labelled nav with one link per entry', () => {
    render(<JumpNav links={[{ href: '#a', label: 'A' }, { href: '#b', label: 'B' }]} />)
    const nav = screen.getByRole('navigation', { name: 'On this page' })
    expect(within(nav).getAllByRole('link')).toHaveLength(2)
  })
})
