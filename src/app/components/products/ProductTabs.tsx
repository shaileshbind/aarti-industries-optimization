import React, { useLayoutEffect, useRef, useState } from "react";
import { BodyText3 } from "../Typography2";

type SubCategory = { id: string; name: string; };
type Tab = { id: string; label: string; subCategories?: SubCategory[]; };

type Props = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  indicatorColor?: string;
  transition?: string;
};

const ProductTabs: React.FC<Props> = ({
  tabs,
  activeId,
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
    const idx = tabs.findIndex(t => t.id === activeId);
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

  }, [activeId, tabs.length]);

  return (
    <div className={`relative flex justify-center mb-[42px] bg-gray-100 max-w-fit mx-auto p-1 rounded-full ${className}`}>
      <div ref={containerRef} className="relative flex  md:space-x-3 z-10 px-1">
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
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[idx] = el; }}
            onClick={() => onChange(tab.id)}
            type="button"
            className={`p-3 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10 md:p-1 ${activeId === tab.id ? "!text-white" : "bg-transparent !text-[#4C5861]"}`}
          >
           <BodyText3 className={`transition-colors duration-200 ${activeId === tab.id ? "!text-white" : "bg-transparent !text-[#4C5861]"}`}>{tab.label}</BodyText3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;