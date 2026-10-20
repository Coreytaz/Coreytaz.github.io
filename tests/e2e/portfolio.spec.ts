import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const content = JSON.parse(readFileSync("content/portfolio.json", "utf8"));
const slugs = ["animbook", "react-chat", "spacex-ships"];

test("both homepages contain real content, localized SEO, and accessible navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [url, lang] of [
    ["/", "ru"],
    ["/en/", "en"],
  ]) {
    await page.goto(url);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".work-grid > article")).toHaveCount(3);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://coreytaz.github.io${url}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `https://coreytaz.github.io/og/home-${lang}.png`,
    );
    expect(
      await page.locator('script[type="application/ld+json"]').textContent(),
    ).toContain('"Person"');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("case pages survive direct navigation, refresh, and locale switching", async ({
  page,
}) => {
  for (const slug of slugs) {
    for (const prefix of ["/", "/en/"]) {
      const url = `${prefix}projects/${slug}/`;
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await page.reload();
      await expect(page.locator("h1")).toContainText(
        content.projects.find(
          (project: { slug: string }) => project.slug === slug,
        ).title,
      );
      await expect(page.locator(".case-preview img")).toBeVisible();
      await expect(page.locator(".language-button")).toHaveAttribute(
        "href",
        `${prefix === "/" ? "/en/" : "/"}projects/${slug}/`,
      );
    }
  }
  await page.locator(".language-button").click();
  await expect(page).toHaveURL(/\/projects\/spacex-ships\/$/);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("theme persists and print mode keeps useful content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Переключить тему" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("keyboard skip link and mobile menu work", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#content$/);
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: /Проекты/ })
      .click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page).toHaveURL(/#work$/);
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  }
});

test("content is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const url of [
    "/",
    "/en/",
    "/projects/animbook/",
    "/en/projects/react-chat/",
  ]) {
    await page.goto(`http://127.0.0.1:3000${url}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toContainText(/React|AnimBook/);
  }
  await context.close();
});

test("404 is branded and drafts never enter the static artifact", async ({
  page,
  request,
}) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Кажется");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    "content",
    /noindex/,
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<loc>/g) ?? []).length).toBe(8);
  const files = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? files(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    );
  const exportedText = files("out")
    .filter((file) => /\.(html|txt|json|js|xml)$/.test(file))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
  for (const draft of content.projects.filter(
    (project: { status: string }) => project.status === "draft",
  )) {
    expect(exportedText).not.toContain(draft.slug);
    expect(sitemap).not.toContain(draft.slug);
  }
  for (const anchor of await page
    .locator('a[href^="http"]')
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")),
    ))
    expect(anchor).not.toMatch(
      /\.github\.io\/(pizza|legalide|golden|cart-react)/,
    );
});
