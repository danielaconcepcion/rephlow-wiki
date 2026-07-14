import type { ReactNode } from "react";
import "./Callout.css";

/**
 * Internal drafting aid, not final page content — a labeled, tinted panel
 * used across page drafts to flag the page's intended purpose, things
 * still to review, or suggested visuals. Originally local to
 * ProjectDescription.tsx; shared here now that other pages use it too.
 */
export function Callout({
  kind,
  label,
  children,
}: {
  kind: "purpose" | "editorial" | "visual";
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout callout--${kind}`}>
      {label && <span className="callout__label">{label}</span>}
      {children}
    </div>
  );
}
