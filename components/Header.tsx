'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, NAV_CTA } from '@/lib/nav'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close the mobile drawer when the route changes. Adjusting state during
  // render (rather than in a useEffect) avoids an extra render/commit pass
  // and satisfies React's "Adjusting state when a prop changes" pattern.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  // Elevate the header and show quiet reading progress on long technical pages.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? Math.min(1, window.scrollY / available) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock — applied only while drawer is open; released on close
  // and on unmount (cleanup handles unmounting-while-open).
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Escape closes the drawer and returns focus to the trigger button.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <header data-header="" data-scrolled={scrolled ? '' : undefined}>
      <div data-header-bar="">
        <Link href="/" className="brand" onClick={close} aria-label="TRONIOUS home">
          <i aria-hidden="true" />
          <span>TRONIOUS</span>
        </Link>

        {/* Single nav list — reflowed by CSS between bar (lg+) and drawer (<lg).
            Never duplicated, so Header.test.tsx's getAllByRole('link') stays clean. */}
        <nav
          id="mainnav"
          aria-label="Main"
          data-open={open ? '' : undefined}
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={NAV_CTA.href}
                className="cta"
                aria-current={pathname === NAV_CTA.href ? 'page' : undefined}
                onClick={close}
              >
                {NAV_CTA.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div data-header-actions="">
          <ThemeToggle />
          <button
            ref={menuBtnRef}
            id="menuBtn"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mainnav"
            onClick={() => setOpen((o) => !o)}
            data-header-menu-btn=""
          >
            <span data-menu-icon="" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      <span
        data-scroll-progress=""
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  )
}
