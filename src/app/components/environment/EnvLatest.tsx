"use client";
import React, { useCallback, useRef, useState } from "react";
import { H2 } from "../Typography2";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { EnvLifeProps } from "@/app/types/environment.type";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { FadeInReveal } from "../ScrollReveal";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { useLenis } from "@/app/contexts/LenisContext";

const EnvLatest = ({ data }: EnvLifeProps) => {
  const { post_categories, sectionTitle } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = post_categories[0]?.posts || [];

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

  return (
    <div className="my-[50px] lg:my-[100px] mb-[80px] lg:mb-[100px]">
      <H2 className="mx-[20px] lg:mx-[60px]">{sectionTitle}</H2>
      <div
        className="lg:mt-[52px] mt-[30px]"
        data-lenis-prevent-touch
        onTouchStart={handleSliderTouchStart}
        onTouchMove={handleSliderTouchMove}
        onTouchEnd={handleSliderTouchEnd}
      >
        <Swiper
          key={`env-latest-${isDesktopPointer}`}
          spaceBetween={24}
          slidesPerView={1.5}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          modules={[Pagination, ...(isDesktopPointer ? [Mousewheel] : [])]}
          pagination={{
            el: ".env-latest-at-swiper",
            type: "progressbar",
          }}
          direction="horizontal"
          {...(isDesktopPointer && {
            mousewheel: {
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            },
          })}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full !px-[20px] lg:!px-[60px] "
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <FadeInReveal delay={0.4 * index}>
                <DateCard
                  imageSrc={item?.image?.url}
                  date={item?.title}
                  desc={item?.description}
                  link={"/blogs/" + item?.slug}
                  animate
                />
              </FadeInReveal>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Progress + Navigation Flex Below Swiper */}
        <div className="mt-[30px] lg:mt-[16px] flex items-center gap-x-[12px] mx-[20px] lg:mx-[60px]">
          {/* Progress Bar */}
          <div className="flex-1 relative h-[1px]">
            <div className="env-latest-at-swiper !pb-0 absolute inset-0 !h-[1.5px]" />
          </div>
          {/* Navigation Buttons */}
          {slides.length > 4 && (
            <div className="hidden lg:flex gap-x-[12px] flex-shrink-0">
              <button
                className={`transition-opacity ${
                  activeIndex === 0
                    ? "pointer-events-none opacity-30"
                    : "cursor-pointer opacity-100"
                }`}
                aria-label="Previous slide"
                aria-disabled={activeIndex === 0}
                onClick={() => swiperRef.current?.slidePrev()}
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
                className={`transition-opacity ${
                  activeIndex >=
                  slides.length -
                    Math.floor(
                      typeof swiperRef.current?.params.slidesPerView ===
                        "number"
                        ? swiperRef.current.params.slidesPerView
                        : 1,
                    )
                    ? "pointer-events-none opacity-30"
                    : "cursor-pointer opacity-100"
                }`}
                aria-label="Next slide"
                aria-disabled={
                  activeIndex >=
                  slides.length -
                    Math.floor(
                      typeof swiperRef.current?.params.slidesPerView ===
                        "number"
                        ? swiperRef.current.params.slidesPerView
                        : 1,
                    )
                }
                onClick={() => swiperRef.current?.slideNext()}
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
  );
};

export default EnvLatest;
