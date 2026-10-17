import { asset } from "../../utils";
import type { RoomData } from "./Room";

/* --------------------------------------------------------------------------
   The plant map that opens the page: the four rooms in the order the visit
   takes them, joined by the pipe the tour follows. Each room on the map is
   a link down to that room.
   -------------------------------------------------------------------------- */

export function PlantMap({ rooms }: { rooms: RoomData[] }) {
  return (
    <nav className="sus-map" aria-label="Plant map: the four rooms">
      {rooms.map((room, i) => (
        <a
          className="sus-map__room"
          href={`#${room.id}`}
          key={room.id}
          style={{ ["--sus-map-i" as string]: i }}
        >
          <span className="sus-map__pipe" aria-hidden="true" />
          <span className="sus-map__thumb">
            <img src={asset(room.photo)} alt="" />
            <span className="sus-map__number">{room.number}</span>
          </span>
          <span className="sus-map__tag">{room.tag}</span>
          <span className="sus-map__title">{room.title}</span>
        </a>
      ))}
    </nav>
  );
}
