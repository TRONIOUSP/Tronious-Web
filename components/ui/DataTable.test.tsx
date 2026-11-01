import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import DataTable from './DataTable'

describe('DataTable', () => {
  it('wraps its table children in a scroll container', () => {
    const { container } = render(<DataTable><table><tbody><tr><td>x</td></tr></tbody></table></DataTable>)
    expect(container.querySelector('[data-table-wrap] table')).not.toBeNull()
  })
})
