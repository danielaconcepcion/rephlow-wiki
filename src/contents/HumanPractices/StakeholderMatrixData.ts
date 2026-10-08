import { USER_ROWS, type UserRow } from "./StakeholderTimelineData";

/**
 * The team's own stakeholder matrix (power against interest), rebuilt as
 * web elements rather than shipped as a flat image, so the names are
 * selectable and searchable, the engagement state is readable by a screen
 * reader, and each actor can carry its own detail card.
 *
 * Quadrant naming follows the team's own drawing exactly — including the
 * fact that it places "Keep informed" at high power / low interest and
 * "Keep satisfied" at low power / high interest, which is the reverse of
 * the usual Mendelow labelling. This reproduces the source; it does not
 * correct it.
 */
export type Quadrant =
  | "keep-informed"
  | "manage-closely"
  | "monitor"
  | "keep-satisfied";

export interface MatrixItem {
  id: string;
  /** As printed on the team's matrix. */
  name: string;
  /** The small line under the name on the matrix, where it has one. */
  subtitle?: string;
  quadrant: Quadrant;
  /** Filled marker on the matrix's legend ("Engaged to date") vs hollow
   * ("Not yet engaged"). */
  engaged: boolean;
  /**
   * The row of the team's own stakeholder table whose detail describes
   * this actor, matched by its `stakeholder` text. `null` where the table
   * has no row for it: the actor is then named on the matrix and nothing
   * more, rather than carrying a card filled with text nobody on the team
   * wrote. Every mapping here is an interpretation of two separate team
   * documents (the matrix and the table), so it is listed explicitly for
   * review instead of being inferred at render time.
   */
  sourceRow: string | null;
  /**
   * Organisations named on the matrix that have a logo. Path under
   * /public, resolved with asset(). Left undefined until the team adds
   * the file: third-party marks are theirs to supply and to clear, and
   * iGEM requires assets to be served from iGEM's own servers rather than
   * hotlinked.
   */
  logo?: string;
  /** Members listed inside the box on the matrix (the funding group). */
  members?: string[];
}

export const MATRIX_ITEMS: MatrixItem[] = [
  // ---- Manage closely (high power, high interest) ----
  {
    id: "bio-oils",
    name: "Bio-Oils Huelva",
    quadrant: "manage-closely",
    engaged: true,
    sourceRow:
      "Industrial phosphorus generators (e.g. biofuel, food or chemical industries)",
  },
  {
    id: "repsol",
    name: "REPSOL",
    subtitle: "large industrial validator",
    quadrant: "manage-closely",
    engaged: true,
    sourceRow:
      "Industrial phosphorus generators (e.g. biofuel, food or chemical industries)",
  },
  {
    id: "cedex",
    name: "CEDEX",
    subtitle: "public research & technical validation body",
    quadrant: "manage-closely",
    engaged: true,
    sourceRow: "Regulators and technical authorities",
  },
  {
    id: "plant-operators",
    name: "Plant-operators",
    quadrant: "manage-closely",
    engaged: false,
    sourceRow: "Industrial wastewater operators and maintenance teams",
  },

  // ---- Keep informed (high power, low interest) ----
  {
    id: "permitting-authorities",
    name: "Permitting authorities",
    quadrant: "keep-informed",
    engaged: false,
    sourceRow: "Regulators and technical authorities",
  },
  {
    id: "occupational-safety",
    name: "Occupational-safety specialists",
    quadrant: "keep-informed",
    engaged: false,
    sourceRow: null,
  },

  // ---- Keep satisfied (low power, high interest) ----
  {
    id: "funding",
    name: "Funding & accelerators",
    quadrant: "keep-satisfied",
    engaged: true,
    sourceRow: null,
    members: [
      "Santander X",
      "Promega",
      "iGEM",
      "Soluciones Dehesa Sana",
      "Fluidmecánica",
      "Compluemprende",
      "SEBBM",
    ],
  },
  {
    id: "phosphorus-users",
    name: "Users of recovered phosphorus",
    quadrant: "keep-satisfied",
    engaged: false,
    sourceRow: "Circular-economy and phosphorus users",
  },
  {
    id: "smaller-facilities",
    name: "Smaller industrial facilities",
    quadrant: "keep-satisfied",
    engaged: false,
    sourceRow: "Future industrial adopters",
  },

  // ---- Monitor (low power, low interest) ----
  {
    id: "maintenance-workers",
    name: "Maintenance workers",
    quadrant: "monitor",
    engaged: false,
    sourceRow: "Industrial wastewater operators and maintenance teams",
  },
  {
    id: "environmental-organisations",
    name: "Environmental organisations",
    quadrant: "monitor",
    engaged: false,
    sourceRow: null,
  },
  {
    id: "waste-handlers",
    name: "Waste handlers",
    quadrant: "monitor",
    engaged: false,
    sourceRow: null,
  },
];

export const QUADRANT_LABELS: Record<Quadrant, string> = {
  "keep-informed": "Keep informed",
  "manage-closely": "Manage closely",
  monitor: "Monitor",
  "keep-satisfied": "Keep satisfied",
};

const ROWS_BY_STAKEHOLDER = new Map(USER_ROWS.map((row) => [row.stakeholder, row]));

/** The table row behind a matrix item, or undefined where it has none. */
export function rowFor(item: MatrixItem): UserRow | undefined {
  return item.sourceRow ? ROWS_BY_STAKEHOLDER.get(item.sourceRow) : undefined;
}

/* Each `sourceRow` points at a table row by its exact text, so rewording a
   row in StakeholderTimelineData would silently empty the cards that cite
   it. Checked once at import, in development only, so the break is
   reported where it can be fixed rather than shipped as blank cards. */
if (import.meta.env.DEV) {
  const unresolved = MATRIX_ITEMS.filter(
    (item) => item.sourceRow !== null && !ROWS_BY_STAKEHOLDER.has(item.sourceRow),
  );
  if (unresolved.length) {
    console.error(
      "StakeholderMatrix: sourceRow does not match any USER_ROWS entry —",
      unresolved.map((item) => `${item.id} -> ${item.sourceRow}`),
    );
  }
}
