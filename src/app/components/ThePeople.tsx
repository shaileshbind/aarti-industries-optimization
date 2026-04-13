"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BodyText1, BodyText2, H2 } from "./Typography2";
import Image from "next/image";
import { ImageProps } from "../types/global.type";
import type { Swiper as SwiperType } from "swiper";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { useLenis } from "@/app/contexts/LenisContext";

interface Testimonials {
  id: number;
  name: string;
  designation: string;
  testimonialText: string;
  image: ImageProps;
  mobImage: ImageProps;
}

interface ThePeopleProps {
  data: {
    title: string;
    testimonials: Testimonials[];
  };
}

const ThePeople: React.FC<ThePeopleProps> = ({ data }) => {
  const { title, testimonials } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const isMobile = useMatchMedia("(max-width:1023px)");
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [navEdges, setNavEdges] = useState({
    isBeginning: true,
    isEnd: testimonials.length <= 1,
  });

  const syncNavEdges = useCallback((swiper: SwiperType) => {
    setNavEdges({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  }, []);

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
      className="w-full mt-[0px] md:mt-10 mb-[72px] md:mb-[90px] pb-[50px] overflow-hidden"
    >
      {title && <H2 className="container lg:text-center mb-11">{title}</H2>}
      {testimonials?.length > 0 && (
        <div className="container !max-w-[90%] lg:!max-w-[900px] relative md:mb-10" onTouchStart={handleSliderTouchStart} onTouchMove={handleSliderTouchMove} onTouchEnd={handleSliderTouchEnd}>
          <div className="mb-3 flex w-full items-center justify-end gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Previous testimonial"
              disabled={navEdges.isBeginning}
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex min-h-[70px] cursor-pointer items-center justify-center touch-manipulation disabled:pointer-events-none disabled:opacity-35"
            >
              <Image
                src="/images/home/chevron-right-orange.svg"
                alt=""
                width={34}
                height={34}
                className="rotate-180"
              />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              disabled={navEdges.isEnd}
              onClick={() => swiperRef.current?.slideNext()}
              className="flex min-h-[70px] cursor-pointer items-center justify-center touch-manipulation disabled:pointer-events-none disabled:opacity-35"
            >
              <Image
                src="/images/home/chevron-right-orange.svg"
                alt=""
                width={34}
                height={34}
              />
            </button>
          </div>
          <Swiper
            key={`the-people-${isDesktopPointer}`}
            spaceBetween={15}
            slidesPerView={1}
            centeredSlides={true}
            autoHeight={false}
            loop={false}
            modules={[
            Navigation,
            Pagination,
            ...(isDesktopPointer ? [Mousewheel] : []),
            Autoplay,
          ]}
            autoplay={{
              delay: isMobile ? 10000 : 15000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => syncNavEdges(swiper)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncNavEdges(swiper);
              // Don't start autoplay immediately - wait for viewport intersection
              if (swiper.autoplay) {
                swiper.autoplay.stop();
              }
            }}
            pagination={{
              el: ".home-by-use-section-swiper",
              type: "progressbar",
            }}
            navigation={{
              nextEl: ".swiper-button-next-people",
              prevEl: ".swiper-button-prev-people",
            }}
            {...(isDesktopPointer && {
              mousewheel: {
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              },
            })}
            className="people-swiper !overflow-visible"
            breakpoints={{
              1024: {
                spaceBetween: 124,
              },
            }}
          >
            {testimonials?.map((person) => (
              <SwiperSlide
                key={person?.id}
                className="opactiSlide transition-all duration-300"
              >
                <div className="slide-box  bg-[#EFF3F5] shadow-lg rounded-xl overflow-hidden flex text-left w-full flex-col md:flex-row ">
                  <div className="w-full md:w-[35%] relative mt-auto md:pt-8 order-2 md:order-1 h-[278px] md:h-full">
                    {person?.image?.url && (
                      <Image
                        src={person?.image?.url}
                        alt={person?.name}
                        width={326}
                        height={350}
                        className="w-full md:w-full  h-full object-contain object-bottom"
                      />
                    )}
                  </div>
                  <div className="w-full md:w-[65%] self-center p-5 md:px-8 md:py-8 order-1 md:order-2">
                    {person?.testimonialText && (
                      <BodyText1>{person?.testimonialText}</BodyText1>
                    )}

                    {person?.name && (
                      <BodyText2 className="mb-1 text-blue-200 mt-8">
                        {person?.name}
                      </BodyText2>
                    )}

                    {person?.designation && (
                      <BodyText2 className="mb-1 text-[#9997A2]">
                        {person?.designation}
                      </BodyText2>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="lg:hidden home-by-use-section-swiper mt-10 h-[2px] w-[90%] mx-auto z-[1]" />
          <div className="hidden lg:block swiper-button-prev-people absolute top-1/2 -translate-y-1/2 right-full mr-[0px] xl:mr-[20px] min-w-[65px] min-h-[70px] p-3  cursor-pointer ">
            <Image
              src="/images/home/chevron-right-orange.svg"
              alt="arrow-left"
              width={34}
              height={34}
              className="rotate-180"
            />
          </div>
          <div className="hidden lg:block swiper-button-next-people absolute top-1/2 -translate-y-1/2 ml-[0px] xl:ml-[20px] left-full min-w-[65px] min-h-[70px] p-3  cursor-pointer">
            <Image
              src="/images/home/chevron-right-orange.svg"
              alt="arrow-left"
              width={34}
              height={34}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThePeople;
