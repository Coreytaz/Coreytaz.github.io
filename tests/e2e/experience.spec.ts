import { test, expect } from "./fixtures";

test("experience is localized and reachable from home and a case", async ({
  page,
}, testInfo) => {
  for (const locale of ["ru", "en"] as const) {
    const home = locale === "ru" ? "/" : "/en/";
    await page.goto(home);
    const section = page.locator("#experience");
    await expect(section.locator("article")).toHaveCount(2);
    await expect(section).toContainText("VICTORY");
    await expect(section).toContainText("Digital Kontora");
    await expect(section).toContainText(
      locale === "ru"
        ? "Февраль 2025 — настоящее время"
        : "February 2025 — Present",
    );
    await expect(section).toContainText("JsSIP");
    await expect(
      section.locator("article").first().locator("ul").first().locator("li"),
    ).toHaveCount(5);
    expect(
      await section.evaluate((el) =>
        Boolean(
          document.querySelector("#work")!.compareDocumentPosition(el) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
    expect(
      await section.evaluate((el) =>
        Boolean(
          el.compareDocumentPosition(document.querySelector("#about")!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
    for (const path of [home, `${home}projects/animbook/`]) {
      await page.goto(path);
      if (testInfo.project.name === "mobile") {
        await page
          .getByRole("button", {
            name: locale === "ru" ? "Открыть меню" : "Open menu",
          })
          .click();
      }
      await page
        .locator('a[href$="#experience"]')
        .filter({ visible: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${home}#experience$`));
      await expect(section).toBeVisible();
    }
    await page
      .getByRole("button", {
        name: locale === "ru" ? "Выключить анимации" : "Disable animations",
      })
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
    await expect(section).toContainText("TanStack Table");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(() => localStorage.removeItem("portfolio-motion"));
  }
});

test("experience remains readable and navigable without JavaScript", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: testInfo.project.use.viewport,
  });
  const page = await context.newPage();
  for (const [path, label] of [
    ["/", "Опыт"],
    ["/en/", "Experience"],
  ]) {
    await page.goto(`${testInfo.project.use.baseURL}${path}`);
    await page
      .locator(".noscript-nav")
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page.locator("#experience article")).toHaveCount(2);
    await expect(page.locator("#experience")).toBeVisible();
  }
  await context.close();
});
