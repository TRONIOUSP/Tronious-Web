import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const CSS = readFileSync(path.resolve(process.cwd(), 'app/globals.css'), 'utf8')

/**
 * Every semantic alias must exist in the light `:root` block and be redefined
 * in BOTH dark paths. The spec calls keeping those blocks in sync out as a
 * standing hazard, so it is pinned by a test rather than by a comment.
 */
const SEMANTIC_ALIASES = [
  'surface',
  'surface-raised',
  'surface-sunken',
  'surface-inverse',
  'text-primary',
  'text-secondary',
  'text-tertiary',
  'text-inverse',
  'text-on-accent',
  'border-subtle',
  'border-default',
  'border-strong',
  'accent',
  'accent-hover',
  'accent-subtle',
  'signal',
  'placeholder-fg',
  'placeholder-bg',
  'band-surface',
  'band-edge',
]

const MEDIA_DARK = '@media (prefers-color-scheme: dark)'
// Quote-agnostic: the invariant is the selector, not how it is spelled.
const EXPLICIT_DARK = /:root\[data-theme=["']dark["']\]\s*\{/
const GUARDED_DARK = /:root:not\(\s*\[data-theme=["']light["']\]\s*\)\s*\{/

/** Returns the body of the brace-delimited block that starts at or after `from`. */
function blockBodyAt(css: string, from: number): string {
  const open = css.indexOf('{', from)
  if (open === -1) throw new Error('no block found')
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth += 1
    else if (css[i] === '}') {
      depth -= 1
      if (depth === 0) return css.slice(open + 1, i)
    }
  }
  throw new Error('unbalanced braces')
}

function blockBodyFor(css: string, needle: string | RegExp): string {
  const index =
    typeof needle === 'string' ? css.indexOf(needle) : (css.match(needle)?.index ?? -1)
  if (index === -1) throw new Error(`selector not found: ${needle}`)
  return blockBodyAt(css, index)
}

/**
 * Light alias values live in `@theme`, which is what generates the utilities;
 * declaring them a second time in a literal `:root` would create two places to
 * keep in step, which is the exact drift this file exists to prevent.
 */
const lightRoot = () => blockBodyFor(CSS, '@theme')
const mediaDark = () => blockBodyFor(CSS, MEDIA_DARK)
const explicitDark = () => blockBodyFor(CSS, EXPLICIT_DARK)
const guardedDark = () => blockBodyFor(mediaDark(), GUARDED_DARK)

function missingAliases(body: string): string[] {
  return SEMANTIC_ALIASES.filter((alias) => !new RegExp(`--color-${alias}\\s*:`).test(body))
}

/** Resolves `var(--color-neutral-900)` style references against the @theme ramp. */
function resolveColor(body: string, alias: string): string {
  const declared = body.match(new RegExp(`--color-${alias}\\s*:\\s*([^;]+);`))
  if (!declared) throw new Error(`alias not declared: ${alias}`)
  const value = declared[1].trim()
  const varRef = value.match(/var\(\s*(--[\w-]+)\s*\)/)
  if (!varRef) return value
  const theme = blockBodyFor(CSS, '@theme')
  const resolved = theme.match(new RegExp(`${varRef[1]}\\s*:\\s*([^;]+);`))
  if (!resolved) throw new Error(`ramp step not found in @theme: ${varRef[1]}`)
  return resolved[1].trim()
}

/** Sum of the RGB channels — enough to compare two greys on the same hue. */
function brightness(hex: string): number {
  const match = hex.match(/#([0-9a-f]{6})/i)
  if (!match) throw new Error(`not a hex colour: ${hex}`)
  const n = parseInt(match[1], 16)
  return ((n >> 16) & 0xff) + ((n >> 8) & 0xff) + (n & 0xff)
}

describe('globals.css token foundation', () => {
  it('defines every semantic alias with a light value', () => {
    expect(missingAliases(lightRoot())).toEqual([])
  })

  it('redefines every semantic alias in the prefers-color-scheme dark block', () => {
    expect(missingAliases(guardedDark())).toEqual([])
  })

  it('redefines every semantic alias in the data-theme="dark" block', () => {
    expect(missingAliases(explicitDark())).toEqual([])
  })

  it('guards the media-query dark block so an explicit light theme wins', () => {
    expect(mediaDark()).toMatch(GUARDED_DARK)
  })

  it('sets color-scheme: dark in both dark paths', () => {
    expect(guardedDark()).toMatch(/color-scheme\s*:\s*dark/)
    expect(explicitDark()).toMatch(/color-scheme\s*:\s*dark/)
  })

  it('resolves dark surface-sunken lighter than dark surface, so section rhythm survives', () => {
    for (const body of [guardedDark(), explicitDark()]) {
      const surface = brightness(resolveColor(body, 'surface'))
      const sunken = brightness(resolveColor(body, 'surface-sunken'))
      expect(sunken).toBeGreaterThan(surface)
    }
  })

  it('keeps the legacy layer so pages not yet rebuilt stay styled', () => {
    expect(CSS).toContain('@layer legacy')
  })
})
