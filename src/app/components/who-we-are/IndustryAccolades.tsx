"use client";
import React, { useState, useRef, useEffect } from "react";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Image from "next/image";
import "swiper/css/effect-fade";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import { IndustryAccoladesProps } from "@/app/types/who-we-are.type";

const IndustryAccolades: React.FC<IndustryAccoladesProps> = ({ data }) => {
  const { title, awards } = data;

  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = (index: number) => {
    setActive(index);
  };

  // ✅ Reset when changing tabs
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
      setActiveIndex(0);

      // ✅ Force Swiper to update pagination so the progress bar shows fill immediately
      if (swiperRef.current.pagination && swiperRef.current.pagination.el) {
        swiperRef.current.pagination.render(); // render the progressbar fill
        swiperRef.current.pagination.update(); // update it
      }
    }
  }, [active]);

  return (
    <div className="py-[50px] lg:py-[100px]">
      {title && <H2 className="text-center container">{title}</H2>}

      {/* Tabs */}
      {awards?.[0]?.card?.length > 0 && (
        <div className=" mt-[27px] lg:mt-[36px] w-full lg:w-fit flex gap-x-[20px] lg:gap-x-[46px] overflow-x-auto lg:overflow-hidden px-[20px] lg:px-auto mx-[unset] lg:mx-auto">
          {awards?.map((items, index) => (
            <div
              key={items.id}
              onClick={() => handleTabClick(index)}
              className={`border-b px-[13px] pb-[4px] cursor-pointer ${
                active === index ? "border-orange-200" : "border-grey-200"
              }`}
            >
              <BodyText2
                className={`${
                  active === index ? "text-orange-200" : "text-grey-200"
                }`}
              >
                {items?.year}
              </BodyText2>
            </div>
          ))}
        </div>
      )}

      {/* Swiper */}
      {awards?.[active]?.card?.length > 0 && (
        <div className="mt-[36px] lg:mt-[40px] ml-[20px] lg:ml-[60px]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1.5}
            spaceBetween={24}
            breakpoints={{ 1024: { slidesPerView: 4 } }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            observer={true}
            observeParents={true}
            direction="horizontal"
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            modules={[Pagination, Mousewheel, Navigation]}
            pagination={{
              el: ".awards-section-swiper",
              type: "progressbar",
            }}
            navigation={{
              nextEl: ".swiper-button-next-awardsSection",
              prevEl: ".swiper-button-prev-awardsSection",
            }}
          >
            {awards?.[active]?.card?.map((item, idx) => (
              <SwiperSlide key={`${active}-${idx}`}>
                {item?.image?.url && (
                  <div className="bg-[#EFF3F5] rounded-[20px] p-[60px] grid place-items-center">
                    <Image
                      src={item?.image?.url}
                      alt={item?.image?.alternativeText || "award"}
                      width={70}
                      height={190}
                      className="object-contain w-[70px] h-[190px]"
                    />
                  </div>
                )}
                {item?.title && (
                  <BodyText1 className="mt-[14px] text-blue-200">
                    {item?.title}
                  </BodyText1>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {/* Navigation */}
      <div className="w-full mt-[40px]">
        <div className="mx-[20px] lg:mx-[60px] flex items-center lg:gap-x-[32px]">
          <div className="w-[100%] lg:w-[95%] relative">
            <div className="awards-section-swiper" />
          </div>
          <div className="w-fit gap-x-[12px] hidden lg:flex">
            <button
              className={`swiper-button-prev-awardsSection transition-opacity ${
                activeIndex === 0
                  ? "pointer-events-none opacity-30"
                  : "cursor-pointer opacity-100"
              }`}
              aria-label="Previous slide"
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
              className={`swiper-button-next-awardsSection transition-opacity ${
                activeIndex >=
                (awards?.[active]?.card?.length || 0) -
                  Math.floor(
                    typeof swiperRef.current?.params.slidesPerView === "number"
                      ? swiperRef.current.params.slidesPerView
                      : 1
                  )
                  ? "pointer-events-none opacity-30"
                  : "cursor-pointer opacity-100"
              }`}
              aria-label="Next slide"
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
        </div>
      </div>
    </div>
  );
};

export default IndustryAccolades;
