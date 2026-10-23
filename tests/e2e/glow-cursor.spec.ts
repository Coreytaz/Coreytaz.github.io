import { test, expect } from "./fixtures";

for (const fallback of [false, true]) {
  test(`glow renders with reduced system motion using ${fallback ? "canvas fallback" : "WebGL"}`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Mouse-only effect");
    await page.emulateMedia({ reducedMotion: "reduce" });
    if (fallback)
      await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
          value: function (this: HTMLCanvasElement, ...args: unknown[]) {
            if (args[0] === "webgl2") return null;
            return Reflect.apply(original, this, args);
          },
        });
      });
    await page.goto("/");
    await page.mouse.move(450, 350);
    const glow = page.locator(".portfolio-glow");
    await expect(glow).toHaveAttribute(
      "data-render-state",
      fallback ? "fallback" : "webgl",
    );
    for (let i = 0; i < 15; i++) {
      await page.mouse.move(450 + i * 12, 350 + Math.sin(i / 3) * 40);
      await page.waitForTimeout(20);
    }
    if (fallback)
      await expect(glow.locator(".glow-cursor__fallback")).toHaveAttribute(
        "data-painted",
        "true",
      );
    else
      expect(
        await glow
          .locator("canvas")
          .first()
          .evaluate((c: HTMLCanvasElement) =>
            c.getContext("webgl2")?.isContextLost(),
          ),
      ).toBe(false);
    await page.locator(".motion-button").click();
    await expect(glow).toHaveCount(0);
    await page.locator(".motion-button").click();
    await page.mouse.move(600, 400);
    await expect(glow).toHaveAttribute(
      "data-render-state",
      fallback ? "fallback" : "webgl",
    );
  });
}
