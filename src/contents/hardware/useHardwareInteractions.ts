import { useEffect, type RefObject } from "react";

/*
 * Interactive behaviour of the Hardware page content:
 *   - citations [n] open the References fold
 *   - flip cards (.hw-flip)
 *   - process stages + hotspots (Figure 1, [data-steps])
 *   - two-state toggles (Figures 5 and 6, [data-toggle])
 *   - carousels with thumbnails, tabs, groups, keyboard and swipe ([data-carousel])
 *   - opening the <details> that contains an #anchor when it is targeted
 *
 * The content is static JSX that never re-renders, so it is safe to drive these
 * small DOM changes here. Everything is undone on unmount (also in StrictMode).
 */
export function useHardwareInteractions(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const content = rootRef.current;
    if (!content) return undefined;

    const ac = new AbortController();
    const on = (
      el: EventTarget | null,
      type: string,
      fn: (e: Event) => void,
      opts: AddEventListenerOptions = {},
    ) => {
      if (el) el.addEventListener(type, fn, { ...opts, signal: ac.signal });
    };
    const created: HTMLElement[] = [];
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const targetEl = (e: Event) => e.target as Element;

    /* ---------- 1. Citations: clicking [n] opens the reference list ---------- */
    on(
      content,
      "click",
      (e) => {
        if (!targetEl(e).closest(".vsi-citation")) return;
        e.stopPropagation();
        const refs = document.getElementById("ref-accordion") as HTMLDetailsElement | null;
        if (refs) refs.open = true;
      },
      { capture: true },
    );

    /* ---------- 2. Flip cards ---------- */
    content.querySelectorAll<HTMLElement>(".hw-flip").forEach((card) => {
      const flip = () => {
        const isOn = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", String(isOn));
      };
      on(card, "click", (e) => {
        if (!targetEl(e).closest("a")) flip();
      });
      on(card, "keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        if (k === "Enter" || k === " ") {
          e.preventDefault();
          flip();
        }
      });
    });

    /* ---------- 3. Process stages (Figure 1): one open at a time ---------- */
    content.querySelectorAll<HTMLElement>("[data-steps]").forEach((root) => {
      const stages = root.querySelectorAll<HTMLDetailsElement>(".hw-stage");
      const spots = root.querySelectorAll<HTMLElement>(".hw-hotspot");
      const mark = () => {
        let cur = -1;
        stages.forEach((d, k) => {
          if (d.open) cur = k;
        });
        spots.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === cur));
      };
      stages.forEach((d) => {
        on(d, "toggle", () => {
          if (d.open)
            stages.forEach((o) => {
              if (o !== d) o.open = false;
            });
          mark();
        });
      });
      spots.forEach((s) =>
        on(s, "click", () => {
          const stage = stages[Number(s.dataset.step)];
          if (stage) stage.open = true;
        }),
      );
      mark();
    });

    /* ---------- 4. Two-state toggle (Figures 5 and 6) ---------- */
    content.querySelectorAll<HTMLElement>("[data-toggle]").forEach((root) => {
      const btns = root.querySelectorAll<HTMLButtonElement>(".hw-toggle button");
      const panels = root.querySelectorAll<HTMLElement>(".hw-toggle-panel");
      btns.forEach((b, k) => {
        on(b, "click", () => {
          btns.forEach((x, j) => x.setAttribute("aria-pressed", String(j === k)));
          panels.forEach((p, j) => {
            p.hidden = j !== k;
          });
        });
      });
    });

    /* ---------- 5. Carousels ---------- */
    content.querySelectorAll<HTMLElement>("[data-carousel]").forEach((root) => {
      const track = root.querySelector<HTMLElement>(".cp-carousel__track");
      if (!track) return;
      const slides = Array.from(track.children) as HTMLElement[];
      const n = slides.length;
      const prev = root.querySelector<HTMLButtonElement>("[data-prev]");
      const next = root.querySelector<HTMLButtonElement>("[data-next]");
      const counter = root.querySelector<HTMLElement>(".cp-carousel__counter");
      const caption = root.dataset.caption ? document.querySelector<HTMLElement>(root.dataset.caption) : null;
      const thumbs = root.dataset.thumbs ? document.querySelector<HTMLElement>(root.dataset.thumbs) : null;
      const groups = root.dataset.groups ? document.querySelector<HTMLElement>(root.dataset.groups) : null;
      const sib = root.nextElementSibling;
      const tabs =
        sib && sib.matches("[data-carousel-tabs]") ? Array.from(sib.querySelectorAll("button")) : [];
      const thumbBtns: HTMLButtonElement[] = [];
      let cur = 0;

      const go = (i: number) => {
        cur = Math.max(0, Math.min(n - 1, i));
        track.style.transform = `translateX(${-100 * cur}%)`;
        slides.forEach((s, k) => s.setAttribute("aria-hidden", String(k !== cur)));
        if (prev) prev.disabled = cur === 0;
        if (next) next.disabled = cur === n - 1;
        if (counter) counter.textContent = `${cur + 1} of ${n}`;
        if (caption) {
          const fc = slides[cur].querySelector("figcaption");
          caption.innerHTML = fc ? fc.innerHTML : "";
        }
        thumbBtns.forEach((b, k) => {
          b.setAttribute("aria-current", String(k === cur));
          if (k === cur && thumbs) {
            thumbs.scrollTo({
              left: b.offsetLeft - thumbs.clientWidth / 2 + b.clientWidth / 2,
              behavior: reduceMotion ? "auto" : "smooth",
            });
          }
        });
        tabs.forEach((b, k) => b.setAttribute("aria-pressed", String(k === cur)));
        if (groups) {
          const gb = groups.querySelectorAll<HTMLElement>("[data-goto]");
          let activeGroup = 0;
          gb.forEach((b, k) => {
            if (cur >= Number(b.dataset.goto)) activeGroup = k;
          });
          gb.forEach((b, k) => b.setAttribute("aria-pressed", String(k === activeGroup)));
        }
      };

      if (thumbs) {
        slides.forEach((s, k) => {
          const im = s.querySelector("img");
          const b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", `Show figure ${k + 1} of ${n}`);
          const t = document.createElement("img");
          t.src = im?.getAttribute("src") ?? "";
          t.alt = "";
          t.loading = "lazy";
          b.appendChild(t);
          on(b, "click", () => go(k));
          thumbs.appendChild(b);
          thumbBtns.push(b);
          created.push(b);
        });
      }

      on(prev, "click", () => go(cur - 1));
      on(next, "click", () => go(cur + 1));
      tabs.forEach((b, k) => on(b, "click", () => go(k)));
      groups
        ?.querySelectorAll<HTMLElement>("[data-goto]")
        .forEach((b) => on(b, "click", () => go(Number(b.dataset.goto))));

      root.tabIndex = 0;
      on(root, "keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        if (k === "ArrowRight") {
          e.preventDefault();
          go(cur + 1);
        }
        if (k === "ArrowLeft") {
          e.preventDefault();
          go(cur - 1);
        }
      });

      /* swipe on touch screens */
      let x0: number | null = null;
      const view = root.querySelector(".cp-carousel__view");
      on(view, "pointerdown", (e) => {
        const pe = e as PointerEvent;
        if (pe.pointerType !== "mouse") x0 = pe.clientX;
      });
      on(view, "pointerup", (e) => {
        if (x0 === null) return;
        const dx = (e as PointerEvent).clientX - x0;
        x0 = null;
        if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
      });
      go(0);
    });

    /* ---------- 6. Open the fold that contains a targeted #anchor ---------- */
    const openFor = (id: string) => {
      const el = id ? document.getElementById(id) : null;
      for (let node: HTMLElement | null = el; node; node = node.parentElement) {
        if (node instanceof HTMLDetailsElement) node.open = true;
      }
    };
    on(
      document,
      "click",
      (e) => {
        const a = targetEl(e).closest?.('a[href^="#"]');
        if (a) openFor(decodeURIComponent((a.getAttribute("href") ?? "").slice(1)));
      },
      { capture: true },
    );
    on(window, "hashchange", () => openFor(decodeURIComponent(window.location.hash.slice(1))));
    if (window.location.hash) openFor(decodeURIComponent(window.location.hash.slice(1)));

    return () => {
      ac.abort();
      created.forEach((el) => el.remove());
    };
  }, [rootRef]);
}
