"use client";
import React, { useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
// import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { useLenis } from "@/app/contexts/LenisContext";
import { CDMOSplchemProps } from "@/app/types/cdmo.type";
import { FadeInGroup, FadeInRevealBlur } from "../ScrollReveal";
import { H2, SubH2 } from "../Typography2";
import clsx from "clsx";
import Link from "next/link";

const CardsSlider: React.FC<CDMOSplchemProps> = ({
  data,
  className,
  headingClassName,
  useLink = false,
}) => {
  const { sectionTitle, cards } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const [, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) updateNavState(swiper);
  }, []);

  // Intersection Observer: start/stop autoplay by visibility. Read swiper from ref so it works after mount.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const swiper = swiperRef.current;
        if (!swiper?.autoplay) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!swiper.autoplay.running) swiper.autoplay.start();
          } else {
            if (swiper.autoplay.running) swiper.autoplay.stop();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="pt-[50px] pb-[25px] lg:pt-[140px] lg:pb-[110px] overflow-hidden"
    >
      {/* Content Section */}
      <div className={clsx(`mt-[0px] lg:mt-[62px]`, className)}>
        <div className="flex flex-col w-full">
          {/* Left Content */}
          {sectionTitle && (
            <FadeInRevealBlur
              className={clsx(
                `px-5 lg:pl-[60px] lg:pr-8 lg:w-[60%] w-full flex-shrink-0 mb-0 lg:mb-4`,
              )}
            >
              <H2 className={clsx(`text-blue-200`, headingClassName)}>
                {sectionTitle}
              </H2>
            </FadeInRevealBlur>
          )}

          {/* Right Swiper */}
          <div className="flex-1 min-w-0 mt-[22px] lg:mt-[40px]">
            <FadeInGroup delay={0.2} className="relative">
              <div
                onTouchStart={handleSliderTouchStart}
                onTouchMove={handleSliderTouchMove}
                onTouchEnd={handleSliderTouchEnd}
              >
              <Swiper
                key={`cards-slider-${isDesktopPointer}`}
                spaceBetween={14}
                slidesPerView={1.2}
                breakpoints={{
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    slidesOffsetBefore: 0,
                  },

                  1024: {
                    slidesPerView: 4.2,
                    spaceBetween: 24,
                    slidesOffsetBefore: 40,
                  },
                }}
                modules={[
                  Pagination,
                  Navigation,
                  ...(isDesktopPointer ? [Mousewheel] : []),
                  Autoplay,
                ]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  prevEl: ".swiper-button-prev-simplified",
                  nextEl: ".swiper-button-next-simplified",
                }}
                pagination={{
                  el: ".simplified-swiper-pagination",
                  type: "progressbar",
                }}
                className="w-full !px-5 lg:!px-5 "
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  updateNavState(swiper);
                  // Don't start autoplay immediately - wait for viewport intersection
                  if (swiper.autoplay) {
                    swiper.autoplay.stop();
                  }
                }}
                onSlideChange={(swiper) => updateNavState(swiper)}
                observer={true}
                observeParents={true}
                direction="horizontal"
                {...(isDesktopPointer && {
                  mousewheel: {
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  },
                })}
              >
                {cards?.length > 0 &&
                  cards?.map((item, index) => (
                    <SwiperSlide key={index}>
                      {useLink ? (
                        <Link href={item?.link || "#"}>
                          <Card
                            title={item?.title}
                            src={item?.image?.url}
                            alt={item?.image?.alternativeText}
                          />
                        </Link>
                      ) : (
                        <Card
                          title={item?.title}
                          src={item?.image?.url}
                          alt={item?.image?.alternativeText}
                        />
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>

              {cards && cards.length > 1 && (
                <div
                  className={clsx(
                    "relative py-[30px] mt-0 md:mt-[40px] mb-[20px] mx-[20px] lg:mx-[60px]",
                    "lg:flex lg:justify-between lg:items-center lg:gap-4 lg:pr-[50px]",
                    cards.length <= 4 && "lg:hidden",
                  )}
                >
                  <div className="w-full lg:max-w-[calc(100%-150px)] min-w-0">
                    <div className="simplified-swiper-pagination h-[2px] w-full !relative" />
                  </div>
                  {cards?.length > 4 && (
                    <div className="hidden lg:flex w-fit gap-3 shrink-0 ml-5">
                      <button
                        className={`swiper-button-prev-simplified transition-opacity ${
                          isBeginning
                            ? "pointer-events-none opacity-30"
                            : "cursor-pointer opacity-100"
                        }`}
                        aria-label="Previous slide"
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
                        className={`swiper-button-next-simplified transition-opacity ${
                          isEnd
                            ? "pointer-events-none opacity-30"
                            : "cursor-pointer opacity-100"
                        }`}
                        aria-label="Next slide"
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
              )}
              </div>
            </FadeInGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSlider;

const Card = ({
  title,
  src,
  alt,
}: {
  title: string;
  src: string;
  alt: string;
}) => {
  return (
    <div
      className="relative rounded-[20px] w-full h-[300px] sm:h-[320px] lg:h-[390px] bg-[#EFF3F5] mr-5 lg:mr-0"
      data-scroll
    >
      {title && (
        <SubH2 className="text-blue-200 py-[24px] px-[26px]">{title}</SubH2>
      )}

      {src && (
        <div className="absolute bottom-0 w-full h-[200px] sm:h-[240px] md:h-[220px] xl:h-[272px] rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
          <Image
            src={src}
            alt={alt || title}
            fill
            className="rounded-b-[20px] object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
};
