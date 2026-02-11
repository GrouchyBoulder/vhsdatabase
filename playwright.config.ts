import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
  use: {
    baseURL: 'http://127.0.0.1:3000'
  },
  webServer: {
    command: 'pnpm --filter @vhs/web dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000
  }
});
