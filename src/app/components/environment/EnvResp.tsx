"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BodyText2, H2, SubH1, SubH2 } from "../Typography2";
import "swiper/css";
import "swiper/css/effect-fade";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import FaqAccordion from "../FaqAccordian";
import clsxN from "../../../../utils/clsxN";
import Button from "../Button";
import { EnvRespChemProps } from "@/app/types/environment.type";
import { FadeInReveal } from "../ScrollReveal";
import { useLenis } from "@/app/contexts/LenisContext";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const EnvResp = ({ data }: EnvRespChemProps) => {
  const { cardWithCategory, title } = data;
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showMore, setshowMore] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const isMobile = useMatchMedia("(max-width: 1279px)");
  const { scrollTo: lenisScrollTo } = useLenis();
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileAnimating, setIsMobileAnimating] = useState(false);
  const [mobileProgress, setMobileProgress] = useState(0);
  const mobileRafRef = useRef<number | null>(null);
  const mobileStartTimeRef = useRef<number>(0);
  const [isMobileInViewport, setIsMobileInViewport] = useState(false);

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
        rafRef.current = null;
      }
      if (mobileRafRef.current) {
        cancelAnimationFrame(mobileRafRef.current);
      }
      setMobileProgress(0);
      setExpanded(false);
      setshowMore(false);

      collapseTimerRef.current = setTimeout(() => {
        const el = accordionRefs.current[panelIndex];
        if (el) {
          const offset = getHeaderOffset();
          lenisScrollTo(el, { offset: -offset, duration: 0.8 });
        }
        expandTimerRef.current = setTimeout(() => {
          setActive(panelIndex);
          setExpanded(`panel${panelIndex}`);
          expandTimerRef.current = null;
          setIsMobileAnimating(false);
        }, 100);
        collapseTimerRef.current = null;
      }, 350);
    },
    [lenisScrollTo],
  );

  // Mobile progress bar autoplay (15s, viewport-gated)
  const startMobileProgress = useCallback(() => {
    if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current);
    setMobileProgress(0);
    mobileStartTimeRef.current = performance.now();
    const duration = 15000;

    const animate = (time: number) => {
      if (!isMobileInViewport) return;
      const elapsed = time - mobileStartTimeRef.current;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setMobileProgress(percent);

      if (percent < 100) {
        mobileRafRef.current = requestAnimationFrame(animate);
      } else {
        const nextIndex = (active + 1) % (cardWithCategory?.length || 1);
        mobileScrollAndExpand(nextIndex);
      }
    };
    mobileRafRef.current = requestAnimationFrame(animate);
  }, [active, cardWithCategory?.length, isMobileInViewport, mobileScrollAndExpand]);

  // Mobile viewport observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsMobileInViewport(entry.isIntersecting);
          if (!entry.isIntersecting && mobileRafRef.current) {
            cancelAnimationFrame(mobileRafRef.current);
            setMobileProgress(0);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Kick off mobile progress when accordion is expanded + in viewport
  useEffect(() => {
    if (!isMobile || isMobileAnimating || !isMobileInViewport) return;
    if (expanded === false) return;
    startMobileProgress();
    return () => {
      if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current);
    };
  }, [expanded, isMobile, isMobileAnimating, isMobileInViewport, startMobileProgress]);

  // Desktop autoplay (unchanged, skipped on mobile)
  const startProgress = (resumeFrom: number = 0) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = performance.now();
    const duration = 10000;

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const progressPercent = Math.min(
        resumeFrom + (elapsed / duration) * 100,
        100,
      );
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const nextIndex = (active + 1) % cardWithCategory.length;
        setActive(nextIndex);
        setExpanded(`panel${nextIndex}`);
        setshowMore(false);
        if (swiperRef.current) {
          swiperRef.current.slideToLoop(nextIndex);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const pauseProgress = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pausedAtRef.current = progress;
  };

  const resumeProgress = () => {
    startProgress(pausedAtRef.current);
  };

  useEffect(() => {
    if (isHovered) {
      pauseProgress();
    } else if (pausedAtRef.current > 0) {
      resumeProgress();
    }
  }, [isHovered]);

  // Desktop-only autoplay restart
  useEffect(() => {
    if (isMobile) return;
    pausedAtRef.current = 0;
    setProgress(0);
    startProgress(0);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, cardWithCategory?.length, isMobile]);

  const handleTabClick = (index: number) => {
    if (index === active) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    pausedAtRef.current = 0;
    setActive(index);
    setExpanded(`panel${index}`);
    if (swiperRef.current) swiperRef.current.slideToLoop(index);
    setshowMore(false);
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        if (isMobile) {
          mobileScrollAndExpand(panelIndex);
        } else {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          pausedAtRef.current = 0;
          setActive(panelIndex);
          setExpanded(panel);
        }
      }
    };

  return (
    <FadeInReveal className="my-[50px] lg:my-[100px] container mx-[auto]">
      <div ref={sectionRef}>
      <H2 className="max-w-[760px] ">{title}</H2>
      {/* Desktop */}
      <div
        className="my-[70px] xl:my-[120px] hidden xl:grid grid-cols-[25%_1fr] gap-x-[60px] relative items-start"
      >
        {/* Tabs */}
        {cardWithCategory?.length > 0 && (
          <div className="mt-[14px]">
            {cardWithCategory?.map((item, index: number) => (
              <div
                key={item.id}
                onClick={() => handleTabClick(index)}
                className="relative border-b border-transparent cursor-pointer group"
              >
                <SubH2
                  className={clsxN(
                    `${index === active ? "text-orange-200" : "text-grey-300"
                    } py-[20px] relative z-10 transition-colors duration-300 group-hover:text-orange-200`,
                  )}
                >
                  {item?.category}
                </SubH2>

                {/* Grey line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />

                {/* Orange progress bar only for active tab */}
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
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[330px] w-[full]">
            <div className="absolute right-0 top-0 w-full h-[330px] rounded-[20px] overflow-hidden">
              {cardWithCategory[active]?.content?.image?.url && (
                <Image
                  src={cardWithCategory[active]?.content?.image?.url}
                  alt={
                    cardWithCategory[active]?.content.image?.alternativeText
                    || "img"
                  }
                  fill
                  className="absolute object-cover object-top  blur-md "
                />
              )}
              {cardWithCategory[active]?.content?.image?.url && (
                <Image
                  src={cardWithCategory[active]?.content?.image.url}
                  alt={
                    cardWithCategory[active]?.content?.image.alternativeText ||
                    "img"
                  }
                  width={500}
                  height={548}
                  className="absolute object-cover object-top h-[calc(100%-64px)] w-[calc(100%-58px)]"
                />
              )}
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
          </div>
          <div className="mt-[30px]">
            <BodyText2>
              {cardWithCategory?.[active]?.content?.description}
            </BodyText2>

            {!showMore && (
              <div
                onClick={() => {
                  setshowMore(true);
                }}
                className="mt-2 cursor-pointer inline-flex"
              >
                <BodyText2 className="text-[#002F50] underline mb-3">
                  {"Read More"}
                </BodyText2>
              </div>
            )}

            {showMore && (
              <div className="w-full grid grid-cols-[300px_1fr] gap-x-[60px] mt-[30px]">
                <div>
                  {/* SDG */}
                  <BodyText2>
                    {
                      cardWithCategory[active]?.content?.content?.[0]?.sdgPlay
                        ?.sdgPlayTitle
                    }
                  </BodyText2>
                  <div className="flex gap-x-[20px] mt-[10px] mb-[30px]">
                    {cardWithCategory[
                      active
                    ]?.content?.content?.[0]?.sdgPlay?.images?.map(
                      (img, index) => (
                        <Image
                          key={"img?.id" + index}
                          src={img?.url || ""}
                          alt="icon"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ),
                    )}
                  </div>
                  {cardWithCategory[active]?.content?.content?.map((item) => (
                    <div key={item?.id}>
                      {/* Material Topics */}
                      {item?.materialTopics?.label && (
                        <BodyText2 className="text-grey-300">
                          {item.materialTopics.label}
                        </BodyText2>
                      )}
                      {item?.materialTopics?.value && (
                        <BodyText2>{item.materialTopics.value}</BodyText2>
                      )}

                      {/* Capital Impacted */}
                      {item?.capitalImpacted?.title && (
                        <BodyText2 className="text-grey-300 mt-[30px]">
                          {item.capitalImpacted.title}
                        </BodyText2>
                      )}
                      {item?.capitalImpacted?.value && (
                        <BodyText2>{item.capitalImpacted.value}</BodyText2>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  {cardWithCategory[active]?.content?.content?.map((item) => (
                    <div key={item.id}>
                      {/* Target */}
                      {item.target?.label && (
                        <BodyText2>{item.target.label}</BodyText2>
                      )}
                      {item.target?.value && (
                        <BodyText2 className="text-grey-300">
                          {item.target.value}
                        </BodyText2>
                      )}

                      {/* Performance */}
                      {item.performance?.label && (
                        <BodyText2 className="mt-[30px] mb-[12px]">
                          {item.performance.label}
                        </BodyText2>
                      )}

                      {item.performance?.bulletPoints?.map((bp) => (
                        <div
                          key={bp.id}
                          className="mb-[10px] flex gap-x-[10px] items-start"
                        >
                          <Image
                            src="/images/star-orange.svg"
                            alt="icon"
                            width={14}
                            height={14}
                            className="mt-1.25"
                          />
                          <BodyText2>{bp.title}</BodyText2>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {cardWithCategory[active]?.content?.ctaButton?.title &&
            (cardWithCategory[active]?.content?.ctaButton?.externalLink ||
              cardWithCategory[active]?.content?.ctaButton?.link?.link) && (
              <Button
                secondary
                href={
                  cardWithCategory[active]?.content?.ctaButton
                    ?.hasExternalLink === "true"
                    ? cardWithCategory[active]?.content?.ctaButton?.externalLink
                    : cardWithCategory[active]?.content?.ctaButton?.link?.link
                }
                title={cardWithCategory[active]?.content?.ctaButton?.title}
                useTargetBlank={
                  cardWithCategory[active]?.content?.ctaButton
                    ?.hasExternalLink === "true"
                }
                className="mt-[12px]"
              />
            )}
        </div>
      </div>
      {/* Mobile Accordion - remains unchanged */}
      {cardWithCategory?.length > 0 && (
        <div className="block xl:hidden w-full py-[30px]">
          {cardWithCategory?.map((item, index: number) => (
            <div
              key={item.id}
              className="relative"
              ref={(el) => { accordionRefs.current[index] = el; }}
            >
              <FaqAccordion
                faqTitle={
                  <SubH1
                    className={
                      expanded === `panel${index}`
                        ? "text-orange-100"
                        : "text-gray-300"
                    }
                  >
                    {item?.category}
                  </SubH1>
                }
                faqContent={
                  <div className="mt-[20px] mb-[30px]">
                    {item?.content && (
                      <>
                        <div className="relative w-full h-[300px] rounded-[14px] overflow-hidden">
                          <div className="absolute right-0 top-0 w-full h-[300px] rounded-[20px] overflow-hidden! ">
                            <Image
                              src={item.content?.mobImage?.url || ""}
                              alt={
                                item.content?.mobImage?.alternativeText || "img"
                              }
                              fill
                              className="absolute object-cover  overflow-hidden rounded-lg!"
                            />
                            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md rounded-lg!"></i>
                            <Image
                              src={item.content?.mobImage?.url || ""}
                              alt={
                                item.content?.mobImage?.alternativeText || "img"
                              }
                              width={500}
                              height={300}
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
                        </div>
                        {item?.content?.description && (
                          <BodyText2 className="mt-[20px]">
                            {item.content.description}
                          </BodyText2>
                        )}
                        <div className="mt-[28px]">
                          {item?.content?.content?.map((section) => (
                            <div key={section?.id}>
                              {/* SDGs at play */}
                              {section?.sdgPlay?.sdgPlayTitle && (
                                <>
                                  <BodyText2>SDGs at play</BodyText2>
                                  <div className="flex gap-x-[12px] mt-[10px] mb-[28px]">
                                    {section?.sdgPlay?.images?.map(
                                      (img, index2) => (
                                        <Image
                                          key={"i" + index2}
                                          src={img?.url || ""}
                                          alt={img?.alternativeText || "icon"}
                                          width={50}
                                          height={50}
                                          className="objcect-cover"
                                        />
                                      ),
                                    )}
                                  </div>
                                </>
                              )}

                              <div className="flex gap-x-[30px] mt-[28px]">
                                {/* Material Topics */}
                                {section?.materialTopics && (
                                  <div>
                                    <BodyText2 className="text-grey-300">
                                      {section?.materialTopics?.label}
                                    </BodyText2>
                                    <BodyText2>
                                      {section?.materialTopics?.value}
                                    </BodyText2>
                                  </div>
                                )}
                                {/* Capital Impacted */}
                                {section?.capitalImpacted && (
                                  <div>
                                    <BodyText2 className="text-grey-300">
                                      {section?.capitalImpacted?.title}
                                    </BodyText2>
                                    <BodyText2>
                                      {section?.capitalImpacted?.value}
                                    </BodyText2>
                                  </div>
                                )}
                              </div>

                              {/* Target */}
                              {section?.target && (
                                <>
                                  <BodyText2 className="mt-[28px]">
                                    Target
                                  </BodyText2>
                                  <BodyText2 className="text-grey-300">
                                    {section?.target?.value}
                                  </BodyText2>
                                </>
                              )}
                              {/* Performance */}
                              {section?.performance && (
                                <>
                                  <BodyText2 className="mt-[28px]">
                                    Performance
                                  </BodyText2>

                                  {section?.performance?.bulletPoints?.map(
                                    (bp) => (
                                      <div
                                        key={bp?.id}
                                        className="mb-[10px] flex gap-x-[10px] items-start"
                                      >
                                        <Image
                                          src="/images/star-orange.svg"
                                          alt="icon"
                                          width={14}
                                          height={14}
                                          className="mt-1.25"
                                        />
                                        <BodyText2>{bp?.title}</BodyText2>
                                      </div>
                                    ),
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                          {/* CTA BUTTON STAYS SAME */}
                          {item?.content?.ctaButton?.title &&
                            (item?.content?.ctaButton?.externalLink ||
                              item?.content?.ctaButton?.link?.link) && (
                              <Button
                                secondary
                                href={
                                  item?.content?.ctaButton?.hasExternalLink ===
                                    "true"
                                    ? item?.content?.ctaButton?.externalLink
                                    : item?.content?.ctaButton?.link?.link
                                }
                                title={item?.content?.ctaButton?.title}
                                useTargetBlank={
                                  item?.content?.ctaButton?.hasExternalLink ===
                                  "true"
                                }
                                className="mt-[12px] mb-[20px]"
                              />
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
              {/* Orange progress bar */}
              {isMobile
                ? expanded === `panel${index}` && (
                    <div
                      className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                      style={{ width: `${mobileProgress}%`, transition: "none" }}
                    />
                  )
                : index === active && (
                    <div
                      className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                      style={{ width: `${progress}%`, transition: "none" }}
                    />
                  )}
            </div>
          ))}
        </div>
      )}
      </div>
    </FadeInReveal>
  );
};

export default EnvResp;
