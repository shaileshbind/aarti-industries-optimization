/* eslint-disable */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { BodyText2, H2, SubH1, SubH2 } from "../Typography2";
import "swiper/css";
import "swiper/css/effect-fade";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import FaqAccordion from "../FaqAccordian";
import clsxN from "../../../../utils/clsxN";
import Button from "../Button";
import { EnvRespChemProps } from "@/app/types/environment.type";

const EnvResp = ({ data }: EnvRespChemProps) => {
  const { cardWithCategory, title } = data;
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startProgress = () => {
    // Cancel any existing animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    setProgress(0);
    startTimeRef.current = performance.now();

    const duration = 10000;

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Move to next slide
        const nextIndex = (active + 1) % cardWithCategory.length;
        setActive(nextIndex);
        setExpanded(`panel${nextIndex}`);
        if (swiperRef.current) {
          swiperRef.current.slideToLoop(nextIndex);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  // Start autoplay on mount and when active changes
  useEffect(() => {
    startProgress();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [active, cardWithCategory?.length]);

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (index === active) return;

    // Cancel current animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    setActive(index);
    setExpanded(`panel${index}`);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
    // Progress will restart via useEffect
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        setActive(panelIndex);
        setExpanded(panel);
      }
    };
  return (
    <div className="my-[50px] lg:my-[100px] container mx-[auto]">
      <H2 className="max-w-[760px] ">{title}</H2>
      {/* Desktop */}
      <div className="my-[70px] xl:my-[120px] hidden xl:grid grid-cols-[25%_1fr] gap-x-[60px]">
        {/* Tabs */}
        {cardWithCategory?.length > 0 && (
          <div className="mt-[14px]">
            {cardWithCategory?.map((item: any, index: number) => (
              <div
                key={item.id}
                onClick={() => handleTabClick(index)}
                className="relative border-b border-transparent cursor-pointer group"
              >
                <SubH2
                  className={clsxN(
                    `${
                      index === active ? "text-orange-200" : "text-grey-300"
                    } py-[20px] relative z-10 transition-colors duration-300 group-hover:text-orange-200`
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
                      transition: "none", // Remove transition to prevent glitches
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="relative">
          <div className="relative h-[330px] w-[full]">
            <div className="absolute right-0 top-0 w-full h-[330px] rounded-[20px] overflow-hidden">
              {cardWithCategory[active]?.content?.image?.url && (
                <Image
                  src={cardWithCategory[active]?.content?.image?.url}
                  alt={
                    cardWithCategory[active]?.content.image?.alternativeText
                      ? cardWithCategory[active]?.content.image?.alternativeText
                      : "img"
                  }
                  fill
                  className="absolute object-cover object-top opacity-20"
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
            <div className="flex gap-x-[60px] mt-[30px]">
              <div>
                {/* SDG */}
                <BodyText2>
                  {
                    cardWithCategory[active]?.content?.content?.[0]?.sdgPlay
                      ?.sdgPlayTitle
                  }
                </BodyText2>
                <div className="flex gap-x-[40px] mt-[10px] mb-[30px]">
                  {cardWithCategory[
                    active
                  ]?.content?.content?.[0]?.sdgPlay?.images?.map((img: any) => (
                    <Image
                      key={img?.id}
                      src={img?.url}
                      alt="icon"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ))}
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
                      <div key={bp.id} className="mb-[10px] flex gap-x-[10px]">
                        <Image
                          src="/images/star-orange.svg"
                          alt="icon"
                          width={14}
                          height={14}
                        />
                        <BodyText2>{bp.title}</BodyText2>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {cardWithCategory[active]?.content?.ctaButton?.link &&
            cardWithCategory[active]?.content?.ctaButton?.title && (
              <Button
                secondary
                href={cardWithCategory[active]?.content?.ctaButton?.link}
                title={cardWithCategory[active]?.content?.ctaButton?.title}
                className="mt-[12px]"
              />
            )}
        </div>
      </div>
      {/* Mobile Accordion */}
      {cardWithCategory?.length > 0 && (
        <div className="block xl:hidden w-full py-[30px]">
          {cardWithCategory?.map((item: any, index: number) => (
            <div key={item.id} className="relative">
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
                          <div className="absolute right-0 top-0 w-full h-[300px] rounded-[14px] overflow-hidden">
                            <Image
                              src={item.content?.image.url}
                              alt={item.content?.image.alternativeText || "img"}
                              fill
                              className="absolute object-cover opacity-40"
                            />
                            <Image
                              src={item.content?.image.url}
                              alt={item.content?.image.alternativeText || "img"}
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
                          {item?.content?.content?.map((section: any) => (
                            <div key={section?.id}>
                              {/* SDGs at play */}
                              {section?.sdgPlay?.sdgPlayTitle && (
                                <>
                                  <BodyText2>SDGs at play</BodyText2>
                                  <div className="flex gap-x-[12px] mt-[10px] mb-[28px]">
                                    {section?.sdgPlay?.images?.map(
                                      (img: any) => (
                                        <Image
                                          key={img?.id}
                                          src={img?.url}
                                          alt={img?.alternativeText || "icon"}
                                          width={50}
                                          height={50}
                                          className="objcect-cover"
                                        />
                                      )
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
                                    (bp: any) => (
                                      <div
                                        key={bp?.id}
                                        className="mb-[10px] flex gap-x-[10px]"
                                      >
                                        <Image
                                          src="/images/star-orange.svg"
                                          alt="icon"
                                          width={14}
                                          height={14}
                                        />
                                        <BodyText2>{bp?.title}</BodyText2>
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                          {/* CTA BUTTON STAYS SAME */}
                          {item?.content?.ctaButton?.link &&
                            item?.content?.ctaButton?.title && (
                              <Button
                                secondary
                                href={item?.content?.ctaButton?.link}
                                title={item?.content?.ctaButton?.title}
                                className="mt-[12px]"
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

export default EnvResp;
