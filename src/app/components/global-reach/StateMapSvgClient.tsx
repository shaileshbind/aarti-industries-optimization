"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const SVG_URL = "/maps/state-map.svg";
const REGION_ORDER = ["bhachau", "dahej", "jhagadia", "tarapur", "navi-mumbai", "vapi"] as const;
const PARENT_ACTIVE_TO_OUR_INDEX = [0, 1, 3, 5, 4, 2] as const;
const MANUFACTURING_FILL = { outer: "#F9C095", inner: "#F36633" };
const RND_FILL = { outer: "#9FB5C3", inner: "#002F50" };
const BLIP_OPACITY_ACTIVE = "1";
const BLIP_OPACITY_INACTIVE = "0.4";
const VAPI_CENTER = { x: 278.79, y: 218.663 };
const NAVI_MUMBAI_CENTER = { x: 293.761, y: 377.91 };

export interface StateMapSvgClientProps {
  width?: string | number;
  height?: string | number;
  active: number | null;
  hoverBachau?: () => void;
  hoverDahej?: () => void;
  hoverTarapur?: () => void;
  hoverNaviM?: () => void;
  hoverVapi?: () => void;
  hoverJhagadia?: () => void;
}

export default function StateMapSvgClient({
  width = "737",
  height = "569",
  active,
  hoverBachau,
  hoverDahej,
  hoverTarapur,
  hoverNaviM,
  hoverVapi,
  hoverJhagadia,
}: StateMapSvgClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContentRef = useRef<string | null>(null);
  const listenersRef = useRef<Array<{ el: Element; event: string; fn: () => void }>>([]);

  const hoverHandlers = [
    hoverBachau,
    hoverDahej,
    hoverJhagadia,
    hoverTarapur,
    hoverVapi,
    hoverNaviM,
  ];
  const handlersRef = useRef(hoverHandlers);
  handlersRef.current = hoverHandlers;

  const getFillForIndex = useCallback((index: number) => {
    return [0, 1, 2, 3].includes(index) ? MANUFACTURING_FILL : RND_FILL;
  }, []);

  const applyPinFills = useCallback(
    (root: SVGElement) => {
      REGION_ORDER.forEach((region, index) => {
        const group = root.querySelector(`[data-region="${region}"]`);
        if (!group || !(group instanceof SVGElement)) return;
        const circles = group.querySelectorAll("circle");
        const fill = getFillForIndex(index);
        circles.forEach((circle, i) => {
          circle.setAttribute("fill", i === 0 ? fill.outer : fill.inner);
        });
        const isActiveBlip = active !== null && PARENT_ACTIVE_TO_OUR_INDEX[active] === index;
        group.style.opacity = isActiveBlip ? BLIP_OPACITY_ACTIVE : BLIP_OPACITY_INACTIVE;
        group.style.transition = "opacity 200ms ease";
      });
    },
    [getFillForIndex, active],
  );

  const swapVapiNaviMumbaiPositions = useCallback((root: SVGElement) => {
    const vapiGroup = root.querySelector('[data-region="vapi"]');
    const naviGroup = root.querySelector('[data-region="navi-mumbai"]');
    if (!vapiGroup || !naviGroup || !(vapiGroup instanceof SVGElement) || !(naviGroup instanceof SVGElement)) return;
    const dx = NAVI_MUMBAI_CENTER.x - VAPI_CENTER.x;
    const dy = NAVI_MUMBAI_CENTER.y - VAPI_CENTER.y;
    vapiGroup.style.transform = `translate(${dx}px, ${dy}px)`;
    naviGroup.style.transform = `translate(${-dx}px, ${-dy}px)`;
  }, []);

  const bindHover = useCallback((root: SVGElement) => {
    REGION_ORDER.forEach((region, idx) => {
      const el = root.querySelector(`[data-region="${region}"]`);
      if (!el) return;
      const fn = () => handlersRef.current[idx]?.();
      el.addEventListener("mouseenter", fn);
      listenersRef.current.push({ el, event: "mouseenter", fn });
    });
  }, []);

  const cleanup = useCallback(() => {
    listenersRef.current.forEach(({ el, event, fn }) => {
      el.removeEventListener(event, fn);
    });
    listenersRef.current = [];
  }, []);

  // state-map.svg is 1.1MB gzipped. Fetch it only when this instance is near
  // the viewport: the desktop and mobile instances live in breakpoint-hidden
  // wrappers, so the hidden one never fetches at all, and the visible one no
  // longer competes with the hero image during page load.
  const outerRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = outerRef.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    const init = (svgContent: string) => {
      if (cancelled || !containerRef.current) return;
      container.innerHTML = svgContent;
      const svg = container.querySelector("svg");
      if (!svg) return;
      if (width) svg.setAttribute("width", String(width));
      if (height) svg.setAttribute("height", String(height));
      swapVapiNaviMumbaiPositions(svg);
      applyPinFills(svg);
      bindHover(svg);
    };

    if (svgContentRef.current) {
      init(svgContentRef.current);
    } else {
      fetch(SVG_URL)
        .then((r) => r.text())
        .then((text) => {
          svgContentRef.current = text;
          if (!cancelled) init(text);
        })
        .catch((err) => {
          console.error("Failed to load state map SVG:", err);
        });
    }

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near]);

  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (svg) applyPinFills(svg);
  }, [applyPinFills, active]);

  return (
    <div
      ref={outerRef}
      // Reserve the SVG's height while it is deferred so nothing below shifts.
      style={{
        minHeight: /^\d+$/.test(String(height)) ? Number(height) : undefined,
      }}
      className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_[data-region]]:cursor-pointer"
      role="img"
      aria-label="Map of India showing manufacturing and R&D locations"
    >
      <div ref={containerRef} aria-hidden="true" />
    </div>
  );
}
