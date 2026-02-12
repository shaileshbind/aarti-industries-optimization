"use client";

import { useEffect, useRef, useCallback } from "react";
import MapBlip from "../MapBlip";

const SVG_URL = "/maps/desktop-map.svg";
const FILL_IDS = [
  "restOfWorld",
  "northAmerica",
  "europe",
  "middleEast",
  "india",
  "restOfAsia",
] as const;
const HOVER_TO_INDEX: Record<string, number> = {
  restOfWorld: 0,
  northAmerica: 1,
  europe: 2,
  middleEast: 3,
  india: 4,
  restOfAsia: 5,
};
const DEFAULT_FILL = "#E7EBED";

const MAP_BLIPS: { id: number; x: string; y: string; title: string; subtitle: string }[] = [
  { id: 0, x: "71", y: "428", title: "3%", subtitle: "Rest of the world" },
  { id: 1, x: "158", y: "120", title: "18%", subtitle: "North America" },
  { id: 2, x: "542", y: "112", title: "4%", subtitle: "Europe" },
  { id: 3, x: "670", y: "162", title: "23%", subtitle: "Middle East" },
  { id: 4, x: "795", y: "235", title: "46%", subtitle: "India" },
  { id: 5, x: "963", y: "104", title: "6%", subtitle: "Rest of Asia" },
];

export interface DesktopMapSvgClientProps {
  hoverRestWorld?: () => void;
  hoverNorthAmerica?: () => void;
  hoverEurope?: () => void;
  hoverMiddleE?: () => void;
  hoverIndia?: () => void;
  hoverAsia?: () => void;
  fillRestOfWorld?: string;
  fillIndia?: string;
  fillMiddleEast?: string;
  fillRestOfAsia?: string;
  fillEurope?: string;
  fillNorthAmerica?: string;
  isActive0?: boolean;
  isActive1?: boolean;
  isActive2?: boolean;
  isActive3?: boolean;
  isActive4?: boolean;
  isActive5?: boolean;
}

export default function DesktopMapSvgClient({
  hoverRestWorld,
  hoverNorthAmerica,
  hoverEurope,
  hoverMiddleE,
  hoverIndia,
  hoverAsia,
  fillRestOfWorld = DEFAULT_FILL,
  fillIndia = DEFAULT_FILL,
  fillMiddleEast = DEFAULT_FILL,
  fillRestOfAsia = DEFAULT_FILL,
  fillEurope = DEFAULT_FILL,
  fillNorthAmerica = DEFAULT_FILL,
  isActive0,
  isActive1,
  isActive2,
  isActive3,
  isActive4,
  isActive5,
}: DesktopMapSvgClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContentRef = useRef<string | null>(null);
  const listenersRef = useRef<Array<{ el: Element; event: string; fn: () => void }>>([]);

  const fills = [
    fillRestOfWorld,
    fillNorthAmerica,
    fillEurope,
    fillMiddleEast,
    fillIndia,
    fillRestOfAsia,
  ];
  const hoverHandlers = [
    hoverRestWorld,
    hoverNorthAmerica,
    hoverEurope,
    hoverMiddleE,
    hoverIndia,
    hoverAsia,
  ];
  const isActive = [isActive0, isActive1, isActive2, isActive3, isActive4, isActive5];

  const handlersRef = useRef(hoverHandlers);
  handlersRef.current = hoverHandlers;

  const applyFills = useCallback(
    (root: SVGElement) => {
      FILL_IDS.forEach((id, i) => {
        const el = root.querySelector("#" + id);
        if (el && el instanceof SVGElement) {
          el.style.fill = fills[i] ?? DEFAULT_FILL;
        }
      });
    },
    [fills],
  );

  const bindHover = useCallback((root: SVGElement) => {
    const hoverElements = root.querySelectorAll("[data-hover]");
    hoverElements.forEach((el) => {
      const id = el.getAttribute("data-hover");
      const idx = id != null ? HOVER_TO_INDEX[id] : undefined;
      if (idx === undefined) return;
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

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    const init = (svgContent: string) => {
      if (cancelled || !containerRef.current) return;
      container.innerHTML = svgContent;
      const svg = container.querySelector("svg");
      if (!svg) return;
      applyFills(svg);
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
          console.error("Failed to load desktop map SVG:", err);
        });
    }

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bind once on mount
  }, []);

  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (svg) applyFills(svg);
  }, [applyFills]);

  return (
    <div className="relative w-full h-full" role="img" aria-label="World map showing regional presence">
      <div
        ref={containerRef}
        className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_.map-hover]:cursor-pointer"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 1262 623"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none [&_g]:pointer-events-auto"
        aria-hidden="true"
      >
        {MAP_BLIPS.map((blip) => (
          <MapBlip
            key={blip.id}
            x={blip.x}
            y={blip.y}
            title={blip.title}
            subtitle={blip.subtitle}
            isActive={!!isActive[blip.id]}
            onMouseEnter={hoverHandlers[blip.id]}
          />
        ))}
      </svg>
    </div>
  );
}
