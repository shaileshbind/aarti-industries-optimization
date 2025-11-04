"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
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
  transition = "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)"
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;

    // Adjust index because first tab is hardcoded "all"
    const idx = activeTab === "all" ? 0 : tabs.findIndex(t => t.slug === activeTab) + 1;
    const btn = tabRefs.current[idx] ?? null;

    if (!btn) {
      setIndicator(s => ({ ...s, visible: false }));
      return;
    }

    const left = btn.offsetLeft - (container.scrollLeft || 0);
    const width = btn.offsetWidth;
    setIndicator({ left, width, visible: true });
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) {
      ro.observe(containerRef.current);
      tabRefs.current.forEach(b => b && ro.observe(b));
    }
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [activeTab, tabs.length]);

  return (
    <div className={`relative flex justify-center mb-[42px] bg-gray-100 max-w-fit mx-auto p-1 rounded-full ${className}`}>
      <div ref={containerRef} className="relative flex space-x-2 md:space-x-3 z-10 px-1">
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
            pointerEvents: "none"
          }}
        />

        {/* Hardcoded "all" tab */}
        <button
          ref={(el) => { tabRefs.current[0] = el; }}
          onClick={() => onChange("all")}
          type="button"
          className={`cursor-pointer p-2 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10 ${
            activeTab === "all" ? "!text-white" : "bg-transparent !text-[#4C5861]"
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
            ref={(el) => { tabRefs.current[idx + 1] = el; }}
            onClick={() => onChange(tab.slug)}
            type="button"
            className={`cursor-pointer p-2 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10 ${
              activeTab === tab.slug ? "!text-white" : "bg-transparent !text-[#4C5861]"
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
