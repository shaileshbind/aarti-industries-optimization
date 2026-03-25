"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SubH1 } from "../Typography2";
import { CategoryProductsProps } from "@/app/types/mahasuper.type";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Mousewheel, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import CategoryCard from "../cards/CategoryCard";
import { FadeInReveal } from "../ScrollReveal";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import { useLenis } from "@/app/contexts/LenisContext";

const CategoryProducts: React.FC<CategoryProductsProps> = ({ data }) => {
  const { title, card } = data;
  const isDesktopPointer = useMatchMedia("(pointer: fine)");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperReady, setSwiperReady] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !swiperReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const swiper = swiperRef.current;
        if (!swiper?.autoplay || swiper.destroyed) return;

        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [swiperReady]);

  return (
    <section
      ref={sectionRef}
      className="md:py-20 pb-[30px] pt-0 overflow-hidden "
    >
      <div className="md:mt-[40px] mt-[0px] lg:mt-[62px]">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Content */}
          <FadeInReveal className="px-5 lg:pl-[60px] lg:pr-8 lg:w-[380px] flex-shrink-0 mb-8 lg:mb-0">
            <SubH1 className="text-blue-200">{title}</SubH1>
          </FadeInReveal>
          {/* Right Swiper */}
          <FadeInReveal
            delay={0.4}
            className="flex-1 min-w-0 mt-[8px] lg:mt-[0px]"
          >
            <div className="relative">
              {card?.length > 0 && (
                <div
                  onTouchStart={handleSliderTouchStart}
                  onTouchMove={handleSliderTouchMove}
                  onTouchEnd={handleSliderTouchEnd}
                >
                  <Swiper
                    key={`category-products-${isDesktopPointer}`}
                    spaceBetween={14}
                    slidesPerView={1.2}
                    breakpoints={{
                      600: {
                        slidesPerView: 2.5,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: 2.2,
                        spaceBetween: 24,
                      },
                      1440: {
                        slidesPerView: 2.6,
                        spaceBetween: 24,
                      },
                      1740: {
                        slidesPerView: 3.6,
                        spaceBetween: 24,
                      },
                    }}
                    modules={[
                      Pagination,
                      Navigation,
                      ...(isDesktopPointer ? [Mousewheel] : []),
                      Autoplay,
                    ]}
                    autoplay={{
                      delay: 115000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: false,
                    }}
                    navigation={{
                      prevEl: ".swiper-button-prev-useBySection",
                      nextEl: ".swiper-button-next-useBySection",
                    }}
                    pagination={{
                      el: ".home-by-use-section-swiper",
                      type: "progressbar",
                    }}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                      setIsBeginning(swiper.isBeginning);
                      setIsEnd(swiper.isEnd);
                      setSwiperReady(true);
                    }}
                    onSlideChange={(swiper) => {
                      setIsBeginning(swiper.isBeginning);
                      setIsEnd(swiper.isEnd);
                    }}
                    onReachBeginning={() => {
                      setIsBeginning(true);
                    }}
                    onReachEnd={() => {
                      setIsEnd(true);
                    }}
                    onFromEdge={(swiper) => {
                      setIsBeginning(swiper.isBeginning);
                      setIsEnd(swiper.isEnd);
                    }}
                    direction="horizontal"
                    {...(isDesktopPointer && {
                      mousewheel: {
                        forceToAxis: true,
                        sensitivity: 1,
                        releaseOnEdges: true,
                      },
                    })}
                    className="w-full !pr-5 lg:!pr-5 !pl-5 lg:!pl-0 catgoryProductsSwiper"
                  >
                    {card?.map((item, index) => (
                      <SwiperSlide key={`${index}`}>
                        <div className="title-card-anim">
                          <CategoryCard
                            imageSrc={item?.image?.url}
                            imageAlt={item?.image?.alternativeText}
                            title={item?.title}
                            description={item?.description}
                            // className="h-[410px]"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center gap-5 lg:gap-10 py-[30px] ml-[20px] lg:ml-0 mr-[20px] lg:mr-[60px]">
                <div className="flex-1 h-[2px] relative min-w-0">
                  <div className="home-by-use-section-swiper w-full h-full" />
                </div>
                <div className="hidden lg:flex gap-3 shrink-0 items-center">
                  <button
                    className={`swiper-button-prev-useBySection transition-opacity ${
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
                    className={`swiper-button-next-useBySection transition-opacity ${
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
              </div>
            </div>
          </FadeInReveal>
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
