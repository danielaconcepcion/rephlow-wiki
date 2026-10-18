import type {
  ExperimentBlockData,
  ExperimentData,
  ResultBlockData,
  ResultData,
} from "../components/LabFolders/types";

export type EditorialMap = Record<string, string[]>;

export function editorialKey(value: string): string {
  return value
    .replace(/[*_`]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/^\d+[.)]\s*/, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function scopedLookup(editorial: EditorialMap, scope: string, key: string) {
  return editorial[scope ? `${scope}::${key}` : key] ?? editorial[key];
}

function setExperiment(
  record: ExperimentData,
  editorial: EditorialMap,
  scope = "",
) {
  const recordKey = editorialKey(record.title);
  const aliases: Record<string, string> = {
    "operating condition optimisation in the synthetic stream":
      "operating condition optimisation ph and dilution in the synthetic stream",
    "immobilised metal affinity chromatography co2 ida agarose":
      "immobilised metal affinity chromatography co 2 ida agarose",
    "express immobilised metal affinity chromatography co2 ida agarose":
      "express immobilised metal affinity chromatography co2 ida agarose",
  };
  const blocks =
    scopedLookup(editorial, scope, recordKey) ??
    scopedLookup(editorial, scope, aliases[recordKey] ?? "");
  const nested = (record.body ?? []).flatMap((block) => {
    if (!block.title) return [];
    const key = editorialKey(block.title);
    const nestedBlocks = scopedLookup(editorial, scope, key);
    if (key === recordKey || !nestedBlocks?.length) return [];
    return [`**${block.title}**`, ...nestedBlocks];
  });
  const combined = [...(blocks ?? []), ...nested];
  if (combined.length) record.editorial = combined;
}

export function applyExperimentEditorial(
  blocks: ExperimentBlockData[],
  editorial: EditorialMap,
  blockEditorial: EditorialMap = {},
  sectionEditorial: EditorialMap = {},
) {
  for (const block of blocks) {
    const scope = editorialKey(block.label);
    block.editorial =
      blockEditorial[scope] ??
      (block.id === "genetic-engineering" ||
      block.id === "enzymatic-immobilisation"
        ? sectionEditorial[`${scope}::intro abstract`]
        : undefined);
    block.experiments?.forEach((record) =>
      setExperiment(record, editorial, scope),
    );
    block.subBlocks?.forEach((subBlock) => {
      subBlock.editorial =
        sectionEditorial[`${scope}::${editorialKey(subBlock.heading)}`];
      subBlock.experiments?.forEach((record) =>
        setExperiment(record, editorial, scope),
      );
    });
  }
}

function setResult(record: ResultData, editorial: EditorialMap, scope = "") {
  const recordKey = editorialKey(record.title);
  const aliases: Record<string, string> = {
    "immobilised metal affinity chromatography co2 ida agarose":
      "immobilised metal affinity chromatography and dialysis of the eluates",
    "dialysis of imac eluates":
      "immobilised metal affinity chromatography and dialysis of the eluates",
    "express immobilised metal affinity chromatography co2 ida agarose":
      "express immobilised metal affinity chromatography",
    "purifying the cect 4626 2012 stock": "5 purifying the 2012 stock",
    "size exclusion fractions": "size exclusion chromatography fplc",
    "returning to affinity purification": "back to imac",
    "dialysed imac eluate dhak cect 4626 2012 stock":
      "7 dialysed imac eluate dhak cect 4626 2012 stock",
    "dhak wild type citrobacter freundii dsm 30040":
      "1 dhak wild type c freundii dsm 30040",
    "dhak wild type citrobacter freundii cect 4626 2021 stock":
      "3 dhak cect 4626 2021 stock",
    "dhak wild type citrobacter freundii cect 4626 2012 stock":
      "4 dhak cect 4626 2012 stock",
    "dhak pross 5 variant": "2 dhak pross 5",
    "coupled dhak ppk2 assay round 2 with purified enzymes":
      "2 round 2 purified dhak with purified ppk2",
  };
  const blocks =
    scopedLookup(editorial, scope, recordKey) ??
    scopedLookup(editorial, scope, aliases[recordKey] ?? "");
  const nested = record.subsections.flatMap((subsection) => {
    if (!subsection.title) return [];
    const key = editorialKey(subsection.title);
    const nestedBlocks = scopedLookup(editorial, scope, key);
    if (key === recordKey || !nestedBlocks?.length) return [];
    return [`**${subsection.title}**`, ...nestedBlocks];
  });
  const combined = [...(blocks ?? []), ...nested];
  if (combined.length) record.editorial = combined;
}

export function applyResultEditorial(
  blocks: ResultBlockData[],
  editorial: EditorialMap,
  blockEditorial: EditorialMap = {},
  sectionEditorial: EditorialMap = {},
) {
  for (const block of blocks) {
    const scope = editorialKey(block.label);
    block.editorial = blockEditorial[scope];
    block.results?.forEach((record) => setResult(record, editorial, scope));
    block.subBlocks?.forEach((subBlock) => {
      subBlock.editorial =
        sectionEditorial[`${scope}::${editorialKey(subBlock.heading)}`];
      subBlock.results?.forEach((record) =>
        setResult(record, editorial, scope),
      );
    });
  }
}

export function applyMeasurementEditorial(
  records: ExperimentData[],
  editorial: EditorialMap,
) {
  const aliases: Record<string, string> = {
    "fourier transform infrared spectroscopy ftir atr": "ftir",
    "image analysis imagej": "imagej",
    "uv vis absorbance spectroscopy": "uv vis spectroscopy",
    "thermogravimetric analysis and differential scanning calorimetry": "tga",
    "scanning electron microscopy and elemental analysis": "sem",
    "continuous spectrophotometric determination of phospho lipase activity pnpb and immobilisation yield monitoring":
      "enzymatic activity assay continuous spectrophotometric determination of phospho lipase activity pnpb and immobilization yield monitoring",
    "discontinuous colorimetric determination of phosphohydrolase activity bis pnpp":
      "enzymatic activity assay discontinuous colorimetric determination of phosphohydrolase activity bis pnpp",
    "fast protein liquid chromatography size exclusion mode": "fplc",
    "coupled a gdh tim spectrophotometric assay nadh linked kinase activity":
      "dhak activity assay",
    "intracellular polyphosphate uptake assay":
      "intracellular polyphosphate uptake assay colorimetric quantification of acid hydrolysed polyphosphate molybdate dye method",
    "total protein quantification by the bradford assay":
      "total protein quantification bradford coomassie dye binding assay",
  };
  records.forEach((record) => {
    setExperiment(record, editorial);
    if (record.editorial) return;
    const alias = aliases[editorialKey(record.title)];
    if (alias && editorial[alias]?.length) record.editorial = editorial[alias];
  });
}
