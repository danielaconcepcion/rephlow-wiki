import { Callout } from "../components/Callout";

export function Sustainability() {
  return (
    <div className="content-page">
      <div className="content-page__inner">
        <Callout kind="purpose" label="Best Sustainable Development Impact">
          <p>
            The Sustainable Development Goals (SDGs) are a call to action on global environmental, social, and economic challenges, and this award is your team's way to answer that call. Demonstrate how you have evaluated your project ideas against one or more SDGs, consulted SDG stakeholders, and started to build collaborations with other iGEM teams around the goals. You are encouraged to revisit previous iGEM projects, evaluate them against the SDGs, and build on them.
          </p>
          <p>Ballot Questions:</p>
            <ul>
              <li>
                Did the team incorporate feedback from relevant Sustainable Development Goals (SDG) stakeholders into their work?
              </li>
              <li>
                Did the team address potential long-term social, environmental and economic impacts of their work (in the context of the SDG(s) they have chosen)?
              </li>
              <li>How well has the team considered the positive and/or negative interactions of their work in relation to other SDGs?</li>
              <li>
                Has the team documented their work against their chosen SDG(s) so that other teams can build upon their work?
              </li>
              <li>
                Has the team's work measurably and significantly addressed one or more SDGs?
              </li>
            </ul>
        </Callout>
      </div>
    </div>
  );
}
