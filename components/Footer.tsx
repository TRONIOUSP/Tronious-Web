import Link from 'next/link'
import { FOOTER_COMPANY_LINKS, FOOTER_WORK_LINKS, FOOTER_LEGAL_LINKS } from '@/lib/nav'
import { PLACEHOLDER_MARKING } from '@/lib/placeholders'

const YEAR = 2026

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <b>TRONIOUS</b>
            <p>An innovative electronic product development company focused on delivering end-to-end solutions, from concept design and prototyping to manufacturing and deployment.</p>
          </div>
          <div>
            <b>Company</b>
            <ul>
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <b>Work with us</b>
            <ul>
              {FOOTER_WORK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <b>Legal</b>
            <ul>
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>&copy; {YEAR} TRONIOUS. All rights reserved.</span>
        </div>

        {PLACEHOLDER_MARKING && (
          <p className="legend-ph">
            <span data-placeholder="">Highlighted text</span> marks placeholders to replace with
            your real details before publishing.
          </p>
        )}
      </div>
    </footer>
  )
}
