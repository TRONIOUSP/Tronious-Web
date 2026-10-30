export type Theme = 'light' | 'dark'
export type ThemePreference = Theme | 'system'

export const THEME_STORAGE_KEY = 'tronious-theme'
export const THEME_ATTRIBUTE = 'data-theme'
export const MOTION_ATTRIBUTE = 'data-motion'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/**
 * Storage access throws, rather than returning null, in a private window and
 * wherever site data is blocked. Every caller here treats that as "no stored
 * preference" so the page still renders and simply follows the OS.
 */
export function readStoredPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function storePreference(preference: ThemePreference): void {
  try {
    if (preference === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY)
    else window.localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // A preference we cannot persist still applies for this page view.
  }
}

/** `system` means "no attribute", which lets the guarded media query decide. */
export function applyPreference(preference: ThemePreference): void {
  const root = document.documentElement
  if (preference === 'system') root.removeAttribute(THEME_ATTRIBUTE)
  else root.setAttribute(THEME_ATTRIBUTE, preference)
}

const listeners = new Set<() => void>()

/**
 * The preference lives in localStorage, not in React state, so components read
 * it with useSyncExternalStore. That keeps server and client renders in step
 * without a setState-in-effect, and makes a change in another tab arrive here
 * for free via the `storage` event.
 */
export function subscribeToPreference(onChange: () => void): () => void {
  listeners.add(onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function getPreferenceSnapshot(): ThemePreference {
  return readStoredPreference()
}

/** The server has no storage to read, so it always renders the neutral state. */
export function getServerPreferenceSnapshot(): ThemePreference {
  return 'system'
}

/** Persist, apply and notify in one call, so the three can never drift apart. */
export function setPreference(preference: ThemePreference): void {
  storePreference(preference)
  applyPreference(preference)
  for (const listener of listeners) listener()
}

/**
 * Runs in <head> before first paint, so a dark-mode visitor never sees a white
 * flash. It also decides whether scroll reveals may hide content at all: the
 * reveal CSS is scoped to `html[data-motion="on"]`, so when this script does
 * not run — JS disabled, script error, old browser — nothing is ever hidden.
 * That is why the motion opt-in lives here rather than in a React effect.
 */
export const NO_FLASH_SCRIPT = `
try {
  var p = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
  if (p === 'light' || p === 'dark') {
    document.documentElement.setAttribute(${JSON.stringify(THEME_ATTRIBUTE)}, p);
  }
} catch (e) {}
try {
  var m = window.matchMedia && window.matchMedia(${JSON.stringify(REDUCED_MOTION_QUERY)});
  if (m && !m.matches && window.IntersectionObserver) {
    document.documentElement.setAttribute(${JSON.stringify(MOTION_ATTRIBUTE)}, 'on');
  }
} catch (e) {}
`.trim()
