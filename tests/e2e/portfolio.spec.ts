import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const content = JSON.parse(readFileSync("content/portfolio.json", "utf8"));
const slugs = ["animbook", "react-chat", "spacex-ships"];

async function settleMotion(page: import("@playwright/test").Page) {
  // Contrast is measured after real entrance/route animations finish, without disabling them.
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.playState === "running" &&
                animation.effect?.getTiming().iterations !== Infinity,
            ).length,
      ),
    )
    .toBe(0);
}

test("header controls all motion and preserves the preference across reloads and languages", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const html = page.locator("html");
  const track = page.locator(".stack-track");
  await expect(html).toHaveAttribute("data-motion", "on");
  await expect(page.locator(".theme-button + .motion-button")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".stack-strip button")).toHaveCount(0);
  await page.locator(".stack-strip").hover();
  const transform = () =>
    track.evaluate((element) => getComputedStyle(element).transform);
  const start = await transform();
  await expect.poll(transform).not.toBe(start);
  await page.getByRole("button", { name: "Выключить анимации" }).click();
  await expect(html).toHaveAttribute("data-motion", "off");
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-visual")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".browser-frame").first()).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(html).toHaveCSS("scroll-behavior", "auto");
  await page.reload();
  await expect(html).toHaveAttribute("data-motion", "off");
  expect(
    await page.evaluate(() => localStorage.getItem("portfolio-motion")),
  ).toBe("off");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Включить анимации" }).click();
  await expect(html).toHaveAttribute("data-motion", "on");
  await expect(track).toHaveCSS("animation-name", "stack-scroll");
  const resumed = await transform();
  await expect.poll(transform).not.toBe(resumed);
  await page.goto("/en/projects/animbook/");
  await expect(html).toHaveAttribute("data-motion", "on");
  await page.getByRole("button", { name: "Disable animations" }).click();
  await page.goto("/");
  await expect(html).toHaveAttribute("data-motion", "off");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("motion is enabled by default even when the system requests reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  await expect(page.locator(".stack-track")).toHaveCSS(
    "animation-name",
    "stack-scroll",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
});

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
    await settleMotion(page);
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
  await settleMotion(page);
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
  await settleMotion(page);
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
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: test.info().project.use.baseURL,
  });
  const page = await context.newPage();
  for (const url of [
    "/",
    "/en/",
    "/projects/animbook/",
    "/en/projects/react-chat/",
  ]) {
    await page.goto(url);
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
