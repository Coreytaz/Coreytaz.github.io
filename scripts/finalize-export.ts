import { copyFile, readFile } from "node:fs/promises";

// GitHub Pages serves /404.html for every unknown URL. Reuse the prerendered branded page.
await copyFile("out/page-not-found/index.html", "out/404.html");
for (const [file, lang] of [
  ["out/index.html", "ru"],
  ["out/en/index.html", "en"],
]) {
  const html = await readFile(file, "utf8");
  if (!html.includes(`lang="${lang}"`) || !html.includes("application/ld+json"))
    throw new Error(`Invalid exported page: ${file}`);
}
console.log("Static export verified; branded GitHub Pages 404 ready.");
