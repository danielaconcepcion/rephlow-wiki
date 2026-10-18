import { asset } from "../../utils/asset";
import type { CSSProperties } from "react";

/** Inline style helper that also accepts CSS custom properties (--c, --gc…). */
export const sx = (o: Record<string, string | number>) => o as CSSProperties;

/** Joins class names, skipping falsy entries. */
export const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/**
 * Entrepreneurship photos, logos and PDFs live in public/entrepreneurship/
 * (committed with the page, so they are published together with it).
 * "img/process.jpg" -> <base>/entrepreneurship/process.jpg
 */
export const A = (p: string) =>
  asset("entrepreneurship/" + p.replace(/^(img|docs)\//, ""));

/** Photo n of the Notion export (img7.jpg … img49.jpg). */
export const photo = (n: number) => A(`img/img${n}.jpg`);

/** Partner logo (logo-ucm.png, logo-promega.png …). */
export const logo = (n: string) => A(`img/logo-${n}.png`);

/** Per-photo crop focus used by the carousels (reviewed photo by photo). */
export const PHOTO_POS: Record<number, string> = {
  26: "50% 28%",
  25: "50% 22%",
  29: "50% 25%",
  32: "18% 50%",
  20: "50% 28%",
  21: "50% 30%",
  22: "50% 18%",
  8: "50% 28%",
  40: "50% 30%",
  48: "50% 52%",
};
