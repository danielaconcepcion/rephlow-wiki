"""
Build the Genetic engineering phosphorus figures.

    python3 -m genetic_engineering_figures            # from scripts/
    python3 scripts/build-genetic-engineering-figures.py   # from the repo root

Reads the exported spreadsheet in data/genetic-engineering/ and writes SVGs
into public/assets/experiments/genetic-engineering/. The build refuses to
write anything if the values recomputed from the measurements disagree
with the ones the spreadsheet itself carries, so the figures and the
captions quoting them cannot drift apart.

Two source books feed it: "Valoracion fosforo" (the September assay of the
ppk1 transformant against the wild type) and "Resultados verano 2025
rePhlow" (the summer assays — the M9 growth curve, the standard curves and
the operating-condition screen).
"""

from __future__ import annotations

import sys
from pathlib import Path

from . import data as sheet
from . import figures
from . import summer
from .style import apply_theme

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "data" / "genetic-engineering" / "valoracion-fosforo-hoja1.csv"
SUMMER_SOURCE = (
    ROOT / "data" / "genetic-engineering" / "resultados-verano-2025-rephlow.xlsx"
)
OUT_DIR = ROOT / "public" / "assets" / "results" / "genetic-engineering"


def main() -> int:
    for source in (SOURCE, SUMMER_SOURCE):
        if not source.exists():
            print(f"missing source data: {source}", file=sys.stderr)
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

    assays = summer.load(SUMMER_SOURCE)

    fig = figures.standard_curve_replicates(assays.standard_curve, wavelength_nm=830)
    path = OUT_DIR / "phosphorus-standard-curves-summer.svg"
    fig.savefig(path)
    written.append(path)

    fig, od_slope = figures.growth_in_m9(assays.m9_growth)
    path = OUT_DIR / "kt2440-growth-m9.svg"
    fig.savefig(path)
    written.append(path)

    # Clip panel B just above the highest screened condition, so every
    # condition stays on-axis and only the two reference media run off it.
    zoom_max = max(c.mean.max() for c in assays.screen_conditions) * 1.1
    fig = figures.operating_conditions(
        assays.screen_controls, assays.screen_conditions, zoom_max=zoom_max
    )
    path = OUT_DIR / "phosphorus-operating-conditions.svg"
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
    print(f"M9 growth: {od_slope:.5f} OD600 per minute over "
          f"{assays.m9_growth.time_min.min():.0f}-"
          f"{assays.m9_growth.time_min.max():.0f} min")
    for path in written:
        print(f"wrote {path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
