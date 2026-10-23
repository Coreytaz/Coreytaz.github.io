import { test, expect } from "@playwright/test";
import sharp from "sharp";

test("language switches without reload, clipped words, or overlapping translations", async ({
  page,
}) => {
  const reveals: {
    mode?: string;
    clip: string;
    animation: string;
    background: string;
    pageBackground: string;
    timelines: number;
    filter: string;
    oldDisplay: string;
  }[] = [];
  await page.exposeFunction(
    "recordLanguageCircle",
    (value: (typeof reveals)[number]) => reveals.push(value),
  );
  await page.addInitScript(() => {
    const original = Document.prototype.startViewTransition;
    if (!original) return;
    Document.prototype.startViewTransition = function (
      ...args: Parameters<typeof original>
    ) {
      const transition = original.apply(this, args);
      void transition.ready
        .then(() => {
          const root = document.documentElement;
          // Freeze a real intermediate frame while the transition exists.
          // Reading pseudo styles after a round trip can observe its cleanup.
          if (root.dataset.viewTransition === "language") {
            for (const animation of document.getAnimations()) {
              if (
                (animation.effect as KeyframeEffect | null)?.pseudoElement ===
                "::view-transition-new(portfolio-page)"
              ) {
                animation.pause();
                animation.currentTime = 80;
              }
            }
          }
          const style = getComputedStyle(
            root,
            "::view-transition-new(portfolio-page)",
          );
          void (
            window as unknown as {
              recordLanguageCircle: (value: unknown) => Promise<void>;
            }
          ).recordLanguageCircle({
            mode: root.dataset.viewTransition,
            clip: style.clipPath,
            animation: style.animationName,
            background: style.backgroundColor,
            pageBackground: getComputedStyle(document.body).backgroundColor,
            timelines: document
              .getAnimations()
              .filter(
                (animation) =>
                  (animation.effect as KeyframeEffect | null)?.pseudoElement ===
                  "::view-transition-new(portfolio-page)",
              ).length,
            filter: style.filter,
            oldDisplay: getComputedStyle(
              root,
              "::view-transition-old(portfolio-page)",
            ).display,
          });
        })
        .catch(() => {});
      return transition;
    };
  });
  await page.goto("/");
  await page.locator(".motion-button").click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await page.locator(".motion-button").click();
  const origin = await page.evaluate(() => performance.timeOrigin);
  const documents: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "document") documents.push(request.url());
  });
  await page.locator(".language-button").click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(origin);
  await expect
    .poll(() =>
      reveals.some(
        (r) =>
          r.mode === "language" &&
          r.animation === "language-arrive" &&
          r.clip === "none",
      ),
    )
    .toBe(true);
  // Transparent snapshots let both translations show through at the same time.
  const languageReveal = reveals.find((r) => r.mode === "language")!;
  expect(languageReveal.oldDisplay).toBe("none");
  expect(languageReveal.background).toBe(languageReveal.pageBackground);
  expect(languageReveal.background).not.toBe("rgba(0, 0, 0, 0)");
  expect(languageReveal.timelines).toBe(1);
  expect(languageReveal.filter).toBe("none");
  // Check a real intermediate frame, not just the presence of an animation.
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      const effect = animation.effect as KeyframeEffect | null;
      if (effect?.pseudoElement === "::view-transition-new(portfolio-page)") {
        animation.pause();
        animation.currentTime = 80;
      }
    }
  });
  const frame = await sharp(await page.screenshot()).stats();
  expect(
    Math.max(...frame.channels.slice(0, 3).map((channel) => channel.stdev)),
  ).toBeGreaterThan(15);
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      if (animation.playState === "paused") animation.play();
    }
  });
  await page.waitForFunction(() => !document.activeViewTransition);
  await page.locator(".motion-button").click();
  reveals.length = 0;
  await page.locator(".language-button").click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(origin);
  expect(documents).toEqual([]);
  expect(reveals.filter((r) => r.mode === "language")).toEqual([]);
});

test("language arrival also works without native View Transitions", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(Document.prototype, "startViewTransition", {
      value: undefined,
      configurable: true,
    }),
  );
  await page.goto("/");
  await page.locator(".motion-button").click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await page.locator(".motion-button").click();
  const origin = await page.evaluate(() => performance.timeOrigin);
  await page.locator(".language-button").click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator("body")).toHaveCSS("clip-path", "none");
  await expect(page.locator("h1")).toBeVisible();
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(origin);
  await expect(page.locator("body")).toHaveCSS("opacity", "1");
});
