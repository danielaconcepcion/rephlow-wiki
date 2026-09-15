#!/usr/bin/env python3
"""
Builds Figure 3 (Project Description, "Engineered phosphorus-accumulation
pathway in P. putida KT2440") as a TRUE vector SVG: every box, arrow,
membrane segment, icon and legend swatch is its own SVG shape element, and
every label is a real <text> element (selectable/editable in any vector
editor or in the DOM), not a rasterised image.

This is a from-scratch redraw, not a pixel trace: box positions/sizes, the
colour-coded strategy scheme (green = Strategy 2 / heterologous expression,
red = Strategy 1 / knockout, indigo = polyP, black = neutral), arrow
topology/direction, and all text content/position/hierarchy were measured
directly off the original PNG (public/assets/project-description/
engineered-phosphorus-pathway.original.png) using the same box/text
coordinates already verified for rebuild-phosphorus-pathway-figure.py's
raster patch (see that script + conversation history for the measurement
method). Small decorative icon details -- the exact phospholipid tail
wiggle, the star's spike count, an oval's precise curvature -- are redrawn
as clean equivalent vector shapes at the same position/size/colour rather
than traced point-by-point; those are stylistic rendering choices in the
original, not scientific content.

Output: public/assets/project-description/engineered-phosphorus-pathway.svg.
The existing .png (produced by rebuild-phosphorus-pathway-figure.py, which
sits alongside this script) is left untouched and kept as the web fallback
/ non-vector reference -- this script does not replace it, it adds the
true vector source the PNG-patch approach could never provide.

Run from the repo root: python3 scripts/build-phosphorus-pathway-svg.py
"""

from pathlib import Path

OUT = Path("/Users/danielaconcepcion/madrid-ucm/public/assets/project-description/engineered-phosphorus-pathway.svg")

FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"

RED = "#910C12"
GREEN = "#235319"
PURPLE = "#25147A"
INK = "#1B2340"
BLACK = "#1a1a1a"

PINK_FILL = "#FEF2F1"
PINK_BORDER = "#D97D7D"
GREEN_FILL = "#F4FAEE"
GREEN_BORDER = "#8FB876"
LAV_FILL = "#EEEDFD"
LAV_BORDER = "#A79EE0"

PI_FILL = "#8FCB7E"
PI_BORDER = "#4C8C3C"
P_FILL = "#C4BEEA"
P_BORDER = "#6659B0"
ATP_FILL = "#FBE38A"
ATP_BORDER = "#DFA93C"
ADP_FILL = "#E8DCC3"
ADP_BORDER = "#B99A63"
NXP_FILL = "#A8D0F0"
NXP_BORDER = "#4A90D9"
MEMBRANE_HEAD_FILL = "#E8D4B0"
MEMBRANE_HEAD_BORDER = "#C9A96E"
MEMBRANE_TAIL = "#D8BE8E"
PST_SUBUNIT_FILL = "#A8CB9B"
PST_SUBUNIT_BORDER = "#5C8A50"

svg_parts = []


def add(s):
    svg_parts.append(s)


def rrect(x, y, w, h, r, fill, stroke, sw=1.6, extra=""):
    add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" ry="{r}" '
        f'fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')


def ellipse(cx, cy, rx, ry, fill, stroke, sw=1.6):
    add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" '
        f'stroke="{stroke}" stroke-width="{sw}"/>')


def circle(cx, cy, r, fill, stroke, sw=1.3):
    add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')


def text(x, y, s, color, size, weight="normal", anchor="middle", italic=False,
          family=FONT):
    style = f'font-style="italic" ' if italic else ""
    add(f'<text x="{x}" y="{y}" text-anchor="{anchor}" dominant-baseline="middle" '
        f'font-family="{family}" font-size="{size}" font-weight="{weight}" '
        f'{style}fill="{color}">{s}</text>')


def line(x1, y1, x2, y2, color, sw=1.6, dash=None, marker=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    m = f' marker-end="url(#{marker})"' if marker else ""
    add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" '
        f'stroke-width="{sw}"{d}{m} stroke-linecap="round"/>')


def path(d, stroke, sw=1.6, fill="none", dash=None, marker=None, cap="round"):
    dd = f' stroke-dasharray="{dash}"' if dash else ""
    m = f' marker-end="url(#{marker})"' if marker else ""
    add(f'<path d="{d}" stroke="{stroke}" stroke-width="{sw}" fill="{fill}"'
        f' stroke-linecap="{cap}"{dd}{m}/>')


