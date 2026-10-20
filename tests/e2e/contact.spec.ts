import { test, expect } from "@playwright/test";

test("contact destinations and magnetic CTA remain usable", async ({
  page,
  isMobile,
}) => {
  await page.goto("/#contact");
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.locator(".contact-links a")).toHaveCount(4);
  await expect(
    contact.locator('.contact-links a[href="mailto:coreytaz321@gmail.com"]'),
  ).toBeVisible();
  await expect(
    contact.locator('.contact-links a[href="https://t.me/gamy1337"]'),
  ).toContainText("@gamy1337");
  if (isMobile) {
    await expect(contact.locator(".contact-magnet")).toBeHidden();
    return;
  }
  const magnet = contact.locator(".contact-magnet");
  const box = await magnet.boundingBox();
  if (!box) throw new Error("Missing magnetic CTA");
  await page.mouse.move(box.x + box.width / 2 + 25, box.y + box.height / 2);
  await expect(magnet).toHaveAttribute("data-magnet-active", "");
  await expect
    .poll(() =>
      magnet
        .locator(":scope > div")
        .evaluate((e) =>
          Math.abs(new DOMMatrix(getComputedStyle(e).transform).m41),
        ),
    )
    .toBeGreaterThan(1);
  await page.locator(".motion-button").click();
  await expect(magnet).not.toHaveAttribute("data-magnet-active", "");
  await expect(magnet.locator(":scope > div")).toHaveCSS("transform", "none");
  await expect(contact.locator(".contact-orb")).toHaveAttribute(
    "href",
    "mailto:coreytaz321@gmail.com",
  );
});
