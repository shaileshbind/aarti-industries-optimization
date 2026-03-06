"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import SwipeImage from "./SwipeImage";
import { WordReveal } from "../ScrollReveal";
import type { Swiper as SwiperType } from "swiper";
import { CDMOE2EProps } from "@/app/types/cdmo.type";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const CDMOE2E: React.FC<CDMOE2EProps> = ({ data }) => {
  const { title, content, description } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const [active, setActive] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleSlideChange = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  // Intersection Observer for autoplay control
  useEffect(() => {
    const section = sectionRef.current;
    const swiper = swiperRef.current;

    if (!section || !swiper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start autoplay when section enters viewport
            if (swiper.autoplay && !swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          } else {
            // Stop autoplay when section leaves viewport
            if (swiper.autoplay && swiper.autoplay.running) {
              swiper.autoplay.stop();
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: "0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="pt-[22px] lg:pt-[100px] overflow-hidden fluid-container"
    >
      <div className="flex flex-col-reverse lg:flex-row  lg:gap-20">
        {/* LEFT SIDE – TEXT + SWIPER */}
        <div
          className="w-full lg:w-[50%] lg:gap-18 gap-7  mt-[unset] lg:mt-[40px] flex flex-col justify-between align-center"
          ref={contentRef}
        >
          <div>
            {title && (
              <WordReveal stagger={0.1} fromY={10} duration={3}>
                <H2>{title}</H2>
              </WordReveal>
            )}

            {description && (
              <BodyText2 className="mt-4">{description}</BodyText2>
            )}
          </div>

          {/* RIGHT SIDE – DYNAMIC IMAGE SECTION */}

          <div className="relative">
            <Swiper
              key={`cdmo-e2e-${isDesktopPointer}`}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Don't start autoplay immediately - wait for viewport intersection
                if (swiper.autoplay) {
                  swiper.autoplay.stop();
                }
              }}
              slidesPerView={1}
              loop={false}
              spaceBetween={30}
              onSlideChange={(swiper) => setActive(swiper.activeIndex)}
              modules={[
                Pagination,
                Navigation,
                ...(isDesktopPointer ? [Mousewheel] : []),
                Autoplay,
              ]}
              autoplay={{
                delay: 15000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".swiper-button-prev-useBySection",
                nextEl: ".swiper-button-next-useBySection",
              }}
              pagination={{
                el: ".home-by-use-section-swiper",
                type: "progressbar",
              }}
              {...(isDesktopPointer && {
                mousewheel: {
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                },
              })}
              className="rounded-xl overflow-hidden"
            >
              {content?.length > 0 &&
                content?.map((item, index) => (
                  <SwiperSlide key={`${index}`}>
                    <div className="relative w-full h-max overflow-hidden">
                      <div className="relative w-full pt-[100%] overflow-hidden mb-5 !rounded-[10px] items-center justify-center flex lg:hidden">
                        <div className="absolute inset-0 overflow-hidden w-full h-full">
                          <Image
                            src={item?.card?.[index]?.image?.url}
                            alt="active-img"
                            fill
                            className="object-cover scale-120 w-full h-full "
                          />
                          <i className="absolute top-0 left-0 w-full h-full backdrop-blur-3xl !rounded-[10px] overflow-hidden bg-black/10"></i>
                          <span className="absolute rounded-full rounded-br-[28px] overflow-hidden w-full h-full">
                            <Image
                              src={item?.card?.[index]?.image?.url}
                              alt="active-img"
                              fill
                              className="object-cover scale-110 w-full h-full"
                            />
                          </span>
                        </div>
                      </div>

                      {/* Pagination with 01 - 03 format */}
                      <div className="flex items-center z-20 text-orange-200 text-[14px] mb-4 mt-2">
                        <span>{(active + 1).toString().padStart(2, "0")}</span>
                        <span className="mx-1">-</span>
                        <span>
                          {(content?.length || 0).toString().padStart(2, "0")}
                        </span>
                      </div>
                      {item?.category && (
                        <SubH2 className="text-blue-200 pb-2">
                          {item?.category}
                        </SubH2>
                      )}

                      <ul className="mt-2 space-y-2">
                        {item?.card?.length > 0 &&
                          item?.card?.map((feature, idx) =>
                            feature?.BulletPoints?.map((item) => (
                              <li
                                key={`${idx}-${item?.title}`}
                                className="text-sm text-gray-300 flex items-start gap-2"
                              >
                                <Image
                                  src="/images/star-orange.svg"
                                  alt="star"
                                  height={15}
                                  width={15}
                                  className="mt-[2px] lg:mt-[3px]"
                                />

                                <BodyText2 key={item?.title}>
                                  {item?.title}
                                </BodyText2>
                              </li>
                            )),
                          )}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Navigation */}
            <div className="absolute top-0 right-0 py-2 z-10 hidden lg:block bg-white">
              <div className="flex justify-end gap-3 px-5 lg:px-0">
                <button
                  className={`swiper-button-prev-useBySection transition-opacity cursor-pointer`}
                >
                  <Image
                    src="/images/home/chevron-right-orange.svg"
                    alt="Previous"
                    width={34}
                    height={34}
                    className="rotate-180"
                  />
                </button>
                <button
                  className={`swiper-button-next-useBySection transition-opacity cursor-pointer `}
                >
                  <Image
                    src="/images/home/chevron-right-orange.svg"
                    alt="Next"
                    width={34}
                    height={34}
                  />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="home-by-use-section-swiper mt-10 h-[2px] w-[90%] mx-auto z-[1]" />

            {/* Tabs */}
            <div className="overflow-x-auto pt-[40px] px-5 lg:px-0 mt-6">
              <div className="gap-x-6 lg:gap-x-[10px] hidden lg:flex w-full justify-between">
                {content?.length > 0 &&
                  content?.map((items, index) => (
                    <div
                      key={items.id}
                      onClick={() => handleSlideChange(index)}
                    >
                      {items?.category && (
                        <BodyText2
                          className={`cursor-pointer flex-shrink-0 !text-[14px] transition-all duration-300 ${
                            active === index
                              ? "text-orange-200"
                              : "text-[#9997A2] hover:text-orange-100"
                          }`}
                        >
                          {items?.category}
                        </BodyText2>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – DYNAMIC IMAGE SECTION */}
        <div className="w-[50%]">
          <SwipeImage
            activeImg={content?.[active]?.card?.[active]?.image?.url}
          />
        </div>
      </div>
    </div>
  );
};

export default CDMOE2E;
