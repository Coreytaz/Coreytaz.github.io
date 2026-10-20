import { test, expect } from "@playwright/test";

test("hero artwork tilts with the mouse and resets when motion is off", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const artwork = page.locator(".hero-tilt");
  await expect(artwork).toBeVisible();
  const body = artwork.locator(".tilted-card__body");
  if (isMobile) {
    await expect(body).toHaveCSS("transform", "none");
    return;
  }
  const bounds = await artwork.boundingBox();
  if (!bounds) throw new Error("Missing hero artwork");
  await page.mouse.move(
    bounds.x + bounds.width * 0.8,
    bounds.y + bounds.height * 0.3,
  );
  await expect
    .poll(() =>
      body.evaluate((e) =>
        Math.abs(new DOMMatrix(getComputedStyle(e).transform).m13),
      ),
    )
    .toBeGreaterThan(0.01);
  await page.locator(".motion-button").click();
  await expect(body).toHaveCSS("transform", "none");
  await expect(artwork.locator(".workspace-preview")).toBeVisible();
});
