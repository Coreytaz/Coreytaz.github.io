import { test, expect } from "./fixtures";

// Windows can disable native smooth scrolling independently of CSS.
test.use({ launchOptions: { args: ["--enable-smooth-scrolling"] } });

type Snapshot = {
  pseudo: string | null;
  frames: { clipPath?: string | number }[];
};
declare global {
  interface Window {
    transitionProbe: {
      starts: number;
      ready: number;
      finished: number;
      errors: string[];
      snapshots: Snapshot[];
      animations: string[];
    };
    recordPageReveal: (value: boolean) => Promise<void>;
    navigationScroll: number[];
  }
}

async function installProbe(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    window.transitionProbe = {
      starts: 0,
      ready: 0,
      finished: 0,
      errors: [],
      snapshots: [],
      animations: [],
    };
    document.addEventListener("animationstart", (event) =>
      window.transitionProbe.animations.push(event.animationName),
    );
    const original = Document.prototype.startViewTransition;
    if (!original) return;
    Document.prototype.startViewTransition = function (
      ...args: Parameters<typeof original>
    ) {
      const transition = original.apply(this, args);
      window.transitionProbe.starts++;
      void transition.ready
        .then(() => {
          window.transitionProbe.ready++;
          // React and the theme helper attach their effects in ready callbacks.
          queueMicrotask(() =>
            queueMicrotask(() => {
              window.transitionProbe.snapshots.push(
                ...document.getAnimations().map((animation) => {
                  const effect = animation.effect as KeyframeEffect | null;
                  return {
                    pseudo: effect?.pseudoElement ?? null,
                    frames:
                      effect?.getKeyframes().map((frame) => ({
                        clipPath: (
                          frame as ComputedKeyframe & { clipPath?: string }
                        ).clipPath,
                      })) ?? [],
                  };
                }),
              );
            }),
          );
        })
        .catch((error) => window.transitionProbe.errors.push(String(error)));
      void transition.finished
        .then(() => window.transitionProbe.finished++)
        .catch(() => {});
      return transition;
    };
  });
}

test.describe("section navigation", () => {
  for (const locale of ["ru", "en"] as const) {
    test(`${locale} section navigation scrolls smoothly without a page snapshot`, async ({
      page,
      isMobile,
    }) => {
      await installProbe(page);
      for (const enabled of [true, false]) {
        await page.goto(locale === "ru" ? "/" : "/en/");
        if (!enabled) await page.locator(".motion-button").click();
        await page.evaluate(() => {
          window.navigationScroll = [scrollY];
          addEventListener("scroll", () =>
            window.navigationScroll.push(scrollY),
          );
        });
        if (isMobile) await page.locator(".mobile-menu").click();
        await page
          .locator(isMobile ? ".sheet-nav a" : ".desktop-nav a")
          .nth(1)
          .click();
        await expect(page).toHaveURL(/#about$/);
        await expect
          .poll(() =>
            page
              .locator("#about")
              .evaluate((section) =>
                Math.abs(section.getBoundingClientRect().top - 100),
              ),
          )
          .toBeLessThan(2);
        const { starts, positions, scrollEnd } = await page.evaluate(() => ({
          starts: window.transitionProbe.starts,
          positions: window.navigationScroll,
          scrollEnd: scrollY,
        }));
        expect(starts).toBe(0);
        if (enabled) {
          // CI can coalesce scroll events. Require an intermediate position
          // rather than a machine-dependent number of rendered frames.
          expect(
            positions.some((y) => y > positions[0]! && y < scrollEnd),
          ).toBe(true);
          expect(
            positions.every((y, index) => !index || y >= positions[index - 1]!),
          ).toBe(true);
        } else {
          expect(positions.length).toBeLessThanOrEqual(2);
        }
        if (isMobile) await expect(page.locator(".sheet-nav")).toBeHidden();
      }
    });
  }
});

test("entry choreography and scroll reveals play, and global motion cancels them", async ({
  page,
}) => {
  await installProbe(page);
  await page.goto("/");
  await expect
    .poll(() => page.evaluate(() => window.transitionProbe.animations))
    .toContain("entry-rise");
  await expect(page.locator(".hero h1")).toHaveCSS(
    "animation-name",
    "entry-rise",
  );
  await page.locator(".skills-grid").scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.locator('.skill-card-shell[data-revealed="true"]').count())
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Выключить анимации" }).click();
  await expect(page.locator(".hero h1")).toHaveCSS("animation-name", "none");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);
});

