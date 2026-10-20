import { copyFile, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Windows exports can leave segment-prefetch payloads nested, while the browser
// requests their dotted names. Emit static aliases so Pages needs no rewrites.
async function normalizeSegmentPayloads(directory: string) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await normalizeSegmentPayloads(file);
    else if (entry.name.endsWith(".html")) {
      // The shared App Router root survives locale switches. Stamp each static
      // document's language for crawlers and no-JS clients before publication.
      const locale =
        path.relative("out", file).split(path.sep)[0] === "en" ? "en" : "ru";
      const html = await readFile(file, "utf8");
      await writeFile(
        file,
        html.replace(/(<html\b[^>]*\blang=)["'][^"']*["']/, `$1"${locale}"`),
      );
    } else if (entry.name.endsWith(".txt")) {
      const segments = path.relative("out", file).split(path.sep);
      const first = segments.findIndex((segment) =>
        segment.startsWith("__next."),
      );
      if (first >= 0 && first < segments.length - 1) {
        await copyFile(
          file,
          path.join(
            "out",
            ...segments.slice(0, first),
            segments.slice(first).join("."),
          ),
        );
      }
    }
  }
}
await normalizeSegmentPayloads("out");

// GitHub Pages serves /404.html for every unknown URL. Reuse the prerendered branded page.
await copyFile("out/page-not-found/index.html", "out/404.html");
await copyFile("out/en/page-not-found/index.html", "out/en/404.html");
await copyFile("out/500/index.html", "out/500.html");
await copyFile("out/en/500/index.html", "out/en/500.html");
for (const [file, lang] of [
  ["out/index.html", "ru"],
  ["out/en/index.html", "en"],
]) {
  const html = await readFile(file, "utf8");
  if (!html.includes(`lang="${lang}"`) || !html.includes("application/ld+json"))
    throw new Error(`Invalid exported page: ${file}`);
}
console.log("Static export verified; bilingual 404.html and 500.html ready.");
