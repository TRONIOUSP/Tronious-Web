import { defineConfig, devices } from '@playwright/test'

// Dedicated to this repository. Reusing an arbitrary localhost server can
// produce false-green screenshots and accessibility results from another app.
const PORT = 3317

export default defineConfig({
  testDir: './e2e',
  outputDir: 'test-results',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
