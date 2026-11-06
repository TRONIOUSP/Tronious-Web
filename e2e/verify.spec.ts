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

test('device-family explorer stays keyboard accessible and keeps the full comparison', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 900 })
  await page.goto('/expertise')

  const spinalTab = page.getByRole('tab', { name: /Spinal traction/ })
  await spinalTab.focus()
  await page.keyboard.press('ArrowRight')

  const kneeTab = page.getByRole('tab', { name: /Knee traction & rehab/ })
  await expect(kneeTab).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('Range-of-motion limits')

  await page.getByRole('tab', { name: /Connected & wearable/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('IEC 81001-5-1')
  await expect(page.locator('#full-comparison tbody tr')).toHaveCount(6)
})

test('quality page separates review evidence from regulatory capability', async ({ page }) => {
  await page.goto('/quality')

  await expect(page.locator('#qualification-evidence [data-card]')).toHaveCount(3)
  await expect(page.locator('#qualification-evidence [data-placeholder]')).toHaveCount(0)
  await expect(page.locator('#clearance-roles')).toContainText('Legal manufacturer')
  await expect(page.locator('#clearance-roles')).toContainText('Contract design & manufacturing partner')
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

test('manufacturing page explorers work responsively', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/manufacturing')

  await page.getByRole('tab', { name: /Device master record/ }).click()
  await expect(page.locator('#transfer-panel')).toContainText('full production recipe')

  await page.getByRole('button', { name: 'Next production stage' }).click()
  await expect(page.locator('#production-panel')).toContainText('Parts issued to work orders')

  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    const hasNoPageOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    )
    expect(hasNoPageOverflow).toBe(true)

    const routeFitsItsFrame = await page.locator('[data-production-track]').evaluate(
      (track) => track.scrollWidth <= track.clientWidth + 1,
    )
    expect(routeFitsItsFrame).toBe(true)
  }

  await expect(page.getByRole('tab', { name: /Shipping/ })).toBeVisible()
  await expect(page.locator('[data-production-control-focus]')).toContainText(
    'Lot-controlled ERP issue',
  )

  const scaling = page.locator('#m-scale')
  await expect(scaling.getByText('Pilot lots')).toBeVisible()
  await expect(scaling.getByText('Commercial launch')).toBeVisible()
  await expect(scaling.getByText('Sustained demand')).toBeVisible()
  await expect(scaling.locator('[data-placeholder]')).toHaveCount(0)
  await expect(scaling.locator('[data-scaling-continuity]')).toContainText(
    'Controlled records',
  )

  const scaleGeometry = await scaling.evaluate((section) => {
    const markers = [...section.querySelectorAll<HTMLElement>('[data-scaling-number]')]
    const cards = [...section.querySelectorAll<HTMLElement>('[data-scaling-path] [data-card]')]
    return {
      centerOffsets: markers.map((marker, index) => {
        const markerBox = marker.getBoundingClientRect()
        const cardBox = cards[index].getBoundingClientRect()
        return Math.abs(markerBox.left + markerBox.width / 2 - (cardBox.left + cardBox.width / 2))
      }),
      cardHeights: cards.map((card) => Math.round(card.getBoundingClientRect().height)),
    }
  })
  expect(Math.max(...scaleGeometry.centerOffsets)).toBeLessThanOrEqual(1)
  expect(new Set(scaleGeometry.cardHeights).size).toBe(1)
})

test('design-transfer content anchors remain fixed while changing tabs', async ({ page }) => {
  const anchors = [
    '[data-transfer-kicker]',
    '#transfer-panel h3',
    '#transfer-panel p',
    '[data-transfer-progress]',
  ]
  const positions = async () => {
    const panelBox = await page.locator('#transfer-panel').boundingBox()
    expect(panelBox, 'transfer panel should have a layout box').not.toBeNull()

    return Promise.all(
      anchors.map(async (selector) => {
        const box = await page.locator(selector).boundingBox()
        expect(box, `${selector} should have a layout box`).not.toBeNull()
        return box!.y - panelBox!.y
      }),
    )
  }

  const expectCopyAboveProgress = async () => {
    const copy = await page.locator('#transfer-panel p').boundingBox()
    const progress = await page.locator('[data-transfer-progress]').boundingBox()
    expect(copy).not.toBeNull()
    expect(progress).not.toBeNull()
    expect(copy!.y + copy!.height).toBeLessThanOrEqual(progress!.y)
  }

  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/manufacturing')

    const baseline = await positions()
    const tabs = page.getByRole('tab')
    await expectCopyAboveProgress()

    for (let index = 1; index < await tabs.count(); index += 1) {
      await tabs.nth(index).click()
      const current = await positions()
      current.forEach((y, anchorIndex) => {
        expect(y).toBeCloseTo(baseline[anchorIndex], 1)
      })
      await expectCopyAboveProgress()
    }
  }
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
