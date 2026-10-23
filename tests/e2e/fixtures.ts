import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // Keep browser tests independent of analytics and out of real site statistics.
    await page.route("https://stats.coreytaz.ru/tracker.js", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "" }),
    );
    await use(page);
  },
});

export { expect };