test("theme opens in a circular view transition from its button and leaves no stale effects", async ({
  page,
}) => {
  await installProbe(page);
  await page.goto("/");
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const button = page.getByRole("button", { name: "Переключить тему" });
  const box = await button.boundingBox();
  const previous = await page.locator("html").getAttribute("class");
  await button.click();
  await expect
    .poll(() => page.evaluate(() => window.transitionProbe.finished))
    .toBe(1);
  expect(await page.locator("html").getAttribute("class")).not.toBe(previous);
  const probe = await page.evaluate(() => window.transitionProbe);
  expect(probe.ready).toBe(1);
  const circle = probe.snapshots.find(
    (snapshot) =>
      snapshot.pseudo === "::view-transition-new(root)" &&
      snapshot.frames.some((frame) =>
        String(frame.clipPath).startsWith("circle("),
      ),
  );
  expect(circle).toBeDefined();
  expect(circle!.frames[0].clipPath).toContain(`${box!.x + box!.width / 2}px`);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-view-transition",
    "theme",
  );
  expect(
    await page.evaluate(() =>
      document
        .getAnimations()
        .some(
          (animation) =>
            (animation.effect as KeyframeEffect | null)?.pseudoElement ===
            "::view-transition-new(root)",
        ),
    ),
  ).toBe(false);
  await button.click();
  await expect
    .poll(() => page.evaluate(() => window.transitionProbe.finished))
    .toBe(2);
  await expect(page.locator("html")).toHaveAttribute("class", previous!);
  expect(errors).toEqual([]);
});

test("project navigation shares the real preview and title snapshots", async ({
  page,
}) => {
  await installProbe(page);
  const missing: string[] = [];
  const errors: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) missing.push(response.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator(".project-visual").first().click();
  await expect(page).toHaveURL(/\/projects\/animbook\/$/);
  await expect
    .poll(() => page.evaluate(() => window.transitionProbe.finished))
    .toBeGreaterThan(0);
  const snapshots = await page.evaluate(() =>
    window.transitionProbe.snapshots.map((snapshot) => snapshot.pseudo),
  );
  expect(snapshots).toContain(
    "::view-transition-group(project-image-animbook)",
  );
  expect(snapshots).toContain(
    "::view-transition-group(project-title-animbook)",
  );
  expect(snapshots).toContain("::view-transition-new(portfolio-page)");
  expect(missing).toEqual([]);
  expect(errors).toEqual([]);
});

test("returning to all projects keeps previews inside the page snapshot", async ({
  page,
}) => {
  await installProbe(page);
  await page.goto("/projects/animbook/");
  await page.getByRole("link", { name: "Все проекты", exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect
    .poll(() => page.evaluate(() => window.transitionProbe.finished))
    .toBeGreaterThan(0);
  const probe = await page.evaluate(() => window.transitionProbe);
  expect(probe.snapshots.map((snapshot) => snapshot.pseudo)).toContain(
    "::view-transition-new(portfolio-page)",
  );
  expect(
    probe.snapshots.filter((snapshot) =>
      /project-(image|title)-/.test(snapshot.pseudo ?? ""),
    ),
  ).toEqual([]);
  expect(probe.animations).toContain("language-arrive");
  expect(probe.errors).toEqual([]);
});

test("language changes animate for client and full-document navigation", async ({
  page,
}) => {
  const reveals: boolean[] = [];
  await installProbe(page);
  await page.exposeFunction("recordPageReveal", (value: boolean) =>
    reveals.push(value),
  );
  await page.addInitScript(() => {
    window.addEventListener("pageswap", (event) => {
      void window.recordPageReveal(!!event.viewTransition);
    });
    window.addEventListener("pagereveal", (event) => {
      void window.recordPageReveal(!!event.viewTransition);
    });
  });
  await page.goto("/");
  await page.locator(".language-button").click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect
    .poll(
      async () =>
        reveals.includes(true) ||
        (await page.evaluate(() => window.transitionProbe.starts > 0)),
    )
    .toBe(true);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  // The old header must stay hidden throughout the page transition: its
  // transparent snapshot otherwise overlays Russian labels onto English ones.
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-old(portfolio-header)",
        ).display,
    ),
  ).toBe("none");
  await expect(page.locator(".desktop-nav")).toContainText("Work");
  await page.waitForFunction(() => !document.activeViewTransition);
  const beforeFullNavigation = reveals.filter(Boolean).length;
  await page.evaluate(() => {
    location.assign("/");
  });
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect
    .poll(() => reveals.filter(Boolean).length)
    .toBeGreaterThan(beforeFullNavigation);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
});

test("disabled motion skips theme snapshots and cancels an in-progress reveal", async ({
  page,
}) => {
  await installProbe(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Выключить анимации" }).click();
  const starts = await page.evaluate(() => window.transitionProbe.starts);
  await page.getByRole("button", { name: "Переключить тему" }).click();
  expect(await page.evaluate(() => window.transitionProbe.starts)).toBe(starts);
  await page.getByRole("button", { name: "Включить анимации" }).click();
  // Programmatic activation covers a user toggling motion while the snapshot is active.
  await page.getByRole("button", { name: "Переключить тему" }).click();
  await page
    .locator(".motion-button")
    .evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);
});

test("theme and project navigation still work without startViewTransition", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      configurable: true,
    }),
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Переключить тему" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.locator(".project-visual").first().click();
  await expect(page.locator("h1")).toContainText("AnimBook");
  expect(errors).toEqual([]);
});
