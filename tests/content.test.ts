import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { portfolioSchema } from "../src/lib/content-schema";

const original = JSON.parse(readFileSync("content/portfolio.json", "utf8"));
const fixture = () => structuredClone(original);

test("all twelve original projects have complete bilingual content", () => {
  const result = portfolioSchema.parse(original);
  assert.equal(result.projects.length, 12);
  assert.deepEqual(
    result.projects
      .filter((project) => project.status === "published")
      .map((project) => project.slug)
      .sort(),
    ["animbook", "react-chat", "spacex-ships"],
  );
});
test("drafts can be retained without a demo", () => {
  const content = fixture();
  content.projects[0].demoUrl = null;
  assert.equal(portfolioSchema.safeParse(content).success, true);
});
for (const demoUrl of [
  null,
  "/pizza/",
  "http://example.com",
  "https://other.github.io/pizza/",
  "https://coreytaz.github.io/projects/pizza/",
  "https://localhost:3000",
]) {
  test(`published projects reject invalid demos: ${demoUrl}`, () => {
    const content = fixture();
    content.projects[0].status = "published";
    content.projects[0].demoUrl = demoUrl;
    const result = portfolioSchema.safeParse(content);
    assert.equal(result.success, false);
    if (!result.success)
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes("demoUrl")),
      );
  });
}
test("duplicate slugs and demo destinations are rejected", () => {
  const content = fixture();
  content.projects[0].slug = content.projects[1].slug;
  content.projects[8].demoUrl = content.projects[9].demoUrl;
  const result = portfolioSchema.safeParse(content);
  assert.equal(result.success, false);
  if (!result.success) assert.ok(result.error.issues.length >= 2);
});
test("missing translation points at the affected field", () => {
  const content = fixture();
  delete content.projects[0].summary.en;
  const result = portfolioSchema.safeParse(content);
  assert.equal(result.success, false);
  if (!result.success)
    assert.ok(
      result.error.issues.some(
        (issue) => issue.path.join(".") === "projects.0.summary.en",
      ),
    );
});
test("unknown skill references are rejected", () => {
  const content = fixture();
  content.skills[0].projects = ["not-a-project"];
  assert.equal(portfolioSchema.safeParse(content).success, false);
});
