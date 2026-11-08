import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const PUBLIC_ROUTES = [
  '',
  '/about',
  '/careers',
  '/cases',
  '/contact',
  '/engagement',
  '/engineering',
  '/expertise',
  '/facilities',
  '/insights',
  '/legal',
  '/manufacturing',
  '/process',
  '/quality',
  '/services',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }))
}

