/* Responsive <img> markup for the photos in assets/img (WebP, 640 + 1280 wide). */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const META = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "img-meta.json"), "utf8"));

export function photo(c, name, alt, { sizes = "100vw", eager = false, cls = "", high = false } = {}) {
  const m = META[name];
  if (!m) throw new Error("Unknown photo " + name);
  const w = Math.min(1280, m.w), h = Math.round(m.h * w / m.w);
  return `<img class="${cls}" src="${c.root}assets/img/${name}-1280.webp" srcset="${c.root}assets/img/${name}-640.webp 640w, ${c.root}assets/img/${name}-1280.webp 1280w" sizes="${sizes}" width="${w}" height="${h}" alt="${alt}"${eager ? "" : ' loading="lazy"'} decoding="async"${high ? ' fetchpriority="high"' : ""} style="background:${m.c}">`;
}
export const photoUrl = (c, name, w = 1280) => `${c.root}assets/img/${name}-${w}.webp`;
