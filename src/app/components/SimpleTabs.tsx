"use client";
import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { useLenis } from "@/app/contexts/LenisContext";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

type SimpleTab = {
  title: string;
  slug: string;
  id: number | string;
};

type SimpleTabsProps = {
  tabs: SimpleTab[];
  activeId: string;
  onChange: (slug: string, index: number) => void;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  leftAlign?: boolean;
  activeButtonClassName?: string;
  inactiveButtonClassName?: string;
  indicatorColor?: string;
  indicatorTransition?: string;
  innerClassName?: string;
  textComponent?: React.ComponentType<{
    className?: string;
    children: React.ReactNode;
  }>;
};

const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  activeId = "",
  onChange,
  className = "",
  containerClassName = "bg-[#F7F9FA] md:max-w-fit w-fit p-1 rounded-full",
  innerClassName,
  buttonClassName = "p-3 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10",
  leftAlign = false,
  activeButtonClassName = "!text-white",
  inactiveButtonClassName = "bg-transparent !text-[#4C5861]",
  indicatorColor = "#F97316",
  indicatorTransition = "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)",
  textComponent: TextComponent,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Cache of measured geometry, keyed by tab slug so reordering/removal
  // of tabs never leaves a stale index -> rect mapping.
  const rectsCacheRef = useRef<Map<string, { left: number; width: number }>>(
    new Map(),
  );
  const rafIdRef = useRef<number | null>(null);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  // WRITE phase only: reads from the cache, never touches the DOM.
  // Safe to call on every activeId change without causing a reflow.
  const applyIndicatorFromCache = useCallback(() => {
    const activeTab = tabs.find((tab) => tab?.slug === activeId);
    const cached = activeTab ? rectsCacheRef.current.get(activeTab.slug) : null;

    if (!cached) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    setIndicator({ left: cached.left, width: cached.width, visible: true });
  }, [activeId, tabs]);

  // READ phase: batched into a single rAF and a single getBoundingClientRect
  // per element (instead of separate offsetLeft / offsetWidth / scrollLeft
  // reads), so it runs after layout has settled for the frame rather than
  // forcing a synchronous reflow mid-effect.
  const recomputeRects = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;

      const containerRect = container.getBoundingClientRect();
      const scrollLeft = container.scrollLeft || 0;
      const nextCache = new Map<string, { left: number; width: number }>();

      tabs.forEach((tab, index) => {
        const button = tabRefs.current[index];
        if (!button || !tab) return;

        const rect = button.getBoundingClientRect();
        nextCache.set(tab.slug, {
          left: rect.left - containerRect.left + scrollLeft,
          width: rect.width,
        });
      });

      rectsCacheRef.current = nextCache;
      applyIndicatorFromCache();
    });
  }, [tabs, applyIndicatorFromCache]);

  // Recompute geometry only when layout-affecting things change
  // (tab list length/content, container/button resize) — not on
  // every activeId flip.
  useLayoutEffect(() => {
    recomputeRects();

    const resizeObserver = new ResizeObserver(() => {
      recomputeRects();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      tabRefs.current.forEach((button) => {
        if (button) resizeObserver.observe(button);
      });
    }

    const handleResize = () => recomputeRects();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length, indicatorColor, indicatorTransition, recomputeRects]);

  // Activation changes just re-apply from the cache — no DOM read,
  // so switching tabs never triggers a forced reflow.
  useLayoutEffect(() => {
    applyIndicatorFromCache();
  }, [activeId, applyIndicatorFromCache]);

  const isMobileTouch = useMatchMedia("(pointer: coarse)");
  const { stopLenis, startLenis } = useLenis();

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lenisStoppedRef = useRef(false);

  const handleTabsTouchStart = useCallback((e: ReactTouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTabsTouchMove = useCallback(
    (e: ReactTouchEvent) => {
      if (!isMobileTouch) return;
      if (!touchStartRef.current || lenisStoppedRef.current) return;

      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

      // If user is clearly swiping horizontally inside the scroller,
      // stop Lenis so it doesn't fight native horizontal scrolling.
      if (dx > dy && dx > 10) {
        stopLenis();
        lenisStoppedRef.current = true;
      }
    },
    [isMobileTouch, stopLenis],
  );

  const handleTabsTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    if (lenisStoppedRef.current) {
      startLenis();
      lenisStoppedRef.current = false;
    }
  }, [startLenis]);

  const renderTabContent = (label: string, isActive: boolean) => {
    const textClassName = `transition-colors duration-200 ${
      isActive ? activeButtonClassName : inactiveButtonClassName
    }`;

    if (TextComponent) {
      return <TextComponent className={textClassName}>{label}</TextComponent>;
    }

    return <span className={textClassName}>{label}</span>;
  };

  return (
    <div
      className="overflow-scroll lg:overflow-hidden mb-[42px] w-[calc(100%+30px)] mx-[-15px] px-[15px]"
      data-lenis-prevent
      onTouchStart={handleTabsTouchStart}
      onTouchMove={handleTabsTouchMove}
      onTouchEnd={handleTabsTouchEnd}
      onTouchCancel={handleTabsTouchEnd}
    >
      <div
        className={`relative flex justify-center mb-2 ${containerClassName} ${className} ${
          !leftAlign && "mx-auto "
        }`}
      >
        <div
          ref={containerRef}
          className={`relative flex md:space-x-3 z-10 px-1 w-max ${innerClassName}`}
        >
          {/* Animated Indicator */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: indicator.visible ? indicator.left : 0,
              top: 0,
              height: "100%",
              borderRadius: 9999,
              background: indicatorColor,
              width: indicator.visible ? indicator.width : 0,
              transition: indicatorTransition,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Tab Buttons */}
          {tabs?.map((tab, index) => {
            const isActive = activeId === tab?.slug;

            return (
              <button
                key={tab?.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => onChange(tab?.slug, index)}
                type="button"
                className={`${buttonClassName} ${
                  isActive ? activeButtonClassName : inactiveButtonClassName
                } cursor-pointer `}
                aria-selected={isActive}
                role="tab"
              >
                {renderTabContent(tab?.title, isActive)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimpleTabs;
