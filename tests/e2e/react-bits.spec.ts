import { test, expect } from "./fixtures";

test("React Bits effects follow the pointer and stop with global motion", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const star = page.locator(".star-border__light");
  const frame = () =>
    star.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await expect
    .poll(() => star.evaluate((canvas: HTMLCanvasElement) => canvas.width))
    .toBeGreaterThan(100);
  const initial = await frame();
  await expect.poll(frame).not.toBe(initial);

  const preview = page.locator(".project-spotlight").first();
  await preview.scrollIntoViewIfNeeded();
  const light = preview.locator(".spotlight-card__light");
  if (!isMobile) {
    await preview.hover({ position: { x: 100, y: 100 } });
    await expect
      .poll(() =>
        light.evaluate((element) => Number(getComputedStyle(element).opacity)),
      )
      .toBeGreaterThan(0.05);
    const previous = await light.evaluate(
      (element) => element.style.background,
    );
    await preview.hover({ position: { x: 220, y: 170 } });
    await expect
      .poll(() => light.evaluate((element) => element.style.background))
      .not.toBe(previous);
  } else {
    await expect(light).toHaveCSS("opacity", "0");
  }

  await page.locator(".motion-button").click();
  await expect(star).toBeHidden();
  await expect(light).toBeHidden();
  const stopped = await frame();
  await page.waitForTimeout(250);
  expect(await frame()).toBe(stopped);
  await page.locator(".motion-button").click();
  await expect(star).toBeVisible();
  await expect.poll(frame).not.toBe(stopped);
  expect(errors).toEqual([]);
});
