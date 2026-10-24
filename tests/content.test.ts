import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { portfolioSchema } from "../src/lib/content-schema";

const original = JSON.parse(readFileSync("content/portfolio.json", "utf8"));
const fixture = () => structuredClone(original);

test("all supplied projects have bilingual content and the correct groups", () => {
  const result = portfolioSchema.parse(original);
  assert.equal(result.projects.length, 19);
  const published = result.projects.filter(
    (project) => project.status === "published",
  );
  assert.equal(published.length, 18);
  assert.deepEqual(
    Object.fromEntries(
      ["react", "markup", "javascript", "backend"].map((group) => [
        group,
        published.filter((project) => project.group === group).length,
      ]),
    ),
    { react: 10, markup: 3, javascript: 1, backend: 4 },
  );
  for (const project of published.filter(
    (project) => project.group === "react",
  ))
    assert.ok(
      project.technologies.some((technology) =>
        ["React", "Next.js"].includes(technology),
      ),
    );
  for (const project of published.filter(
    (project) => project.group !== "react",
  ))
    assert.ok(!project.technologies.includes("React"));
});
test("drafts can be retained without a demo", () => {
  const content = fixture();
  content.projects[0].status = "draft";
  content.projects[0].demoUrl = null;
  content.projects[0].repositories = [];
  assert.equal(portfolioSchema.safeParse(content).success, true);
});
for (const demoUrl of [
  "/pizza/",
  "http://example.com",
  "https://coreytaz.github.io/",
  "https://coreytaz.github.io/en/",
  "https://coreytaz.github.io/projects/pizza/",
  "https://github.com/Coreytaz/pizza",
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
test("GitHub Pages demos, including sibling projects, are allowed", () => {
  for (const demoUrl of [
    "https://other.github.io/pizza/",
    "https://coreytaz.github.io/pizza/",
  ]) {
    const content = fixture();
    content.projects[0].demoUrl = demoUrl;
    assert.equal(portfolioSchema.safeParse(content).success, true);
  }
});
test("published source-only projects need a repository", () => {
  const content = fixture();
  content.projects[0].demoUrl = null;
  assert.equal(portfolioSchema.safeParse(content).success, true);
  content.projects[0].repositories = [];
  assert.equal(portfolioSchema.safeParse(content).success, false);
});
test("unknown project groups are rejected", () => {
  const content = fixture();
  content.projects[0].group = "unknown";
  assert.equal(portfolioSchema.safeParse(content).success, false);
});
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
