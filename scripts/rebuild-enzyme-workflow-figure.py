#!/usr/bin/env python3
"""
Re-typesets Figure 2 (Project Description, "Workflow of the enzyme
immobilisation block") in the wiki's Helvetica Neue system, without
touching composition, icons, arrows, colours or layout.

Figure 2 only exists as a flattened PNG (no vector/editable source was
found anywhere on this machine — see the audit in conversation). Each of
the 6 stage cards has its title + subtitle baked into the raster as pure
near-black pixels, sitting on an otherwise flat pastel card background and
never overlapping the icon artwork (verified: icons use no near-black
pixels in the title/subtitle bands). That makes a safe, purely additive
edit possible:

1. Detect old label pixels via a near-black threshold, restricted to each
   card's known title/subtitle bands (measured once from the original PNG
   and hardcoded below as TEXT/CARDS) — this avoids ever touching the
   rounded card corners or the icon artwork in the middle of each card.
2. Erase just those pixels back to the card's own flat background colour
   (also measured from the original).
3. Redraw the same strings, same weight hierarchy (bold title / regular
   subtitle), same centred position, at whatever font size best matches
   the original glyph height — in Helvetica Neue instead of the original
   font.

Everything is done at 3x supersampling then downsampled, so the new text
anti-aliases cleanly instead of inheriting the original's (different)
hinting.

Input:  public/assets/project-description/enzyme-workflow.original.png
        (a preserved copy of the untouched original raster)
Output: public/assets/project-description/enzyme-workflow.png
        (what the site actually serves)

Run from the repo root: python3 scripts/rebuild-enzyme-workflow-figure.py
Requires: pillow, numpy, scipy
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets" / "project-description"
SRC = ASSETS / "enzyme-workflow.original.png"
OUT = ASSETS / "enzyme-workflow.png"

SCALE = 3  # supersample factor for crisp text, downsampled at the end

FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"
REGULAR_IDX = 0
BOLD_IDX = 1

# Card pixel bounding boxes and flat background colour, measured directly
# from the original PNG (scripts/../public/.../enzyme-workflow.original.png)
# via connected-component analysis on exact background-colour matches.
CARDS = {
    "Mining":           dict(x0=8,    x1=491,  y0=8,   y1=322, bg=(205, 226, 183)),
    "Cloning":          dict(x0=530,  x1=1014, y0=7,   y1=321, bg=(152, 167, 178)),
    "Expression":       dict(x0=1060, x1=1543, y0=8,   y1=322, bg=(205, 226, 183)),
    "Immobilization":   dict(x0=8,    x1=492,  y0=371, y1=684, bg=(152, 167, 178)),
    "Characterization": dict(x0=534,  x1=1017, y0=371, y1=684, bg=(205, 226, 183)),
    "Purification":     dict(x0=1063, x1=1546, y0=371, y1=684, bg=(152, 167, 178)),
}

# (title, subtitle, title-band abs y-range, subtitle-band abs y-range) —
# the y-ranges are where the original's near-black pixels were found,
# padded by a few px for anti-aliasing when erased.
TEXT = {
    "Mining":           ("1. Mining",           "EnzymeMiner + BRENDA + UniProt",     (41, 71),   (272, 297)),
    "Cloning":          ("2. Cloning",          "3D modelling + vector choosing",     (39, 70),   (272, 298)),
    "Expression":       ("3. Expression",       "IPTG vs autoinduction + solubility", (41, 71),   (272, 298)),
    "Immobilization":   ("6. Immobilization",   "covalent vs ionic + cross-linking",  (398, 423), (637, 663)),
    "Characterization": ("5. Characterization", "activity + concentration",           (399, 424), (639, 664)),
    "Purification":     ("4. Purification",     "IMAC on Ni-NTA column",              (398, 423), (637, 657)),
}


def erase_text(arr, black_mask, card, y0, y1, pad=4):
    x0, x1 = card["x0"], card["x1"]
    region = black_mask[y0 - pad:y1 + pad + 1, x0:x1 + 1]
    region = ndimage.binary_dilation(region, iterations=3)
    sub = arr[y0 - pad:y1 + pad + 1, x0:x1 + 1]
    sub[region] = card["bg"]
    arr[y0 - pad:y1 + pad + 1, x0:x1 + 1] = sub


def fit_font_size(text, target_h, index, max_size=200):
    lo, hi, best = 4, max_size, 4
    while lo <= hi:
        mid = (lo + hi) // 2
        bbox = ImageFont.truetype(FONT_PATH, mid, index=index).getbbox(text)
        if bbox[3] - bbox[1] <= target_h:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return best


def main():
    im = Image.open(SRC).convert("RGB")
    arr = np.array(im).astype(int)
    black_mask = np.all(arr <= 80, axis=2)

    for name, card in CARDS.items():
        _, _, tband, sband = TEXT[name]
        erase_text(arr, black_mask, card, *tband)
        erase_text(arr, black_mask, card, *sband)

    erased = Image.fromarray(arr.astype("uint8"), "RGB")
    big = erased.resize((erased.width * SCALE, erased.height * SCALE), Image.LANCZOS)
    draw = ImageDraw.Draw(big)

    for name, card in CARDS.items():
        title, subtitle, tband, sband = TEXT[name]
        cx = (card["x0"] + card["x1"]) / 2 * SCALE
        for text, (by0, by1), index in [(title, tband, BOLD_IDX), (subtitle, sband, REGULAR_IDX)]:
            target_h = (by1 - by0) * SCALE
            size = fit_font_size(text, target_h, index)
            font = ImageFont.truetype(FONT_PATH, size, index=index)
            bbox = font.getbbox(text)
            w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
            cy = (by0 + by1) / 2 * SCALE
            x = cx - w / 2 - bbox[0]
            y = cy - h / 2 - bbox[1]
            draw.text((x, y), text, font=font, fill=(0, 0, 0))

    big.resize((erased.width, erased.height), Image.LANCZOS).save(OUT)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
