import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BlockId } from "./blocks";

const BLUR_GRACE_MS = 60;
const NARROW_BREAKPOINT_PX = 720;

export function useVisualIndex() {
  const [hoveredId, setHoveredId] = useState<BlockId | null>(null);
  const [focusedId, setFocusedId] = useState<BlockId | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTouch = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches,
    [],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width !== undefined) setIsNarrow(width < NARROW_BREAKPOINT_PX);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeId = hoveredId ?? focusedId;

  const onEnter = useCallback((id: BlockId) => setHoveredId(id), []);
  const onLeaveIllustration = useCallback(() => {
    if (!isTouch) setHoveredId(null);
  }, [isTouch]);

  const onFocus = useCallback((id: BlockId) => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    setFocusedId(id);
  }, []);

  const onBlur = useCallback((id: BlockId) => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    blurTimer.current = setTimeout(() => {
      setFocusedId((current) => (current === id ? null : current));
    }, BLUR_GRACE_MS);
  }, []);

  useEffect(
    () => () => {
      if (blurTimer.current) clearTimeout(blurTimer.current);
    },
    [],
  );

  /** Shared by hitboxes and labels. Touch: first tap on a block activates it;
   * a second tap (or the card's own "Read more") navigates. Desktop: click
   * navigates immediately. */
  const handleBlockClick = useCallback(
    (id: BlockId, sectionId: string) => {
      if (isTouch && activeId !== id) {
        setHoveredId(id);
        return;
      }
      window.location.hash = "#" + sectionId;
    },
    [isTouch, activeId],
  );

  return {
    activeId,
    isTouch,
    isNarrow,
    containerRef,
    onEnter,
    onLeaveIllustration,
    onFocus,
    onBlur,
    handleBlockClick,
  };
}
