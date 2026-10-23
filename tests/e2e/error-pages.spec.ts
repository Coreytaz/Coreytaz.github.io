import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("404 and 500 are localized, accessible, and honor global motion", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const locale of ["ru", "en"]) {
    const prefix = locale === "ru" ? "/" : "/en/";
    for (const status of [404, 500]) {
      await page.goto(`${prefix}${status}.html`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator(".error-page")).toHaveAttribute(
        "data-status",
        String(status),
      );
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
        "content",
        /noindex/,
      );
      const canvas = page.locator(".error-fuzzy");
      await expect(canvas).toHaveAttribute("data-ready", "true");
      const firstFrame = await canvas.evaluate((element: HTMLCanvasElement) =>
        element.toDataURL(),
      );
      await expect
        .poll(() =>
          canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL()),
        )
        .not.toBe(firstFrame);
      await page.locator(".motion-button").click();
      await expect(canvas).toHaveCount(0);
      await expect(page.locator(".error-code-fallback")).toBeVisible();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.locator(".motion-button").click();
      await expect(canvas).toHaveAttribute("data-ready", "true");
    }
    const missing = await request.get(`${prefix}missing-error-page-test/`);
    expect(missing.status()).toBe(404);
    expect(await missing.text()).toContain(`lang="${locale}"`);
  }
  expect(errors).toEqual([]);
});

test("a real React failure shows 500 and retry recovers the homepage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    let fail = true;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      id: string,
      ...args: unknown[]
    ) {
      if (id === "webgl2" && fail) {
        fail = false;
        throw new Error("Private test exception, never render this message");
      }
      return Reflect.apply(original, this, [id, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".error-page")).toHaveAttribute(
    "data-status",
    "500",
  );
  await expect(page.locator("body")).not.toContainText(
    "Private test exception",
  );
  await page.getByRole("button", { name: "Попробовать снова" }).click();
  await expect(page.locator(".hero h1")).toBeVisible();
  await expect(page.locator(".error-page")).toHaveCount(0);
});

test("error messages and recovery links work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of [
    "/404.html",
    "/500.html",
    "/en/404.html",
    "/en/500.html",
  ]) {
    await page.goto(route);
    await expect(page.locator(".error-code-fallback")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await page.locator(".error-actions a").click();
    await expect(page.locator(".hero h1")).toBeVisible();
  }
  await context.close();
});
