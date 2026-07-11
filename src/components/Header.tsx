interface HeaderProps {
  title: string;
  lead: string;
}

/**
 * Shared hero for the generic content pages — reproduces the
 * `page-shell > page-hero` markup that was duplicated across every
 * placeholder .html page in the static site.
 */
export function Header({ title, lead }: HeaderProps) {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="hero__eyebrow">Web page currently under construction!</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lede">{lead}</p>
      </section>
    </main>
  );
}
