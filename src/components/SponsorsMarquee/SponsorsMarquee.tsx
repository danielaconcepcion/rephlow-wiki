import { SPONSORS, sponsorLogo, type Sponsor } from "./sponsors.ts";
import "./SponsorsMarquee.css";

/*
 * Sliding strip of sponsor logos, shown above the footer on every page.
 * - Moves continuously; pauses on hover or keyboard focus.
 * - With "reduce motion" turned on, the logos stand still in a centred row.
 */

function LogoList({ sponsors, hidden = false }: { sponsors: Sponsor[]; hidden?: boolean }) {
  return (
    <ul className="sponsors-marquee__list" aria-hidden={hidden || undefined}>
      {sponsors.map((s) => {
        const logo = <img src={sponsorLogo(s)} alt={hidden ? "" : s.name} title={s.name} decoding="async" />;
        return (
          <li key={s.file} className="sponsors-marquee__item">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>
                {logo}
              </a>
            ) : (
              logo
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function SponsorsMarquee({
  title = "Our sponsors and partners",
  sponsors = SPONSORS,
  secondsPerLogo = 4,
}: {
  title?: string;
  sponsors?: Sponsor[];
  /** speed: seconds each logo takes to cross (higher = slower) */
  secondsPerLogo?: number;
}) {
  const duration = `${Math.max(sponsors.length * secondsPerLogo, 12)}s`;
  return (
    <section className="sponsors-marquee" aria-label={title}>
      <p className="sponsors-marquee__title">{title}</p>
      <div className="sponsors-marquee__viewport">
        <div className="sponsors-marquee__track" style={{ animationDuration: duration }}>
          <LogoList sponsors={sponsors} />
          <LogoList sponsors={sponsors} hidden />
        </div>
      </div>
    </section>
  );
}
