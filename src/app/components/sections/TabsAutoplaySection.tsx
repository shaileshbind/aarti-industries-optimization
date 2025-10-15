"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BodyText2, SubH1, SubH2 } from "../Typography2";
import Button from "../Button";
import "swiper/css";
import "swiper/css/effect-fade";
import FaqAccordion from "../FaqAccordian";
import clsxN from "../../../../utils/clsxN";

type TabsAutoplayItem = {
  id?: number;
  title?: string;
  src?: string;
  heading?: string;
  desc?: string;
  btnTitle?: string;
  btnLink?: string;
};

type TabsAutoplayProps = {
  data: TabsAutoplayItem[];
  tabClass?: string;
  starImgEffect?: boolean;
};

const TabsAutoplaySection = ({
  data,
  tabClass,
  starImgEffect,
}: TabsAutoplayProps) => {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);

  const startProgress = (index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);

    const duration = 5000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const nextIndex = (index + 1) % data.length;
        setActive(nextIndex);
        if (swiperRef.current) swiperRef.current.slideToLoop(nextIndex);
        startProgress(nextIndex);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgress(active);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (index === active) return;
    setActive(index);
    if (swiperRef.current) swiperRef.current.slideToLoop(index);
    startProgress(index);
  };

  // Sync with swiper slide change
  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActive(realIndex);
    startProgress(realIndex);
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {/* Desktop */}
      <div className="mx-[20px] lg:mx-[60px] my-[70px] lg:my-[120px] hidden lg:grid grid-cols-[25%_1fr] gap-x-[60px]">
        <div className="mt-[14px]">
          {data.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleTabClick(index)}
              className="relative border-b border-transparent cursor-pointer group"
            >
              <SubH2
                className={clsxN(
                  `${
                    index === active ? "text-orange-200" : "text-grey-300"
                  } py-[20px] relative z-10 transition-colors duration-300 group-hover:text-orange-200`,
                  tabClass
                )}
              >
                {item.title}
              </SubH2>

              {/* Grey line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />

              {/* Orange progress bar only for active tab */}
              {index === active && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={800}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          className="w-full h-full "
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid grid-cols-[1fr_500px] gap-x-[40px] min-h-[520px] h-full ">
                <div className="relative min-h-[520px] h-full rounded-[16px] overflow-hidden  ">
                  {item.src && (
                    <>
                      {starImgEffect ? (
                        <div
                          className={`absolute right-0 top-0 w-full min-h-[520px] rounded-[20px] overflow-hidden `}
                        >
                          <Image
                            src={item?.src}
                            alt="img"
                            fill
                            className="absolute object-cover opacity-40 "
                          />
                          <Image
                            src={item?.src}
                            alt="img"
                            width={500}
                            height={548}
                            className="absolute object-cover  h-[calc(100%-64px)] w-[calc(100%-58px)]"
                          />
                          <Image
                            src="/images/home/star-white.svg"
                            alt="img"
                            width={50}
                            height={50}
                            className="absolute bottom-[39.5px] z-10 right-[33.5px] w-[42px] lg:w-[50px]"
                          />
                          <div className="absolute min-h-screen bg-white w-[1px] right-[58px]" />
                          <div className="absolute w-full bg-white bottom-[64px] h-[1px]" />
                        </div>
                      ) : (
                        <Image
                          src={item?.src}
                          alt="img"
                          fill
                          className="object-cover object-top"
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="pointer-events-none select-none">
                  <SubH2 className="mt-[24px]">{item.heading}</SubH2>
                  <BodyText2 className="mt-[18px]">{item.desc}</BodyText2>
                  {item.btnTitle && item.btnLink && (
                    <div className="mt-[18px] pointer-events-auto">
                      <Button
                        title={item.btnTitle}
                        href={item.btnLink}
                        secondary
                      />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Mobile Accordion */}
      <div className="block lg:hidden w-full px-[20px] pt-[0px] pb-[50px] lg:py-[70px]">
        {data.map((item, index) => (
          <FaqAccordion
            key={index}
            faqTitle={
              <SubH1
                className={
                  expanded === `panel${index}`
                    ? "text-orange-100"
                    : "text-gray-300"
                }
              >
                {item.title}
              </SubH1>
            }
            faqContent={
              <div className="mt-[20px] mb-[30px]">
                <div className="relative w-full h-[200px] rounded-[14px] overflow-hidden">
                  {item.src && (
                    <>
                      {starImgEffect ? (
                        <div
                          className={`absolute right-0 top-0 w-full h-[200px] rounded-[14px] overflow-hidden `}
                        >
                          <Image
                            src={item?.src}
                            alt="img"
                            fill
                            className="absolute object-cover opacity-40 "
                          />
                          <Image
                            src={item?.src}
                            alt="img"
                            width={500}
                            height={200}
                            className="absolute object-cover h-[calc(100%-39px)] w-[calc(100%-66px)]"
                          />
                          <Image
                            src="/images/home/star-white.svg"
                            alt="img"
                            width={36}
                            height={36}
                            className="absolute bottom-[22px] z-10 right-[48px] w-[36px] "
                          />
                          <div className="absolute min-h-screen bg-white w-[1px] right-[66px]" />
                          <div className="absolute w-full bg-white bottom-[39px] h-[1px]" />
                        </div>
                      ) : (
                        <Image
                          src={item?.src}
                          alt="img"
                          fill
                          className="object-cover object-top"
                        />
                      )}
                    </>
                  )}
                </div>
                <SubH2 className="mt-[14px]">{item.heading}</SubH2>
                <BodyText2 className="mt-[10px]">{item?.desc}</BodyText2>
              </div>
            }
            showIcon
            expanded={expanded === `panel${index}`}
            handleChange={handleChange(`panel${index}`)}
          />
        ))}
      </div>
    </>
  );
};

export default TabsAutoplaySection;
