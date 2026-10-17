import { PageSectionNav, type PageSection } from "../components/PageSectionNav";
import { AdjacentPageNav } from "../components/AdjacentPageNav";
import { PlantMap } from "./Sustainability/PlantMap";
import { Room } from "./Sustainability/Room";
import { ROOM_01 } from "./Sustainability/room01";
import { ROOM_02 } from "./Sustainability/room02";
import { ROOM_03 } from "./Sustainability/room03";
import { ROOM_04 } from "./Sustainability/room04";
import "./Sustainability/Sustainability.css";

/* --------------------------------------------------------------------------
   Sustainability — the plant tour the Notion page is written as: four rooms,
   each answering one of the award's ballot questions, with Phlowi showing
   the visitor round. The prose, its emphasis and its references are the
   team's own text, held in room01–room04 and rendered by blocks.tsx.
   -------------------------------------------------------------------------- */

const ROOMS = [ROOM_01, ROOM_02, ROOM_03, ROOM_04];

const SECTIONS: PageSection[] = [
  {
    id: "r01",
    label: "01. The diagnostic lobby",
    children: [
      { id: "r01-goals", label: "The three main goals" },
      { id: "r01-two-goals", label: "Goals 9 and 13" },
      { id: "r01-nilsson", label: "The Nilsson scale" },
      { id: "r01-tensions", label: "Three tensions" },
    ],
  },
  {
    id: "r02",
    label: "02. The operations core",
    children: [
      { id: "r02-canvas", label: "The blueprint on the wall" },
      { id: "r02-stakeholder", label: "What “SDG stakeholder” means" },
      { id: "r02-loops", label: "Closing the loops" },
      { id: "r02-cedex", label: "CEDEX — Roberto Arranz" },
      { id: "r02-open", label: "What stays open" },
      { id: "r02-next", label: "What has to be true next" },
    ],
  },
  {
    id: "r03",
    label: "03. The control and metrics panel",
    children: [
      { id: "r03-reading-1", label: "Reading 1: one cubic metre" },
      { id: "r03-reading-2", label: "Reading 2: the carbon footprint" },
      { id: "r03-reading-3", label: "Reading 3: the full sixteen" },
      { id: "r03-reflection", label: "Critical reflection" },
    ],
  },
  {
    id: "r04",
    label: "04. The impact amphitheatre",
    children: [
      { id: "r04-environmental", label: "Environmental impact" },
      { id: "r04-social", label: "Social impact" },
      { id: "r04-economic", label: "Economic impact" },
      { id: "r04-round-table", label: "The round table" },
      { id: "r04-closing", label: "Closing reflection" },
    ],
  },
];

export function Sustainability() {
  return (
    <>
      <div className="page-with-section-nav sus-page">
        <PageSectionNav sections={SECTIONS} ariaLabel="Jump to a room" />

        <div className="sus-col">
          <p className="sus-welcome">
            Welcome to the rePhlow plant. Most factories hide their pipes, while
            we put ours behind glass. Over the next four rooms we will show you
            the goals that guide us, the instruments that prove we keep our
            word, the people our work touches, and the loop we keep closing.
            Mind the wet floor near the bioreactors, and follow the glowing
            pipes.
          </p>

          <PlantMap rooms={ROOMS} />

          {ROOMS.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      </div>
      <AdjacentPageNav
        prev={{
          to: "/entrepreneurship",
          label: "Entrepreneurship",
          accent: "#C9572F",
        }}
        next={{
          to: "/contribution",
          label: "Contribution",
          accent: "#2E7D86",
        }}
      />
    </>
  );
}
