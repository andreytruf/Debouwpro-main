import { glob, readFile, writeFile } from "node:fs/promises";

const origin = "https://debouwpro.nl";
const pages = [];
for await (const file of glob("**/index.html", { cwd: "dist" })) {
  const route = "/" + file.slice(0, -"index.html".length).replaceAll("\\", "/");
  const url = new URL(route, origin);
  const path = `dist/${file}`;
  const html = await readFile(path, "utf8");
  await writeFile(path, html.replace("</head>", `<link rel="canonical" href="${url}">\n</head>`));
  pages.push(url.href);
}

const entries = pages.sort().map((url) => `  <url><loc>${url}</loc></url>`).join("\n");
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
