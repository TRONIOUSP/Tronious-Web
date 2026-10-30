import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  MOTION_ATTRIBUTE,
  readStoredPreference,
  storePreference,
  applyPreference,
  setPreference,
  subscribeToPreference,
  NO_FLASH_SCRIPT,
} from './theme'

function blockStorage(method: 'getItem' | 'setItem') {
  vi.spyOn(Storage.prototype, method).mockImplementation(() => {
    throw new Error('The operation is insecure.')
  })
}

/** jsdom implements neither of these; the no-flash script must cope either way. */
function stubEnvironment({ reduceMotion = false, observer = true } = {}) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') ? reduceMotion : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
  if (observer) vi.stubGlobal('IntersectionObserver', class {})
  else vi.stubGlobal('IntersectionObserver', undefined)
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.removeAttribute(THEME_ATTRIBUTE)
  document.documentElement.removeAttribute(MOTION_ATTRIBUTE)
})

describe('readStoredPreference', () => {
  it('returns "system" when localStorage.getItem throws', () => {
    blockStorage('getItem')
    expect(readStoredPreference()).toBe('system')
  })

  it('returns "system" when the stored value is not a valid preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'banana')
    expect(readStoredPreference()).toBe('system')
  })

  it('returns the stored preference when it is valid', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    expect(readStoredPreference()).toBe('dark')
  })
})

describe('storePreference', () => {
  it('does not throw when localStorage.setItem throws', () => {
    blockStorage('setItem')
    expect(() => storePreference('dark')).not.toThrow()
  })

  it('round-trips a stored preference', () => {
    storePreference('light')
    expect(readStoredPreference()).toBe('light')
  })
})

describe('applyPreference', () => {
  it('removes the data-theme attribute for the "system" preference', () => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, 'dark')
    applyPreference('system')
    expect(document.documentElement.hasAttribute(THEME_ATTRIBUTE)).toBe(false)
  })

  it('sets data-theme="dark" for the "dark" preference', () => {
    applyPreference('dark')
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark')
  })
})

describe('preference store', () => {
  it('notifies subscribers when the preference changes', () => {
    const seen: string[] = []
    const unsubscribe = subscribeToPreference(() => seen.push(readStoredPreference()))

    setPreference('dark')
    expect(seen).toEqual(['dark'])

    unsubscribe()
    setPreference('light')
    expect(seen).toEqual(['dark'])
  })

  it('applies the attribute as well as persisting, in one call', () => {
    setPreference('dark')
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark')
    expect(readStoredPreference()).toBe('dark')
  })

  it('picks up a change made in another tab', () => {
    const seen: string[] = []
    const unsubscribe = subscribeToPreference(() => seen.push('notified'))

    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY }))

    expect(seen).toEqual(['notified'])
    unsubscribe()
  })
})

describe('NO_FLASH_SCRIPT', () => {
  const run = () => new Function(NO_FLASH_SCRIPT)()

  it('applies a stored preference before paint', () => {
    stubEnvironment()
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    run()
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark')
  })

  it('does not throw when storage is blocked', () => {
    stubEnvironment()
    blockStorage('getItem')
    expect(run).not.toThrow()
  })

  it('opts motion in when it is allowed and IntersectionObserver exists', () => {
    stubEnvironment({ reduceMotion: false, observer: true })
    run()
    expect(document.documentElement.getAttribute(MOTION_ATTRIBUTE)).toBe('on')
  })

  it('leaves motion off under prefers-reduced-motion', () => {
    stubEnvironment({ reduceMotion: true, observer: true })
    run()
    expect(document.documentElement.hasAttribute(MOTION_ATTRIBUTE)).toBe(false)
  })

  it('leaves motion off when IntersectionObserver is missing', () => {
    stubEnvironment({ reduceMotion: false, observer: false })
    run()
    expect(document.documentElement.hasAttribute(MOTION_ATTRIBUTE)).toBe(false)
  })
})
