import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Copies POST.json (the X post address for this entry) from the
// repository root into the harness output directory. It also checks the
// file parses as JSON before copying, so a broken POST.json fails here
// instead of later at the gate.
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

const src = join(botDir, "POST.json");
const dest = join(outDir, "POST.json");

try {
  if (!existsSync(src)) {
    throw new Error(`POST.json not found at ${src}`);
  }
  JSON.parse(readFileSync(src, "utf8"));
  mkdirSync(outDir, { recursive: true });
  copyFileSync(src, dest);
  console.log(`copied ${src} -> ${dest}`);
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
