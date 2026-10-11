import type { EcosystemMapItem } from "../EcosystemMap";

/**
 * The four wet-lab blocks as glass spheres, shared by the Experiments and
 * Results pages so both open on the same visual index and the same block
 * reads the same colour on either page.
 *
 * This list used to live inside Experiments.tsx; it moved here when
 * Results adopted the same structure, because two copies of a set of
 * hand-placed coordinates and colours would drift apart on the first
 * tweak. The block ids match EXPERIMENT_BLOCKS and RESULT_BLOCKS, which is
 * what lets one map drive either page's selection.
 *
 * Encapsulation is pushed bluer than --lab-encapsulation's own teal
 * (#146b78) so it reads as clearly distinct from Genetic engineering's
 * green at a glance; the same adjusted blue is used on Engineering's own
 * Bacterial encapsulation sphere for consistency between the two maps.
 * Revalorisation's gold (#c99a06) similarly replaces the duller #b8790a
 * mustard tried first, and is used rather than --phosphate, which
 * Engineering's Hardware sphere uses instead.
 */
export const LAB_BLOCK_SPHERES: EcosystemMapItem[] = [
  {
    id: "encapsulation",
    label: ["Alginate", "encapsulation"],
    color: "#1568a3",
    image: "assets/experiments/ecosystem-map/alginate.png",
    alt: "Alginate capsule illustration",
    left: 4.2,
    top: 28,
    width: 13.5,
    imageSize: 88,
    home: [140, 175],
  },
  {
    id: "enzymatic-immobilisation",
    label: ["Enzymatic", "immobilisation"],
    color: "#6b4e9a",
    image: "assets/experiments/ecosystem-map/enzyme.png",
    alt: "Protein ribbon structure illustration",
    left: 29.4,
    top: 4,
    width: 11.5,
    imageSize: 80,
    home: [450, 90],
  },
  {
    id: "genetic-engineering",
    label: ["Genetic", "engineering"],
    color: "#3f7d4a",
    image: "assets/experiments/ecosystem-map/bacteria.png",
    alt: "Engineered bacterium illustration",
    left: 53.1,
    top: 38,
    width: 12.5,
    imageSize: 84,
    home: [760, 215],
  },
  {
    id: "revalorisation",
    label: ["Revalorisation"],
    color: "#c99a06",
    image: "assets/experiments/ecosystem-map/revalorisation.png",
    alt: "Star illustration",
    left: 78.8,
    top: 17,
    width: 12.8,
    imageSize: 70,
    home: [1090, 140],
  },
];
