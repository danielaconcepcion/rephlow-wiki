/* --------------------------------------------------------------------------
   Measurements: the page's behaviour.

   The page itself is the approved static markup (markup.ts). This module
   wires it up: the block pills and the glass spheres pick a measurement
   area, the folder tabs and the lateral index pick a technique within it,
   a citation opens the reference list it points into, and the corner index
   appears once the big map has scrolled away.

   initMeasurements() returns a cleanup function, so the page can be
   mounted and unmounted by the wiki's router without leaving listeners
   behind.
   -------------------------------------------------------------------------- */

const FAN: [number, number][] = [
  [-9, -121],
  [-88, -88],
  [-121, -9],
];

export function initMeasurements(root: HTMLElement): () => void {
  const all = <T extends Element = HTMLElement>(
    selector: string,
    from: ParentNode = root,
  ) => Array.from(from.querySelectorAll<T>(selector));

  const blocks = all(".sa-block");
  const order = blocks.map((block) => block.dataset.block ?? "");
  const pills = all(".lab-folders__menu .section-tabs__btn");
  const slots = all(".ecosystem-map .ecosystem-map__slot");
  const minis = all(".ecosystem-map-mini");

  function paintSphere(slot: HTMLElement, on: boolean) {
    const sphere = slot.querySelector<HTMLElement>(".ecosystem-map__sphere");
    const glow = slot.querySelector<HTMLElement>(".ecosystem-map__glow");
    const fill = slot.querySelector<HTMLElement>(".ecosystem-map__fill");
    const title = slot.querySelector<HTMLElement>(".ecosystem-map__title");
    if (!sphere) return;
    sphere.setAttribute("aria-pressed", on ? "true" : "false");
    sphere.style.transform = on ? "scale(1.2)" : "scale(0.88)";
    sphere.style.opacity = on ? "1" : "0.45";
    if (glow) glow.style.opacity = on ? "1" : "0";
    if (fill) fill.style.opacity = on ? "1" : "0";
    if (title) {
      title.style.fontSize = on ? "20px" : "12px";
      title.style.fontWeight = on ? "700" : "600";
      title.style.opacity = on ? "1" : "0.25";
    }
  }

  /* Scroll-spy over the open technique's sections: whichever section sits
     in a thin band below the floating navbar is the current one. */
  let observer: IntersectionObserver | null = null;

  function markSub(link: HTMLElement) {
    const list = link.closest(".page-section-nav__sublist");
    if (!list) return;
    all(".page-section-nav__link--sub", list).forEach((anchor) => {
      const on = anchor === link;
      anchor.classList.toggle("is-active", on);
      if (on) anchor.setAttribute("aria-current", "true");
      else anchor.removeAttribute("aria-current");
    });
  }

  function observeSections(block: HTMLElement) {
    observer?.disconnect();
    observer = null;
    const variant = block.querySelector(".sa-variant:not([hidden])");
    const nav = block.querySelector(".sa-nav:not([hidden])");
    const sublist = nav?.querySelector(".page-section-nav__sublist");
    if (!variant || !sublist) return;
    const links: Record<string, HTMLElement> = {};
    all(".page-section-nav__link--sub", sublist).forEach((anchor) => {
      links[(anchor.getAttribute("href") ?? "").slice(1)] = anchor;
    });
    const targets = Object.keys(links)
      .map((id) => variant.querySelector("#" + CSS.escape(id)))
      .filter((el): el is Element => el !== null);
    if (!targets.length) return;
    const offset =
      parseFloat(
        getComputedStyle(root).getPropertyValue("--section-nav-offset"),
      ) || 110;
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        const link = links[top.target.id];
        if (link) markSub(link);
      },
      { rootMargin: `-${offset}px 0px -70% 0px`, threshold: 0 },
    );
    targets.forEach((el) => observer?.observe(el));
  }

  function showTechnique(blockId: string, index: number) {
    const block = blocks.find((b) => b.dataset.block === blockId);
    if (!block) return;
    all(".sa-variant", block).forEach((variant) => {
      variant.hidden = Number(variant.dataset.index) !== index;
    });
    all(".sa-nav", block).forEach((nav) => {
      nav.hidden = Number(nav.dataset.index) !== index;
    });
    observeSections(block);
  }

  function showBlock(id: string) {
    const index = order.indexOf(id);
    blocks.forEach((block) => {
      block.hidden = block.dataset.block !== id;
    });
    all(".sa-mini").forEach((mini) => {
      mini.hidden = mini.dataset.block !== id;
    });
    pills.forEach((pill, i) => {
      const on = i === index;
      pill.classList.toggle("is-active", on);
      pill.setAttribute("aria-selected", on ? "true" : "false");
    });
    slots.forEach((slot, i) => paintSphere(slot, i === index));
    showTechnique(id, 0);
  }

  /* Each variant carries the block's whole tab row, so a tab id cannot be
     looked up by searching the variants: the variant that holds that
     technique's card is tagged instead. */
  function techniqueIndex(block: HTMLElement, techId: string) {
    const match = block.querySelector<HTMLElement>(
      `.sa-variant[data-tech="${techId}"]`,
    );
    return match ? Number(match.dataset.index) : -1;
  }

  /* The corner index: shown once the full map has scrolled past, expanded
     on hover or click, fanning the other blocks out around the current one. */
  function setMini(mini: HTMLElement, open: boolean) {
    mini.classList.toggle("is-expanded", open);
    const active = mini.querySelector(".ecosystem-map-mini__sphere--active");
    active?.setAttribute("aria-expanded", open ? "true" : "false");
    all(".ecosystem-map-mini__sphere--other", mini).forEach((sphere, i) => {
      const [dx, dy] = FAN[i] ?? [0, 0];
      sphere.style.transitionDelay = open ? `${i * 40}ms` : "0ms";
      sphere.style.transform = open
        ? `translate(${dx}px, ${dy}px) scale(1)`
        : "translate(0px, 0px) scale(0.4)";
      sphere.style.opacity = open ? "1" : "0";
      sphere.style.pointerEvents = open ? "auto" : "none";
      sphere.tabIndex = open ? 0 : -1;
    });
  }

  const mapEnd = root.querySelector(".ecosystem-map");
  function paintMini() {
    if (!mapEnd) return;
    const past = mapEnd.getBoundingClientRect().bottom < 0;
    minis.forEach((mini) => mini.classList.toggle("is-visible", past));
  }

  function onClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    // Block pills and the big map's spheres.
    const pill = target.closest<HTMLElement>(".section-tabs__btn");
    if (pill && pills.includes(pill)) {
      showBlock(order[pills.indexOf(pill)]);
      return;
    }
    const sphere = target.closest(".ecosystem-map__sphere");
    if (sphere) {
      const slot = sphere.closest<HTMLElement>(".ecosystem-map__slot");
      if (slot && slots.includes(slot)) {
        showBlock(order[slots.indexOf(slot)]);
        return;
      }
    }

    // The corner index: its current sphere toggles the fan, the others
    // switch block.
    const miniSphere = target.closest<HTMLElement>(
      ".ecosystem-map-mini__sphere",
    );
    if (miniSphere) {
      const mini = miniSphere.closest<HTMLElement>(".ecosystem-map-mini");
      if (miniSphere.classList.contains("ecosystem-map-mini__sphere--active")) {
        if (mini) setMini(mini, !mini.classList.contains("is-expanded"));
        return;
      }
      const label = (miniSphere.getAttribute("aria-label") ?? "").trim();
      const index = pills.findIndex(
        (p) => label !== "" && (p.textContent ?? "").trim() === label,
      );
      if (index >= 0) {
        minis.forEach((m) => setMini(m, false));
        showBlock(order[index]);
      }
      return;
    }

    // A folder tab: switch to that technique inside its block.
    const tab = target.closest<HTMLElement>(".folder-tab");
    if (tab && tab.id) {
      const holder = tab.closest<HTMLElement>(".sa-block");
      if (holder) {
        const index = techniqueIndex(holder, tab.id.replace("folder-tab-", ""));
        if (index >= 0) {
          showTechnique(holder.dataset.block ?? "", index);
          return;
        }
      }
    }

    // The lateral index: nested entries are real sections (open + scroll),
    // top-level entries are techniques.
    const sub = target.closest<HTMLElement>(".page-section-nav__link--sub");
    if (sub) {
      event.preventDefault();
      const dest = root.querySelector(sub.getAttribute("href") ?? "");
      if (dest) {
        if (dest instanceof HTMLDetailsElement) dest.open = true;
        dest.scrollIntoView({ behavior: "smooth", block: "start" });
        markSub(sub);
      }
      return;
    }
    const link = target.closest<HTMLElement>(".page-section-nav__link");
    if (link) {
      event.preventDefault();
      const block = link.closest<HTMLElement>(".sa-block");
      const list = link.closest(".page-section-nav__list");
      if (block && list) {
        const tops = all(":scope > li > .page-section-nav__link", list);
        showTechnique(block.dataset.block ?? "", tops.indexOf(link));
      }
      return;
    }
    if (target.closest(".page-section-nav__top")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // A citation points into a reference list that may sit in a closed
    // <details>: open every fold on the way, then scroll to it.
    const cite = target.closest<HTMLAnchorElement>("a.lab-citation");
    if (cite) {
      const href = cite.getAttribute("href") ?? "";
      const dest = href.startsWith("#")
        ? root.querySelector(`#${CSS.escape(href.slice(1))}`)
        : null;
      if (dest) {
        event.preventDefault();
        let node: Element | null = dest;
        while (node && node !== root) {
          if (node instanceof HTMLDetailsElement) node.open = true;
          node = node.parentElement;
        }
        dest.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  const miniCleanups: (() => void)[] = [];
  minis.forEach((mini) => {
    setMini(mini, false);
    const enter = () => setMini(mini, true);
    const leave = () => setMini(mini, false);
    const focusOut = (event: FocusEvent) => {
      if (!mini.contains(event.relatedTarget as Node | null))
        setMini(mini, false);
    };
    mini.addEventListener("mouseenter", enter);
    mini.addEventListener("mouseleave", leave);
    mini.addEventListener("focusout", focusOut);
    miniCleanups.push(() => {
      mini.removeEventListener("mouseenter", enter);
      mini.removeEventListener("mouseleave", leave);
      mini.removeEventListener("focusout", focusOut);
    });
  });

  root.addEventListener("click", onClick);
  window.addEventListener("scroll", paintMini, { passive: true });
  window.addEventListener("resize", paintMini);
  paintMini();

  blocks.forEach((block) => showTechnique(block.dataset.block ?? "", 0));
  if (order.length) showBlock(order[0]);

  return () => {
    root.removeEventListener("click", onClick);
    window.removeEventListener("scroll", paintMini);
    window.removeEventListener("resize", paintMini);
    miniCleanups.forEach((cleanup) => cleanup());
    observer?.disconnect();
  };
}
