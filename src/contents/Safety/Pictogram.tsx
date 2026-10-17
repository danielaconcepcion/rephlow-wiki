import type { ReactElement } from "react";

/* --------------------------------------------------------------------------
   Line pictograms for the Safety leaflets (24×24, stroke = currentColor).
   Drawn in-house so they match the wiki's ink line weight instead of the
   stock ISO set.
   -------------------------------------------------------------------------- */

export type PictogramName =
  | "goggles"
  | "gloves"
  | "coat"
  | "dish"
  | "bin"
  | "capsule"
  | "filter"
  | "shield"
  | "flask";

const PATHS: Record<PictogramName, ReactElement> = {
  goggles: (
    <>
      <path d="M2.5 10.5c0-1.7 1.3-3 3-3h13c1.7 0 3 1.3 3 3v2.2c0 2-1.6 3.6-3.6 3.6h-1.6c-1.4 0-2.6-.9-3.1-2.2l-.2-.5a1 1 0 0 0-1.9 0l-.2.5c-.5 1.3-1.7 2.2-3.1 2.2H6.1c-2 0-3.6-1.6-3.6-3.6z" />
      <path d="M5.5 10.5h4M14.5 10.5h4" />
    </>
  ),
  gloves: (
    <>
      <path d="M7 21v-3.5L4.3 13a1.6 1.6 0 0 1 2.6-1.8L8.5 13V5.5a1.4 1.4 0 0 1 2.8 0V11V4a1.4 1.4 0 0 1 2.8 0v7V5a1.4 1.4 0 0 1 2.8 0v6.5V7.5a1.4 1.4 0 0 1 2.8 0v7c0 2.4-1 4-2.2 5V21" />
      <path d="M7 18h10" />
    </>
  ),
  coat: (
    <>
      <path d="M9 3.5 12 7l3-3.5M9 3.5 5 5.5 3.5 15H6v5.5h12V15h2.5L19 5.5l-4-2" />
      <path d="M12 7v13.5M9.5 13h-2M16.5 13h-2" />
    </>
  ),
  dish: (
    <>
      <ellipse cx="12" cy="13" rx="9" ry="5.5" />
      <path d="M3 13v1.5c0 3 4 5.5 9 5.5s9-2.5 9-5.5V13" />
      <ellipse cx="9" cy="12.5" rx="1.6" ry="1" />
      <ellipse cx="14.5" cy="11.5" rx="1.3" ry=".8" />
      <ellipse cx="13" cy="14.6" rx="1.2" ry=".7" />
    </>
  ),
  bin: (
    <>
      <path d="M4 7h16M9.5 7V4.5h5V7M6 7l1 13.5h10L18 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  capsule: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" />
      <ellipse
        cx="10.3"
        cy="11"
        rx="1.6"
        ry=".9"
        transform="rotate(-30 10.3 11)"
      />
      <ellipse
        cx="13.6"
        cy="13.4"
        rx="1.4"
        ry=".8"
        transform="rotate(20 13.6 13.4)"
      />
    </>
  ),
  filter: (
    <>
      <path d="M3.5 4.5h17l-6.5 8v6l-4 2v-8z" />
      <path d="M7 8.5h10" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.4 7.5 10 4.3-1.6 7.5-5.4 7.5-10v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3h5M10 3v6l-5.4 9.2A1.9 1.9 0 0 0 6.3 21h11.4a1.9 1.9 0 0 0 1.7-2.8L14 9V3" />
      <path d="M7.2 15h9.6" />
    </>
  ),
};

export function Pictogram({
  name,
  className,
}: {
  name: PictogramName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
