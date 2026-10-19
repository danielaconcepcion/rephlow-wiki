import { useLayoutEffect, useRef, useState } from "react";

/**
 * Adaptive folder-tab silhouette, reproduced from the Figma reference (a
 * flat-topped trapezoid with soft bezier-curved shoulders):
 *
 *   <svg width="1180" height="116" viewBox="0 0 1180 116" ...>
 *     <path d="M172.665 0C186.505 0 193.483 14.0361 199.5 26.5C206.5
 *       40.9998 220.19 41 227 41H1180V115.5H0V41H7.23535C13.5862 41
 *       17.8326 37.9997 25.1104 26C27.1171 22.6912 28.9114 19.1649
 *       30.4512 15.8115C34.6624 6.64038 43.4863 5.38156e-05 53.5781
 *       0H172.665Z" fill="#DED8E9"/>
 *   </svg>
 *
 * The technical requirement is that this has to stretch to fit labels of
 * very different lengths ("FTIR" vs. "Concentration/drop height") without
 * the curved shoulders themselves stretching or flattening out. A plain
 * `<svg viewBox="0 0 W H">` scaled non-uniformly (`preserveAspectRatio=
 * "none"`) would do exactly that — squash the bezier curves sideways the
 * wider the label gets.
 *
 * The fix: the shoulder geometry is never scaled by width at all. Each
 * shoulder is the reference path's own curve, anchored at a fixed offset
 * from its own edge (left shoulder from x=0, right shoulder from x=width)
 * and scaled only by height (so the two curves stay proportional between
 * the tab's inactive/active states, which do differ in height). Only the
 * flat top-and-bottom run *between* the two shoulders — where the label
 * sits — grows or shrinks with the tab's actual rendered width. The
 * result: identical, undistorted curves at both ends, at any label length.
 *
 * Width is measured live (ResizeObserver on the tab button itself, the
 * shape's positioned parent) rather than assumed, since the button's
 * width is intrinsic to its own padding + label text and can also change
 * on font load or viewport resize.
 */

// Reference geometry from the Figma path above, at its own reference
// height (41px — the vertical span of one shoulder, apex to baseline).
const REF_H = 41;
const LEFT_SHOULDER_W = 53.5781;
const RIGHT_SHOULDER_W = 54.335;

function buildTabPath(width: number, height: number): string {
  const s = height / REF_H;
  const leftW = LEFT_SHOULDER_W * s;
  const rightW = RIGHT_SHOULDER_W * s;
  const midEnd = Math.max(leftW, width - rightW);
  const H = height;
  return [
    `M ${leftW} 0`,
    `H ${midEnd}`,
    `C ${midEnd + 13.84 * s} 0 ${midEnd + 20.818 * s} ${14.0361 * s} ${midEnd + 26.835 * s} ${26.5 * s}`,
    `C ${midEnd + 33.835 * s} ${40.9998 * s} ${midEnd + 47.525 * s} ${H} ${midEnd + 54.335 * s} ${H}`,
    `L 0 ${H}`,
    `H ${7.23535 * s}`,
    `C ${13.5862 * s} ${H} ${17.8326 * s} ${H - 3.0003 * s} ${25.1104 * s} ${H - 15 * s}`,
    `C ${27.1171 * s} ${H - 18.3088 * s} ${28.9114 * s} ${H - 21.8351 * s} ${30.4512 * s} ${H - 25.1885 * s}`,
    `C ${34.6624 * s} ${H - 34.35962 * s} ${43.4863 * s} ${H - 40.9999462 * s} ${leftW} 0`,
    "Z",
  ].join(" ");
}

export function FolderTabShape({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState({ width: 160, height: REF_H });

  useLayoutEffect(() => {
    const parent = svgRef.current?.parentElement;
    if (!parent) return;
    const update = () => setSize({ width: parent.clientWidth, height: parent.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      width="100%"
      height="100%"
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={buildTabPath(size.width, size.height)} />
    </svg>
  );
}
