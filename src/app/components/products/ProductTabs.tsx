"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { BodyText3 } from "../Typography2";

interface ProductSubCategory {
  id: number;
  subCategory: string;
  slug: string;
}

interface CatagoriesData {
  productCategory: string;
  slug: string;
  product_sub_categories: ProductSubCategory[];
}

interface ProductTabsProps {
  tabs: CatagoriesData[];
  activeTab: string;
  onChange: (productCategory: string) => void;
  className?: string;
  indicatorColor?: string;
  transition?: string;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
  indicatorColor = "#F97316",
  transition = "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  // Cache of measured geometry, keyed by "all" or tab.slug — matches
  // the `key` props used below, so it stays correct across reorders.
  const rectsCacheRef = useRef<Map<string, { left: number; width: number }>>(
    new Map(),
  );
  const rafIdRef = useRef<number | null>(null);

  // WRITE phase only: reads from the cache, never touches the DOM.
  // Safe to run on every activeTab change without causing a reflow.
  const applyIndicatorFromCache = useCallback(() => {
    const cached = rectsCacheRef.current.get(activeTab);

    if (!cached) {
      setIndicator((s) => (s.visible ? { ...s, visible: false } : s));
      return;
    }

    setIndicator({ left: cached.left, width: cached.width, visible: true });
  }, [activeTab]);

  // READ phase: batched into a single rAF and a single getBoundingClientRect
  // per button (instead of separate offsetLeft / offsetWidth / scrollLeft
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

      // Hardcoded "all" tab lives at index 0
      const allBtn = tabRefs.current[0];
      if (allBtn) {
        const rect = allBtn.getBoundingClientRect();
        nextCache.set("all", {
          left: rect.left - containerRect.left + scrollLeft,
          width: rect.width,
        });
      }

      // Dynamic tabs start at index 1
      tabs.forEach((tab, idx) => {
        const btn = tabRefs.current[idx + 1];
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
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
  // (tab list length/content, resize) — not on every activeTab flip.
  useLayoutEffect(() => {
    recomputeRects();

    const resizeObserver = new ResizeObserver(() => {
      recomputeRects();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      tabRefs.current.forEach((b) => b && resizeObserver.observe(b));
    }

    const onResize = () => recomputeRects();
    window.addEventListener("resize", onResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [tabs.length, recomputeRects]);

  // Activation changes just re-apply from the cache — no DOM read,
  // so switching tabs never triggers a forced reflow.
  useLayoutEffect(() => {
    applyIndicatorFromCache();
  }, [activeTab, applyIndicatorFromCache]);

  return (
    <div
      className={`relative flex justify-center mb-[42px] bg-gray-100 max-w-fit mx-auto p-1 rounded-full ${className}`}
    >
      <div
        ref={containerRef}
        className="relative flex space-x-2 md:space-x-3 z-10 px-1"
      >
        {/* Indicator */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: indicator.visible ? indicator.left : 0,
            top: 0,
            height: "100%",
            borderRadius: 9999,
            background: indicatorColor,
            width: indicator.visible ? indicator.width : 0,
            transition,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Hardcoded "all" tab */}
        <button
          ref={(el) => {
            tabRefs.current[0] = el;
          }}
          onClick={() => onChange("all")}
          type="button"
          className={`cursor-pointer p-3 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10 ${
            activeTab === "all"
              ? "!text-white"
              : "bg-transparent !text-[#4C5861]"
          }`}
        >
          <BodyText3
            className={`transition-colors duration-200 ${
              activeTab === "all" ? "!text-white" : "!text-[#4C5861]"
            }`}
          >
            All
          </BodyText3>
        </button>

        {/* Dynamic tabs */}
        {tabs.map((tab, idx) => (
          <button
            key={tab.slug}
            ref={(el) => {
              tabRefs.current[idx + 1] = el;
            }}
            onClick={() => onChange(tab.slug)}
            type="button"
            className={`cursor-pointer p-2 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10 ${
              activeTab === tab.slug
                ? "!text-white"
                : "bg-transparent !text-[#4C5861]"
            }`}
          >
            <BodyText3
              className={`transition-colors duration-200 ${
                activeTab === tab.slug ? "!text-white" : "!text-[#4C5861]"
              }`}
            >
              {tab.productCategory}
            </BodyText3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;
