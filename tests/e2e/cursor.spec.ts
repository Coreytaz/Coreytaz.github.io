import { test, expect } from "@playwright/test";

test("custom cursor replaces the mouse pointer and reacts to controls", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const html = page.locator("html");
  const cursor = page.locator(".custom-cursor");
  await page.mouse.move(420, 260);
  if (isMobile) {
    await expect(html).not.toHaveAttribute("data-custom-cursor", "on");
    await expect(cursor).toBeHidden();
    return;
  }
  await expect
    .poll(async () => {
      await page.mouse.move(420, 260);
      await page.mouse.move(421, 260);
      return html.getAttribute("data-custom-cursor");
    })
    .toBe("on");
  await expect(cursor).toBeVisible();
  await expect(page.locator(".hero h1")).toHaveCSS("cursor", "none");
  await page.locator(".theme-button").hover();
  await expect(cursor).toHaveAttribute("data-kind", "interactive");
  await expect(page.locator(".cursor-pointer-shape")).toBeVisible();
  await expect(page.locator(".portfolio-glow")).toBeVisible();
  await page.mouse.down();
  await expect(cursor).toHaveAttribute("data-pressed", "true");
  await page.mouse.up();
  await expect(cursor).not.toHaveAttribute("data-pressed", "true");
  await page.keyboard.press("Tab");
  await expect(cursor).toBeHidden();
  await expect(html).not.toHaveAttribute("data-custom-cursor", "on");

  await page.locator(".motion-button").click();
  await page.mouse.move(510, 350);
  await expect(page.locator(".portfolio-glow")).toBeHidden();
  await expect(cursor).toBeHidden();
  await expect(html).not.toHaveAttribute("data-custom-cursor", "on");
  await expect(page.locator(".hero h1")).not.toHaveCSS("cursor", "none");
  await page.reload();
  await page.mouse.move(520, 350);
  await expect(cursor).toBeHidden();
  await page.locator(".motion-button").click();
  await page.mouse.move(530, 350);
  await expect(cursor).toBeVisible();
  await expect(html).toHaveAttribute("data-custom-cursor", "on");

  await page.evaluate(() => {
    const input = document.createElement("input");
    input.id = "cursor-text-test";
    input.setAttribute("aria-label", "Text cursor test");
    input.style.cssText =
      "position:fixed;top:200px;left:30px;width:180px;height:40px;z-index:200";
    document.body.appendChild(input);
  });
  await page.locator("#cursor-text-test").hover();
  await expect(html).not.toHaveAttribute("data-custom-cursor", "on");
  await expect(cursor).toBeHidden();
  await expect(page.locator("#cursor-text-test")).toHaveCSS("cursor", "text");
});

test("forced colors keeps the native pointer", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/");
  await page.mouse.move(420, 260);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-custom-cursor",
    "on",
  );
  await expect(page.locator(".custom-cursor")).toBeHidden();
});

test("CSS cursor modes preserve their native meaning", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Mouse-only cursor modes");
  await page.goto("/");
  await page.evaluate(() => {
    const target = document.createElement("div");
    target.id = "cursor-mode-test";
    target.style.cssText =
      "position:fixed;top:180px;left:30px;width:150px;height:60px;z-index:500;background:white";
    document.body.append(target);
  });
  const target = page.locator("#cursor-mode-test");
  for (const mode of [
    "text",
    "vertical-text",
    "grab",
    "grabbing",
    "move",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "wait",
    "progress",
    "not-allowed",
    "help",
    "crosshair",
    "zoom-in",
    "zoom-out",
    "copy",
    "alias",
    "none",
    "pointer",
    "default",
  ]) {
    await target.evaluate((el, cursor) => {
      el.style.cursor = cursor;
    }, mode);
    await target.hover();
    await page.mouse.move(100, 205);
    await expect(page.locator(".custom-cursor")).toHaveAttribute(
      "data-cursor",
      mode,
    );
    if (mode === "pointer" || mode === "default") {
      await expect(target).toHaveCSS("cursor", "none");
      await expect(
        page.locator(
          mode === "pointer"
            ? ".cursor-pointer-shape"
            : ".cursor-default-shape",
        ),
      ).toBeVisible();
    } else {
      await expect(target).toHaveCSS("cursor", mode);
      await expect(page.locator(".cursor-arrow")).toBeHidden();
    }
  }
});