def p_chain(x0, y, n, sub, fill=P_FILL, border=P_BORDER, r=8, gap=18, arrow_after=False,
            label_color=INK):
    """A row of n phosphate 'P' circles joined by short connectors, ending
    in a subscript (n / n+1 / n-1)."""
    cx = x0
    for i in range(n):
        if i > 0:
            line(cx - gap + r + 2, y, cx - r - 2, y, border, sw=1.3)
        circle(cx, y, r, fill, border)
        text(cx, y + 0.5, "P", label_color, 9, weight="bold")
        cx += gap
    text(cx - gap + r + 3, y + r - 1, sub, INK, 7.5)
    return cx - gap  # x of last circle center


def star(cx, cy, r_out, r_in, points, fill, stroke):
    import math
    pts = []
    for i in range(points * 2):
        r = r_out if i % 2 == 0 else r_in
        a = math.pi / points * i - math.pi / 2
        pts.append(f"{cx + r*math.cos(a):.1f},{cy + r*math.sin(a):.1f}")
    add(f'<polygon points="{" ".join(pts)}" fill="{fill}" stroke="{stroke}" '
        f'stroke-width="1.3" stroke-linejoin="round"/>')


def diamond(cx, cy, w, h, fill, stroke):
    add(f'<polygon points="{cx-w/2},{cy} {cx-w/4},{cy-h/2} {cx+w/4},{cy-h/2} '
        f'{cx+w/2},{cy} {cx+w/4},{cy+h/2} {cx-w/4},{cy+h/2}" '
        f'fill="{fill}" stroke="{stroke}" stroke-width="1.3" stroke-linejoin="round"/>')


# ---------------------------------------------------------------------------
add('<svg viewBox="0 0 800 595" xmlns="http://www.w3.org/2000/svg" role="img" '
    'aria-label="Engineered phosphate uptake and polyphosphate storage pathway in Pseudomonas putida">')
add('<title>Engineered phosphorus-accumulation pathway in P. putida KT2440</title>')

# Markers (arrowheads)
add('<defs>')
for mid, col in [("arrow-black", BLACK), ("arrow-green", GREEN), ("arrow-red", RED)]:
    add(f'<marker id="{mid}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" '
        f'markerHeight="7" orient="auto-start-reverse">'
        f'<path d="M0,0 L10,5 L0,10 Z" fill="{col}"/></marker>')
add('</defs>')

# ===== Cytoplasm dashed boundary =====
rrect(28, 140, 746, 398, 14, "none", "#B9BDC7", sw=1.4, extra='stroke-dasharray="4 4"')
text(44, 166, "cytoplasm", INK, 13, anchor="start")

# ===== Membrane bilayer (repeating vector motif, x=27..774, y=91..140) =====
add('<g id="membrane">')
mem_y_top, mem_y_bot, mem_x0, mem_x1 = 97, 134, 27, 774
step = 15
x = mem_x0 + step / 2
while x < mem_x1:
    circle(x, mem_y_top, 5.5, MEMBRANE_HEAD_FILL, MEMBRANE_HEAD_BORDER, sw=1)
    circle(x, mem_y_bot, 5.5, MEMBRANE_HEAD_FILL, MEMBRANE_HEAD_BORDER, sw=1)
    line(x - 2, mem_y_top + 5, x - 2, mem_y_bot - 5, MEMBRANE_TAIL, sw=1)
    line(x + 2, mem_y_top + 5, x + 2, mem_y_bot - 5, MEMBRANE_TAIL, sw=1)
    x += step
add('</g>')
text(400, 118, "cell membrane", INK, 13.5)

# ===== Top annotation =====
for i, cx in enumerate([227, 240, 253]):
    circle(cx, 20, 5, "#3FB58A", "none")
text(280, 20, "Pi (phosphate) available in the medium", INK, 13.5, anchor="start")

