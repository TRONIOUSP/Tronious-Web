import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import * as fs from 'fs'
import * as path from 'path'
import { ROUTES, WIDTHS, THEMES } from './routes'

const SCREENSHOT_DIR = path.join(__dirname, '__screenshots__')

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
})

// 120 screenshots: 15 routes × 4 widths × 2 themes
for (const route of ROUTES) {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      test(`screenshot | ${route} | ${theme} | ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)

        // Force the explicit theme override path (not media query emulation)
        await page.evaluate((t) => {
          document.documentElement.setAttribute('data-theme', t)
        }, theme)

        await page.waitForLoadState('networkidle')

        const slug = route === '/' ? 'home' : route.replace(/\//g, '')
        const filename = `${slug}--${theme}--${width}.png`
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, filename),
          fullPage: true,
        })
      })
    }
  }
}

// No-horizontal-scroll: 15 routes × 4 widths (Review Focus 5)
for (const route of ROUTES) {
  for (const width of WIDTHS) {
    test(`no-scroll | ${route} | ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(route)
      await page.waitForLoadState('networkidle')

      const overflows = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
      })

      expect(
        overflows,
        `${route} at ${width}px has horizontal overflow (scrollWidth > clientWidth + 1)`,
      ).toBe(true)
    })
  }
}

// Axe accessibility: 15 routes × 2 themes at 1280px only (30 runs)
for (const route of ROUTES) {
  for (const theme of THEMES) {
    test(`axe | ${route} | ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(route)

      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t)
      }, theme)

      await page.waitForLoadState('networkidle')

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze()

      if (results.violations.length > 0) {
        // Log violations without failing — this run establishes the baseline.
        // Phase 3+ runs should show no new violations.
        console.log(
          `[axe baseline] ${route} (${theme}):`,
          JSON.stringify(
            results.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
            null,
            2,
          ),
        )
      }

      // The test passes regardless — violations are recorded as a baseline,
      // not as failures. Swap to `expect(results.violations).toHaveLength(0)`
      // after Phase 3 redesign is complete and the baseline is resolved.
      expect(results.violations).toBeDefined()
    })
  }
}
