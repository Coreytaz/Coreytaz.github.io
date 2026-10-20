import "server-only";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { portfolioSchema, type Locale } from "./content-schema";

const parsed = portfolioSchema.safeParse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), "content/portfolio.json"), "utf8"),
  ),
);
if (!parsed.success)
  throw new Error(
    `Invalid portfolio.json:\n${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n")}`,
  );

// Read only on the build/server side, including additionalTechnologies for the strip.
// The complete JSON, including drafts, is never imported by a client component.
export const portfolio = parsed.data;
export const stripTechnologies = [
  ...new Set([
    ...portfolio.skills.flatMap((skill) => skill.technologies),
    ...portfolio.additionalTechnologies,
  ]),
];
export const buildYear = new Date().getUTCFullYear();
for (const project of portfolio.projects.filter(
  (item) => item.status === "published",
)) {
  if (!existsSync(path.join(process.cwd(), "public", project.image)))
    throw new Error(
      `projects.${project.slug}.image: file does not exist: ${project.image}. Run npm run assets:build.`,
    );
}
export const publishedProjects = portfolio.projects
  .filter((project) => project.status === "published")
  .sort((a, b) => a.order - b.order);
export const featuredProjects = publishedProjects.filter(
  (project) => project.featured,
);
export const homePath = (locale: Locale) => (locale === "ru" ? "/" : "/en/");
export const projectPath = (locale: Locale, slug: string) =>
  `${homePath(locale)}projects/${slug}/`;
export const absoluteUrl = (pathname: string) =>
  new URL(pathname, portfolio.site.baseUrl).href;
