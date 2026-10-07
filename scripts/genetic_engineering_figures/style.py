"""
The Model page's figure style, as a reusable matplotlib theme.

Every figure on the Model page was rendered by the rephlow-model
notebooks with one consistent look, and the team asked (Notion comment on
the Genetic engineering results page, "Si se pueden pasar estas graficas,
para que todas tengan el mismo formato, mejor") for the wet-lab phosphorus
charts to match it instead of staying as Excel exports.

The values below are not a guess at that look: they were read straight out
of the shipped Model figures. The series palette and the ink/grid colours
are the literal stroke/fill colours in public/assets/model/*.svg (the
five-series order is the one those paired figures use), and the spine,
tick, title and label treatment is measured off
public/assets/model/phase-b-*.png.

Import `apply_theme()` before building any figure in this package.
"""

from __future__ import annotations

import matplotlib
from matplotlib import pyplot as plt

# Series palette, in the order the Model figures cycle through it.
SERIES = [
    "#3b6fa0",  # blue
    "#e19239",  # orange
    "#61a65b",  # green
    "#8567a6",  # purple
    "#4c9797",  # teal
]

INK = "#4a5170"  # spines, ticks, tick labels, axis labels, titles
GRID = "#d8dbe4"  # the faint rule the Model figures use behind the data

# Helvetica first, to match the Model figures; the rest are the fallbacks
# that exist on CI and on Linux checkouts, in decreasing order of how close
# they sit to Helvetica's metrics.
FONT_STACK = [
    "Helvetica Neue",
    "Helvetica",
    "Nimbus Sans",
    "Arial",
    "Liberation Sans",
    "DejaVu Sans",
]


def apply_theme() -> None:
    """Set the rcParams every figure in this package is drawn with."""
    matplotlib.rcParams.update(
        {
            "font.family": "sans-serif",
            "font.sans-serif": FONT_STACK,
            "font.size": 11,
            "figure.dpi": 200,
            "savefig.dpi": 200,
            "figure.facecolor": "white",
            "savefig.facecolor": "white",
            "savefig.bbox": "tight",
            # Model figures drop the top/right spines and keep the
            # remaining two in the same muted ink as the type.
            "axes.spines.top": False,
            "axes.spines.right": False,
            "axes.edgecolor": INK,
            "axes.linewidth": 0.9,
            "axes.labelcolor": INK,
            "axes.labelsize": 11,
            "axes.titlecolor": INK,
            "axes.titlesize": 12,
            "axes.titleweight": "normal",
            "axes.titlepad": 12,
            "axes.grid": False,
            "grid.color": GRID,
            "grid.linewidth": 0.8,
            "text.color": INK,
            "xtick.color": INK,
            "ytick.color": INK,
            "xtick.labelsize": 10,
            "ytick.labelsize": 10,
            "xtick.direction": "out",
            "ytick.direction": "out",
            "lines.linewidth": 1.8,
            "lines.markersize": 5,
            "lines.markeredgewidth": 0,
            "legend.frameon": False,
            "legend.fontsize": 10,
            "legend.labelcolor": INK,
            "axes.prop_cycle": matplotlib.cycler(color=SERIES),
        }
    )


def finish(ax: plt.Axes, *, grid: bool = False) -> None:
    """Apply the per-axes touches rcParams can't express.

    `grid` turns on the horizontal rule the denser Model figures use; the
    simple two-panel ones leave it off.
    """
    if grid:
        ax.set_axisbelow(True)
        ax.grid(axis="y", color=GRID, linewidth=0.8)
    ax.tick_params(length=4, width=0.9)
