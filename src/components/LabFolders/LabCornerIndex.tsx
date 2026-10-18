import type { RefObject } from "react";

import { EcosystemMapMini } from "../EcosystemMapMini";
import { useCornerIndexVisible } from "../useCornerIndexVisible";
import { LAB_BLOCK_SPHERES } from "./labBlockSpheres";

/**
 * The corner "you are here" index for the three lab pages — Experiments,
 * Measurements and Results — which all open on the same four-sphere
 * EcosystemMap (LAB_BLOCK_SPHERES) and all keep exactly one block active.
 * Engineering mounts the same EcosystemMapMini against its own five-sphere
 * map and its own per-block footer nav, so it wires that one up itself;
 * everything the three lab pages would otherwise each repeat — the sphere
 * list, the visibility gate, the scroll on a switch — lives here instead.
 *
 * It takes the two page-specific landmarks the gate reads (see
 * useCornerIndexVisible): `after` is the block-pill row that sits directly
 * under the full-size map, so the corner sphere only appears once that map
 * is no longer on screen and the two can never show the same block twice;
 * `until` is the bare sentinel at the foot of the page
 * (.ecosystem-map-mini-sentinel), so it steps aside for the shared
 * Previous/Next handoff rather than sitting on top of it.
 *
 * Picking a block here does what picking one in the full map does — the
 * page switches to it — and then returns to the top, as Engineering's own
 * corner index does: a block picked from the corner is a block to read
 * from its beginning, not from whatever scroll depth the previous one
 * happened to be left at.
 */
export function LabCornerIndex({
  activeBlockId,
  onSelect,
  after,
  until,
}: {
  activeBlockId: string;
  /** The page's own block setter — the same one the pills and the full map
   * above call, so the three indexes always agree on the active block. */
  onSelect: (id: string) => void;
  after: RefObject<Element | null>;
  until?: RefObject<Element | null>;
}) {
  const visible = useCornerIndexVisible({
    after,
    until,
    resetKey: activeBlockId,
  });

  return (
    <EcosystemMapMini
      items={LAB_BLOCK_SPHERES}
      activeId={activeBlockId}
      onSelect={(id) => {
        onSelect(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      visible={visible}
    />
  );
}
