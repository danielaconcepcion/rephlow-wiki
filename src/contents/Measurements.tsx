import { Callout } from "../components/Callout";

export function Measurements() {
  return (
    <div className="content-page">
      <div className="content-page__inner">
        <Callout kind="purpose" label="Speacial award">
          <p>
            Measurements are how you show that a system, physical or computational, behaves as expected, that data are reliable, and that a result actually matters. Strong contenders pick meaningful targets to measure, capture them precisely through experimental or computational methods, and report results clearly with appropriate units or metrics.
          </p>
          <p>
            Standard URL: (
            <a
              href="https://2026.igem.wiki/example/measurement"
              target="_blank"
              rel="noreferrer"
            >
              https://2026.igem.wiki/example/measurement
            </a>
            ) 
          </p>
          <p>Ballot Questions:</p>
            <ul>
              <li>
                Could the measurement(s) be reproduced by other iGEM teams?
              </li>
              <li>
                Are the methods or protocols described well?
              </li>
              <li>Could it be useful to other projects?</li>
              <li>
                Did the team validate and calibrate their measurement process appropriately for their approach?
              </li>
            </ul>
        </Callout>
      </div>
    </div>
  );
}
