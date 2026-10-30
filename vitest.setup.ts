import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// @testing-library/react only auto-registers its cleanup via a global
// `afterEach`, which Vitest does not provide unless `test.globals: true`
// is set. Without this, `render()` leaks DOM nodes across `it()` blocks
// within the same test file.
afterEach(() => {
  cleanup()
})
