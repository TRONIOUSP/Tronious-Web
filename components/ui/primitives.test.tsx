import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'
import Badge from './Badge'
import Chip from './Chip'
import Stat from './Stat'
import Quote from './Quote'
import Note from './Note'
import TickList from './TickList'

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Mechanical &amp; pneumatic</Card>)
    expect(screen.getByText('Mechanical & pneumatic')).toBeInTheDocument()
  })

  it('renders the requested element', () => {
    const { container } = render(<Card as="li">x</Card>)
    expect(container.querySelector('li')).not.toBeNull()
  })

  it('marks interactive cards so hover elevation applies only to them', () => {
    const { container } = render(<Card interactive>x</Card>)
    expect(container.firstElementChild).toHaveAttribute('data-interactive')
  })

  it('leaves static cards unmarked', () => {
    const { container } = render(<Card>x</Card>)
    expect(container.firstElementChild).not.toHaveAttribute('data-interactive')
  })
})

describe('Badge and Chip', () => {
  it('renders badge text', () => {
    render(<Badge>ISO 13485:2016</Badge>)
    expect(screen.getByText('ISO 13485:2016')).toBeInTheDocument()
  })

  it('renders chip text', () => {
    render(<Chip>Tolerance analysis</Chip>)
    expect(screen.getByText('Tolerance analysis')).toBeInTheDocument()
  })
})

describe('Stat', () => {
  it('renders the value and its label', () => {
    render(<Stat value="47" label="Regulatory submissions supported" />)
    expect(screen.getByText('47')).toBeInTheDocument()
    expect(screen.getByText('Regulatory submissions supported')).toBeInTheDocument()
  })

  it('marks the value as numeric so figures align in tabular columns', () => {
    const { container } = render(<Stat value="47" label="Units" />)
    expect(container.querySelector('[data-numeric]')).not.toBeNull()
  })

  it('accepts a placeholder node as the value', () => {
    render(<Stat value={<span data-placeholder="">[XX]</span>} label="Units" />)
    expect(screen.getByText('[XX]')).toHaveAttribute('data-placeholder')
  })
})

describe('Quote', () => {
  it('renders the quotation inside a blockquote with its attribution', () => {
    const { container } = render(<Quote attribution="[Name], [Title]">Speed and quality.</Quote>)
    expect(container.querySelector('blockquote')).not.toBeNull()
    expect(screen.getByText('Speed and quality.')).toBeInTheDocument()
    expect(screen.getByText('[Name], [Title]')).toBeInTheDocument()
  })
})

describe('Note', () => {
  it('is visible by default', () => {
    render(<Note>This is a preview form.</Note>)
    expect(screen.getByText('This is a preview form.')).toBeVisible()
  })

  it('renders with the hidden attribute when hidden is true', () => {
    render(<Note hidden>This is a preview form.</Note>)
    expect(screen.getByText('This is a preview form.')).not.toBeVisible()
  })
})

describe('TickList', () => {
  it('renders one list item per entry', () => {
    render(<TickList items={['Schematics', 'Gerber files', 'BOM']} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders a list element', () => {
    const { container } = render(<TickList items={['Schematics']} />)
    expect(container.querySelector('ul')).not.toBeNull()
  })
})
