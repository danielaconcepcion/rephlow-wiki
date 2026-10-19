import { COLLAB_BASE, KICKOFF_MATERIALS } from "./collabMedia.ts";
import "./CollabExtras.css";

/* Poster + programme of the Kick Off: same size, side by side (click to enlarge). */
export function KickoffMaterials() {
  return (
    <div className="collab-x__materials">
      {KICKOFF_MATERIALS.map((m) => (
        <figure key={m.file}>
          <img src={COLLAB_BASE + m.file} alt={m.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}
