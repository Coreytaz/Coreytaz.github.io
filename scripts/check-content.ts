import { readFileSync, existsSync } from "node:fs";
import { portfolioSchema } from "../src/lib/content-schema";

try {
  const result = portfolioSchema.safeParse(
    JSON.parse(readFileSync("content/portfolio.json", "utf8")),
  );
  if (!result.success) {
    for (const issue of result.error.issues)
      console.error(`${issue.path.join(".")}: ${issue.message}`);
    process.exit(1);
  }
  for (const [index, project] of result.data.projects.entries()) {
    if (!existsSync(project.imageSource))
      throw new Error(
        `projects.${index}.imageSource: missing ${project.imageSource}`,
      );
  }
  console.log(
    `Content valid: ${result.data.projects.length} projects, ${result.data.projects.filter((project) => project.status === "published").length} published; RU + EN complete.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
