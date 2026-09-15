import type { CSSProperties, ReactNode } from "react";

/**
 * Reusable "layered folder" content system shared by the Experiments and
 * Results pages (src/contents/Experiments, src/contents/Results). This file
 * defines the shape of the system — the page-specific data files only ever
 * supply values conforming to these interfaces.
 */

/* ---------- Contextual menu (block-level tabs) + folder shell ---------- */

export interface SectionTabDef {
  id: string;
  label: string;
}

export interface FolderDef {
  id: string;
  label: string;
  /** "protocols" gets the fixed cross-block colour instead of the block accent. */
  variant?: "protocols";
  content: ReactNode;
  /** 1-indexed position in its own experiment sequence, shown as a small
   * numbered circle before the label so the workflow order reads at a
   * glance (e.g. Genetic engineering's "guide design (1) → ... (9)").
   * Omit for folders with no inherent order (e.g. the Notebook tab). */
  order?: number;
}

/** Lets a block set --folder-accent via an inline style without fighting CSSProperties' type. */
export type AccentStyle = CSSProperties & { "--folder-accent": string };

/** Any custom-property style, for elements (like each folder tab) that set more than one CSS variable. */
export type CSSVarStyle = CSSProperties & { [key: `--${string}`]: string | number };

/* ---------- Shared record primitives ---------- */

export interface MaterialRow {
  item: string;
  quantity?: string;
  notes?: string;
}

export interface ProtocolStep {
  /** Plain text, or a short JSX fragment using <strong>/<u> for inline emphasis. */
  text: ReactNode;
}

export interface NoteItem {
  kind?: "note" | "warning";
  text: string;
}

export interface FigureData {
  src: string;
  caption: string;
}

export interface RecordTable {
  headers: string[];
  rows: string[][];
}

/* ---------- Experiment record ---------- */

/** One image inside an `image-group` resource — a real, cropped sub-figure
 * of a composite source image (e.g. one gel out of a 4-panel SDS-PAGE
 * plate). `title` is that sub-figure's own printed label (e.g. "(A) IPTG,
 * total fraction"), rendered directly above the image, not as a figcaption
 * below it — the group as a whole carries the one shared caption instead
 * (see PairedResource's "image-group" case). */
export interface GroupedImage {
  src: string;
  alt: string;
  title: string;
}

/** A resource paired locally with one specific paragraph — see
 * ExperimentBodyBlock.pairedResource. A real table stays a real table; the
 * two placeholder kinds reuse the exact same visual treatment already
 * established for a missing figure (record-figure / record-figure__placeholder
 * in Enzymatic immobilisation and Revalorisation) rather than inventing a
 * new look, just with a "[ table placeholder ]" label for the table case.
 * "image" is one real photo. "image-group" is several real photos cropped
 * from one composite source figure, each keeping its own printed sub-title
 * above it, with one shared caption for the whole group below — always
 * rendered full-width (see BodyBlock in ExperimentCard.tsx), since a
 * multi-panel grid needs the room a narrow paired column can't give it.
 * "custom" drops in a bespoke component (e.g. SelectionFunnel) instead of
 * an image — also always full-width, for the same reason. */
export type PairedResource =
  | { kind: "table"; table: RecordTable & { caption?: string } }
  | { kind: "table-placeholder"; caption: string }
  | { kind: "image-placeholder"; caption: string }
  | { kind: "image"; src: string; alt: string; caption: string }
  | { kind: "image-group"; images: GroupedImage[]; caption: string }
  | { kind: "custom"; node: ReactNode; caption?: string };

/** One block of an experiment's write-up. Most blocks are plain full-width
 * prose; a block only breaks into a local two-column pair when it sets
 * pairedResource, and only for the paragraph(s) in that one block — the
 * blocks immediately before and after it stay full-width. This is what
 * lets one specific "the conditions were as follows:" paragraph sit next
 * to its table while the rest of the write-up reads as normal body copy,
 * instead of the whole card being forced into one fixed two-column shape. */
export interface ExperimentBodyBlock {
  /** Plain strings, or short JSX using <strong>/<em> for inline emphasis
   * (matches ProtocolStep.text's convention) — rendered as one <p> each.
   * Omit for a resource with no single paragraph that specifically
   * explains it (e.g. a wide data matrix, or an instrument-settings table
   * with no natural "as follows:" lead-in) — that resource then renders
   * full-width on its own rather than being forced into a pair. */
  paragraphs?: ReactNode[];
  pairedResource?: PairedResource;
}