# ===== Pit box =====
add('<g id="pit-module">')
rrect(130, 51, 161, 150, 11, PINK_FILL, PINK_BORDER)
text(178, 81, "Pit", RED, 17, weight="bold")
text(184, 98, "low-affinity", RED, 11.5)
text(174, 111, "phosphate", RED, 11.5)
text(175, 126, "transporter", RED, 11.5)
# transporter channel (two barrels)
rrect(226, 90, 16, 52, 5, "#C97B7E", "#8E4A4D", sw=1)
rrect(244, 90, 16, 52, 5, "#C97B7E", "#8E4A4D", sw=1)
line(234, 116, 254, 116, "#8E4A4D", sw=0.8, dash="2 2")
path("M240,88 L240,64", BLACK, sw=1.4, marker="arrow-black")
path("M240,142 L240,166", BLACK, sw=1.4, marker="arrow-black")
circle(236, 70, 9, PI_FILL, PI_BORDER); text(236, 70.5, "Pi", INK, 8, weight="bold")
circle(260, 78, 9, PI_FILL, PI_BORDER); text(260, 78.5, "Pi", INK, 8, weight="bold")
circle(212, 176, 9, PI_FILL, PI_BORDER); text(212, 176.5, "Pi", INK, 8, weight="bold")
circle(240, 184, 9, PI_FILL, PI_BORDER); text(240, 184.5, "Pi", INK, 8, weight="bold")
circle(264, 174, 9, PI_FILL, PI_BORDER); text(264, 174.5, "Pi", INK, 8, weight="bold")
add('</g>')

# ===== Pst box =====
add('<g id="pst-module">')
rrect(508, 40, 202, 186, 11, GREEN_FILL, GREEN_BORDER)
text(593, 54, "PstS", GREEN, 14.5, weight="bold")
text(670, 71.5, "Pst (SCAB)", GREEN, 14.5, weight="bold")
text(670, 87.5, "high-affinity", GREEN, 11.5)
text(670, 102, "phosphate", GREEN, 11.5)
text(670, 116.5, "import", GREEN, 11.5)
circle(588, 76, 9, PI_FILL, PI_BORDER); text(588, 76.5, "Pi", INK, 8, weight="bold")
path("M588,85 C588,96 584,96 584,100", GREEN_BORDER, sw=1.3, dash="2 2", marker="arrow-green")
rrect(542, 100, 42, 44, 6, PST_SUBUNIT_FILL, PST_SUBUNIT_BORDER, sw=1)
rrect(584, 100, 42, 44, 6, PST_SUBUNIT_FILL, PST_SUBUNIT_BORDER, sw=1)
text(561, 122, "PstC", INK, 8.5, weight="bold")
text(607, 122, "PstA", INK, 8.5, weight="bold")
line(584, 100, 584, 144, "#3A3A3A", sw=1, dash="2 2")
path("M588,145 L588,160", BLACK, sw=1.4, marker="arrow-black")
ellipse(588, 172, 26, 12, PST_SUBUNIT_FILL, PST_SUBUNIT_BORDER)
text(588, 172.5, "PstB", INK, 8.5, weight="bold")
path("M588,185 L588,206", BLACK, sw=1.4, marker="arrow-black")
star(532, 192, 15, 8, 7, ATP_FILL, ATP_BORDER)
text(532, 192.5, "ATP", INK, 8.5, weight="bold")
line(548, 192, 570, 192, BLACK, sw=1.4, marker="arrow-black")
ellipse(650, 192, 22, 11, ADP_FILL, ADP_BORDER)
text(650, 192.5, "ADP", INK, 8.5, weight="bold")
text(624, 192.5, "+", INK, 12)
circle(680, 192, 9, PI_FILL, PI_BORDER); text(680, 192.5, "Pi", INK, 8, weight="bold")
circle(588, 220, 9, PI_FILL, PI_BORDER); text(588, 220.5, "Pi", INK, 8, weight="bold")
add('</g>')

# ===== PPK1 box =====
add('<g id="ppk1-module">')
rrect(40, 276, 170, 120, 11, GREEN_FILL, GREEN_BORDER)
text(125, 293, "PPK1", GREEN, 15, weight="bold")
text(125, 309, "synthesizes polyP", GREEN, 11.5)
star(90, 330, 14, 7.5, 7, ATP_FILL, ATP_BORDER)
text(90, 330.5, "ATP", INK, 8, weight="bold")
path("M104,325 C120,318 132,318 148,325", BLACK, sw=1.3, marker="arrow-black")
ellipse(163, 330, 20, 10, ADP_FILL, ADP_BORDER)
text(163, 330.5, "ADP", INK, 8, weight="bold")
path("M120,340 L120,355", BLACK, sw=1.2, marker="arrow-black")
p_chain(58, 368, 3, "n")
line(120, 368, 138, 368, BLACK, sw=1.4, marker="arrow-black")
p_chain(148, 368, 4, "n+1")
add('</g>')

