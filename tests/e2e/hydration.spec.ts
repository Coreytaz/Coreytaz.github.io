import { test, expect } from "@playwright/test";

for (const theme of ["light", "dark", "system"]) {
  test(`saved ${theme} theme hydrates navigation without mismatches`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript(
      (value) => localStorage.setItem("theme", value),
      theme,
    );
    for (const path of ["/", "/en/"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(
        theme === "light" ? /light/ : /dark/,
      );
      // A changed label proves event handlers and the theme context hydrated.
      await page.locator(".motion-button").click();
      await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
      await page.locator(".motion-button").click();
      await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
      await page.reload();
      await expect(page.locator(".motion-button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    }
    expect(
      errors.filter((message) =>
        /hydrat|didn't match|server rendered|Minified React error|Uncaught/i.test(
          message,
        ),
      ),
    ).toEqual([]);
  });
}
