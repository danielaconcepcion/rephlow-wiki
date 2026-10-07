"""
Reader for the team's phosphorus spreadsheet ("Valoracion fosforo").

The sheet is laid out for working in Excel, not for reading by machine:
three unrelated experiments sit side by side in one row space, separated
by blank columns, each with its own time column, and the decimal separator
is a comma. Rather than scatter that knowledge through the figure
builders, every bit of it is confined to this module, which hands back
plain arrays.

The sheet's own derived cells (its calibration slope and intercept, and
its "Speed" rates) are deliberately NOT read. Everything the figures draw
or quote is recomputed here from the measurements, so that a figure can
never disagree with its own caption. `verify_against_sheet()` checks the
recomputed values against the sheet's, which is how the fitting window for
the uptake rates was pinned down (see RATE_WINDOW below).

Column map, by 0-based index into the data rows (row 3 onward is data;
rows 0-2 are the banner and the two header lines):

    0,  1         calibration, individual replicate (A600, mPi ng)
    2,  3,  4     calibration, replicate mean (A600, SD, mPi ng)
    8,  9, 10     OD600, individual replicate (time, WT, transformant)
   11, 12, 13, 14 OD600, mean and SD (WT, WT SD, transformant, SD)
   15            time for the OD600 means
   19..24        phosphorus, individual replicate
   25, 26        phosphorus, WT mean and SD (ng per OD600)
   27, 28        phosphorus, transformant mean and SD
   29            time for the phosphorus means
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path

import numpy as np

# The uptake rates the write-up quotes (about 6,450 for the wild type and
# 11,000 for the transformant, a ratio of roughly 1.7) are the slopes over
# the LAST 45 MINUTES of the time course, not over the whole of it. This
# is not a reading of the prose: it is the only window that reproduces the
# spreadsheet's own two numbers, and it matches where the dotted trend
# lines start in the team's original chart. Over the full 0-120 min window
# the wild type fits steeper than the transformant, so the window is load
# bearing and every figure and caption has to state it.
RATE_WINDOW = (75.0, 120.0)


@dataclass(frozen=True)
class Calibration:
    """Standard curve: mean absorbance per phosphate mass, with SD."""

    mass_ng: np.ndarray
    absorbance: np.ndarray
    sd: np.ndarray

    @property
    def fit(self) -> tuple[float, float]:
        """Least-squares (slope, intercept) of absorbance on mass."""
        slope, intercept = np.polyfit(self.mass_ng, self.absorbance, 1)
        return float(slope), float(intercept)

    @property
    def r_squared(self) -> float:
        return float(np.corrcoef(self.mass_ng, self.absorbance)[0, 1] ** 2)


@dataclass(frozen=True)
class TimeCourse:
    """One strain's mean time course, with the SD of its replicates."""

    label: str
    time_min: np.ndarray
    mean: np.ndarray
    sd: np.ndarray

    def rate(self, window: tuple[float, float] = RATE_WINDOW) -> float:
        """Least-squares slope over `window`, in units of mean per minute."""
        lo, hi = window
        sel = (self.time_min >= lo) & (self.time_min <= hi)
        if sel.sum() < 2:
            raise ValueError(f"{self.label}: window {window} has <2 points")
        return float(np.polyfit(self.time_min[sel], self.mean[sel], 1)[0])


@dataclass(frozen=True)
class Phosphorus:
    """The whole sheet, as the figures need it."""

    calibration: Calibration
    od600: tuple[TimeCourse, TimeCourse]
    phosphorus: tuple[TimeCourse, TimeCourse]

    @property
    def rate_ratio(self) -> float:
        wild_type, transformant = self.phosphorus
        return transformant.rate() / wild_type.rate()


def _number(raw: str | None) -> float | None:
    """Parse one cell, tolerating the sheet's comma decimals and labels."""
    text = (raw or "").strip()
    if not text:
        return None
    try:
        return float(text.replace(",", "."))
    except ValueError:
        return None  # a stray label such as "Slope" in a numeric column


def _column(rows: list[list[str]], index: int) -> list[float | None]:
    return [_number(row[index]) if index < len(row) else None for row in rows]


def _paired(
    rows: list[list[str]], *columns: int
) -> tuple[np.ndarray, ...]:
    """Rows where every one of `columns` holds a number, as arrays."""
    series = [_column(rows, c) for c in columns]
    keep = [i for i in range(len(rows)) if all(s[i] is not None for s in series)]
    return tuple(np.array([s[i] for i in keep], dtype=float) for s in series)


def load(path: Path) -> Phosphorus:
    """Read the exported sheet at `path`."""
    with path.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.reader(handle, delimiter=";"))
    data = rows[3:]

    mass, absorbance, sd = _paired(data, 4, 2, 3)
    calibration = Calibration(mass_ng=mass, absorbance=absorbance, sd=sd)

    od_time, od_wt, od_wt_sd, od_tr, od_tr_sd = _paired(data, 15, 11, 12, 13, 14)
    od600 = (
        TimeCourse("Wild type", od_time, od_wt, od_wt_sd),
        TimeCourse("$\\it{ppk1}$ transformant", od_time, od_tr, od_tr_sd),
    )

    p_time, p_wt, p_wt_sd, p_tr, p_tr_sd = _paired(data, 29, 25, 26, 27, 28)
    phosphorus = (
        TimeCourse("Wild type", p_time, p_wt, p_wt_sd),
        TimeCourse("$\\it{ppk1}$ transformant", p_time, p_tr, p_tr_sd),
    )

    return Phosphorus(calibration=calibration, od600=od600, phosphorus=phosphorus)


def verify_against_sheet(data: Phosphorus) -> list[str]:
    """Compare recomputed values with the ones the sheet carries.

    Returns a list of human-readable discrepancies; an empty list means
    every recomputed number agrees with the spreadsheet to the precision
    the spreadsheet itself reports. Run as part of the build so a future
    edit to the sheet that moves these numbers cannot pass unnoticed.
    """
    problems: list[str] = []

    slope, intercept = data.calibration.fit
    for name, got, want in (
        ("calibration slope", slope, 0.001035274),
        ("calibration intercept", intercept, 0.221832565),
    ):
        if abs(got - want) > abs(want) * 1e-3:
            problems.append(f"{name}: recomputed {got:.9g}, sheet {want:.9g}")

    wild_type, transformant = data.phosphorus
    for course, want in ((wild_type, 6449.858816), (transformant, 11016.98977)):
        got = course.rate()
        if abs(got - want) > 1.0:
            problems.append(
                f"{course.label} uptake rate over {RATE_WINDOW[0]:.0f}-"
                f"{RATE_WINDOW[1]:.0f} min: recomputed {got:.3f}, sheet {want:.3f}"
            )

    return problems
