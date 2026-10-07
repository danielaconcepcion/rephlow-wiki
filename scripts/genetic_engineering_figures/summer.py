"""
Reader for "Resultados verano 2025 rePhlow.xlsx", the summer assay book.

Three of the four figures the results page asks for live here, one per
sheet, and each already has a chart built on it. Rather than guess which
cells those charts plot, the ranges below were taken from the charts'
own series definitions inside the workbook, so a figure built here plots
exactly what the team's own chart plots:

  sheet "10-07-25"                    chart series A2:A11 / B2:B11
      growth of P. putida KT2440 in M9 over 240 min

  sheet "Valoración de fósforo 2 15-07"   chart "Rectas patrón por separado"
      two standard-curve replicates, A2:A10 against C and F

  sheet "Ensayo 21-07-2025"           charts "Valoración de fósforo ensayo
      21/07/2025" and "Zoom" — six series sharing the time column G17:G21,
      with the normalised phosphorus of each in K, O, S, W, AA and AE, and
      each series' name in the merged header cell on row 15.

One thing worth carrying into the captions: this book's standard curve is
read at 830 nm (the header says so, and the assay is the Rousser
molybdenum-blue method), not at 600 nm. The Notion write-up's caption for
this figure says 600 nm, which is the wavelength of the *other*, later
assay — the malachite-green one in "Valoracion fosforo". They are
different measurements and the wavelength is read straight from the sheet
here rather than from the prose.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import numpy as np
import openpyxl

from .data import TimeCourse

GROWTH_SHEET = "10-07-25"
CALIBRATION_SHEET = "Valoración de fósforo 2 15-07"
SCREEN_SHEET = "Ensayo 21-07-2025"

# Column holding each series' normalised phosphorus, with the cell its
# name sits in, exactly as the sheet's own two charts reference them.
SCREEN_SERIES = [
    ("H15", "K"),
    ("L15", "O"),
    ("P15", "S"),
    ("T15", "W"),
    ("X15", "AA"),
    ("AB15", "AE"),
]

# The sheet names its series in Spanish. Only the two controls are
# translated, and only their wording: the condition codes (A to D) and
# their pH/dilution are reproduced exactly as the sheet writes them, since
# those are what the write-up refers to.
SCREEN_LABELS = {
    "CONTROL + (M9)": "Positive control (M9)",
    "CONTROL - (LB)": "Negative control (LB)",
}
SCREEN_TIME_COLUMN = "G"
SCREEN_FIRST_ROW, SCREEN_LAST_ROW = 17, 21

# The first two series are the two reference media; the rest are the
# screened operating conditions.
SCREEN_CONTROL_COUNT = 2


@dataclass(frozen=True)
class StandardCurveReplicate:
    label: str
    mass_ng: np.ndarray
    absorbance: np.ndarray

    @property
    def fit(self) -> tuple[float, float]:
        slope, intercept = np.polyfit(self.mass_ng, self.absorbance, 1)
        return float(slope), float(intercept)

    @property
    def r_squared(self) -> float:
        return float(np.corrcoef(self.mass_ng, self.absorbance)[0, 1] ** 2)


@dataclass(frozen=True)
class SummerAssays:
    m9_growth: TimeCourse
    standard_curve: list[StandardCurveReplicate]
    screen_controls: list[TimeCourse]
    screen_conditions: list[TimeCourse]


def _column(sheet, column: str, first: int, last: int) -> np.ndarray:
    values = [sheet[f"{column}{row}"].value for row in range(first, last + 1)]
    return np.array([float(v) for v in values if v is not None])


def load(path: Path) -> SummerAssays:
    book = openpyxl.load_workbook(path, data_only=True)

    growth_sheet = book[GROWTH_SHEET]
    time = _column(growth_sheet, "A", 2, 11)
    od = _column(growth_sheet, "B", 2, 11)
    m9_growth = TimeCourse(
        "$\\it{P.\\,putida}$ KT2440 in M9", time, od, np.zeros_like(od)
    )

    calibration_sheet = book[CALIBRATION_SHEET]
    mass = _column(calibration_sheet, "A", 2, 10)
    standard_curve = [
        StandardCurveReplicate(
            "Replicate 1", mass, _column(calibration_sheet, "C", 2, 10)
        ),
        StandardCurveReplicate(
            "Replicate 2", mass, _column(calibration_sheet, "F", 2, 10)
        ),
    ]

    screen_sheet = book[SCREEN_SHEET]
    screen_time = _column(
        screen_sheet, SCREEN_TIME_COLUMN, SCREEN_FIRST_ROW, SCREEN_LAST_ROW
    )
    courses = []
    for name_cell, column in SCREEN_SERIES:
        values = _column(
            screen_sheet, column, SCREEN_FIRST_ROW, SCREEN_LAST_ROW
        )
        label = str(screen_sheet[name_cell].value).strip()
        label = SCREEN_LABELS.get(label, label)
        courses.append(
            TimeCourse(label, screen_time, values, np.zeros_like(values))
        )

    return SummerAssays(
        m9_growth=m9_growth,
        standard_curve=standard_curve,
        screen_controls=courses[:SCREEN_CONTROL_COUNT],
        screen_conditions=courses[SCREEN_CONTROL_COUNT:],
    )
