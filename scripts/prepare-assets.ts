import { mkdir, readFile, writeFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { portfolioSchema } from "../src/lib/content-schema";

const content = portfolioSchema.parse(
  JSON.parse(await readFile("content/portfolio.json", "utf8")),
);
const imageRoot = path.resolve("public/images/projects");
const ogRoot = path.resolve("public/og");
await mkdir(imageRoot, { recursive: true });
await mkdir(ogRoot, { recursive: true });
const published = content.projects.filter(
  (project) => project.status === "published",
);
const imageNames = new Set(
  published.map((project) => path.basename(project.image)),
);
for (const file of await readdir(imageRoot)) {
  if (file.endsWith(".webp") && !imageNames.has(file))
    await unlink(path.join(imageRoot, file));
}
const ogNames = new Set([
  "home-ru.png",
  "home-en.png",
  ...published.flatMap((project) => [
    `${project.slug}-ru.png`,
    `${project.slug}-en.png`,
  ]),
]);
for (const file of await readdir(ogRoot)) {
  if (file.endsWith(".png") && !ogNames.has(file))
    await unlink(path.join(ogRoot, file));
}
for (const project of published) {
  await sharp(project.imageSource)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join("public", project.image));
}
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
for (const locale of ["ru", "en"] as const) {
  for (const project of [null, ...published]) {
    const title = project?.title ?? content.profile.name[locale];
    const subtitle = project?.category[locale] ?? content.profile.role[locale];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f7f2"/><path d="M64 80h1072M64 550h1072" stroke="#d8d9d5"/><text x="64" y="61" font-family="Arial,sans-serif" font-size="17" fill="#525650">STEPAN BYKOV / PORTFOLIO</text><rect x="896" y="182" width="240" height="240" rx="40" fill="#2957e0"/><text x="925" y="344" font-family="Arial,sans-serif" font-weight="bold" font-size="100" fill="white">SB.</text><text x="64" y="295" font-family="Arial,sans-serif" font-size="${title.length > 21 ? 49 : 64}" font-weight="bold" fill="#19201f">${escape(title)}</text><text x="67" y="357" font-family="Arial,sans-serif" font-size="27" fill="#2957e0">${escape(subtitle)}</text><text x="64" y="515" font-family="Arial,sans-serif" font-size="19" fill="#525650">React · TypeScript · Next.js</text><text x="64" y="593" font-family="Arial,sans-serif" font-size="16" fill="#525650">${escape(new URL(content.site.baseUrl).hostname)}</text></svg>`;
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(ogRoot, `${project?.slug ?? "home"}-${locale}.png`));
  }
}
await writeFile("public/.nojekyll", "");
console.log(
  `Prepared ${published.length} optimized project images and ${ogNames.size} social cards.`,
);
