import { Callout } from "../components/Callout";

export function Hardware() {
  return (
    <div className="content-page">
      <div className="content-page__inner">
        <Callout kind="purpose" label="Best Hardware">
          <p>
            This award is for teams who develop hardware for synthetic biology. Good iGEM hardware makes work with standard parts easier, faster, better, or more accessible: think a sensor that helps characterize parts, or a robot that automates experiments and cloning. Strong contenders demonstrate utility, user testing, and easy reproducibility.
          </p>
          <p>Ballot Questions:</p>
            <ul>
              <li>
                Does the hardware you developed address a need or problem in synthetic biology?
              </li>
              <li>
                Did the team conduct user testing and learn from user feedback?
              </li>
              <li>Did the team demonstrate utility and functionality in their hardware proof of concept?</li>
              <li>
                Is the documentation of the hardware system sufficient to enable reproduction by other teams?
              </li>
            </ul>
        </Callout>
      </div>
    </div>
  );
}
