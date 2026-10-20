import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT ?? process.argv[2] ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(403).end();
      return;
    }
    let statusCode = 200;
    try {
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith("/")) {
          response
            .writeHead(308, { Location: url.pathname + "/" + url.search })
            .end();
          return;
        }
        file = path.join(file, "index.html");
      }
      if (!(await stat(file)).isFile()) throw new Error("Not a file");
    } catch (error) {
      if (!error || !["ENOENT", "ENOTDIR"].includes(error.code)) throw error;
      file = path.join(
        root,
        pathname.startsWith("/en/") ? "en/404.html" : "404.html",
      );
      statusCode = 404;
    }
    let body = await readFile(file);
    const type = types[path.extname(file)] ?? "application/octet-stream";
    const headers = {
      "Content-Type": type,
      "Cache-Control": "no-cache",
      Vary: "Accept-Encoding",
    };
    // GitHub Pages compresses text assets; use equivalent transfer behavior for production QA.
    if (
      /gzip/.test(request.headers["accept-encoding"] ?? "") &&
      /text|javascript|json|xml|svg/.test(type)
    ) {
      body = gzipSync(body);
      headers["Content-Encoding"] = "gzip";
    }
    headers["Content-Length"] = String(body.length);
    response.writeHead(statusCode, headers);
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    if (error instanceof URIError || error instanceof TypeError) {
      response.writeHead(400).end("Bad request");
      return;
    }
    try {
      const body = await readFile(path.join(root, "500.html"));
      response.writeHead(500, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex",
      });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch {
      response.writeHead(500).end("Internal server error");
    }
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://localhost:${port}`),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
