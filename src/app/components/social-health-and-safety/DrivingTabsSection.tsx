"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BodyText2, H2, SubH1, SubH2 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import "swiper/css/effect-fade";
import FaqAccordion from "../FaqAccordian";
import clsxN from "../../../../utils/clsxN";
import { DrivingTabsSectionProps as DrivingTabsSectionPropsType } from "@/app/types/social-health-and-safety.type";
import { FadeInReveal } from "../ScrollReveal";
import { useLenis } from "@/app/contexts/LenisContext";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

type DrivingTabsSectionProps = {
  data: DrivingTabsSectionPropsType[];
  tabClass?: string;
  starImgEffect?: boolean;
  title?: string;
};

const DrivingTabsSection = ({
  data,
  tabClass,
  title,
  starImgEffect,
}: DrivingTabsSectionProps) => {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileAnimating, setIsMobileAnimating] = useState(false);
  const isTablet = useMatchMedia("(max-width:1280px)");

  const { stopLenis, startLenis, scrollTo: lenisScrollTo } = useLenis();
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

  const getHeaderOffset = () => {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height");
    return (parseInt(val, 10) || 80) + 5;
  };

  const clearPendingTimers = () => {
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
  };

  const mobileScrollAndExpand = useCallback(
    (panelIndex: number) => {
      clearPendingTimers();
      setIsMobileAnimating(true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      pausedProgressRef.current = 0;
      setProgress(0);
      setExpanded(false);

      collapseTimerRef.current = setTimeout(() => {
        const el = accordionRefs.current[panelIndex];
        if (el) {
          const offset = getHeaderOffset();
          lenisScrollTo(el, {
            offset: -offset,
            duration: 0.8,
          });
        }
        expandTimerRef.current = setTimeout(() => {
          setExpanded(`panel${panelIndex}`);
          expandTimerRef.current = null;
          setIsMobileAnimating(false);
        }, 100);
        collapseTimerRef.current = null;
      }, 350);
    },
    [lenisScrollTo],
  );

  const startProgress = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const initialProgress = pausedProgressRef.current;
    setProgress(initialProgress);
    startTimeRef.current = performance.now();
    const duration = 8000;

    const animate = (time: number) => {
      if (isPaused || !isInViewport) {
        pauseTimeRef.current = time;
        return;
      }

      const elapsed = time - startTimeRef.current;
      const progressPercent = Math.min(
        initialProgress + (elapsed / duration) * 100,
        100,
      );
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const nextIndex = (active + 1) % data.length;
        setActive(nextIndex);
        if (isTablet) {
          mobileScrollAndExpand(nextIndex);
        } else {
          pausedProgressRef.current = 0;
          setExpanded(`panel${nextIndex}`);
          if (swiperRef.current) {
            swiperRef.current.slideToLoop(nextIndex);
          }
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [active, data.length, isPaused, isInViewport, isTablet, mobileScrollAndExpand]);

  // Intersection Observer to detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          } else {
            setIsInViewport(false);
            // Reset progress when leaving viewport
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
            }
            setProgress(0);
            pausedProgressRef.current = 0;
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px",
      },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileAnimating) return;
    if (isInViewport && !isPaused) {
      startProgress();
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [active, startProgress, isPaused, isInViewport, isMobileAnimating]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    pausedProgressRef.current = progress;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTabClick = (index: number) => {
    if (index === active) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    pausedProgressRef.current = 0;
    setActive(index);
    setExpanded(`panel${index}`);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    if (realIndex !== active) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      pausedProgressRef.current = 0;
      setActive(realIndex);
      setExpanded(`panel${realIndex}`);
    }
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        setActive(panelIndex);
        if (isTablet) {
          mobileScrollAndExpand(panelIndex);
        } else {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
          pausedProgressRef.current = 0;
          setExpanded(panel);
        }
      }
    };
  return (
    <div ref={sectionRef}>
      <FadeInReveal>
        {title && (
          <div className="max-w-full lg:max-w-[740px] mx-5 lg:mx-[60px] mb-[30px] lg:mb-[50px]">
            <H2>{title}</H2>
          </div>
        )}
        {/* Desktop */}
        <div className="mx-[20px] lg:mx-[60px] hidden xl:grid grid-cols-[25%_1fr] gap-x-[60px]">
          {/* Tabs */}
          {data?.length > 0 && (
            <div className="mt-[14px]">
              {data?.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleTabClick(index)}
                  className="relative border-b border-transparent cursor-pointer group"
                >
                  <SubH2
                    className={clsxN(
                      `${index === active ? "text-orange-200" : "text-grey-300"
                      } py-[20px] relative z-10 transition-colors duration-300 group-hover:text-orange-200 !text-[18px] md:!text-[16px] `,
                      tabClass,
                    )}
                  >
                    {item?.heading}
                  </SubH2>

                  {/* Grey line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />

                  {/* Orange progress bar only for active tab */}
                  {index === active && (
                    <div
                      className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                      style={{
                        width: `${progress}%`,
                        transition: "none", // Remove transition to prevent glitches
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Content Slides */}
          <div
            onTouchStart={handleSliderTouchStart}
            onTouchMove={handleSliderTouchMove}
            onTouchEnd={handleSliderTouchEnd}
            className="grid grid-cols-[1fr] gap-x-[40px]"
          >
            <Swiper
              modules={[EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={data.length > 1}
              speed={800}
              allowTouchMove={false}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              className="w-full h-full"
            >
              {data?.map((tabItem) => (
                <SwiperSlide key={tabItem.id}>
                  <div className="grid grid-cols-[1fr_500px] gap-x-[40px] min-h-[430px] h-full">
                    {tabItem?.cards?.[0] && (
                      <>
                        <div className="relative min-h-[430px] h-full rounded-[16px] overflow-hidden">
                          {tabItem.cards[0]?.image?.url && (
                            <>
                              {starImgEffect ? (
                                <div className="absolute right-0 top-0 w-full min-h-[430px] rounded-[20px] overflow-hidden">
                                  <Image
                                    src={tabItem.cards[0].image.url}
                                    alt={
                                      tabItem.cards[0].image.alternativeText ||
                                      "img"
                                    }
                                    fill
                                    className="absolute object-cover opacity-40"
                                  />
                                  <Image
                                    src={tabItem.cards[0].image.url}
                                    alt={
                                      tabItem.cards[0].image.alternativeText ||
                                      "img"
                                    }
                                    width={500}
                                    height={548}
                                    className="absolute object-cover h-[calc(100%-64px)] w-[calc(100%-58px)]"
                                  />
                                  <Image
                                    src="/images/home/star-white.svg"
                                    alt="star"
                                    width={50}
                                    height={50}
                                    className="absolute bottom-[39.5px] z-10 right-[33.5px] w-[42px] lg:w-[50px]"
                                  />
                                  <div className="absolute min-h-screen bg-white w-[1px] right-[58px]" />
                                  <div className="absolute w-full bg-white bottom-[64px] h-[1px]" />
                                </div>
                              ) : (
                                <Image
                                  src={tabItem.cards[0].image.url}
                                  alt={
                                    tabItem.cards[0].image.alternativeText || "img"
                                  }
                                  fill
                                  className="object-cover object-top"
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {tabItem.cards[0]?.title && (
                            <SubH2 className="mt-[24px] !font-roboto">
                              {tabItem.cards[0].title}
                            </SubH2>
                          )}

                          {tabItem.cards[0]?.description && (
                            <BodyText2 className="mt-[18px]">
                              {tabItem.cards[0].description}
                            </BodyText2>
                          )}

                          <div className="flex flex-col gap-2 mt-3">
                            {tabItem.cards[0]?.BulletPoints?.length > 0 &&
                              tabItem.cards[0]?.BulletPoints?.map(
                                (items, index2) => (
                                  <div
                                    className="flex gap-2 items-start"
                                    key={"pointerss_" + index2}
                                  >
                                    <Image
                                      src={"/images/star-orange.svg"}
                                      alt={"star"}
                                      className="object-cover w-[14px] h-[14px] mt-[5px]"
                                      width={14}
                                      height={14}
                                    />
                                    <p className="text-[#4C5861]">{items?.title}</p>
                                  </div>
                                ),
                              )}
                          </div>

                          {tabItem.cards[0]?.ctaButton?.title &&
                            (tabItem.cards[0]?.ctaButton?.hasExternalLink == "true"
                              ? tabItem.cards[0]?.ctaButton?.externalLink
                              : tabItem.cards[0]?.ctaButton?.link?.link) && (
                              <div className="mt-[18px] pointer-events-auto">
                                <Button
                                  title={tabItem.cards[0].ctaButton.title}
                                  href={
                                    tabItem.cards[0]?.ctaButton?.hasExternalLink ==
                                      "true"
                                      ? tabItem.cards[0]?.ctaButton?.externalLink
                                      : tabItem.cards[0]?.ctaButton?.link?.link
                                  }
                                  secondary
                                  useTargetBlank={
                                    tabItem.cards[0]?.ctaButton?.hasExternalLink ==
                                    "true"
                                  }
                                />
                              </div>
                            )}
                        </div>
                      </>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* Mobile Accordion */}
        {data?.length > 0 && (
          <div className="block xl:hidden w-full px-[20px] pt-[0px] pb-[50px] lg:py-[70px]">
            {data?.map((item, index) => (
              <div key={item.id} className="relative" ref={(el) => { accordionRefs.current[index] = el; }}>
                <FaqAccordion
                  faqTitle={
                    <SubH1
                      className={
                        expanded === `panel${index}`
                          ? "text-orange-100"
                          : "text-gray-300"
                      }
                    >
                      {item.heading}
                    </SubH1>
                  }
                  faqContent={
                    <div className="mt-[20px] mb-[30px]">
                      {item?.cards?.[0] && (
                        <>
                          <div className="relative w-full h-[300px] md:h-[500px] xl:h-[200px] rounded-[14px] overflow-hidden">
                            {item.cards[0]?.image?.url && (
                              <>
                                {starImgEffect ? (
                                  <div className="absolute right-0 top-0 w-full h-[400px] xl:h-[200px] rounded-[14px] overflow-hidden">
                                    <Image
                                      src={item.cards[0].image.url}
                                      alt={
                                        item.cards[0].image.alternativeText ||
                                        "img"
                                      }
                                      fill
                                      className="absolute object-cover opacity-40"
                                    />
                                    <Image
                                      src={item.cards[0].image.url}
                                      alt={
                                        item.cards[0].image.alternativeText ||
                                        "img"
                                      }
                                      width={500}
                                      height={200}
                                      className="absolute object-cover h-[calc(100%-39px)] w-[calc(100%-66px)]"
                                    />
                                    <Image
                                      src="/images/home/star-white.svg"
                                      alt="star"
                                      width={36}
                                      height={36}
                                      className="absolute bottom-[22px] z-10 right-[48px] w-[36px]"
                                    />
                                    <div className="absolute min-h-screen bg-white w-[1px] right-[66px]" />
                                    <div className="absolute w-full bg-white bottom-[39px] h-[1px]" />
                                  </div>
                                ) : (
                                  <Image
                                    src={item.cards[0].image.url}
                                    alt={
                                      item.cards[0].image.alternativeText || "img"
                                    }
                                    fill
                                    className="object-cover object-top"
                                  />
                                )}
                              </>
                            )}
                          </div>
                          {item?.cards[0]?.title && (
                            <SubH2 className="mt-[14px]">
                              {item.cards[0].title}
                            </SubH2>
                          )}
                          {item?.cards[0]?.description && (
                            <BodyText2 className="mt-[10px]">
                              {item.cards[0].description}
                            </BodyText2>
                          )}

                          <div className="flex flex-col gap-2 mt-5">
                            {item.cards[0]?.BulletPoints?.length > 0 &&
                              item.cards[0]?.BulletPoints?.map(
                                (items, index2) => (
                                  <div
                                    className="flex gap-2 items-start"
                                    key={"pointerss_" + index2}
                                  >
                                    <Image
                                      src={"/images/star-orange.svg"}
                                      alt={"star"}
                                      className="object-cover w-[14px] h-[14px] mt-[2px]"
                                      width={14}
                                      height={14}
                                    />
                                    <p className="text-[#4C5861] text-sm">
                                      {items?.title}
                                    </p>
                                  </div>
                                ),
                              )}
                          </div>
                        </>
                      )}
                    </div>
                  }
                  showIcon
                  expanded={expanded === `panel${index}`}
                  handleChange={handleChange(`panel${index}`)}
                  className="!mb-0"
                />
                {/* Grey line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
                {/* Orange progress bar only for active accordion */}
                {index === active && (
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                    style={{
                      width: `${progress}%`,
                      transition: "none",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </FadeInReveal>
    </div>
  );
};

export default DrivingTabsSection;
