"use client";
import React, { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTriggerModule from "gsap/ScrollTrigger";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SliderCard from "../cards/SliderCard";
import { H2 } from "../Typography2";
import { LAAVisionProps } from "@/app/types/life-at-aarti.type";
import { useMargin } from "@/app/contexts/MarginContext";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { FadeInReveal } from "../ScrollReveal";
import { useLenis } from "@/app/contexts/LenisContext";

const ScrollTrigger = ScrollTriggerModule;

type ContentSection = NonNullable<
  NonNullable<LAAVisionProps["data"]>["content"]
>[number];
type ContentCard = NonNullable<
  NonNullable<ContentSection["card"]>[number]
>;

const PeopleVision = ({ data }: LAAVisionProps) => {
  const isTablet = useMatchMedia("(max-width:1023px)");
  const { title, content } = data;
  const triggerRef = useRef<HTMLDivElement>(null);
  const tabBarContainerRef = useRef<HTMLDivElement>(null);
  const mobileTabBarRef = useRef<HTMLDivElement>(null);
  const sustainbleLogo = useRef<HTMLDivElement>(null);
  const susLogotl = useRef<HTMLElement>(null);
  const susLogotr = useRef<HTMLElement>(null);
  const susLogobl = useRef<HTMLElement>(null);
  const susLogobr = useRef<HTMLElement>(null);
  const sustainInner = useRef<HTMLSpanElement>(null);
  const leafBigImg = useRef<HTMLSpanElement>(null);
  const envSlider = useRef<HTMLDivElement>(null);
  const titleSection = useRef<HTMLDivElement>(null);

  const tabsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabMob, setActiveTabMob] = useState<number>(0);
  const [showMobileTabs, setShowMobileTabs] = useState(false);
  const showMobileTabsRef = useRef(false);
  const mainTlRef = useRef<gsap.core.Timeline | null>(null);
  const desktopTabsVisibleRef = useRef(false);
  const desktopScrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const isClickScrolling = useRef(false);
  const clickScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const susLogoinnerblurtr = useRef<HTMLSpanElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  const { stopLenis, startLenis } = useLenis();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lenisStoppedRef = useRef(false);

  const handleSliderTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    [],
  );

  const handleSliderTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || lenisStoppedRef.current) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
      if (dx > dy && dx > 10) {
        stopLenis();
        lenisStoppedRef.current = true;
      }
    },
    [stopLenis],
  );

  const handleSliderTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    if (lenisStoppedRef.current) {
      startLenis();
      lenisStoppedRef.current = false;
    }
  }, [startLenis]);

  useLayoutEffect(() => {
    const measureSlideWidth = () => {
      if (imageWrapperRef.current) {
        const width = imageWrapperRef.current.offsetWidth;
        if (width > 0) {
          setSlideWidth(width);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      measureSlideWidth();
    }, 0);

    window.addEventListener("resize", measureSlideWidth);

    const resizeObserver = new ResizeObserver(() => {
      measureSlideWidth();
    });

    if (imageWrapperRef.current) {
      resizeObserver.observe(imageWrapperRef.current);
    } else {
      const checkRef = setInterval(() => {
        if (imageWrapperRef.current) {
          resizeObserver.observe(imageWrapperRef.current);
          clearInterval(checkRef);
        }
      }, 50);

      setTimeout(() => clearInterval(checkRef), 1000);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureSlideWidth);
      resizeObserver.disconnect();
    };
  }, [content?.length]);

  const { setMarginBottom } = useMargin();

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const indicatorColor = "#F97316";
  const indicatorTransition =
    "left 280ms cubic-bezier(0.4,0,0.2,1), width 280ms cubic-bezier(0.4,0,0.2,1)";

  const getMobileTabAnchorOffset = useCallback(() => {
    const tabBarRect = mobileTabBarRef.current?.getBoundingClientRect();
    if (!tabBarRect) return 120;
    return tabBarRect.bottom + 8;
  }, []);

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentActiveTab = isTablet ? activeTabMob : activeTab;
    const activeButton = tabRefs.current[currentActiveTab] ?? null;

    if (!activeButton) {
      setIndicator((prev) =>
        prev.visible ? { ...prev, visible: false } : prev,
      );
      return;
    }

    const left = activeButton.offsetLeft - (container.scrollLeft || 0);
    const width = activeButton.offsetWidth;

    setIndicator((prev) => {
      if (prev.left === left && prev.width === width && prev.visible)
        return prev;
      return { left, width, visible: true };
    });
  }, [activeTab, activeTabMob, isTablet]);

  const handleTabClick = useCallback(
    (index: number, e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (index === activeTab && !isTablet) return;

      if (isTablet) {
        const swiper = swiperRef.current;
        if (swiper && !swiper.destroyed) {
          swiper.slideTo(index);
          setActiveTab(index);
        }
        return;
      }

      const st = mainTlRef.current?.scrollTrigger;
      if (!st || !content?.length) return;

      const total = content.length;
      const clampedIndex = Math.max(0, Math.min(index, total - 1));
      const slideProgress = total > 1 ? clampedIndex / (total - 1) : 0;
      const progress = 0.55 + slideProgress * (1 - 0.55);
      const start =
        typeof st.start === "number" ? st.start : (st.start as number) || 0;
      const end = typeof st.end === "number" ? st.end : (st.end as number) || 0;
      const targetY = start + (end - start) * progress;

      desktopScrollTweenRef.current?.kill();
      const scrollProxy = { y: st.scroll() };
      desktopScrollTweenRef.current = gsap.to(scrollProxy, {
        y: targetY,
        duration: 0.9,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => {
          st.scroll(scrollProxy.y);
        },
        onComplete: () => {
          desktopScrollTweenRef.current = null;
        },
      });
    },
    [activeTab, content, isTablet],
  );

  useLayoutEffect(() => {
    if (isTablet) {
      showMobileTabsRef.current = false;
      setShowMobileTabs(false);
    }
    const ctx = gsap.context(() => {
      if (isTablet) {
        gsap.set(sustainbleLogo.current, {
          left: "50%",
          top: "50%",
          y: "-50%",
          x: "-50%",
          width: "206px",
          height: "0px",
        });
      } else {
        gsap.set(sustainbleLogo.current, {
          left: "52%",
          top: "50%",
          y: "-50%",
          x: "-50%",
        });
      }
      gsap.set(envSlider.current, { opacity: 0 });
      if (!isTablet) {
        gsap.set(tabsRef.current, { opacity: 0 });
        desktopTabsVisibleRef.current = false;
      }
      gsap.set(".leafStag", {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
      });
      const animationEndProgress = 0.55;
      const animationScrollDistance = isTablet
        ? window.innerHeight * 1.5
        : window.innerHeight * 3;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: "peopleVisionTrigger",
          trigger: triggerRef.current,
          start: "top 50%",
          end: `+=${animationScrollDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 0,
          onUpdate: (self) => {
            if (!isTablet) {
              const shouldShowDesktopTabs =
                self.isActive && self.progress >= animationEndProgress;
              if (
                tabsRef.current &&
                shouldShowDesktopTabs !== desktopTabsVisibleRef.current
              ) {
                desktopTabsVisibleRef.current = shouldShowDesktopTabs;
                gsap.to(tabsRef.current, {
                  opacity: shouldShowDesktopTabs ? 1 : 0,
                  duration: 0.45,
                  ease: shouldShowDesktopTabs ? "power2.in" : "power2.out",
                  overwrite: "auto",
                });
              }

              if (swiperRef.current && content && content.length > 0) {
                const slides = content.length;
                const index =
                  self.progress >= animationEndProgress
                    ? Math.round(
                        ((self.progress - animationEndProgress) /
                          (1 - animationEndProgress)) *
                          (slides - 1),
                      )
                    : 0;

                if (
                  !swiperRef.current.destroyed &&
                  index !== swiperRef.current.activeIndex
                ) {
                  swiperRef.current.slideTo(index);
                }

                setActiveTab((prev) => (prev === index ? prev : index));
              }
            }
          },
          onLeave: () => {
            if (isTablet) {
              showMobileTabsRef.current = false;
              setShowMobileTabs(false);
            }
          },
          onLeaveBack: () => {
            if (!isTablet) {
              desktopTabsVisibleRef.current = false;
              desktopScrollTweenRef.current?.kill();
              desktopScrollTweenRef.current = null;
              if (tabsRef.current) {
                gsap.set(tabsRef.current, { opacity: 0 });
              }
              const swiper = swiperRef.current;
              if (swiper && !swiper.destroyed && swiper.activeIndex !== 0) {
                swiper.slideTo(0);
              }
              setActiveTab(0);
            }
          },
        },
      });
      mainTlRef.current = mainTl;

      if (isTablet) {
        mainTl
          .fromTo(
            sustainbleLogo.current,
            { height: "203px" },
            { height: "203px", duration: 0.1 },
          )
          .fromTo(
            ".leafStag",
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            {
              opacity: 1,
              scale: 1,
              transformOrigin: "center center",
              duration: 1,
              stagger: 0.1,
              ease: "power4.inOut",
            },
          )
          .fromTo(
            susLogotl.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
          )
          .fromTo(
            susLogobl.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            "<",
          )
          .fromTo(
            susLogobr.current,
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            "<",
          )
          .fromTo(
            susLogotr.current,
            { width: "100px", height: "100px", right: 0, top: 0 },
            {
              width: window.innerWidth - 30,
              height: window.innerWidth - 30,  
              right: 15,
              top: "140px",
              duration: 1,
            },
          )
          .fromTo(
            sustainbleLogo.current,
            {
              width: "206px",
              height: "206px",
              left: "50%",
              top: "50%",
            },
            {
              width: "100%",
              height: "100vh",
              left: "0%",
              top: "50%",
              x: "0%",
              duration: 1,
            },
            "<",
          )
          .fromTo(
            susLogoinnerblurtr.current,
            { borderRadius: "50% 50% 50% 50%", opacity: 1 },
            { borderRadius: "0% 0% 0% 0%", opacity: 1, duration: 0.5 },
          )
          .addLabel("sliderReveal")
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
            "<",
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 2 },
            "<",
          );
      } else {
        mainTl
          .fromTo(
            ".leafStag",
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            {
              opacity: 1,
              scale: 1,
              transformOrigin: "center center",
              duration: 0.3,
              stagger: 0.1,
              ease: "power4.inOut",
            },
            "<0.2",
          )
          .fromTo(
            susLogotl.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
          )
          .fromTo(
            susLogobl.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
            "<",
          )
          .fromTo(
            susLogobr.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 },
            "<",
          )

          .fromTo(
            susLogotr.current,
            { width: "100px", height: "100px" },
            {
              width: () => `${slideWidth}px`,
              height: () => `${slideWidth}px`,
              duration: 1,
            },
          )

          .fromTo(
            sustainbleLogo.current,
            {
              width: "206px",
              height: "206px",
              left: "52%",
              top: "50%",
            },
            {
              width: () => `${slideWidth}px`,
              height: () => `${slideWidth}px`,
              left: "0%",
              top: "50%",
              x: "0%",
              duration: 1,
            },
            "<",
          )
          .fromTo(
            susLogoinnerblurtr.current,
            { borderRadius: "50% 50% 50% 50%", opacity: 1 },
            { borderRadius: "0% 0% 0% 0%", opacity: 1, duration: 0.5 },
          )
          .fromTo(
            leafBigImg.current,
            { width: "100%" },
            { width: "calc(100% - 14px)" },
            "<",
          )
          .fromTo(
            envSlider.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, zIndex: 22 },
          )
          .fromTo(
            ".sliderStagger",
            { opacity: 0, x: 100 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power4.inOut",
            },
            "<",
          )
          .fromTo(
            ".sectionSpacing",
            { opacity: 0 },
            { opacity: 1, duration: 5 },
            "<",
          );
      }
    });

    return () => {
      mainTlRef.current = null;
      ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, [content?.length, slideWidth, isTablet]);

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
  }, [activeTab, content, measureIndicator]);

  useLayoutEffect(() => {
    const calculateMarginBottom = () => {
      const sliderContainer = envSlider.current;
      const contentContainer = contentContainerRef.current;
      if (!sliderContainer || !contentContainer) {
        setMarginBottom(0);
        return;
      }
      const contentHeight =
        contentContainer.scrollHeight || contentContainer.offsetHeight;
      const screenHeight = window.innerHeight;
      const totalHeight = contentHeight + 100;

      if (totalHeight > screenHeight) {
        const margin = totalHeight - screenHeight;
        setMarginBottom(margin);
      } else {
        setMarginBottom(0);
      }
    };

    calculateMarginBottom();

    const resizeObserver = new ResizeObserver(calculateMarginBottom);
    if (envSlider.current) {
      resizeObserver.observe(envSlider.current);
    }
    if (contentContainerRef.current) {
      resizeObserver.observe(contentContainerRef.current);
    }

    const handleResize = () => calculateMarginBottom();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, content?.length, setMarginBottom]);

  const handlMobileTabClick = (index: number) => {
    const el = document.getElementById(`tabpeoplevision-${index}`);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      getMobileTabAnchorOffset();
    if (clickScrollTimeoutRef.current) {
      clearTimeout(clickScrollTimeoutRef.current);
    }
    isClickScrolling.current = true;
    showMobileTabsRef.current = true;
    setShowMobileTabs(true);
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveTabMob(index);
    setActiveTab(index);
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
      clickScrollTimeoutRef.current = null;
    }, 900);
  };

  useEffect(() => {
    if (!isTablet || !content?.length) return;
    let ticking = false;
    let prevIndex = -1;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (isClickScrolling.current) {
          showMobileTabsRef.current = true;
          setShowMobileTabs(true);
          ticking = false;
          return;
        }
        const offset = getMobileTabAnchorOffset();
        let activeIndex = 0;
        for (let i = 0; i < content.length; i++) {
          const el = document.getElementById(`tabpeoplevision-${i}`);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= offset) {
            activeIndex = i;
          }
        }
        if (activeIndex !== prevIndex) {
          prevIndex = activeIndex;
          setActiveTabMob(activeIndex);
          setActiveTab(activeIndex);
        }

        const firstEl = document.getElementById("tabpeoplevision-0");
        const lastEl = document.getElementById(
          `tabpeoplevision-${content.length - 1}`,
        );
        if (firstEl && lastEl) {
          const firstRect = firstEl.getBoundingClientRect();
          const lastBottom = lastEl.getBoundingClientRect().bottom;
          const tabEntryOffset = getMobileTabAnchorOffset();
          const tl = mainTlRef.current;
          const sliderRevealProgress =
            tl && typeof tl.labels.sliderReveal === "number"
              ? tl.labels.sliderReveal / tl.duration()
              : 0.72;
          const hasRevealed =
            (tl?.scrollTrigger?.progress ?? 0) >= sliderRevealProgress;
          const enteredSection = firstRect.top <= tabEntryOffset;
          const stillInSection = lastBottom > 200;
          const pastSection = lastBottom < 80;
          const leftSection = firstRect.top > tabEntryOffset + 40;
          const shouldShowTabs = showMobileTabsRef.current
            ? hasRevealed && !pastSection && !leftSection
            : hasRevealed && enteredSection && stillInSection;

          if (shouldShowTabs !== showMobileTabsRef.current) {
            showMobileTabsRef.current = shouldShowTabs;
            setShowMobileTabs(shouldShowTabs);
          }
        }
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTablet, content, getMobileTabAnchorOffset]);

  useEffect(() => {
    if (!isTablet) {
      showMobileTabsRef.current = false;
      setShowMobileTabs(false);
    }
  }, [isTablet]);

  useEffect(() => {
    return () => {
      desktopScrollTweenRef.current?.kill();
      desktopScrollTweenRef.current = null;
      if (clickScrollTimeoutRef.current) {
        clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {title && (
        <FadeInReveal delay={0.2}>
          <H2 className="text-center max-w-[780px] mx-[20px] lg:mx-auto ">
            {title}
          </H2>
        </FadeInReveal>
      )}
      <div
        ref={triggerRef}
        className="w-full relative min-h-[40vh] mt-[200px] lg:mt-[100px] "
      >
        {/* Title Section */}
        <div
          ref={titleSection}
          className="absolute top-0 w-full flex justify-center items-center z-20 bg-white"
        >
          <div className="flex-col lg:flex-row flex items-center gap-2 w-[100%] lg:w-[unset]">
            {content?.[0]?.card?.[0]?.image?.url && (
              <div
                ref={sustainbleLogo}
                className="flex w-[206px] lg:w-[0px] h-0 lg:h-[206px] lg:overflow-hidden absolute"
              >
                <span
                  ref={sustainInner}
                  className="flex flex-wrap w-full h-full min-w-[206px] min-h-[206px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
                >
                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogotl}
                      className="leafStag absolute top-0 left-1 w-[99px] h-[101px] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[20px] overflow-hidden"
                    >
                      <Image
                        src={content?.[0]?.card?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className="scale-110 object-cover"
                      />
                    </i>
                  )}

                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogotr}
                      className="leafStag absolute top-0 right-[2px] w-[99px] h-[101px] rounded-[1rem] overflow-hidden z-[1]"
                    >
                      <span
                        ref={susLogoinnerblurtr}
                        className="susLogotrBlurSpan rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[10%] rounded-br-[50%] overflow-hidden w-full h-full absolute top-0 left-0"
                      >
                        <Image
                          src={content?.[0]?.card?.[0]?.image?.url}
                          alt={"icon"}
                          fill
                          priority
                          className="leafBigImg object-cover blur"
                        />
                      </span>
                      <span
                        ref={leafBigImg}
                        className="w-full h-full absolute top-0 left-0 rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[10%] rounded-br-[50%] overflow-hidden"
                      >
                        <Image
                          src={content?.[0]?.card?.[0]?.image?.url}
                          alt={"icon"}
                          fill
                          priority
                          className="leafBigImg scale-110 object-cover "
                        />
                      </span>
                    </i>
                  )}
                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogobr}
                      className="leafStag absolute bottom-[3px] right-[2px] w-[99px] h-[101px] rounded-tl-[10%] rounded-tr-[50%] rounded-bl-[50%] rounded-br-[50%] overflow-hidden"
                    >
                      <Image
                        src={content?.[0]?.card?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className="scale-110 object-cover"
                      />
                    </i>
                  )}
                  {content?.[0]?.card?.[0]?.image?.url && (
                    <i
                      ref={susLogobl}
                      className="leafStag absolute bottom-[3px] left-1 w-[99px] h-[101px] rounded-tl-[50%] rounded-tr-[10%] rounded-bl-[50%] rounded-br-[50%] overflow-hidden"
                    >
                      <Image
                        src={content?.[0]?.card?.[0]?.image?.url}
                        alt={"icon"}
                        fill
                        priority
                        className="scale-110 object-cover"
                      />
                    </i>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Slider Section */}
          <div
            ref={envSlider}
            className="w-full max-h-[100vh] bg-white opacity-0 absolute top-0% left-0 z-20"
          >
            {/* Desktop Slider */}
            <div className="hidden lg:flex w-full h-screen relative flex-col justify-center">
              <div
                onTouchStart={handleSliderTouchStart}
                onTouchMove={handleSliderTouchMove}
                onTouchEnd={handleSliderTouchEnd}
              >
                <Swiper
                  slidesPerView={1.2}
                  spaceBetween={32}
                  loop={false}
                  allowTouchMove={false}
                  speed={600}
                  watchSlidesProgress={true}
                  updateOnWindowResize={true}
                  className="w-full h-auto"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    swiper.on("resize", () => {
                      swiper.updateSize();
                      swiper.updateSlides();
                      swiper.updateProgress();
                      swiper.updateSlidesClasses();
                    });
                  }}
                  onSlideChange={(swiper) => {
                    setActiveTab(swiper.activeIndex);
                  }}
                >
                  {content?.map((section: ContentSection) =>
                    section?.card?.map((slide: ContentCard, index: number) => (
                      <SwiperSlide key={slide?.id}>
                        <SliderCard
                          imgSrc={slide?.image?.url}
                          imgAlt={slide?.image?.alternativeText || "banner"}
                          title={section?.category} // parent category
                          description={slide?.description}
                          values={slide?.values}
                          ctaButton={slide?.ctaButton}
                          heading={slide?.title}
                          bullets={slide?.BulletPoints}
                          imageWrapperRef={
                            imageWrapperRef as React.RefObject<HTMLDivElement>
                          }
                          index={index}
                        />
                      </SwiperSlide>
                    )),
                  )}
                </Swiper>
              </div>

              {/* Tabs */}
              <div ref={tabsRef} className="absolute py-4 w-full bottom-0">
                <div className="w-fit mx-auto">
                  <div className="relative bg-grey-100 rounded-[40px] p-[4px] overflow-x-auto whitespace-nowrap w-fit">
                    <div
                      ref={containerRef}
                      className="relative flex gap-x-[unset] lg:gap-x-[14px] z-10 px-1 w-max"
                    >
                      {/* Indicator */}
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
                      {/* Buttons */}
                      {content?.map(
                        (items: ContentSection, index: number) =>
                          items?.category && (
                            <div
                              key={index}
                              ref={(element) => {
                                tabRefs.current[index] = element;
                              }}
                              onClick={(e) => handleTabClick(index, e)}
                              className={`text-grey-400 font-alte-hans leading-[136%] cursor-pointer py-[10px] lg:py-[12px] px-[12px] lg:px-[24px] rounded-[40px] transition-all duration-300 relative z-10 ${
                                activeTab === index
                                  ? "text-white"
                                  : "hover:bg-grey-200"
                              }`}
                            >
                              {items?.category}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile: vertical stack, tabs in fixed bar */}
            <div className="block lg:hidden container absolute top-1/2 -translate-y-1/2 left-0 w-full !h-[100%] min-h-[100vh] ">
              <div className="relative" ref={contentContainerRef}>
                <div className="w-full absolute mt-[115px]">
                  <div className="pt-[10px]" ref={tabBarContainerRef} />
                  <div className="grid items-center gap-6 mt-4">
                    {isTablet &&
                      content?.map((section: ContentSection, sectionIndex: number) => (
                        <div key={sectionIndex} id={`tabpeoplevision-${sectionIndex}`}>
                          <div className="flex flex-col gap-y-[40px]">
                            {section?.card?.map((slide: ContentCard, index: number) => (
                              <SliderCard
                                key={slide?.id}
                                imgSrc={slide?.image?.url}
                                imgAlt={slide?.image?.alternativeText || "banner"}
                                title={section?.category}
                                description={slide?.description}
                                values={slide?.values}
                                ctaButton={slide?.ctaButton}
                                heading={slide?.title}
                                bullets={slide?.BulletPoints}
                                imageWrapperRef={
                                  imageWrapperRef as React.RefObject<HTMLDivElement>
                                }
                                index={index}
                                slideForHomePage={true}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={mobileTabBarRef}
        className={`fixed top-[80px] left-0 right-0 flex justify-center items-center transition-opacity duration-200 ${showMobileTabs ? "z-30 opacity-100 pointer-events-auto visible" : "z-0 opacity-0 pointer-events-none invisible"}`}
        aria-hidden={!showMobileTabs}
      >
        {content && content.length > 0 && isTablet && (
          <div className="relative bg-grey-100 rounded-[40px] p-[4px] overflow-x-auto whitespace-nowrap w-fit max-w-[calc(100vw-32px)]">
            <div
              ref={containerRef}
              className="relative flex gap-x-[unset] lg:gap-x-[14px] z-10 px-1 w-max"
            >
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
              {content?.map(
                (items: ContentSection, index: number) =>
                  items?.category && (
                    <div
                      key={index}
                      ref={(element) => {
                        tabRefs.current[index] = element;
                      }}
                      onClick={() => handlMobileTabClick(index)}
                      className={`text-grey-400 text-[11px] md:text-base z-10 lg:text-[12px] font-alte-hans leading-[136%] cursor-pointer py-[10px] px-[8px] md:px-4 lg:px-[12px] rounded-[40px] transition-all duration-300 ${
                        activeTab === index ? "text-white" : "hover:bg-grey-200"
                      }`}
                    >
                      {items?.category}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PeopleVision;
