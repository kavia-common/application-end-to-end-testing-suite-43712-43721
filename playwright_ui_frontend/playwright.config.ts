import { defineConfig, devices } from '@playwright/test';

/**
 * Configure Playwright to be robust in container/CI environments:
 * - Default to headless unless HEADED=true is set
 * - Disable Chromium sandbox for containers
 * - Reuse existing CRA dev server if already running
 * - Increase webServer timeout to accommodate installs/startup in CI
 * - Prefer the Chromium channel for consistency
 */
const headed = process.env.HEADED === 'true';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    // Headless by default; allow headed via HEADED=true
    headless: headed ? false : true,
    channel: 'chromium',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  },
  webServer: {
    command: 'PORT=3000 react-scripts start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' }
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
