import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import * as fs from 'fs'
import * as path from 'path'
import { ROUTES, WIDTHS, THEMES } from './routes'

const SCREENSHOT_DIR = path.join(__dirname, '__screenshots__')

async function revealWholePage(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.75))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => window.setTimeout(resolve, 45))
    }
    window.scrollTo(0, 0)
  })
}

async function assertProjectShell(page: import('@playwright/test').Page) {
  await expect(page.getByRole('link', { name: 'TRONIOUS home' })).toBeVisible()
}

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
})

test('mobile and tablet menu opens as a visible viewport drawer', async ({ page }) => {
  for (const width of [360, 768]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const menuButton = page.locator('#menuBtn')
    await expect(menuButton).toHaveAccessibleName('Open menu')
    await menuButton.click()

    await expect(menuButton).toHaveAccessibleName('Close menu')
    const navigation = page.getByRole('navigation', { name: 'Main' })
    await expect(navigation).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'Services' })).toBeVisible()
  }
})

test('desktop navigation remains visible without a menu toggle', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')

  const navigation = page.getByRole('navigation', { name: 'Main' })
  await expect(navigation).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Services' })).toBeVisible()
  await expect(page.locator('#menuBtn')).toBeHidden()
})

test('service cards align to equal heights within each desktop row', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/services')

  const heights = await page.locator('[data-card]').evaluateAll((cards) =>
    cards.map((card) => card.getBoundingClientRect().height),
  )

  expect(heights).toHaveLength(6)
  expect(new Set(heights.slice(0, 3).map(Math.round)).size).toBe(1)
  expect(new Set(heights.slice(3, 6).map(Math.round)).size).toBe(1)
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
        await assertProjectShell(page)
        await revealWholePage(page)

        // A screenshot file alone can pass when CSS never loaded. Assert two
        // stable properties of the design system before recording the page.
        await expect(page.locator('header')).toHaveCSS('position', 'sticky')
        await expect(page.locator('body')).not.toHaveCSS('font-family', 'Times New Roman')

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
      await assertProjectShell(page)

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
      await assertProjectShell(page)

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze()

      if (results.violations.length > 0) {
        // Keep the detailed report in CI output so failures are actionable.
        console.log(
          `[axe baseline] ${route} (${theme}):`,
          JSON.stringify(
            results.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((node) => ({
                target: node.target,
                html: node.html,
                summary: node.failureSummary,
              })),
            })),
            null,
            2,
          ),
        )
      }

      // The test passes regardless — violations are recorded as a baseline,
      // Contrast is now a release gate rather than a non-blocking baseline.
      expect(results.violations).toHaveLength(0)
    })
  }
}
