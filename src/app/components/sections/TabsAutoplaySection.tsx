"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BodyText1, BodyText2, Cta, H2, SubH1, SubH2 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import "swiper/css/effect-fade";
import FaqAccordion from "../FaqAccordian";
import clsxN from "../../../../utils/clsxN";
import { RDCardProps } from "@/app/types/r-and-d.type";
import { FadeInReveal } from "../ScrollReveal";
import Link from "next/link";
import { useLenis } from "@/app/contexts/LenisContext";

interface ArrowCtaProps {
  id?: string;
  title?: string;
  hasExternalLink?: string;
  externalLink?: string;
  link?: {
    link?: string;
  };
}
type TabsAutoplayProps = {
  data: RDCardProps[];
  tabClass?: string;
  starImgEffect?: boolean;
  title?: string;
};

const TabsAutoplaySection = ({
  data,
  tabClass,
  title,
  starImgEffect,
}: TabsAutoplayProps) => {
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
  const imageSize = 20;

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

  const startProgress = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const initialProgress = pausedProgressRef.current;
    setProgress(initialProgress);
    startTimeRef.current = performance.now();
    const duration = 15000;

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
        // Move to next slide
        pausedProgressRef.current = 0;
        const nextIndex = (active + 1) % data.length;
        setActive(nextIndex);
        setExpanded(`panel${nextIndex}`);
        if (swiperRef.current) {
          swiperRef.current.slideToLoop(nextIndex);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [active, data.length, isPaused, isInViewport]);

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
    if (isInViewport && !isPaused) {
      startProgress();
    } else {
      // Pause animation when not in viewport
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [active, startProgress, isPaused, isInViewport]);

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
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        pausedProgressRef.current = 0;
        setActive(panelIndex);
        setExpanded(panel);
      }
    };

  return (
    <div ref={sectionRef}>
      {title && (
        <div className="max-w-full lg:max-w-[740px] mx-5 xl:mx-[60px] mb-[30px] lg:mb-[50px]">
          <FadeInReveal>
            <H2>{title}</H2>
          </FadeInReveal>
        </div>
      )}
      {/* Desktop */}
      <FadeInReveal>
        <div className="mx-[20px] lg:mx-[60px] hidden xl:grid grid-cols-[20%_1fr] gap-x-[60px]">
          {/* Tabs */}
          {data?.length > 0 && (
            <div className="mt-[14px]">
              {data?.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleTabClick(index)}
                  className="relative border-b border-transparent cursor-pointer group"
                >
                  <BodyText1
                    className={clsxN(
                      `${
                        index === active ? "text-orange-200" : "text-[#4C5861]"
                      } py-4 relative z-10 transition-colors duration-300 group-hover:text-orange-200 !font-alte-hans`,
                      tabClass,
                    )}
                  >
                    {item?.category}
                  </BodyText1>

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
            className="w-full h-full fadeInSlider"
          >
            {data?.map((tabItem) => (
              <SwiperSlide key={tabItem.id}>
                <div className="grid grid-cols-[1fr_500px] gap-x-[60px] min-h-[520px] h-full">
                  {tabItem?.card?.[0] && (
                    <>
                      <div className="relative min-h-[520px] h-full rounded-[16px] overflow-hidden">
                        {tabItem.card[0]?.image?.url && (
                          <>
                            {starImgEffect ? (
                              <div className="absolute right-0 top-0 w-full min-h-[520px] rounded-[20px] overflow-hidden">
                                <Image
                                  src={tabItem.card[0].image.url}
                                  alt={
                                    tabItem.card[0].image.alternativeText ||
                                    "img"
                                  }
                                  fill
                                  className="absolute object-cover blur-md"
                                />
                                <Image
                                  src={tabItem.card[0].image.url}
                                  alt={
                                    tabItem.card[0].image.alternativeText ||
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
                                src={tabItem.card[0].image.url}
                                alt={
                                  tabItem.card[0].image.alternativeText || "img"
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
                        {tabItem.card[0]?.title && (
                          <SubH2 className="mt-[24px] !font-roboto">
                            {tabItem.card[0].title}
                          </SubH2>
                        )}

                        {tabItem.card[0]?.description && (
                          <BodyText2 className="mt-[18px]">
                            {tabItem.card[0].description}
                          </BodyText2>
                        )}

                        <div className="flex flex-col gap-2 mt-3">
                          {tabItem.card[0]?.BulletPoints?.length > 0 &&
                            tabItem.card[0]?.BulletPoints?.map(
                              (items, index2) => (
                                <div
                                  className="flex gap-2 items-start"
                                  key={"pointerss_" + index2}
                                >
                                  <Image
                                    src={"/images/star-orange.svg"}
                                    alt={"star"}
                                    className="object-cover object-top w-[14px] h-[14px] mt-[4px]"
                                    width={14}
                                    height={14}
                                  />
                                  <p className="text-[#4C5861]">
                                    {items?.title}
                                  </p>
                                </div>
                              ),
                            )}
                        </div>

                        {tabItem?.card[0]?.ctaButton?.title &&
                          (tabItem?.card[0]?.ctaButton?.link?.link ||
                            tabItem?.card[0]?.ctaButton?.externalLink) && (
                            <div className="mt-[18px] pointer-events-auto">
                              <Button
                                title={tabItem.card[0].ctaButton.title}
                                href={
                                  tabItem.card[0].ctaButton.link?.link ||
                                  tabItem.card[0].ctaButton.externalLink
                                }
                                useTargetBlank={
                                  tabItem.card[0]?.ctaButton
                                    ?.hasExternalLink === "true"
                                }
                                secondary
                                className="text-left"
                              />
                            </div>
                          )}
                        {/* Arrow CTA - */}
                        {tabItem?.card[0]?.repeatableCta?.map(
                          (cta: ArrowCtaProps) => {
                            const href =
                              cta?.hasExternalLink === "true"
                                ? cta?.externalLink
                                : cta?.link?.link;
                            const target =
                              cta?.hasExternalLink === "true"
                                ? "_blank"
                                : "_self";
                            if (!cta?.title || !href) return null;
                            return (
                              <Link
                                key={cta?.id}
                                href={href}
                                target={target}
                                className="block"
                              >
                                <div className="flex gap-x-[40px] items-start justify-between cursor-pointer border-b py-4 border-grey-200 group">
                                  <Cta className="bg-transparent !text-blue-200 text-[14px] lg:text-[16px]">
                                    {cta?.title}
                                  </Cta>

                                  <div
                                    className="relative flex items-center shrink-0 justify-center 
                     w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] 
                     rounded-full border border-orange-200 overflow-hidden"
                                  >
                                    <Image
                                      src="/images/arrow-up-right-o.svg"
                                      alt="icon-primary"
                                      width={imageSize}
                                      height={imageSize}
                                      className="absolute transition-transform duration-500 ease-in-out 
                       w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                       group-hover:translate-x-[187.5%] group-hover:-translate-y-[187.5%] 
                       lg:group-hover:translate-x-[150%] lg:group-hover:-translate-y-[150%]"
                                    />

                                    <Image
                                      src="/images/arrow-up-right-o.svg"
                                      alt="icon-secondary"
                                      width={imageSize}
                                      height={imageSize}
                                      className="absolute transition-transform duration-500 ease-in-out 
                       w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                       translate-x-[-187.5%] translate-y-[187.5%] 
                       group-hover:translate-x-0 group-hover:translate-y-0
                       lg:translate-x-[-150%] lg:translate-y-[150%] 
                       lg:group-hover:translate-x-0 lg:group-hover:translate-y-0"
                                    />
                                  </div>
                                </div>
                              </Link>
                            );
                          },
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
      </FadeInReveal>
      {/* Mobile Accordion */}
      {data?.length > 0 && (
        <div className="block xl:hidden w-full px-[20px] pt-[0px] pb-[50px] xl:py-[70px]">
          {data?.map((item, index) => (
            <div key={item.id} className="relative">
              <FaqAccordion
                faqTitle={
                  <SubH1
                    className={`min-h-[38px] flex items-center
                      ${
                        expanded === `panel${index}`
                          ? "text-orange-100"
                          : "text-gray-300"
                      }
                    `}
                  >
                    {item.category}
                  </SubH1>
                }
                faqContent={
                  <div className="mt-0 lg:mt-[20px] mb-[30px]">
                    {item?.card?.[0] && (
                      <>
                        <div
                          className={`relative w-full ${
                            starImgEffect
                              ? "h-[300px] md:h-[400px]"
                              : "h-[200px] md:h-[400px]"
                          }  rounded-[14px] overflow-hidden`}
                        >
                          {item.card[0]?.image?.url && (
                            <>
                              {starImgEffect ? (
                                <div className="absolute right-0 top-0 w-full h-[300px] md:h-[400px] rounded-[14px] overflow-hidden">
                                  <Image
                                    src={item.card[0].image.url}
                                    alt={
                                      item.card[0].image.alternativeText ||
                                      "img"
                                    }
                                    fill
                                    className="absolute object-cover"
                                  />
                                  <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md rounded-lg!"></i>
                                  <Image
                                    src={item.card[0].image.url}
                                    alt={
                                      item.card[0].image.alternativeText ||
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
                                  src={item.card[0].image.url}
                                  alt={
                                    item.card[0].image.alternativeText || "img"
                                  }
                                  fill
                                  className="object-cover object-top"
                                />
                              )}
                            </>
                          )}
                        </div>
                        {item?.card[0]?.title && (
                          <SubH2 className="mt-[14px] !font-roboto">
                            {item.card[0].title}
                          </SubH2>
                        )}
                        {item?.card[0]?.description && (
                          <BodyText2 className="mt-[10px]">
                            {item.card[0].description}
                          </BodyText2>
                        )}

                        {item.card[0]?.BulletPoints?.length > 0 && (
                          <div className="flex flex-col gap-2 mt-5">
                            {item.card[0]?.BulletPoints?.map(
                              (items, index2) => (
                                <div
                                  className="flex gap-2 items-start"
                                  key={"pointerss_" + index2}
                                >
                                  <Image
                                    src={"/images/star-orange.svg"}
                                    alt={"star"}
                                    className="object-cover object-top w-4 h-4 mt-[2px]"
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
                        )}

                        {item?.card[0]?.ctaButton?.title &&
                          (item?.card[0]?.ctaButton?.link?.link ||
                            item?.card[0]?.ctaButton?.externalLink) && (
                            <div className="mt-[18px] pointer-events-auto">
                              <Button
                                title={item.card[0].ctaButton.title}
                                href={
                                  item.card[0].ctaButton.link?.link ||
                                  item.card[0].ctaButton.externalLink
                                }
                                useTargetBlank={
                                  item?.card[0]?.ctaButton?.hasExternalLink ===
                                  "true"
                                }
                                secondary
                                className="text-left"
                              />
                            </div>
                          )}
                        {/* Arrow Cta */}
                        {item?.card[0]?.repeatableCta?.map(
                          (cta: ArrowCtaProps) => {
                            const href =
                              cta?.hasExternalLink === "true"
                                ? cta?.externalLink
                                : cta?.link?.link;
                            const target =
                              cta?.hasExternalLink === "true"
                                ? "_blank"
                                : "_self";
                            if (!cta?.title || !href) return null;
                            return (
                              <Link
                                key={cta?.id}
                                href={href}
                                target={target}
                                className="block"
                              >
                                <div className="flex gap-x-[40px] items-start justify-between cursor-pointer border-b py-4 border-grey-200 group">
                                  <Cta className="bg-transparent !text-blue-200 text-[14px] lg:text-[16px]">
                                    {cta.title}
                                  </Cta>

                                  <div
                                    className="relative flex items-center shrink-0 justify-center 
                     w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] 
                     rounded-full border border-orange-200 overflow-hidden"
                                  >
                                    <Image
                                      src="/images/arrow-up-right-o.svg"
                                      alt="icon-primary"
                                      width={imageSize}
                                      height={imageSize}
                                      className="absolute transition-transform duration-500 ease-in-out 
                       w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                       group-hover:translate-x-[187.5%] group-hover:-translate-y-[187.5%] 
                       lg:group-hover:translate-x-[150%] lg:group-hover:-translate-y-[150%]"
                                    />

                                    <Image
                                      src="/images/arrow-up-right-o.svg"
                                      alt="icon-secondary"
                                      width={imageSize}
                                      height={imageSize}
                                      className="absolute transition-transform duration-500 ease-in-out 
                       w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] 
                       translate-x-[-187.5%] translate-y-[187.5%] 
                       group-hover:translate-x-0 group-hover:translate-y-0
                       lg:translate-x-[-150%] lg:translate-y-[150%] 
                       lg:group-hover:translate-x-0 lg:group-hover:translate-y-0"
                                    />
                                  </div>
                                </div>
                              </Link>
                            );
                          },
                        )}
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
    </div>
  );
};

export default TabsAutoplaySection;
