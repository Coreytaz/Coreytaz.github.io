import { writeFileSync } from "node:fs";
import { z } from "zod";
import { portfolioSchema } from "../src/lib/content-schema";

writeFileSync(
  "content/portfolio.schema.json",
  JSON.stringify(
    z.toJSONSchema(portfolioSchema, { target: "draft-7" }),
    null,
    2,
  ) + "\n",
);
console.log(
  "Generated content/portfolio.schema.json. Semantic checks also run via npm run content:check.",
);
