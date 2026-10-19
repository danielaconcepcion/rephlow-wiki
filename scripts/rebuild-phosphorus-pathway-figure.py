#!/usr/bin/env python3
"""
Re-typesets Figure 3 (Project Description, "Engineered phosphorus-
accumulation pathway in P. putida KT2440") in the wiki's Helvetica Neue
system, without touching any structure, arrow, shape, colour or position.

Like Figure 2, this PNG has no editable/vector source anywhere on this
machine (see the audit in conversation) and its labels are baked into the
raster. Unlike Figure 2, labels here use THREE distinct ink colours that
carry biochemical meaning (dark green = heterologous expression / Strategy
2, dark red/maroon = gene knockout / Strategy 1, dark indigo = the polyP
pool itself, plus plain black for the free-standing annotations), and the
red "X" knockout marks reuse the exact same red as the Strategy-1 titles --
so a naive "erase anything reddish" pass would eat the knockout marks
between polyP-PPX and above PPK2. Every bounding box below was measured
directly off the original PNG's own pixels (row/column projections of a
text/background classifier, not eyeballed off a resized crop -- an early
attempt that way drifted by 5-15px on several labels and either clipped
text or bled into neighbouring icons) and cross-checked against a clean
2x render of the full figure.

Erasure uses nearest-colour classification along the text<->background
blend line (see `blend_mask`), not a fixed RGB tolerance: a fixed
tolerance either misses most of a small anti-aliased glyph (too strict)
or eats into a neighbouring same-hue structural element such as the red
"X" marks or the PstA/PstC subunit boxes (too loose). Classifying by
"is this pixel plausibly a blend of exactly these two colours" avoids
both failure modes and is why every box below also carries the specific
local background colour it should erase back to.

Scope: every stand-alone text label (titles, subtitles, "cytoplasm",
"cell membrane", the top caption, the legend) is retypeset. The small
in-diagram molecular notation (the "Pi"/"ATP"/"ADP"/"PstA"/"PstB"/"PstC"/
"NDP"/"NTP" labels sitting inside the small coloured icon shapes, and the
"P"/"n"/"n+1"/"n-1" phosphate-chain glyphs) is deliberately left as-is:
at <=14px, sitting on small precisely-bordered icon shapes, a font swap
there is visually imperceptible but the erase/redraw risk (fill-colour
mismatch, border damage) is real -- not a trade worth making. Flag this to
the user if full coverage is ever wanted.

Input:  public/assets/project-description/engineered-phosphorus-pathway.original.png
Output: public/assets/project-description/engineered-phosphorus-pathway.png
Run from the repo root: python3 scripts/rebuild-phosphorus-pathway-figure.py
Requires: pillow, numpy, scipy
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets" / "project-description"
SRC = ASSETS / "engineered-phosphorus-pathway.original.png"
OUT = ASSETS / "engineered-phosphorus-pathway.png"

SCALE = 4  # heavier supersampling than Figure 2: this source is smaller (800x595)

FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"
REGULAR_IDX = 0
BOLD_IDX = 1
ITALIC_IDX = 2

RED = (145, 12, 18)
GREEN = (35, 83, 25)
PURPLE = (37, 20, 122)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

PINK_BG = (254, 242, 241)     # Pit / PPX / PPK2 box fill
GREENBOX_BG = (244, 250, 238)  # PstS / Pst(SCAB) / PPK1 box fill
LAV_BG = (238, 237, 253)      # polyP oval fill

# (text, ink colour, bold?, local background, x0, x1, y0, y1) -- every box
# measured directly from the original's own pixels; see module docstring.
ENTRIES = [
    ("Pit",                RED,    True,  PINK_BG, 160, 197, 73,  90),
    ("low-affinity",       RED,    False, PINK_BG, 143, 226, 91,  104),
    ("phosphate",          RED,    False, PINK_BG, 144, 206, 105, 118),
    ("transporter",        RED,    False, PINK_BG, 139, 211, 119, 133),

    ("PstS",               GREEN,  True,  GREENBOX_BG, 574, 613, 46,  62),
    ("Pst (SCAB)",         GREEN,  True,  GREENBOX_BG, 638, 701, 63,  80),
    ("high-affinity",      GREEN,  False, GREENBOX_BG, 639, 703, 80,  95),
    ("phosphate",          GREEN,  False, GREENBOX_BG, 644, 696, 95,  109),
    ("import",             GREEN,  False, GREENBOX_BG, 651, 688, 110, 123),

    ("PPK1",               GREEN,  True,  GREENBOX_BG, 108, 161, 277, 293),
    ("synthesizes polyP",  GREEN,  False, GREENBOX_BG, 84,  186, 295, 310),

    ("polyP",              PURPLE, True,  LAV_BG, 360, 412, 290, 307),
    ("phosphate reserve",  PURPLE, False, LAV_BG, 326, 448, 308, 323),

    ("PPX",                RED,    True,  PINK_BG, 644, 681, 285, 301),
    ("degrades polyP",     RED,    False, PINK_BG, 621, 701, 303, 317),

    ("PPK2",               RED,    True,  PINK_BG, 358, 413, 445, 461),
    ("consumes polyP",     RED,    False, PINK_BG, 330, 441, 462, 477),

    ("cytoplasm",          BLACK,  False, WHITE, 43,  108, 159, 174),
    ("cell membrane",      BLACK,  False, WHITE, 349, 448, 113, 128),
    ("Pi (phosphate) available in the medium", BLACK, False, WHITE, 280, 518, 13, 28),

    ("Strategy 2 · heterologous expression", BLACK, False, WHITE, 183, 398, 549, 568),
    ("( + , from Ca. Accumulibacter)",       BLACK, False, WHITE, 182, 414, 571, 584),
    ("Strategy 1 · gene knockout",           BLACK, False, WHITE, 446, 593, 549, 568),
]

# legend2b is handled separately: "(" + red "X" (kept from the original,
# never erased) + ", endogenous " + italic "P. putida" + " genes)"
LEGEND2B_BOX = (440, 618, 571, 584)
LEGEND2B_X_GLYPH_BOX = (445, 479, 570, 586)  # the red X's own footprint, left untouched


def blend_mask(region, color, bg, resid_thresh=1400, min_frac=0.12):
    """A pixel counts as "text" if it lies close to the line segment
    between `bg` and `color` in RGB space (i.e. is well explained as an
    anti-aliased blend of exactly those two colours) and is far enough
    along that segment to be more text than background. This is what
    correctly separates, e.g., a red "X" glyph from red text on the same
    pink box: both are "red-ish", but only one lies on *this* box's own
    red-vs-pink blend line within the window being erased.
    """
    color = np.array(color, dtype=float)
    bg = np.array(bg, dtype=float)
    t = color - bg
    denom = np.dot(t, t)
    diff = region.astype(float) - bg
    s = (diff @ t) / denom
    proj = bg + s[..., None] * t
    resid = np.sum((region.astype(float) - proj) ** 2, axis=2)
    return (resid < resid_thresh) & (s > min_frac) & (s < 1.6)


def erase(arr, color, bg, x0, x1, y0, y1, pad=4):
    x0p, x1p, y0p, y1p = x0 - pad, x1 + pad, y0 - pad, y1 + pad
    region = arr[y0p:y1p, x0p:x1p]
    mask = blend_mask(region, color, bg)
    mask = ndimage.binary_dilation(mask, iterations=2)
    region[mask] = bg
    arr[y0p:y1p, x0p:x1p] = region


def fit_font_size(text, target_h, index, max_size=300, target_w=None):
    """Largest size whose glyph-ink height stays within target_h -- and,
    if given, whose width also stays within target_w. Matching height
    alone is not enough for longer strings: Helvetica Neue's width/height
    ratio isn't the same as the original (unknown) font's, so a
    height-only match can overflow a fixed-width column by 20-25% on
    longer lines (verified on the legend text) and collide with whatever
    sits next to it. Using whichever constraint is tighter keeps every
    string inside its original footprint.
    """
    lo, hi, best = 4, max_size, 4
    while lo <= hi:
        mid = (lo + hi) // 2
        bbox = ImageFont.truetype(FONT_PATH, mid, index=index).getbbox(text)
        h_ok = (bbox[3] - bbox[1]) <= target_h
        w_ok = target_w is None or (bbox[2] - bbox[0]) <= target_w
        if h_ok and w_ok:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return best


def draw_centered(draw, text, color, bold, x0, x1, y0, y1):
    index = BOLD_IDX if bold else REGULAR_IDX
    target_h = (y1 - y0) * SCALE
    target_w = (x1 - x0) * SCALE
    size = fit_font_size(text, target_h, index, target_w=target_w)
    font = ImageFont.truetype(FONT_PATH, size, index=index)
    bbox = font.getbbox(text)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    cx, cy = (x0 + x1) / 2 * SCALE, (y0 + y1) / 2 * SCALE
    x = cx - w / 2 - bbox[0]
    y = cy - h / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=color)


def main():
    im = Image.open(SRC).convert("RGB")
    arr = np.array(im)

    for text, color, bold, bg, x0, x1, y0, y1 in ENTRIES:
        erase(arr, color, bg, x0, x1, y0, y1)

    x0, x1, y0, y1 = LEGEND2B_BOX
    erase(arr, BLACK, WHITE, x0, x1, y0, y1)

    erased = Image.fromarray(arr, "RGB")
    big = erased.resize((erased.width * SCALE, erased.height * SCALE), Image.LANCZOS)
    draw = ImageDraw.Draw(big)

    for text, color, bold, bg, x0, x1, y0, y1 in ENTRIES:
        draw_centered(draw, text, color, bold, x0, x1, y0, y1)

    # legend2b: three segments sharing one baseline/centre, built around the
    # untouched original red "X" glyph.
    xg0, xg1, yg0, yg1 = LEGEND2B_X_GLYPH_BOX
    size = fit_font_size("Mg", (yg1 - yg0) * SCALE, REGULAR_IDX)
    reg = ImageFont.truetype(FONT_PATH, size, index=REGULAR_IDX)
    ital = ImageFont.truetype(FONT_PATH, size, index=ITALIC_IDX)
    cy = (571 + 584) / 2 * SCALE

    open_paren = "("
    bbox = reg.getbbox(open_paren)
    h = bbox[3] - bbox[1]
    x_cursor = xg0 * SCALE - reg.getlength(open_paren)
    y = cy - h / 2 - bbox[1]
    draw.text((x_cursor, y), open_paren, font=reg, fill=BLACK)

    x_cursor = xg1 * SCALE + 2 * SCALE
    for text, font in [
        (", endogenous ", reg),
        ("P. putida", ital),
        (" genes)", reg),
    ]:
        bbox = font.getbbox(text)
        h = bbox[3] - bbox[1]
        y = cy - h / 2 - bbox[1]
        draw.text((x_cursor, y), text, font=font, fill=BLACK)
        x_cursor += font.getlength(text)

    big.resize((erased.width, erased.height), Image.LANCZOS).save(OUT)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
