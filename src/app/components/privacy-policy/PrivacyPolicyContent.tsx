"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

interface PrivacyContent {
  content: Array<{
    title?: string;
    description?: string;
    additional?: string;
  }>;
}

interface PrivacyPolicyProps {
  data?: PrivacyContent;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface NavItem {
  id: string;
  label: string;
}

const StarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M16 8.00005C11.3014 7.72327 8.53381 5.17641 8.00011 6.03978e-07C7.72333 4.69863 5.17659 7.46624 0 8.00005C4.69881 8.27684 7.46641 10.8234 8.00011 16C8.27689 11.3014 10.8236 8.53376 16 8.00005Z"
      fill="#F36633"
    />
  </svg>
);

// Typography components
const BodyText2: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <p className={`text-base font-normal ${className || ""}`}>{children}</p>
);

const BodyText3: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <p className={`text-sm font-normal ${className || ""}`}>{children}</p>
);

const SubH2: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <h2 className={`text-2xl font-semibold ${className || ""}`}>{children}</h2>
);

const PrivacyPolicyContent: React.FC<PrivacyPolicyProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const sidebarRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef<boolean>(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (data?.content && data.content.length > 0) {
      const navItems: NavItem[] = data.content.map((item, index) => ({
        id: `section-${index}`,
        label: item.title || `Section ${index + 1}`,
      }));
      setNavigationItems(navItems);
    }
  }, [data]);

  const setNavItemRef = (index: number) => (el: HTMLLIElement | null) => {
    navItemsRef.current[index] = el;
  };

  const handleNavClick = (id: string) => {
    const index = navigationItems.findIndex((item) => item.id === id);
    isClickScrolling.current = true;
    setActiveIndex(index);

    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: element, offsetY: 120 },
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            isClickScrolling.current = false;
          }, 100);
        },
      });
    }
  };

  const calculateLineHeight = useCallback((index: number) => {
    if (index === 0) return 0;

    const firstItem = navItemsRef.current[0];
    const currentItem = navItemsRef.current[index];

    if (firstItem && currentItem) {
      const firstCenter = firstItem.offsetTop + 10;
      const currentCenter = currentItem.offsetTop + 10;
      return currentCenter - firstCenter;
    }
    return 0;
  }, []);

  // Pin the sidebar using GSAP ScrollTrigger
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !sidebarRef.current ||
      !containerRef.current
    )
      return;
    const sidebar = sidebarRef.current;
    const container = containerRef.current;
    // Kill existing pin trigger
    if (pinTriggerRef.current) {
      pinTriggerRef.current.kill();
    }
    // Only pin on desktop (above 900px)
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const setupPin = () => {
      if (mediaQuery.matches) {
        pinTriggerRef.current = ScrollTrigger.create({
          trigger: container,
          start: "top 100px",
          end: "bottom bottom",
          pin: sidebar,
          pinSpacing: false,
          markers: false,
        });
      }
    };

    setupPin();
    // Re-setup on resize
    const handleResize = () => {
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
      }
      setupPin();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
      }
    };
  }, [navigationItems]);

  // Section scroll triggers for active state
  useEffect(() => {
    if (typeof window === "undefined" || navigationItems.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    const timeout = setTimeout(() => {
      navigationItems.forEach((item, index) => {
        const section = document.getElementById(item.id);
        if (section) {
          const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 120px",
            end: "bottom 120px",
            markers: false,
            onEnter: () => {
              if (!isClickScrolling.current) {
                setActiveIndex(index);
              }
            },
            onEnterBack: () => {
              if (!isClickScrolling.current) {
                setActiveIndex(index);
              }
            },
          });
          triggers.push(trigger);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [navigationItems]);

  useEffect(() => {
    const newHeight = calculateLineHeight(activeIndex);
    setLineHeight(newHeight);
  }, [activeIndex, calculateLineHeight]);

  const getItemState = (index: number): "passed" | "active" | "future" => {
    if (index < activeIndex) return "passed";
    if (index === activeIndex) return "active";
    return "future";
  };

  const getButtonClasses = () => {
    return "flex items-center bg-transparent border-none cursor-pointer text-left transition-colors duration-300 leading-normal p-0";
  };

  const getTextColorClass = (state: "passed" | "active" | "future") => {
    switch (state) {
      case "active":
        return "text-[#F36633] hover:text-[#F36633]";
      case "passed":
      case "future":
      default:
        return "text-[#5D5E62] hover:text-[#5D5E62]";
    }
  };

  const getCircleClasses = (state: "passed" | "active" | "future") => {
    const baseClasses =
      "w-[9px] h-[9px] rounded-full transition-all duration-300";

    switch (state) {
      case "passed":
        return `${baseClasses} bg-[#F36633]`;
      case "future":
        return `${baseClasses} bg-[#E1E1E1] group-hover:bg-[#E1E1E1] group-hover:scale-125`;
      default:
        return baseClasses;
    }
  };

  const renderNavLabel = (
    label: string,
    state: "passed" | "active" | "future",
  ) => {
    const colorClass = getTextColorClass(state);

    if (state === "active") {
      return (
        <BodyText2 className={`${colorClass} transition-colors duration-500`}>
          {label}
        </BodyText2>
      );
    }

    return (
      <BodyText3 className={`${colorClass} transition-colors duration-500`}>
        {label}
      </BodyText3>
    );
  };

  // If no data, return null or a loading state
  if (!data?.content || data.content.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white pt-20 pb-20 max-md:pt-6 max-md:pb-[60px]">
      <div
        ref={containerRef}
        className="max-w-[1200px] mx-auto px-6 flex gap-[60px] max-[900px]:flex-col max-[900px]:gap-8 max-sm:px-4 relative"
      >
        {/* Sidebar Navigation */}
        <aside
          ref={sidebarRef}
          className="shrink-0 w-60 h-fit max-[900px]:w-full max-[900px]:relative max-[900px]:top-0 max-[900px]:border-b max-[900px]:border-[#e2e8f0] max-[900px]:pb-6"
        >
          <nav className="relative">
            <ul
              ref={navListRef}
              className="list-none m-0 p-0 flex flex-col relative max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:gap-x-4 max-[900px]:gap-y-2"
            >
              {/* Background line (grey) - full height */}
              <div className="absolute left-2 top-[18px] bottom-[18px] w-px bg-[#e2e8f0] z-0 rounded-sm max-[900px]:hidden" />

              {/* Progress line (orange) - animated height */}
              <div
                className="absolute left-2 top-[18px] w-px bg-[#F36633] z-[1] rounded-sm transition-[height] duration-[400ms] ease-out max-[900px]:hidden"
                style={{ height: `${lineHeight}px` }}
              />

              {navigationItems.map((item, index) => {
                const state = getItemState(index);
                return (
                  <li
                    key={item.id}
                    ref={setNavItemRef(index)}
                    className="group m-0 relative flex items-center py-2 max-[900px]:py-1"
                  >
                    <div
                      className={`
                        w-[15px] h-4 flex items-center justify-center shrink-0 mr-3 ml-px mt-0.5 relative z-[2] bg-transparent transition-transform duration-300
                        max-[900px]:w-3 max-[900px]:h-3 max-[900px]:mr-1.5
                      `}
                    >
                      {state === "active" ? (
                        <StarIcon />
                      ) : (
                        <div className={getCircleClasses(state)} />
                      )}
                    </div>

                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`${getButtonClasses()} max-[900px]:text-xs`}
                    >
                      {renderNavLabel(item.label, state)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <div
          ref={contentRef}
          className="flex-1 min-w-0 max-w-[720px] max-[900px]:max-w-full"
        >
          {data.content.map((section, index) => (
            <section
              key={`section-${index}`}
              id={`section-${index}`}
              className="mb-12 pt-2 opacity-100 transition-opacity duration-300"
            >
              {section.title && (
                <SubH2 className="text-blue-200 mb-4">{section.title}</SubH2>
              )}

              {section.description && (
                <BodyText2 className="text-grey-400 mb-4">
                  {section.description}
                </BodyText2>
              )}

              {section.additional && (
                <div
                  className="privacy-html-content text-grey-400 mb-4 last:mb-0"
                  dangerouslySetInnerHTML={{ __html: section.additional }}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
