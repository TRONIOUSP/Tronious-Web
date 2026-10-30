import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from './Section'
import Container from './Container'
import SectionHead from './SectionHead'

describe('Section', () => {
  it('renders a section element carrying the requested tone', () => {
    const { container } = render(<Section tone="band">body</Section>)
    expect(container.querySelector('section')).toHaveAttribute('data-tone', 'band')
  })

  it('defaults to the default tone', () => {
    const { container } = render(<Section>body</Section>)
    expect(container.querySelector('section')).toHaveAttribute('data-tone', 'default')
  })

  it('wraps children in a container by default', () => {
    const { container } = render(<Section>body</Section>)
    expect(container.querySelector('[data-container]')).not.toBeNull()
  })

  it('omits the container when contain is false', () => {
    const { container } = render(<Section contain={false}>body</Section>)
    expect(container.querySelector('[data-container]')).toBeNull()
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('passes the width through to the container', () => {
    const { container } = render(<Section width="narrow">body</Section>)
    expect(container.querySelector('[data-container]')).toHaveAttribute('data-container', 'narrow')
  })

  it('forwards an id so in-page anchors can target it', () => {
    const { container } = render(<Section id="m-flow">body</Section>)
    expect(container.querySelector('section')).toHaveAttribute('id', 'm-flow')
  })
})

describe('Container', () => {
  it('renders the requested element', () => {
    const { container } = render(<Container as="article">x</Container>)
    expect(container.querySelector('article')).toHaveAttribute('data-container', 'default')
  })
})

describe('SectionHead', () => {
  it('renders no eyebrow element when none is given', () => {
    const { container } = render(<SectionHead title="Five device families. Nothing else." />)
    expect(container.querySelector('[data-eyebrow]')).toBeNull()
  })

  it('renders the eyebrow when one is given', () => {
    render(<SectionHead eyebrow="Device expertise" title="Five device families. Nothing else." />)
    expect(screen.getByText('Device expertise')).toBeInTheDocument()
  })

  it('renders the heading at level 2 by default', () => {
    render(<SectionHead title="Five device families. Nothing else." />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Five device families. Nothing else.' }),
    ).toBeInTheDocument()
  })

  it('renders the heading at the requested level', () => {
    render(<SectionHead as="h1" title="Your device." />)
    expect(screen.getByRole('heading', { level: 1, name: 'Your device.' })).toBeInTheDocument()
  })

  it('renders no lead element when none is given', () => {
    const { container } = render(<SectionHead title="Five device families." />)
    expect(container.querySelector('[data-lead]')).toBeNull()
  })

  it('renders the lead when one is given', () => {
    render(<SectionHead title="Five device families." lead="Focus means our test plans." />)
    expect(screen.getByText('Focus means our test plans.')).toBeInTheDocument()
  })
})
