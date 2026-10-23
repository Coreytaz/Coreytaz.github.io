import { test, expect } from "./fixtures";

declare global {
  interface Window {
    wavesFrames: number;
    wavesPalette: number[];
    restoreWavesContext?: () => void;
  }
}

for (const readback of ["white", "blocked"] as const) {
  test(`Waves preserves its colors when canvas pixel readback is ${readback}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript((mode) => {
      CanvasRenderingContext2D.prototype.getImageData = function (
        _x,
        _y,
        width,
        height,
      ) {
        if (mode === "blocked")
          throw new DOMException("Pixel readback blocked", "SecurityError");
        const image = new ImageData(width, height);
        image.data.fill(255);
        return image;
      };
      window.wavesPalette = [];
      const original = WebGL2RenderingContext.prototype.uniform3fv;
      WebGL2RenderingContext.prototype.uniform3fv = function (
        location,
        values,
        ...rest
      ) {
        if (
          this.canvas instanceof HTMLCanvasElement &&
          this.canvas.classList.contains("waves__canvas")
        )
          window.wavesPalette = Array.from(values);
        return original.call(this, location, values, ...rest);
      };
    }, readback);
    await page.goto("/");
    await expect
      .poll(() => page.evaluate(() => window.wavesPalette))
      .toEqual([
        expect.closeTo(128 / 255, 4),
        expect.closeTo(116 / 255, 4),
        expect.closeTo(219 / 255, 4),
      ]);
    expect(errors).toEqual([]);
  });
}

test("Waves renders in both languages, pauses offscreen and follows global motion", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.wavesFrames = 0;
    const original = WebGL2RenderingContext.prototype.drawArraysInstanced;
    WebGL2RenderingContext.prototype.drawArraysInstanced = function (...args) {
      if (
        this.canvas instanceof HTMLCanvasElement &&
        this.canvas.classList.contains("waves__canvas")
      )
        window.wavesFrames++;
      return original.apply(this, args);
    };
  });
  const frames = () => page.evaluate(() => window.wavesFrames);

  for (const route of ["/", "/en/"]) {
    await page.goto(route);
    await expect.poll(frames).toBeGreaterThan(2);
    await expect(page.locator(".waves")).toHaveAttribute(
      "data-render-state",
      "ready",
    );
    expect(
      await page
        .locator(".waves__canvas")
        .evaluate((canvas: HTMLCanvasElement) =>
          canvas.getContext("webgl2")?.isContextLost(),
        ),
    ).toBe(false);
    await expect(page.locator(".hero-background")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const offscreen = await frames();
    await page.waitForTimeout(150);
    expect(await frames()).toBe(offscreen);

    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(frames).toBeGreaterThan(offscreen);
    await page.locator(".motion-button").click();
    await expect(page.locator(".waves__canvas")).toHaveCount(0);
    const stopped = await frames();
    await page.waitForTimeout(150);
    expect(await frames()).toBe(stopped);
    await expect(page.locator(".hero-background")).not.toHaveCSS(
      "background-image",
      "none",
    );
    await page.locator(".motion-button").click();
    await expect.poll(frames).toBeGreaterThan(stopped);
  }
  expect(errors).toEqual([]);
});

test("the hero keeps its gradient and content when WebGL is unavailable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      id: string,
      ...args: unknown[]
    ) {
      if (id === "webgl2") return null;
      return Reflect.apply(original, this, [id, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".waves__canvas")).toHaveCount(1);
  await expect(page.locator(".waves")).toHaveAttribute(
    "data-render-state",
    "unavailable",
  );
  await expect(page.locator(".waves__canvas")).toHaveCSS("opacity", "0");
  await expect(page.locator(".hero-background")).not.toHaveCSS(
    "background-image",
    "none",
  );
  await expect(page.locator(".hero h1")).toContainText("Логика внутри.");
  await expect(page.locator(".action-primary")).toHaveAttribute(
    "href",
    "#work",
  );
  expect(errors).toEqual([]);
});

test("Waves falls back after context loss and resumes after restoration", async ({
  page,
}) => {
  await page.goto("/");
  const renderer = page.locator(".waves");
  const canvas = page.locator(".waves__canvas");
  await expect(renderer).toHaveAttribute("data-render-state", "ready");
  const supported = await canvas.evaluate((element: HTMLCanvasElement) => {
    const extension = element
      .getContext("webgl2")
      ?.getExtension("WEBGL_lose_context");
    if (!extension) return false;
    window.restoreWavesContext = () => extension.restoreContext();
    extension.loseContext();
    return true;
  });
  test.skip(
    !supported,
    "The browser does not expose the context loss testing extension",
  );
  await expect(renderer).toHaveAttribute("data-render-state", "unavailable");
  await expect(canvas).toHaveCSS("opacity", "0");
  await page.evaluate(() => window.restoreWavesContext?.());
  await expect(renderer).toHaveAttribute("data-render-state", "ready");
  expect(
    await canvas.evaluate((element: HTMLCanvasElement) =>
      element.getContext("webgl2")?.isContextLost(),
    ),
  ).toBe(false);
});