export interface ExperimentData {
  id: string;
  tabLabel: string;
  title: string;
  /** A single paragraph, or several — rendered as one <p> each. Plain
   * strings, or short JSX using <strong>/<em> for inline emphasis (matches
   * ProtocolStep.text's convention). Omit when `body` is set (see below);
   * kept as the simple default for experiments that don't need
   * per-paragraph table/figure pairing. */
  description?: ReactNode | ReactNode[];
  /** Use at most one of materialsTable / materialsList. */
  materialsTable?: MaterialRow[];
  materialsList?: string[];
  /** Generic data/parameter tables beyond the materials table — e.g. an
   * experiment's setup conditions, or a full results matrix. Rendered
   * full-width, in order, each with its own optional caption. Ignored
   * when `body` is set. */
  tables?: { caption?: string; headers: string[]; rows: string[][] }[];
  protocol?: ProtocolStep[];
  notes?: NoteItem[];
  references?: string[];
  figure?: FigureData;
  /** Richer alternative to description/tables/figure, for an experiment
   * whose write-up needs a specific paragraph to sit beside its table or
   * image (see ExperimentBodyBlock) rather than one fixed layout for the
   * whole card. When set, this entirely replaces description/tables/figure
   * for rendering — set at most one of `body` or those fields. */
  body?: ExperimentBodyBlock[];
  /** Named lab protocols this experiment actually used (e.g. "PCR",
   * "E. coli transformation") — each renders as its own download link
   * under a "Protocols:" label, below references. For a source note that
   * just lists protocol names ("Protocols: A; B; C"), this replaces that
   * plain-text line entirely rather than duplicating it. */
  protocols?: { label: string; href: string }[];
  /** Path under /public, e.g. "assets/protocols/foo.pdf" — resolved with asset(). */
  pdfHref?: string;
}

/** One labelled sub-section within a block, each with its own folder-tab
 * row and deck (e.g. Alginate encapsulation's "1. Alginate characterisation
 * & bead optimisation", "2. Core-shell formation & validation" — see
 * Experiments.tsx). Blocks that don't need this extra tier just set
 * `experiments` directly on the block instead. */
export interface ExperimentSubBlock {
  id: string;
  /** Rendered as-is, e.g. "1. Alginate characterisation & bead optimisation". */
  heading: string;
  intro?: ReactNode | ReactNode[];
  /** Omit for a sub-block that's pure narrative (e.g. a closing synthesis
   * section) with no experiments of its own — it then renders as heading +
   * intro only, with no folder-tab deck. */
  experiments?: ExperimentData[];
  /** References cited by `intro` itself (not by any one experiment) — a
   * sub-block-level reference list, rendered right after the intro. Gives
   * an inline "[n]" citation in sub-block prose a real reference entry to
   * link to, the same way an experiment's own `references` does for
   * citations inside its write-up. */
  references?: string[];
  /** Closing synthesis for the whole sub-block (e.g. "these nine steps
   * together achieve X") — rendered as plain prose *below* the folder
   * deck, not inside any one experiment's card. A statement about the
   * whole workflow belongs to the sub-block, not to whichever experiment
   * happens to run last. */
  outro?: ReactNode | ReactNode[];
}

export interface ExperimentBlockData {
  id: string;
  label: string;
  /** CSS value assigned to --folder-accent for this block, e.g. "var(--lab-bacteria)". */
  accent: string;
  /** Source for this block's embedded Protocols PDF folder, resolved with asset(). */
  protocolsPdfSrc: string;
  /** Shown once, above everything else in the block. */
  intro?: ReactNode | ReactNode[];
  /** A flat block has one folder-tab row: set `experiments`. A block with
   * multiple labelled sub-sections (its own heading + its own folder-tab
   * row each) sets `subBlocks` instead — see Experiments.tsx, which
   * branches on which one is present. */
  experiments?: ExperimentData[];
  subBlocks?: ExperimentSubBlock[];
  /** A single reference list shared by the whole block (intro, every
   * sub-block and every experiment inside them) — for a source that cites
   * across sub-block boundaries instead of keeping one list per sub-block
   * (see ExperimentSubBlock.references for that alternative, used by
   * Genetic engineering). Rendered once, after every sub-block, with
   * `<Cite scope={block.id} .../>` used throughout. */
  references?: string[];
}

/* ---------- Result record ---------- */

export interface ResultSubsection {
  id: string;
  title: string;
  body?: string[];
  figures?: FigureData[];
  table?: RecordTable;
  observations?: string;
  interpretation?: string;
}

export interface ResultData {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  aim: string;
  background?: string[];
  subsections: ResultSubsection[];
  discussion?: string[];
}

export interface ResultBlockData {
  id: string;
  label: string;
  accent: string;
  results: ResultData[];
}
