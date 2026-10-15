import type { ReactElement } from "react";

/* --------------------------------------------------------------------------
   The drawn objects that sit on the workflow rail.

   Every glyph is authored inside the same 100 x 100 box and uses the same
   three inherited colours, so a station drawn for one block reads as part
   of the same family when it appears in another:

     --wf-line   the drawing's own stroke (the page's ink, softened)
     --wf-accent the block's colour, used only where the eye should land
     --wf-tint   a wash of that colour, for anything filled

   They are deliberately line drawings rather than icons: the same
   register as the rest of the wiki's hand-made figures, legible at the
   ~110 px a station gets on a wide screen and still readable at the 54 px
   it gets in the stacked, narrow-screen list.
   -------------------------------------------------------------------------- */

const S = {
  fill: "none",
  stroke: "var(--wf-line)",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const THIN = { ...S, strokeWidth: 1.6 };
const ACC = { ...S, stroke: "var(--wf-accent)" };
const ACC_THIN = { ...THIN, stroke: "var(--wf-accent)" };
const TINT = { fill: "var(--wf-tint)", stroke: "none" };
const ACC_FILL = { fill: "var(--wf-accent)", stroke: "none" };

/* ---------- Alginate encapsulation ------------------------------------- */

/** A jar of alginate powder beside the spectrum it was run as. */
const AlginatePowder = (
  <>
    <path {...TINT} d="M30 40h26v40a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6z" />
    <path {...S} d="M30 40h26v40a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6z" />
    <path {...S} d="M34 40v-8h18v8M31 48h24" />
    <path {...ACC} d="M36 72c4-3 6 2 10-1s6 2 10-1" />
    <path {...THIN} d="M62 86h30" />
    <path {...ACC} d="M62 80c4 0 5-18 8-18s4 12 7 12 4-16 7-16 4 20 8 20" />
  </>
);

/** A needle dripping into a bath, with the bead series it produces. */
const DripBeads = (
  <>
    <path {...S} d="M26 16h12v14l-6 8-6-8z" />
    <circle {...ACC_FILL} cx={32} cy={48} r={3.4} />
    <circle {...ACC_FILL} cx={32} cy={58} r={2.6} />
    <path {...TINT} d="M18 64h30v22H18z" />
    <path {...S} d="M18 60v22a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V60" />
    <circle {...ACC_THIN} cx={62} cy={78} r={4} />
    <circle {...ACC_THIN} cx={74} cy={76} r={6} />
    <circle {...ACC_THIN} cx={88} cy={73} r={8.5} />
    <path {...THIN} d="M58 90h38" />
  </>
);

/** A capsule cut open: liquid core inside an alginate shell. */
const CoreShell = (
  <>
    <circle {...TINT} cx={50} cy={50} r={33} />
    <circle {...S} cx={50} cy={50} r={33} />
    <circle {...ACC} cx={50} cy={50} r={20} />
    <path {...ACC_THIN} d="M50 30v-9M50 70v9M30 50h-9M70 50h9" />
    <path {...THIN} d="M74 26a33 33 0 0 1 6 14" />
  </>
);

/** A capsule under a loaded plate: the compression test. */
const CompressionTest = (
  <>
    <path {...S} d="M22 20h56v10H22z" />
    <path {...ACC} d="M50 34v10M46 40l4 5 4-5" />
    <circle {...TINT} cx={50} cy={62} r={17} />
    <circle {...S} cx={50} cy={62} r={17} />
    <circle {...ACC_THIN} cx={50} cy={62} r={8} />
    <path {...S} d="M18 82h64v8H18z" />
  </>
);

/** A thermal curve beside a patch of dried, porous surface. */
const ThermalAndSurface = (
  <>
    <path {...THIN} d="M16 20v56h34" />
    <path {...ACC} d="M18 28c8 0 9 14 14 14s8-16 16-16" />
    <circle {...TINT} cx={72} cy={54} r={24} />
    <circle {...S} cx={72} cy={54} r={24} />
    <path
      {...THIN}
      d="M56 48c6 6 10-4 16 2s10-6 16 0M56 62c6 5 10-4 16 2s10-5 16 1"
    />
    <circle {...ACC_FILL} cx={64} cy={44} r={2} />
    <circle {...ACC_FILL} cx={82} cy={66} r={2} />
  </>
);

/* ---------- Enzymes: production and immobilisation ---------------------- */

/** Database mining: a screen with a sequence running off it. */
const Mining = (
  <>
    <path {...TINT} d="M14 20h50v34H14z" />
    <path {...S} d="M14 20h50v34H14zM32 54v12M24 70h32" />
    <path {...ACC_THIN} d="M20 28h26M20 36h34M20 44h18" />
    <path {...THIN} d="M70 26h20M70 36h22M70 46h16M70 56h24M70 66h14" />
    <circle {...ACC_FILL} cx={60} cy={76} r={2.6} />
    <circle {...ACC_FILL} cx={70} cy={80} r={2.6} />
    <circle {...ACC_FILL} cx={80} cy={76} r={2.6} />
  </>
);

/** A folded protein beside the plasmid its gene goes into. */
const FoldAndClone = (
  <>
    <path {...ACC} d="M20 66c0-10 6-12 6-20s-6-10-6-18" />
    <path
      {...S}
      d="M28 68c0-10 6-12 6-20s-6-10-6-18M36 70c0-10 6-12 6-20s-6-10-6-18"
    />
    <circle {...TINT} cx={72} cy={52} r={22} />
    <circle {...S} cx={72} cy={52} r={22} />
    <path {...ACC} d="M58 36a22 22 0 0 1 20-5" />
    <path {...ACC} d="M74 28l6 3-5 4" />
  </>
);

/** A gel: the solubility check after induction. */
const Gel = (
  <>
    <path {...TINT} d="M20 14h60v72H20z" />
    <path {...S} d="M20 14h60v72H20z" />
    <path {...THIN} d="M35 14v72M50 14v72M65 14v72" />
    <path {...S} d="M24 30h7M39 30h7M54 30h7M69 30h7" />
    <path {...ACC} d="M24 46h7M39 44h7M54 46h7M69 43h7" />
    <path {...THIN} d="M24 62h7M39 64h7M54 62h7M69 65h7" />
  </>
);

/** A chromatography column with its eluate. */
const Column = (
  <>
    <path {...S} d="M34 12h22v10H34z" />
    <path {...TINT} d="M36 22h18v44H36z" />
    <path {...S} d="M36 22v44a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V22" />
    <path {...ACC} d="M36 34h18M36 44h18" />
    <path {...S} d="M45 70v8" />
    <circle {...ACC_FILL} cx={45} cy={82} r={3} />
    <path {...TINT} d="M64 66h22v20H64z" />
    <path {...S} d="M64 62v20a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V62" />
  </>
);

/** A microplate read as a curve: activity and concentration. */
const PlateAndCurve = (
  <>
    <path {...TINT} d="M12 26h40v34H12z" />
    <path {...S} d="M12 26h40v34H12z" />
    {[0, 1, 2, 3].map((c) =>
      [0, 1, 2].map((r) => (
        <circle
          key={`${c}-${r}`}
          {...(c === 1 && r === 1 ? ACC_FILL : THIN)}
          cx={20 + c * 9}
          cy={34 + r * 10}
          r={3}
        />
      )),
    )}
    <path {...THIN} d="M60 22v56h32" />
    <path {...ACC} d="M62 72c10 0 14-30 28-32" />
    <circle {...ACC_FILL} cx={90} cy={40} r={2.6} />
  </>
);

/** Enzymes fixed to a support bead. */
const Immobilised = (
  <>
    <circle {...TINT} cx={50} cy={56} r={28} />
    <circle {...S} cx={50} cy={56} r={28} />
    <path {...THIN} d="M38 44c5 4 9-3 14 1M44 70c6 3 9-4 14 0" />
    <path
      {...ACC}
      d="M50 28c0-6 5-8 5-13M28 46c-5-3-9 0-13-2M72 46c5-3 9 0 13-2"
    />
    <circle {...ACC_FILL} cx={55} cy={12} r={4} />
    <circle {...ACC_FILL} cx={13} cy={42} r={4} />
    <circle {...ACC_FILL} cx={87} cy={42} r={4} />
  </>
);

/* ---------- Genetic engineering ---------------------------------------- */

const Design = (
  <>
    <path {...TINT} d="M18 24h64v40H18z" />
    <path {...S} d="M18 24h64v40H18zM38 72h24" />
    <path {...ACC_THIN} d="M26 36h22M26 46h34M26 56h16" />
    <path {...ACC} d="M62 40l8 8-8 8" />
  </>
);

const Pcr = (
  <>
    <path {...S} d="M30 16h18v8H30zM32 24h14v40l-7 12-7-12z" />
    <path {...TINT} d="M32 44h14v20l-7 12-7-12z" />
    <path {...ACC} d="M58 30c6 4 6 10 0 14s-6 10 0 14" />
    <path {...ACC} d="M70 30c6 4 6 10 0 14s-6 10 0 14" />
  </>
);

const Digest = (
  <>
    <circle {...S} cx={46} cy={54} r={24} />
    <path {...ACC} d="M30 34l34 34M64 34L30 68" />
    <circle {...ACC_FILL} cx={76} cy={28} r={4} />
    <circle {...ACC_FILL} cx={76} cy={44} r={4} />
  </>
);

const Ligate = (
  <>
    <path {...S} d="M14 50h28M58 50h28" />
    <path {...ACC} d="M42 40v20M58 40v20" />
    <circle {...TINT} cx={50} cy={50} r={13} />
    <circle {...ACC} cx={50} cy={50} r={13} />
  </>
);

const Transform = (
  <>
    <path
      {...TINT}
      d="M24 46c0-10 8-16 20-16s20 6 20 16-8 16-20 16-20-6-20-16z"
    />
    <path {...S} d="M24 46c0-10 8-16 20-16s20 6 20 16-8 16-20 16-20-6-20-16z" />
    <path {...ACC} d="M36 46c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6z" />
    <path {...THIN} d="M20 34l-8-6M20 58l-8 6M68 34l8-6M68 58l8 6" />
    <path {...ACC} d="M44 70v12M39 77l5 6 5-6" />
  </>
);

const Colonies = (
  <>
    <circle {...TINT} cx={50} cy={52} r={32} />
    <circle {...S} cx={50} cy={52} r={32} />
    <circle {...THIN} cx={38} cy={42} r={4} />
    <circle {...THIN} cx={58} cy={38} r={3.4} />
    <circle {...ACC_FILL} cx={46} cy={60} r={4.4} />
    <circle {...THIN} cx={64} cy={60} r={3.6} />
    <circle {...THIN} cx={36} cy={66} r={3} />
  </>
);

const Sequencing = (
  <>
    <path {...THIN} d="M12 74h76" />
    <path {...S} d="M16 74c3 0 4-22 7-22s4 22 7 22" />
    <path {...ACC} d="M32 74c3 0 4-30 7-30s4 30 7 30" />
    <path {...S} d="M48 74c3 0 4-18 7-18s4 18 7 18" />
    <path {...ACC} d="M64 74c3 0 4-26 7-26s4 26 7 26" />
  </>
);

const Chassis = (
  <>
    <path
      {...TINT}
      d="M22 56c0-13 10-21 26-21s26 8 26 21-10 21-26 21-26-8-26-21z"
    />
    <path
      {...S}
      d="M22 56c0-13 10-21 26-21s26 8 26 21-10 21-26 21-26-8-26-21z"
    />
    <path {...ACC} d="M38 50c4-3 9-3 13 0M38 62c4 3 9 3 13 0" />
    <path {...THIN} d="M18 42l-8-8M18 70l-8 8M78 42l8-8M78 70l8 8" />
    <circle {...ACC_FILL} cx={66} cy={44} r={3.4} />
  </>
);

const Expressed = (
  <>
    <path
      {...S}
      d="M38 14h22v16l14 36a8 8 0 0 1-7 12H31a8 8 0 0 1-7-12l14-36z"
    />
    <path {...TINT} d="M28 58h42l5 8a8 8 0 0 1-7 12H30a8 8 0 0 1-7-12z" />
    <circle {...ACC_FILL} cx={40} cy={68} r={3} />
    <circle {...ACC_FILL} cx={54} cy={72} r={3} />
    <circle {...ACC_FILL} cx={62} cy={64} r={2.4} />
  </>
);

const GuideDesign = (
  <>
    <path {...S} d="M14 58h26M60 58h26" />
    <path {...ACC} d="M40 44h20v28H40z" />
    <path {...ACC_THIN} d="M46 50v16M54 50v16" />
    <path {...THIN} d="M50 36V20M44 28l6-8 6 8" />
  </>
);

const GoldenGate = (
  <>
    <circle {...TINT} cx={50} cy={52} r={26} />
    <circle {...S} cx={50} cy={52} r={26} />
    <path {...ACC} d="M30 38l14 8M70 38l-14 8" />
    <path {...ACC} d="M40 52h20v16H40z" />
    <path {...THIN} d="M50 18v8" />
  </>
);

const Fluorescence = (
  <>
    <circle {...TINT} cx={38} cy={52} r={20} />
    <circle {...S} cx={38} cy={52} r={20} />
    <path {...ACC} d="M30 44c3 4 9 1 13 5" />
    <circle {...S} cx={76} cy={52} r={14} />
    <path {...THIN} d="M66 42l20 20M86 42L66 62" />
  </>
);

const Delivery = (
  <>
    <circle {...ACC} cx={26} cy={52} r={13} />
    <path {...S} d="M44 52h22M60 46l7 6-7 6" />
    <path {...TINT} d="M70 52c0-9 6-14 14-14v28c-8 0-14-5-14-14z" />
    <path {...S} d="M70 52c0-9 6-14 14-14v28c-8 0-14-5-14-14z" />
  </>
);

const BaseEdit = (
  <>
    <path {...THIN} d="M12 38h76M12 66h76" />
    <path {...S} d="M26 38v28M62 38v28M76 38v28" />
    <path {...ACC} d="M44 38v28" />
    <circle {...ACC_FILL} cx={44} cy={52} r={7} />
    <path {...{ ...THIN, stroke: "var(--wf-paper)" }} d="M41 52h6" />
  </>
);

const Curing = (
  <>
    <circle {...S} cx={50} cy={52} r={26} />
    <path {...ACC} d="M50 26a26 26 0 0 1 24 16" />
    <path {...ACC} d="M68 42l8-2-2 8" />
    <path {...THIN} d="M38 52h24M50 40v24" />
  </>
);

const TripleMutant = (
  <>
    <path
      {...TINT}
      d="M20 54c0-13 10-20 26-20s26 7 26 20-10 20-26 20-26-7-26-20z"
    />
    <path
      {...S}
      d="M20 54c0-13 10-20 26-20s26 7 26 20-10 20-26 20-26-7-26-20z"
    />
    <path {...ACC} d="M32 48l6 6 6-6M48 48l6 6 6-6" />
    <path {...ACC} d="M40 62l6 6 6-6" />
    <path {...THIN} d="M78 34l8-6M78 74l8 6" />
  </>
);

/* ---------- Revalorisation --------------------------------------------- */

const InSilicoDesign = (
  <>
    <path {...TINT} d="M14 22h62v38H14z" />
    <path {...S} d="M14 22h62v38H14zM8 66h74l-6-6H14z" />
    <path
      {...THIN}
      d="M24 48c0-8 5-10 5-16s-5-8-5-14M34 48c0-8 5-10 5-16s-5-8-5-14"
    />
    <path
      {...ACC_FILL}
      d="M50 30l2.6 5.4 6 .8-4.3 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.3-4.2 6-.8z"
    />
    <path {...ACC} d="M62 50h10" />
  </>
);

const Expression = (
  <>
    <circle {...S} cx={28} cy={34} r={14} />
    <path {...ACC} d="M16 28a14 14 0 0 1 20-6" />
    <path {...S} d="M46 36h14M55 31l6 5-6 5" />
    <path
      {...TINT}
      d="M64 50c0-10 7-16 16-16s16 6 16 16-7 16-16 16-16-6-16-16z"
    />
    <path {...S} d="M64 50c0-10 7-16 16-16s16 6 16 16-7 16-16 16-16-6-16-16z" />
    <path {...ACC} d="M74 50c0-3 3-5 6-5s6 2 6 5-3 5-6 5-6-2-6-5z" />
    <path {...THIN} d="M38 74h40M44 82h28" />
  </>
);

const Purification = (
  <>
    <path {...S} d="M36 12h20v8H36z" />
    <path {...TINT} d="M38 20h16v42H38z" />
    <path {...S} d="M38 20v42a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V20" />
    <path {...ACC} d="M38 32h16" />
    <path {...{ ...S, stroke: "var(--wf-accent)" }} d="M38 44h16" />
    <path {...S} d="M46 66v8" />
    <circle {...ACC_FILL} cx={46} cy={80} r={3.2} />
    <path {...TINT} d="M68 56h22v30H68z" />
    <path {...S} d="M68 52v30a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V52" />
  </>
);

const ActivityAssay = (
  <>
    <path {...TINT} d="M12 30h38v32H12z" />
    <path {...S} d="M12 30h38v32H12z" />
    {[0, 1, 2, 3].map((c) =>
      [0, 1].map((r) => (
        <circle
          key={`${c}-${r}`}
          {...(r === 0 ? ACC_FILL : THIN)}
          cx={19 + c * 9}
          cy={40 + r * 12}
          r={3.2}
        />
      )),
    )}
    <path {...THIN} d="M60 22v58h32" />
    <path {...ACC} d="M62 74c12 0 12-28 28-30" />
    <path {...THIN} d="M62 78c12 0 14-16 28-18" />
  </>
);

const MultiEnzyme = (
  <>
    <circle {...TINT} cx={32} cy={46} r={17} />
    <circle {...S} cx={32} cy={46} r={17} />
    <circle {...TINT} cx={68} cy={46} r={17} />
    <circle {...S} cx={68} cy={46} r={17} />
    <path {...ACC} d="M49 46h2" />
    <path {...ACC} d="M44 40h12v12H44z" />
    <path {...THIN} d="M24 76h52" />
    <path {...ACC} d="M28 84c14 0 18-6 44-6" />
  </>
);

const Channelling = (
  <>
    <circle {...TINT} cx={30} cy={52} r={18} />
    <circle {...S} cx={30} cy={52} r={18} />
    <circle {...TINT} cx={72} cy={52} r={16} />
    <circle {...S} cx={72} cy={52} r={16} />
    <path {...ACC} d="M46 46h8v12h-8z" />
    <path {...ACC} d="M54 52h4" />
    <path {...ACC_THIN} d="M30 26c10-8 24-6 30 2" />
    <path {...ACC} d="M56 24l5 4-6 3" />
    <circle {...ACC_FILL} cx={92} cy={46} r={3.4} />
    <circle {...ACC_FILL} cx={90} cy={58} r={2.6} />
  </>
);

export const WORKFLOW_GLYPHS = {
  // encapsulation
  "alginate-powder": AlginatePowder,
  "drip-beads": DripBeads,
  "core-shell": CoreShell,
  compression: CompressionTest,
  "thermal-surface": ThermalAndSurface,
  // enzymes
  mining: Mining,
  "fold-clone": FoldAndClone,
  gel: Gel,
  column: Column,
  "plate-curve": PlateAndCurve,
  immobilised: Immobilised,
  // genetics
  design: Design,
  pcr: Pcr,
  digest: Digest,
  ligate: Ligate,
  transform: Transform,
  colonies: Colonies,
  sequencing: Sequencing,
  chassis: Chassis,
  expressed: Expressed,
  "guide-design": GuideDesign,
  "golden-gate": GoldenGate,
  fluorescence: Fluorescence,
  delivery: Delivery,
  "base-edit": BaseEdit,
  curing: Curing,
  "triple-mutant": TripleMutant,
  // revalorisation
  "in-silico": InSilicoDesign,
  expression: Expression,
  purification: Purification,
  "activity-assay": ActivityAssay,
  "multi-enzyme": MultiEnzyme,
  channelling: Channelling,
} satisfies Record<string, ReactElement>;

export type GlyphId = keyof typeof WORKFLOW_GLYPHS;
