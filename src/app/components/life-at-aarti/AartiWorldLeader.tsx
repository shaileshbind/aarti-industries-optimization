"use client";
import React, { useEffect, useRef, useState } from "react";
import { BodyText2, H2, SubH2, SubH3 } from "../Typography2";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { LAAWorldProps } from "@/app/types/life-at-aarti.type";

const AartiWorldLeader = ({ data }: LAAWorldProps) => {
  const { title, leadersCard } = data;
  const [active, setActive] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, [active]);

  return (
    <div className="mt-[unset] mb-[72px] lg:my-[120px]">
      {title && (
        <H2 className="mx-[20px] lg:mx-[auto] text-left lg:text-center">
          {title}
        </H2>
      )}
      <div className="mt-[28px] lg:mt-[48px] container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] xl:grid-cols-[500px_1fr] container gap-y-[16px] md:gap-x-[20px] xl:gap-x-[80px]">
          {/* image section */}
          <div className="w-[100%] h-[300px] lg:h-[450px] overflow-hidden rounded-[14px] lg:rounded-[20px] relative">
            {leadersCard?.[active]?.image?.url && (
              <Image
                src={leadersCard?.[active]?.image?.url}
                alt={
                  leadersCard?.[active]?.image?.alternativeText
                    ? leadersCard?.[active]?.image?.alternativeText
                    : "img"
                }
                fill
                className="object-cover object-top"
              />
            )}
          </div>
          {/* content */}
          <div className="relative">
            {/* tabs */}
            <div className="flex gap-x-[8px] w-full">
              {leadersCard?.map((items, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      swiperRef.current?.slideTo(index);
                      setActive(index);
                    }}
                    className="leader-thumb p-[6px] relative"
                  >
                    <svg
                      className={`progress-border ${
                        active === index ? "active" : ""
                      }`}
                      width="60"
                      height="60"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="10"
                        ry="10"
                        pathLength="1"
                      />
                    </svg>

                    <div
                      className={`w-[48px] h-[48px] rounded-[6px] relative overflow-hidden cursor-pointer ${
                        active === index ? "" : "opacity-50"
                      }`}
                    >
                      {items?.image?.url && (
                        <Image
                          src={items?.image?.url}
                          alt={
                            items?.image?.alternativeText
                              ? items?.image?.alternativeText
                              : "img"
                          }
                          fill
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-[30px] md:max-w-[350px] lg:max-w-[560px]">
              <Swiper
                slidesPerView={1}
                spaceBetween={24}
                modules={[Navigation, Mousewheel, Autoplay]}
                direction="horizontal"
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
                navigation={{
                  prevEl: ".swiper-button-prev-aartiWorld",
                  nextEl: ".swiper-button-next-aartiWorld",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                  setActive(swiper.activeIndex);
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                className="w-full"
              >
                {leadersCard?.map((items) => {
                  return (
                    <SwiperSlide key={items?.id}>
                      <SubH2 className="text-grey-400">{items?.message}</SubH2>
                      <SubH3 className="mt-[18px] lg:mt-[30px] !text-[16px] md:!text-[20px]">
                        {items?.name}
                      </SubH3>
                      <BodyText2 className="mt-[4px]">
                        {items?.designation}
                      </BodyText2>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Arrows */}
              {leadersCard && leadersCard?.length > 1 && (
                <div className="mt-[8px] flex gap-x-4 justify-end ">
                  <button
                    className={`swiper-button-prev-aartiWorld transition-opacity ${
                      isBeginning
                        ? "pointer-events-none opacity-30"
                        : "cursor-pointer opacity-100"
                    }`}
                    aria-label="Previous slide"
                    aria-disabled={isBeginning}
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
                    className={`swiper-button-next-aartiWorld transition-opacity ${
                      isEnd
                        ? "pointer-events-none opacity-30"
                        : "cursor-pointer opacity-100"
                    }`}
                    aria-label="Next slide"
                    aria-disabled={isEnd}
                  >
                    <Image
                      src="/images/home/chevron-right-orange.svg"
                      alt="Next"
                      width={34}
                      height={34}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
  .progress-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    pointer-events: none;
  }

  /* invisible by default */
  .progress-border rect {
    fill: none;
    stroke: #DC4C03;
    stroke-width: 2;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
  }

  /* when active: animate continuously around */
  .progress-border.active rect {
    animation: traceBorder 5s linear forwards;
  }

  /* perfect continuous clockwise trace */
  @keyframes traceBorder {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

      `}</style>
    </div>
  );
};

export default AartiWorldLeader;
