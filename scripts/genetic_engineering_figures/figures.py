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

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.figure import Figure
from matplotlib.ticker import FuncFormatter

from .data import RATE_WINDOW, Calibration, TimeCourse
from .summer import StandardCurveReplicate
from .style import INK, SERIES, finish

MARKERS = ["o", "s", "^", "X", "D", "v"]

# The two reference media in Figure 3 are deliberately neutral, so the
# four screened conditions keep the palette to themselves.
CONTROL_GREYS = [INK, "#9aa0b4"]


def _fit_line(x: np.ndarray, y: np.ndarray) -> tuple[np.ndarray, np.ndarray, float]:
    """Least-squares straight line through (x, y); returns xs, ys, slope."""
    slope, intercept = np.polyfit(x, y, 1)
    xs = np.array([x.min(), x.max()])
    return xs, slope * xs + intercept, slope


def standard_curve(calibration: Calibration) -> Figure:
    """Calibration of the intracellular-phosphorus assay.

    Mean absorbance per phosphate mass with the SD of the replicates, and
    the least-squares line through the means. The fitted line and its R²
    are drawn from the measurements, not from the spreadsheet's own cells.
    """
    fig, ax = plt.subplots(figsize=(5.6, 4.0))
    colour = SERIES[0]

    slope, intercept = calibration.fit
    xs = np.array([calibration.mass_ng.min(), calibration.mass_ng.max()])
    ax.plot(xs, slope * xs + intercept, linestyle=":", color=colour, linewidth=1.4)
    ax.errorbar(
        calibration.mass_ng,
        calibration.absorbance,
        yerr=calibration.sd,
        linestyle="none",
        marker="o",
        color=colour,
        ecolor=colour,
        elinewidth=1.0,
        capsize=3,
    )

    ax.annotate(
        f"A = {slope:.3e}·m + {intercept:.3f}\nR² = {calibration.r_squared:.4f}",
        xy=(0.04, 0.96),
        xycoords="axes fraction",
        va="top",
        fontsize=10,
        color=INK,
    )

    ax.set_title("Calibration of the intracellular-phosphorus assay")
    ax.set_xlabel("Phosphate [ng]")
    ax.set_ylabel("Absorbance at 600 nm [a.u.]")
    finish(ax, grid=True)
    return fig


def standard_curve_replicates(
    replicates: list[StandardCurveReplicate], *, wavelength_nm: int
) -> Figure:
    """The summer assay's two standard curves, plotted separately.

    The sheet's own chart is called "Rectas patron por separado" — the
    point of it is that the two replicate curves are shown apart rather
    than averaged, so that is kept. Each gets its own least-squares line
    and R², recomputed from the measurements.

    `wavelength_nm` is passed in rather than hard-coded because the two
    assays in this project read at different wavelengths, and the figure
    should state the one its own data was measured at.
    """
    fig, ax = plt.subplots(figsize=(5.8, 4.1))

    notes = []
    for i, replicate in enumerate(replicates):
        colour = SERIES[i % len(SERIES)]
        slope, intercept = replicate.fit
        xs = np.array([replicate.mass_ng.min(), replicate.mass_ng.max()])
        ax.plot(xs, slope * xs + intercept, linestyle=":", color=colour, linewidth=1.4)
        ax.plot(
            replicate.mass_ng,
            replicate.absorbance,
            linestyle="none",
            marker=MARKERS[i % len(MARKERS)],
            color=colour,
            label=replicate.label,
        )
        notes.append(f"{replicate.label}: R² = {replicate.r_squared:.4f}")

    ax.annotate(
        "\n".join(notes),
        xy=(0.04, 0.96),
        xycoords="axes fraction",
        va="top",
        fontsize=10,
        color=INK,
    )

    ax.set_title("Standard curves of the phosphorus assay")
    ax.set_xlabel("Phosphate [ng]")
    ax.set_ylabel(f"Absorbance at {wavelength_nm} nm [a.u.]")
    ax.legend(loc="lower right")
    finish(ax, grid=True)
    return fig


