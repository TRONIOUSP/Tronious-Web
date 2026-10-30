'use client'

import { useSyncExternalStore } from 'react'
import {
  getPreferenceSnapshot,
  getServerPreferenceSnapshot,
  setPreference,
  subscribeToPreference,
  type ThemePreference,
} from '@/lib/theme'

const ORDER: ThemePreference[] = ['system', 'light', 'dark']

/**
 * Three states rather than a binary switch, so a visitor who tries the toggle
 * can get back to following their OS. `aria-pressed` is deliberately not used:
 * ARIA defines it as binary, and a three-way cycle announced as "pressed"
 * misleads. The current state rides in the accessible name instead.
 */
export default function ThemeToggle() {
  const preference = useSyncExternalStore(
    subscribeToPreference,
    getPreferenceSnapshot,
    getServerPreferenceSnapshot,
  )

  function cycle() {
    setPreference(ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length])
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${preference}`}
      data-preference={preference}
      title={`Theme: ${preference}`}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-[18px] fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
      >
        {preference === 'light' && (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
          </>
        )}
        {preference === 'dark' && <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2z" />}
        {preference === 'system' && (
          <>
            <rect x="3" y="4.5" width="18" height="12" rx="1.6" />
            <path d="M8.5 20h7M12 16.5V20" />
          </>
        )}
      </svg>
    </button>
  )
}
