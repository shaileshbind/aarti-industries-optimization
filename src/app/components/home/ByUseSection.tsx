"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BodyText2, SubH1 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import Button from "../Button";
import gsap from "gsap";
import TitleCard from "../cards/TitleCard";
import type { Swiper as SwiperType } from "swiper";
import { ByUseSectionProps } from "@/app/types/home.type";

const ByUseSection: React.FC<ByUseSectionProps> = ({ data }) => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const contentRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, [active]);

  const handleTabClick = (index: number) => {
    if (index === active || isTransitioning) return;

    setIsTransitioning(true);

    if (contentRef.current) {
      const tl = gsap.timeline();
      tl.to(contentRef.current, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.in",
      })
        .call(() => {
          setActive(index);
        })
        .to(contentRef.current, {
          duration: 0.3,
          opacity: 1,
          ease: "power2.out",
          onComplete: () => {
            setIsTransitioning(false);
          },
        });
    }
  };

  return (
    <div className="pt-[100px] lg:pt-[150px] overflow-hidden">
      {/* Tabs */}
      <div className="ml-[unset] lg:ml-[60px] w-full overflow-x-auto px-5 lg:px-0">
        {data?.length > 0 && (
          <div className="flex overflow-x-auto whitespace-nowrap gap-x-6 lg:gap-x-[72px] w-fit min-w-full lg:min-w-0">
            {data?.map(
              (items, index) =>
                items?.category && (
                  <div
                    key={items?.id}
                    onClick={() => handleTabClick(index)}
                    className={`text-grey-300 font-alte-hans leading-[136%] text-[32px] lg:text-[44px] cursor-pointer flex-shrink-0 transition-all duration-300 ease-out ${
                      active === index ? "text-orange-200" : ""
                    } ${isTransitioning ? "pointer-events-none" : ""}`}
                  >
                    {items?.category}
                  </div>
                )
            )}
          </div>
        )}
      </div>
      {/* Content Section */}
      <div ref={contentRef} className="mt-[40px] lg:mt-[62px]">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Content */}
          <div className="px-5 lg:pl-[60px] lg:pr-8 lg:w-[450px] xl:w-[500px] flex-shrink-0 mb-8 lg:mb-0">
            {data?.[active]?.title && (
              <SubH1 className="text-blue-200">{data?.[active]?.title}</SubH1>
            )}

            {data?.[active]?.description && (
              <BodyText2 className="text-grey-400 mt-[10px] mb-[24px] lg:mb-[36px]">
                {data?.[active]?.description}
              </BodyText2>
            )}

            {data?.[active]?.ctaButton?.title && (
              <Button
                secondary
                href={data?.[active]?.ctaButton?.link || "#"}
                title={data?.[active]?.ctaButton?.title}
              />
            )}
          </div>
          {/* Right Swiper */}
          <div className="flex-1 min-w-0 mt-[42px] lg:mt-[0px]">
            <div className="relative">
              {data?.[active]?.card?.length > 0 && (
                <Swiper
                  key={`swiper-${active}`}
                  spaceBetween={14}
                  slidesPerView={1.2}
                  breakpoints={{
                    1024: {
                      slidesPerView: 2.2,
                      spaceBetween: 24,
                    },
                    1440: {
                      slidesPerView: 2.6,
                      spaceBetween: 24,
                    },
                    1740: {
                      slidesPerView: 3.2,
                      spaceBetween: 24,
                    },
                  }}
                  modules={[Pagination, Navigation, Mousewheel]}
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
                  mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  }}
                  className="w-full !pr-5 lg:!pr-5 !pl-5 lg:pl-[unset]"
                >
                  {data?.[active]?.card?.map((item, index) => (
                    <SwiperSlide key={`${active}-${index}`}>
                      <TitleCard
                        imageSrc={item?.image?.url}
                        title={item?.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Navigation Buttons */}
              <div className="relative py-[30px] mx-[20px] lg:mx-[unset]">
                <div className="hidden lg:flex w-fit gap-3 mt-8 px-5 lg:px-0 absolute bottom-[15px] right-[100px]">
                  <button
                    className={`swiper-button-prev-useBySection transition-opacity ${
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
                    className={`swiper-button-next-useBySection transition-opacity ${
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
                <div className="home-by-use-section-swiper mt-4 bottom-6 h-[2px] max-w-[100%] lg:max-w-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByUseSection;