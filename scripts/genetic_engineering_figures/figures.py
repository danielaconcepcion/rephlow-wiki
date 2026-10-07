"""
The four phosphorus figures of the Genetic engineering results block,
redrawn in the Model page's style (see style.py).

Each builder takes already-loaded data and returns a matplotlib Figure; no
builder invents, smooths or extrapolates a value. Two deliberate
departures from the Excel originals, both in the direction of showing the
measurement rather than decorating it:

  * The Excel charts join their points with a smoothed spline, which
    invents excursions between time points that were never measured (most
    visibly in the 21/07 assay, where the spline dips below every measured
    value between 30 and 60 min). Here the points are joined with straight
    segments, the same treatment the Model figures use.
  * Titles and axis labels are in English, matching the rest of the wiki,
    and the series carry their experimental names rather than Excel's
    "Series1"/"Series2". This also settles the team's own note on
    Figure 1 ("hay que cambiar los titulos de la figura").

A dotted least-squares line is drawn only where the original figure
carried one, and its slope is reported by the caller rather than being
re-stated inside the figure.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.figure import Figure

from .style import INK, SERIES, finish

MARKERS = ["o", "s", "^", "X", "D", "v"]

# The two reference media in Figure 3 are deliberately neutral, so the
# four screened conditions keep the palette to themselves.
CONTROL_GREYS = [INK, "#9aa0b4"]


@dataclass(frozen=True)
class Series:
    """One plotted series: a label, its x/y values and optional error bars."""

    label: str
    x: np.ndarray
    y: np.ndarray
    yerr: np.ndarray | None = None


def _fit_line(x: np.ndarray, y: np.ndarray) -> tuple[np.ndarray, np.ndarray, float]:
    """Least-squares straight line through (x, y); returns xs, ys, slope."""
    slope, intercept = np.polyfit(x, y, 1)
    xs = np.array([x.min(), x.max()])
    return xs, slope * xs + intercept, slope


def standard_curve(replicates: list[Series]) -> Figure:
    """Figure 1 — intracellular-phosphorus assay calibration.

    Absorbance against phosphate mass for each standard-curve replicate,
    with the least-squares line through each.
    """
    fig, ax = plt.subplots(figsize=(5.4, 3.8))

    for i, rep in enumerate(replicates):
        colour = SERIES[i % len(SERIES)]
        ax.plot(
            rep.x,
            rep.y,
            linestyle="none",
            marker=MARKERS[i % len(MARKERS)],
            color=colour,
            label=rep.label,
        )
        xs, ys, _ = _fit_line(rep.x, rep.y)
        ax.plot(xs, ys, linestyle=":", color=colour, linewidth=1.4)

    ax.set_title("Standard curve of the intracellular-phosphorus assay")
    ax.set_xlabel("Phosphate [ng]")
    ax.set_ylabel("Absorbance at 600 nm")
    ax.legend(loc="upper left")
    finish(ax, grid=True)
    return fig


def growth_in_m9(od: Series) -> tuple[Figure, float]:
    """Figure 2 — OD600 of P. putida KT2440 in M9 over the assay window.

    Returns the figure and the fitted slope (OD600 per minute), so the
    caption can quote the decline without the number being retyped by hand.
    """
    fig, ax = plt.subplots(figsize=(5.4, 3.6))

    ax.plot(od.x, od.y, marker="o", color=SERIES[0], label=od.label)
    xs, ys, slope = _fit_line(od.x, od.y)
    ax.plot(xs, ys, linestyle=":", color=SERIES[0], linewidth=1.4)

    ax.set_title("Growth of $\\it{P.\\,putida}$ KT2440 in M9")
    ax.set_xlabel("Time [min]")
    ax.set_ylabel("OD$_{600}$")
    finish(ax, grid=True)
    return fig, slope


def operating_conditions(
    controls: list[Series], conditions: list[Series], *, zoom_max: float
) -> Figure:
    """Figure 3 — normalised intracellular phosphorus across the screen.

    Two panels sharing one legend: (A) every condition on a common axis,
    which the M9 reference dominates, and (B) the same data clipped to
    `zoom_max` so the four synthetic-stream conditions separate. Panel B
    plots exactly the same points as panel A — it only changes the y-limit,
    which is why its caption has to say so.

    The two reference media are drawn in neutral greys and the four
    screened conditions in the Model palette, so the comparison the figure
    is actually about carries the colour.
    """
    fig, (ax_a, ax_b) = plt.subplots(1, 2, figsize=(10.6, 4.4))

    plotted = [(s, CONTROL_GREYS[i % len(CONTROL_GREYS)], MARKERS[i])
               for i, s in enumerate(controls)]
    plotted += [(s, SERIES[i % len(SERIES)], MARKERS[(i + len(controls)) % len(MARKERS)])
                for i, s in enumerate(conditions)]

    for ax in (ax_a, ax_b):
        for s, colour, marker in plotted:
            ax.plot(s.x, s.y, marker=marker, color=colour, label=s.label)
        ax.set_xlabel("Time [min]")
        finish(ax, grid=True)

    ax_b.set_ylim(0, zoom_max)

    ax_a.set_ylabel("m$_{Pi}$/OD$_{600}$ [ng per OD$_{600}$]")
    ax_a.set_title("A  All conditions")
    ax_b.set_title("B  Same data, y-axis clipped")

    handles, labels = ax_a.get_legend_handles_labels()
    fig.tight_layout(rect=(0, 0.12, 1, 1))
    fig.legend(
        handles,
        labels,
        loc="lower center",
        ncol=3,
        bbox_to_anchor=(0.5, 0.0),
    )
    return fig


def wild_type_vs_transformant(
    wild_type: Series, transformant: Series
) -> tuple[Figure, dict[str, float]]:
    """Figure 23 — phosphorus accumulation, wild type against ppk1.

    Points with their error bars, joined by straight segments, plus the
    dotted least-squares line whose slope is the uptake rate the Closing
    section quotes. Returns the figure and the two fitted rates (ng per
    OD600 per minute) with their ratio, so the caption's numbers come from
    the same fit the figure draws rather than from a separate calculation.
    """
    fig, ax = plt.subplots(figsize=(7.2, 4.2))

    rates: dict[str, float] = {}
    for i, s in enumerate((wild_type, transformant)):
        colour = SERIES[i % len(SERIES)]
        ax.errorbar(
            s.x,
            s.y,
            yerr=s.yerr,
            marker=MARKERS[i],
            color=colour,
            ecolor=colour,
            elinewidth=1.0,
            capsize=3,
            label=s.label,
        )
        xs, ys, slope = _fit_line(s.x, s.y)
        ax.plot(xs, ys, linestyle=":", color=colour, linewidth=1.4)
        rates[s.label] = slope

    rates["ratio"] = rates[transformant.label] / rates[wild_type.label]

    ax.set_title("Phosphorus accumulation relative to biomass")
    ax.set_xlabel("Time [min]")
    ax.set_ylabel("m$_{P}$/OD$_{600}$ [ng per OD$_{600}$]")
    ax.legend(loc="upper left")
    finish(ax, grid=True)
    return fig, rates