# ===== polyP oval =====
add('<g id="polyp-module">')
ellipse(386, 336, 94, 54, LAV_FILL, LAV_BORDER)
text(386, 299, "polyP", PURPLE, 16, weight="bold")
text(386, 316, "phosphate reserve", PURPLE, 11.5)
p_chain(322, 352, 5, "n", fill="#C4BEEA", border=P_BORDER)
add('</g>')

# ===== PPX box =====
add('<g id="ppx-module">')
rrect(580, 274, 170, 120, 11, PINK_FILL, PINK_BORDER)
text(663, 293, "PPX", RED, 15, weight="bold")
text(663, 310, "degrades polyP", RED, 11.5)
p_chain(600, 352, 4, "n")
path("M636,362 C636,375 650,375 656,378", BLACK, sw=1.3, marker="arrow-black")
p_chain(666, 380, 3, "n-1")
text(726, 380.5, "+", INK, 11)
circle(742, 380, 8, PI_FILL, PI_BORDER); text(742, 380.5, "Pi", INK, 7.5, weight="bold")
add('</g>')

# ===== PPK2 box =====
add('<g id="ppk2-module">')
rrect(248, 438, 262, 72, 11, PINK_FILL, PINK_BORDER)
text(383, 453, "PPK2", RED, 15, weight="bold")
text(383, 469.5, "consumes polyP", RED, 11.5)
last_x = p_chain(266, 495, 4, "n")
text(340, 495.5, "+", INK, 11)
diamond(360, 495, 34, 20, NXP_FILL, NXP_BORDER)
text(360, 495.5, "NDP", INK, 8, weight="bold")
line(379, 495, 405, 495, BLACK, sw=1.3, marker="arrow-black")
diamond(422, 495, 34, 20, NXP_FILL, NXP_BORDER)
text(422, 495.5, "NTP", INK, 8, weight="bold")
text(446, 495.5, "+", INK, 11)
p_chain(462, 495, 4, "n+1")
add('</g>')

# ===== Connecting arrows between modules =====
# Pst -> polyP (green, curved)
path("M598,232 C598,255 500,255 468,285", GREEN, sw=2.6, marker="arrow-green")
# PPK1 -> polyP (green, straight)
line(212, 336, 288, 336, GREEN, sw=2.6, marker="arrow-green")
# polyP -> PPX (red, dashed with X mark)
line(482, 316, 515, 316, RED, sw=2.2, marker="arrow-red")
text(526, 317, "✕", RED, 15, weight="bold")
line(538, 316, 576, 316, RED, sw=2.2, marker="arrow-red")
# polyP -> PPK2 (red, dashed with X mark)
line(383, 392, 383, 405, RED, sw=2.2, dash="4 3")
text(383, 412, "✕", RED, 15, weight="bold")
line(383, 419, 383, 435, RED, sw=2.2, dash="4 3", marker="arrow-red")

# stray artefact dot present in the original (kept for exact fidelity)
circle(712, 438, 2, RED, "none")

# ===== Legend =====
rrect(146, 548, 30, 30, 6, GREEN_FILL, GREEN_BORDER, sw=1.6)
text(185, 555, "Strategy 2 · heterologous expression", BLACK, 12.5, anchor="start")
text(185, 573, "( + , from Ca. Accumulibacter)", BLACK, 11, anchor="start")

rrect(406, 548, 30, 30, 6, PINK_FILL, PINK_BORDER, sw=1.6)
text(446, 555, "Strategy 1 · gene knockout", BLACK, 12.5, anchor="start")
add(f'<text x="446" y="573" text-anchor="start" dominant-baseline="middle" '
    f'font-family="{FONT}" font-size="11" fill="{BLACK}">'
    f'(<tspan fill="{RED}" font-weight="bold">✕</tspan>, endogenous '
    f'<tspan font-style="italic">P. putida</tspan> genes)</text>')

add('</svg>')

OUT.write_text("\n".join(svg_parts), encoding="utf-8")
print("wrote", OUT, f"({len(svg_parts)} elements)")
