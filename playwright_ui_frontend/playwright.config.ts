import { defineConfig, devices } from '@playwright/test';

/**
 * Configure Playwright to be robust in container/CI environments:
 * - Default to headless unless HEADLESS=false is set
 * - Pin to Chromium channel for consistency
 * - Disable GPU and sandbox, add zygote/dev-shm flags for stability
 * - Reuse existing CRA dev server if already running
 * - Increase webServer timeout to accommodate installs/startup in CI
 * - Reduce reporters to avoid extra processes in UI mode
 * - Limit output persistence to reduce file handles
 */
const headless = process.env.HEADLESS !== 'false';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  // Keep reporters minimal by default to avoid extra child processes
  reporter: [['list']],
  preserveOutput: 'never',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    // Headless by default; HEADLESS=false enables headed
    headless,
    launchOptions: {
      // Enforce Chromium and pass flags needed for headless containers
      channel: 'chromium',
      args: [
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-zygote'
      ]
    }
  },
  webServer: {
    command: 'PORT=3000 react-scripts start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180000
  },
  // Keep single default project (chromium) for stability; others can be enabled later
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' }
    }
  ]
});
