import { Link } from "react-router-dom";
import { asset } from "../utils";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bg" aria-hidden="true">
        <span className="site-footer__blob site-footer__blob--green"></span>
        <span className="site-footer__blob site-footer__blob--blue"></span>
        <span className="site-footer__blob site-footer__blob--paleblue"></span>
        <span className="site-footer__blob site-footer__blob--yellow"></span>
      </div>

      <div className="site-footer__panel">
        <div className="site-footer__inner">
          <Link
            className="site-footer__logo"
            to="/"
            aria-label="rePhlow home"
          >
            <img
              src={asset("assets/rephlow-logo-transparent.png")}
              alt="rePhlow logo"
            />
          </Link>

          <div className="site-footer__contact">
            <p className="site-footer__address">
              Universidad Complutense de Madrid, 28040 Madrid, Spain
            </p>
            <div className="site-footer__socials">
              <a
                className="site-footer__social"
                href="https://www.instagram.com/rephlow.igem/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                className="site-footer__social"
                href="mailto:rephlow@example.com"
                aria-label="Email"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
              <a
                className="site-footer__social"
                href="https://www.linkedin.com/company/rephlow/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <line x1="7" y1="10" x2="7" y2="17" />
                  <circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M11 17v-4.5a2.5 2.5 0 0 1 5 0V17" />
                  <line x1="11" y1="10" x2="11" y2="17" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
        <p className="site-footer__legal">
          © 2024 - Content on this site is licensed under a Creative Commons
          Attribution 4.0 International license.
          <br />
          The repository used to create this website is available at{" "}
          <a
            href="https://gitlab.igem.org/2026/madrid-ucm"
            target="_blank"
            rel="noopener noreferrer"
          >
            gitlab.igem.org/2026/madrid-ucm
          </a>
        </p>
      </div>
    </footer>
  );
}
