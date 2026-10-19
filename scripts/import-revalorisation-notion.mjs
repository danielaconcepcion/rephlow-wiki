import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const sources = [
  {
    key: "experiments",
    markdown: "/private/tmp/rephlow-notion/experiments/Privado y compartido/Experiments/Revalorisation 39fab4c5e133804b9899cd45a6c5764a.md",
    assets: "/private/tmp/rephlow-notion/experiments/Privado y compartido/Experiments/Revalorisation",
  },
  {
    key: "results",
    markdown: "/private/tmp/rephlow-notion/results/Privado y compartido/Results/Revalorisation 39fab4c5e13380069cfaf8034e4d6926.md",
    assets: "/private/tmp/rephlow-notion/results/Privado y compartido/Results/Revalorisation",
  },
];

const sourceDir = new URL("../src/contents/RevalorisationSource/", import.meta.url);
const publicDir = new URL("../public/assets/revalorisation-notion/", import.meta.url);
mkdirSync(sourceDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

for (const source of sources) {
  const assetTarget = join(publicDir.pathname, source.key);
  mkdirSync(assetTarget, { recursive: true });
  const names = new Map();
  for (const file of readdirSync(source.assets)) {
    const extension = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".svg", ".pdf", ".dna"].includes(extension)) continue;
    const safe = basename(file).normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-|-$/g, "");
    names.set(file, safe);
    copyFileSync(join(source.assets, file), join(assetTarget, safe));
  }

  let markdown = readFileSync(source.markdown, "utf8")
    .replaceAll("<aside>", "")
    .replaceAll("</aside>", "")
    .replace(/^#[^\n]*\n/, "");
  markdown = markdown.replace(/\((?:Revalorisation|Revalorisation%2F)\/([^\)]+)\)/g, (_, encoded) => {
    const original = decodeURIComponent(encoded);
    const safe = names.get(original);
    return safe ? `(assets/revalorisation-notion/${source.key}/${safe})` : `(${encoded})`;
  });
  writeFileSync(join(sourceDir.pathname, `${source.key}.md`), markdown);
}
