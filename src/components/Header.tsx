import { HeaderMoleculeField } from "./HeaderMoleculeField";
import "./Header.css";

interface HeaderProps {
  title: string;
  lead: string;
  hideEyebrow?: boolean;
  compactHero?: boolean;
  /**
   * Opt-in visual variant: renders the Claude Design "MoleculeField"
   * (edge/light) header treatment — a blue-green molecule field on a
   * warm-paper band, bordered off from the rest of the page — behind
   * this same title/lede markup, instead of the plain default page-shell
   * background. The number just seeds which composition is drawn, so
   * pages that both use it don't render an identical field. Undefined
   * (the default) keeps the original page-shell look untouched.
   */
  moleculeSeed?: number;
}

/**
 * Shared hero for the generic content pages — reproduces the
 * `page-shell > page-hero` markup that was duplicated across every
 * placeholder .html page in the static site.
 */
export function Header({
  title,
  lead,
  hideEyebrow = false,
  compactHero = false,
  moleculeSeed,
}: HeaderProps) {
  const molecule = moleculeSeed !== undefined;
  return (
    <main
      className={`page-shell${compactHero ? " page-shell--compact" : ""}${
        molecule ? " page-shell--molecule" : ""
      }`}
    >
      {molecule && <HeaderMoleculeField seed={moleculeSeed} />}
      <section className={`page-hero${compactHero ? " page-hero--compact" : ""}`}>
        {!hideEyebrow && (
          <p className="hero__eyebrow">
            Web page currently under construction!
          </p>
        )}
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lede">{lead}</p>
      </section>
    </main>
  );
}
