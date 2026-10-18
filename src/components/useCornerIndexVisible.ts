import { useEffect, useState, type RefObject } from "react";

/**
 * The visibility gate every page wires its EcosystemMapMini to, in one
 * place rather than re-derived per page: the corner sphere appears once
 * `after` has scrolled above the viewport — i.e. the page's own full-size
 * EcosystemMap is no longer on screen, so the two can never show the same
 * block at once — and stays out of the way from `until` onwards, which is
 * the point where a footer nav becomes the thing to look at and the corner
 * would only sit on top of it.
 *
 * `after` wants the element directly below the full map (its divider on
 * Engineering, the block-pill row on the lab pages): `top < 0` on *that*
 * element is what actually means "the map is behind us", where a plain
 * "the map is not on screen" would also be true before the page has been
 * scrolled at all. `until` wants a bare sentinel sitting just above the
 * footer nav it gates (.ecosystem-map-mini-sentinel) — omit it on a page
 * with nothing down there to step aside for.
 *
 * `resetKey` is whatever identifies the block on screen: on some of these
 * pages both landmarks are fresh DOM nodes after a block switch, so the
 * measurement is re-taken against the new ones.
 *
 * Positions are read on scroll (rAF-throttled) rather than watched with an
 * IntersectionObserver, for the same reason PageSectionNav reads its own —
 * an observer only fires when an element *crosses* the viewport edge, so
 * any jump that skips a landmark entirely (a hash link, a restored scroll
 * position, one of the section nav's own scrollIntoView calls, a fast
 * fling) leaves it reporting a stale answer. Measurements is the page that
 * showed it: it opens with prose above its map, so the pill row starts
 * below the fold, and a jump past it never crossed anything.
 */
export function useCornerIndexVisible({
  after,
  until,
  resetKey,
}: {
  after: RefObject<Element | null>;
  until?: RefObject<Element | null>;
  resetKey?: unknown;
}): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const read = () => {
      const anchor = after.current;
      if (!anchor) {
        setVisible(false);
        return;
      }
      const pastIndex = anchor.getBoundingClientRect().top < 0;
      const end = until?.current;
      const reachedEnd = end
        ? end.getBoundingClientRect().top <= window.innerHeight
        : false;
      setVisible(pastIndex && !reachedEnd);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [after, until, resetKey]);

  return visible;
}
