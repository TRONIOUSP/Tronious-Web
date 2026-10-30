import Link from 'next/link'
import { FOOTER_COMPANY_LINKS, FOOTER_WORK_LINKS, FOOTER_LEGAL_LINKS } from '@/lib/nav'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <b style={{ color: 'var(--ink)' }}>[Company Name]</b>
            <p>Contract design and manufacturing for physical therapy and recovery devices.</p>
          </div>
          <div>
            <b style={{ color: 'var(--ink)' }}>Company</b>
            <ul>
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <b style={{ color: 'var(--ink)' }}>Work with us</b>
            <ul>
              {FOOTER_WORK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <b style={{ color: 'var(--ink)' }}>Legal</b>
            <ul>
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="legend-ph">
          <span className="ph">[Highlighted text]</span> marks placeholders to replace with your
          real details before publishing.
        </p>
      </div>
    </footer>
  )
}
