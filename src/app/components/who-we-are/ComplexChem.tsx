"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { BodyText1, BodyText2, BodyText3, H2, SubH2 } from "../Typography2";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import FaqAccordion from "../FaqAccordian";
import { ComplexChemProps } from "@/app/types/who-we-are.type";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { FadeInReveal } from "../ScrollReveal";

const ComplexChem: React.FC<ComplexChemProps> = ({ data }) => {
  const { sectionTitle, content, description } = data;

  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInViewportRef = useRef(false);
  const activeRef = useRef(0);
  const contentLengthRef = useRef(content?.length || 1);
  const startProgressRef = useRef<((index: number) => void) | null>(null);
  const isMobile = useMatchMedia("(max-width:820px)");

  // Update refs when values change
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    contentLengthRef.current = content?.length || 1;
  }, [content]);

  // Create startProgress function
  const startProgress = useCallback((index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);

    const duration = 20000;
    const startTime = performance.now();

    const animate = (time: number) => {
      // Check viewport before continuing animation
      if (!isInViewportRef.current) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        return;
      }

      const elapsed = time - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Only proceed to next if still in viewport
        if (isInViewportRef.current && startProgressRef.current) {
          const nextIndex = (index + 1) % contentLengthRef.current;
          activeRef.current = nextIndex;
          setActive(nextIndex);
          setExpanded(`panel${nextIndex}`);
          swiperRef.current?.slideToLoop(nextIndex);
          startProgressRef.current(nextIndex);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Store startProgress in ref
  useEffect(() => {
    startProgressRef.current = startProgress;
  }, [startProgress]);

  // Intersection Observer to detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInViewport = isInViewportRef.current;
          isInViewportRef.current = entry.isIntersecting;

          if (entry.isIntersecting && !wasInViewport) {
            // Section just entered viewport - start animation
            if (startProgressRef.current) {
              startProgressRef.current(activeRef.current);
            }
          } else if (!entry.isIntersecting && wasInViewport) {
            // Section just left viewport - stop animation
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
            setProgress(0);
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
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        activeRef.current = panelIndex;
        setActive(panelIndex);
        setExpanded(panel);
        // Only start progress if in viewport
        if (isInViewportRef.current && startProgressRef.current) {
          startProgressRef.current(panelIndex);
        }
      }
    };

  return (
    <div ref={sectionRef} className="pb-[50px] md:pb-[140px] md:pt-0 fluid-container">
      {(sectionTitle || description) && (
        <FadeInReveal delay={0.6}>
          {sectionTitle && <H2>{sectionTitle}</H2>}
          {description && (
            <BodyText2 className="text-grey-400 mt-[8px] max-w-[700px]">
              {description}
            </BodyText2>
          )}
        </FadeInReveal>
      )}

      {content?.length > 0 && (
        <FadeInReveal delay={0.6}>
          <div className="mt-[30px] md:mt-[60px]">
            {content?.map((item, index) => (
              <div key={index} className="relative complex-chemistry">
                <FaqAccordion
                  faqTitle={
                    <div
                      className={`w-full flex gap-x-[48px] justify-between ${
                        expanded === `panel${index}`
                          ? "my-[unset]"
                          : "my-[18px] md:my-[30px]"
                      }`}
                    >
                      <div className="flex items-start gap-x-[12px] md:gap-x-[48px]">
                        <BodyText3 className="text-orange-200 mt-[5px]">
                          0{index + 1}
                        </BodyText3>
                        <div>
                          {item?.title && (
                            <SubH2 className="max-w-[70%] lg:max-w-[unset]">
                              {item?.title}
                            </SubH2>
                          )}
                          {expanded === `panel${index}` && (
                            <div className="relative not-last:mt-[20px] hidden md:block ">
                              {item?.description && (
                                <BodyText1 className="mt-[20px] max-w-[650px]">
                                  {item?.description}
                                </BodyText1>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {expanded === `panel${index}` && (
                        <div className="relative md:w-1/2 lg:w-[290px] h-[200px] rounded-[20px] overflow-hidden hidden md:block md:mr-6 lg:mr-[88px]">
                          {item?.image?.url && (
                            <Image
                              src={item?.image?.url}
                              alt="img"
                              fill
                              className="object-cover object-top"
                              sizes="360px"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  }
                  faqContent={
                    <div className="block md:hidden ml-[26px] mb-[30px]">
                      <BodyText2>{item?.description}</BodyText2>
                      <div className="mt-[24px] relative  h-[170px] md:h-[240px] rounded-[10px] overflow-hidden">
                        {item?.mobImage?.url && (
                          <Image
                            src={item?.mobImage?.url}
                            alt="img"
                            fill
                            className="object-cover object-top"
                          />
                        )}
                      </div>
                    </div>
                  }
                  showIcon={isMobile}
                  expanded={expanded === `panel${index}`}
                  handleChange={handleChange(`panel${index}`)}
                />
                {/* Grey base line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200" />
                {/* Orange progress bar (fixed) */}
                {index === active && (
                  <div
                    className="absolute bottom-0 left-0 h-[1px] bg-orange-200 z-10"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            ))}
          </div>
        </FadeInReveal>
      )}
    </div>
  );
};

export default ComplexChem;
