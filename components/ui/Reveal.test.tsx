import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Reveal, { shouldAnimate } from './Reveal'

/** A controllable stand-in: jsdom ships no IntersectionObserver at all. */
class FakeObserver {
  static instances: FakeObserver[] = []
  callback: IntersectionObserverCallback
  targets: Element[] = []
  disconnected = false

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    FakeObserver.instances.push(this)
  }

  observe(target: Element) {
    this.targets.push(target)
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true
  }

  intersect() {
    this.callback(
      this.targets.map((target) => ({ target, isIntersecting: true })) as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver,
    )
  }
}

function stubEnvironment({ reduceMotion = false, observer = true } = {}) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') ? reduceMotion : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
  vi.stubGlobal('IntersectionObserver', observer ? FakeObserver : undefined)
}

afterEach(() => {
  vi.unstubAllGlobals()
  FakeObserver.instances = []
})

describe('shouldAnimate', () => {
  it('is false when IntersectionObserver is unavailable', () => {
    stubEnvironment({ observer: false })
    expect(shouldAnimate()).toBe(false)
  })

  it('is false under prefers-reduced-motion: reduce', () => {
    stubEnvironment({ reduceMotion: true })
    expect(shouldAnimate()).toBe(false)
  })

  it('is true when motion is allowed and the observer exists', () => {
    stubEnvironment()
    expect(shouldAnimate()).toBe(true)
  })
})

describe('Reveal', () => {
  it('renders its children whether or not it will animate', () => {
    stubEnvironment({ observer: false })
    render(<Reveal>Five device families.</Reveal>)
    expect(screen.getByText('Five device families.')).toBeInTheDocument()
  })

  it('never observes when it will not animate, so nothing can get stuck hidden', () => {
    stubEnvironment({ reduceMotion: true })
    render(<Reveal>content</Reveal>)
    expect(FakeObserver.instances).toHaveLength(0)
  })

  it('starts pending and becomes shown once the observer reports an intersection', () => {
    stubEnvironment()
    const { container } = render(<Reveal>content</Reveal>)
    expect(container.firstElementChild).toHaveAttribute('data-reveal', 'pending')

    act(() => FakeObserver.instances[0].intersect())

    expect(container.firstElementChild).toHaveAttribute('data-reveal', 'shown')
  })

  it('disconnects the observer on unmount', () => {
    stubEnvironment()
    const { unmount } = render(<Reveal>content</Reveal>)
    unmount()
    expect(FakeObserver.instances[0].disconnected).toBe(true)
  })

  it('renders the requested element and exposes the stagger delay', () => {
    stubEnvironment()
    const { container } = render(
      <Reveal as="li" delay={150}>
        content
      </Reveal>,
    )
    const element = container.querySelector('li')
    expect(element).not.toBeNull()
    expect(element?.getAttribute('style')).toContain('150ms')
  })
})
