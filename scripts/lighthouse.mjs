import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["scripts/serve.mjs", String(port)], {
  stdio: "ignore",
  windowsHide: true,
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      ready = (await fetch(baseUrl)).ok;
    } catch {
      /* Server is starting. */
    }
    if (ready) break;
    await delay(250);
  }
  if (!ready) throw new Error("Static preview did not start");
  await mkdir("reports", { recursive: true });
  for (const [name, route] of [
    ["ru", "/"],
    ["en", "/en/"],
    ["case", "/projects/animbook/"],
  ]) {
    const report = path.resolve(`reports/lighthouse-${name}.json`);
    const child = spawn(
      process.execPath,
      [
        "node_modules/lighthouse/cli/index.js",
        `${baseUrl}${route}`,
        "--chrome-flags=--headless=new --no-sandbox",
        "--only-categories=performance,accessibility,seo",
        "--output=json",
        `--output-path=${report}`,
        "--quiet",
      ],
      { stdio: "inherit", windowsHide: true },
    );
    const code = await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("exit", resolve);
    });
    if (code !== 0) throw new Error(`Lighthouse failed for ${route}`);
    const result = JSON.parse(await readFile(report, "utf8"));
    const scores = Object.fromEntries(
      Object.entries(result.categories).map(([key, category]) => [
        key,
        Math.round(category.score * 100),
      ]),
    );
    console.log(`${route}: ${JSON.stringify(scores)}`);
    if (scores.performance < 90 || scores.accessibility < 95 || scores.seo < 95)
      process.exitCode = 1;
  }
} finally {
  server.kill();
}
