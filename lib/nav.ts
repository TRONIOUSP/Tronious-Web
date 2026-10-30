export type NavLink = { href: string; label: string }

export const NAV_LINKS: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/expertise', label: 'Device Expertise' },
  { href: '/process', label: 'Process' },
  { href: '/quality', label: 'Quality & Regulatory' },
  { href: '/about', label: 'About' },
]

export const NAV_CTA: NavLink = { href: '/contact', label: 'Start a Project' }

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/insights', label: 'Insights' },
  { href: '/cases', label: 'Case studies' },
]

export const FOOTER_WORK_LINKS: NavLink[] = [
  { href: '/services', label: 'Services' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/engagement', label: 'Engagement models' },
  { href: '/quality', label: 'Quality & Regulatory' },
  { href: '/contact', label: 'Start a project' },
]

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { href: '/legal', label: 'Privacy policy' },
  { href: '/legal', label: 'Terms of use' },
  { href: '/legal', label: 'Cookie policy' },
]
