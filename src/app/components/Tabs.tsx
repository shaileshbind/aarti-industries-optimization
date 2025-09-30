import React, { useLayoutEffect, useRef, useState } from "react";

// Generic types with numeric IDs
type SubCategory = {
  id: number;
  name: string;
};

type Tab = {
  id: number;
  label: string;
  subCategories?: SubCategory[];
};

type TabsProps = {
  tabs: Tab[];
  activeId: number;
  onChange: (id: number) => void;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  inactiveButtonClassName?: string;
  indicatorColor?: string;
  indicatorTransition?: string;
  textComponent?: React.ComponentType<{ className?: string; children: React.ReactNode }>;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  className = "",
  containerClassName = "bg-gray-100 md:max-w-fit w-fit mx-auto p-1 rounded-full",
  buttonClassName = "p-3 md:px-[24px] md:py-[12px] rounded-full transition-colors duration-200 relative z-10",
  activeButtonClassName = "!text-white",
  inactiveButtonClassName = "bg-transparent !text-[#4C5861]",
  indicatorColor = "#F97316",
  indicatorTransition = "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)",
  textComponent: TextComponent
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false
  });

  const measureIndicator = () => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = tabs.findIndex(tab => tab.id === activeId);
    const activeButton = tabRefs.current[activeIndex] ?? null;

    if (!activeButton) {
      setIndicator(prev => ({ ...prev, visible: false }));
      return;
    }

    const left = activeButton.offsetLeft - (container.scrollLeft || 0);
    const width = activeButton.offsetWidth;
    setIndicator({ left, width, visible: true });
  };

  useLayoutEffect(() => {
    measureIndicator();

    const resizeObserver = new ResizeObserver(measureIndicator);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      tabRefs.current.forEach(button => {
        if (button) resizeObserver.observe(button);
      });
    }

    const handleResize = () => measureIndicator();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeId, tabs.length]);

  const renderTabContent = (label: string, isActive: boolean) => {
    const textClassName = `transition-colors duration-200 ${isActive ? activeButtonClassName : inactiveButtonClassName
      }`;

    if (TextComponent) {
      return <TextComponent className={textClassName}>{label}</TextComponent>;
    }

    return <span className={textClassName}>{label}</span>;
  };

  return (
    <div className="overflow-scroll lg:overflow-hidden mb-[42px]">

      <div className={`relative flex justify-center mb-2 ${containerClassName} ${className}`}>
        <div
          ref={containerRef}
          className="relative flex md:space-x-3 z-10 px-1 w-max"
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
              pointerEvents: "none"
            }}
          />

          {/* Tab Buttons */}
          {tabs.map((tab, index) => {
            const isActive = activeId === tab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => onChange(tab.id)}
                type="button"
                className={`${buttonClassName} ${isActive ? activeButtonClassName : inactiveButtonClassName
                  }`}
                aria-selected={isActive}
                role="tab"
              >
                {renderTabContent(tab.label, isActive)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;