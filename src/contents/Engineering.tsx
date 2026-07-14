import { Callout } from "../components/Callout";

export function Engineering() {
  return (
    <div className="content-page">
      <div className="content-page__inner">
        <Callout kind="purpose" label="Purpose of the page">
          <p>
          Engineering success can be achieved by documenting your effort to follow the engineering design cycle: Design → Build → Test → Learn
          We invite you to think about ways to tackle and solve one or more of your project's problems and use synthetic biology tools and/or experimental techniques to generate expected results.
          When you have completed the cycle once, think about and document what changes in design you would make for the next iteration(s) of the cycle.
          For example, you can design and build a new Part, measure its performance, document whether it worked or not, and propose how the results would inform the next design or steps (documentation must be on the Part's Pages on the Registry).
          Visit the Engineering pages for additional guidance on engineering success. 
          
          <a
              href="https://technology.igem.org/engineering"
              target="_blank"
              rel="noreferrer"
            >
              https://technology.igem.org/engineering
            </a>
          </p>
        </Callout>
      </div>
    </div>
  );
}
