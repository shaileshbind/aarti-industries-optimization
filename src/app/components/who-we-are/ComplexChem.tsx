"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { isMobile } from "react-device-detect";
import { BodyText2, BodyText3, H2, SubH2 } from "../Typography2";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import FaqAccordion from "../FaqAccordian";
import { ComplexChemProps } from "@/app/types/who-we-are.type";

const ComplexChem: React.FC<ComplexChemProps> = ({ data }) => {
  const { sectionTitle, content } = data;

  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);

  const startProgress = useCallback(
    (index: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setProgress(0);

      const duration = 8000;
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progressPercent = Math.min((elapsed / duration) * 100, 100);
        setProgress(progressPercent);

        if (progressPercent < 100) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          const nextIndex = (index + 1) % (content?.length || 1);
          setActive(nextIndex);
          setExpanded(`panel${nextIndex}`);
          swiperRef.current?.slideToLoop(nextIndex);
          startProgress(nextIndex);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    },
    [content]
  );

  useEffect(() => {
    startProgress(active);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, startProgress]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        setActive(panelIndex);
        setExpanded(panel);
        startProgress(panelIndex);
      }
    };

  return (
    <div className="py-[50px] md:pb-[140px] md:pt-0 fluid-container">
      {sectionTitle && <H2>{sectionTitle}</H2>}

      {content?.length > 0 && (
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
                              <BodyText2 className="mt-[20px] max-w-[650px]">
                                {item?.description}
                              </BodyText2>
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
                          />
                        )}
                      </div>
                    )}
                  </div>
                }
                faqContent={
                  <div className="block md:hidden ml-[26px] mb-[30px]">
                    <BodyText2>{item?.description}</BodyText2>
                    <div className="mt-[24px] relative  h-[170px] rounded-[10px] overflow-hidden">
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
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
              {/* Orange progress bar (fixed) */}
              {index === active && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplexChem;
