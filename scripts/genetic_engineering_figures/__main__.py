"""
Build the Genetic engineering phosphorus figures.

    python3 -m genetic_engineering_figures            # from scripts/
    python3 scripts/build-genetic-engineering-figures.py   # from the repo root

Reads the exported spreadsheet in data/genetic-engineering/ and writes SVGs
into public/assets/experiments/genetic-engineering/. The build refuses to
write anything if the values recomputed from the measurements disagree
with the ones the spreadsheet itself carries, so the figures and the
captions quoting them cannot drift apart.

Figures still waiting on their data (the comments on the Notion results
page ask for these in the same format, but their measurements are in other
sheets that are not in this repository yet):

  * growth of P. putida KT2440 in M9 over 240 min
  * the 21/07 operating-condition screen, four conditions plus M9 and LB
"""

from __future__ import annotations

import sys
from pathlib import Path

from . import data as sheet
from . import figures
from .style import apply_theme

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "data" / "genetic-engineering" / "valoracion-fosforo-hoja1.csv"
OUT_DIR = ROOT / "public" / "assets" / "experiments" / "genetic-engineering"


def main() -> int:
    if not SOURCE.exists():
        print(f"missing source data: {SOURCE}", file=sys.stderr)
        return 1

    measurements = sheet.load(SOURCE)

    problems = sheet.verify_against_sheet(measurements)
    if problems:
        print("recomputed values disagree with the spreadsheet:", file=sys.stderr)
        for problem in problems:
            print(f"  - {problem}", file=sys.stderr)
        return 1

    apply_theme()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    written = []

    fig = figures.standard_curve(measurements.calibration)
    path = OUT_DIR / "phosphorus-standard-curve.svg"
    fig.savefig(path)
    written.append(path)

    fig = figures.bacterial_growth(*measurements.od600)
    path = OUT_DIR / "phosphorus-assay-biomass.svg"
    fig.savefig(path)
    written.append(path)

    wild_type, transformant = measurements.phosphorus
    fig = figures.wild_type_vs_transformant(wild_type, transformant)
    path = OUT_DIR / "phosphorus-wild-type-vs-ppk1.svg"
    fig.savefig(path)
    written.append(path)

    slope, intercept = measurements.calibration.fit
    print(f"calibration: A = {slope:.6g}·m + {intercept:.6g} "
          f"(R² = {measurements.calibration.r_squared:.4f})")
    print(f"uptake rate, fitted over {sheet.RATE_WINDOW[0]:.0f}-"
          f"{sheet.RATE_WINDOW[1]:.0f} min:")
    print(f"  wild type    {wild_type.rate():,.0f} ng per OD600 per minute")
    print(f"  transformant {transformant.rate():,.0f} ng per OD600 per minute")
    print(f"  ratio        {measurements.rate_ratio:.3f}")
    for path in written:
        print(f"wrote {path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