def growth_in_m9(od: TimeCourse) -> tuple[Figure, float]:
    """Growth of P. putida KT2440 in M9 across the 240 min assay window.

    Returns the figure and the fitted slope (OD600 per minute), so a
    caption can quote the decline without the number being retyped by hand.
    """
    fig, ax = plt.subplots(figsize=(5.8, 3.8))

    ax.plot(od.time_min, od.mean, marker="o", color=SERIES[0], label=od.label)
    xs, ys, slope = _fit_line(od.time_min, od.mean)
    ax.plot(xs, ys, linestyle=":", color=SERIES[0], linewidth=1.4)

    ax.set_title("Growth of $\\it{P.\\,putida}$ KT2440 in M9")
    ax.set_xlabel("Time [min]")
    ax.set_ylabel("OD$_{600}$ [a.u.]")
    finish(ax, grid=True)
    return fig, slope


def operating_conditions(
    controls: list[TimeCourse],
    conditions: list[TimeCourse],
    *,
    zoom_max: float,
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
            ax.plot(
                s.time_min, s.mean, marker=marker, color=colour, label=s.label
            )
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


def bacterial_growth(
    wild_type: TimeCourse, transformant: TimeCourse
) -> Figure:
    """OD600 of both strains across the phosphorus time course.

    This is the biomass every phosphorus value is normalised by, so it
    belongs next to the accumulation figure: it shows that neither strain
    was growing during the assay, and that the two declined at similar
    rates, which is what makes the normalised comparison fair.

    Unlike the accumulation figure, the trend line here IS fitted over the
    whole time course, because that is what the spreadsheet's own chart
    does and the decline is monotonic enough to support it.
    """
    fig, ax = plt.subplots(figsize=(6.4, 4.0))

    for i, course in enumerate((wild_type, transformant)):
        colour = SERIES[i % len(SERIES)]
        ax.errorbar(
            course.time_min,
            course.mean,
            yerr=course.sd,
            marker=MARKERS[i],
            color=colour,
            ecolor=colour,
            elinewidth=1.0,
            capsize=3,
            label=course.label,
        )
        xs, ys, slope = _fit_line(course.time_min, course.mean)
        ax.plot(xs, ys, linestyle=":", color=colour, linewidth=1.4)

    ax.set_title("Biomass across the phosphorus time course")
    ax.set_xlabel("Time [min]")
    ax.set_ylabel("OD$_{600}$ [a.u.]")
    ax.legend(loc="lower left")
    finish(ax, grid=True)
    return fig


def wild_type_vs_transformant(
    wild_type: TimeCourse,
    transformant: TimeCourse,
    *,
    window: tuple[float, float] = RATE_WINDOW,
) -> Figure:
    """Phosphorus accumulation, wild type against the ppk1 transformant.

    Means with the SD of their replicates, joined by straight segments.
    The dotted least-squares line is drawn ONLY across `window`, the final
    stretch of the time course the quoted uptake rates are fitted over —
    drawing it across the full axis would imply a fit that was never made,
    and over the full window the ranking of the two slopes reverses. The
    window is named on the figure for the same reason.
    """
    fig, ax = plt.subplots(figsize=(7.4, 4.4))
    lo, hi = window

    for i, course in enumerate((wild_type, transformant)):
        colour = SERIES[i % len(SERIES)]
        ax.errorbar(
            course.time_min,
            course.mean,
            yerr=course.sd,
            marker=MARKERS[i],
            color=colour,
            ecolor=colour,
            elinewidth=1.0,
            capsize=3,
            label=f"{course.label} ({course.rate():,.0f} ng OD$_{{600}}^{{-1}}$ min$^{{-1}}$)",
        )
        sel = (course.time_min >= lo) & (course.time_min <= hi)
        slope, intercept = np.polyfit(course.time_min[sel], course.mean[sel], 1)
        xs = np.array([lo, hi])
        ax.plot(xs, slope * xs + intercept, linestyle=":", color=colour, linewidth=1.6)

    ax.axvspan(lo, hi, color=INK, alpha=0.05, linewidth=0)
    ax.annotate(
        f"rate fitted over {lo:.0f}–{hi:.0f} min",
        xy=((lo + hi) / 2, 0.02),
        xycoords=("data", "axes fraction"),
        ha="center",
        fontsize=9,
        color=INK,
    )

    # Millions on the tick labels, rather than matplotlib's "1e6" corner
    # offset, which is easy to miss at figure scale.
    ax.yaxis.set_major_formatter(
        FuncFormatter(lambda value, _: f"{value / 1e6:g}")
    )

    ax.set_title("Phosphorus accumulation relative to biomass")
    ax.set_xlabel("Time [min]")
    ax.set_ylabel("m$_{P}$/OD$_{600}$ [10$^{6}$ ng per OD$_{600}$]")
    ax.legend(loc="upper left")
    finish(ax, grid=True)
    return fig
