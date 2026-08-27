"use client";
import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { ImageProps } from "../types/global.type";

type Tab = {
  category: string;
  post_category: {
    id: string;
    name: string;
    slug: string;
    posts: {
      title: string;
      slug: string;
      image: ImageProps;
      mobImage: ImageProps;
    }[];
  };
};

type TabsProps = {
  tabs: Tab[];
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

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId = 0,
  onChange,
  className = "",
  containerClassName = "bg-gray-100 md:max-w-fit w-fit p-1 rounded-full",
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
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = tabs.findIndex(
      (tab) => tab?.post_category?.slug === activeId,
    );
    const activeButton = tabRefs.current[activeIndex] ?? null;

    if (!activeButton) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const left = activeButton.offsetLeft - (container.scrollLeft || 0);
    const width = activeButton.offsetWidth;
    setIndicator({ left, width, visible: true });
  }, [activeId, tabs]);

  useLayoutEffect(() => {
    measureIndicator();

    const resizeObserver = new ResizeObserver(measureIndicator);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      tabRefs.current.forEach((button) => {
        if (button) resizeObserver.observe(button);
      });
    }

    const handleResize = () => measureIndicator();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [
    activeId,
    tabs.length,
    indicatorColor,
    indicatorTransition,
    measureIndicator,
  ]);

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
    <div className="overflow-scroll lg:overflow-hidden mb-[42px] w-[calc(100%+30px)] mx-[-15px] px-[15px]">
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
            const isActive = activeId === tab?.post_category?.slug;

            return (
              <button
                key={tab?.post_category?.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => onChange(tab?.post_category?.slug, index)}
                type="button"
                className={`${buttonClassName} ${
                  isActive ? activeButtonClassName : inactiveButtonClassName
                } cursor-pointer `}
                aria-selected={isActive}
                role="tab"
              >
                {renderTabContent(tab?.post_category?.name, isActive)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
