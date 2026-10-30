'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, NAV_CTA } from '@/lib/nav'

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close the mobile menu when the route changes. Adjusting state during
  // render (rather than in a useEffect) avoids an extra render/commit pass
  // and a synchronous setState-in-effect, per React's "Adjusting state when
  // a prop changes" pattern.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  return (
    <header>
      <div className="wrap bar">
        <Link href="/" className="brand">
          <span className="mark" aria-hidden="true"></span>
          <span>[Company Name]</span>
        </Link>
        <button
          id="menuBtn"
          aria-expanded={open}
          aria-controls="mainnav"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
        <nav id="mainnav" aria-label="Main" className={open ? 'open' : undefined}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={NAV_CTA.href} className="cta">
                {NAV_CTA.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
