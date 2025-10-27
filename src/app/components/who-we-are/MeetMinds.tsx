"use client";
import React, { useState, useRef } from "react";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

const MeetMinds = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const leadersData = [
    {
      id: 0,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Rajendra V. Gogri",
      desc: "Chairman & Managing Director",
    },
    {
      id: 1,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Rashesh C. Gogri",
      desc: "Vice Chairman & Managing Director",
    },
    {
      id: 2,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Suyog Kotecha",
      desc: "CEO and Executive Director",
    },
    {
      id: 3,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Renil R. Gogri 888",
      desc: "Vice Chairman",
    },
    {
      id: 4,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Rajendra V. Gogri 111",
      desc: "Chairman & Managing Director",
    },
    {
      id: 5,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Rashesh C. Gogri 444",
      desc: "Vice Chairman & Managing Director",
    },
    {
      id: 6,
      img: "/images/who-we-are/leader1.png",
      title: "Shri Suyog Kotecha 222",
      desc: "CEO and Executive Director",
    },
  ];
  return (
    <div className="py-[50px] lg:py-[100px]">
      <H2 className="fluid-container">Meet the Minds Behind Our Growth</H2>
      <div className="mt-[44px]">
        {/* Swiper */}
        <div className="mt-[36px] lg:mt-[40px] ml-[20px] lg:ml-[60px]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1.2}
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
              el: ".leader-section-swiper",
              type: "progressbar",
            }}
            navigation={{
              nextEl: ".swiper-button-next-leaderSection",
              prevEl: ".swiper-button-prev-leaderSection",
            }}
          >
            {leadersData?.map((item) => (
              <SwiperSlide key={item?.id}>
                <div className="relative rounded-[20px] overflow-hidden w-full h-[400px]">
                  <Image
                    src={item?.img}
                    alt="img"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <BodyText2 className="mt-[18px] text-blue-200">
                  {item?.title}
                </BodyText2>
                <BodyText1 className="mt-[4px] text-grey-300">
                  {item?.desc}
                </BodyText1>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Navigation */}
        <div className="w-full mt-[40px]">
          <div className="mx-[20px] lg:mx-[60px] flex items-center lg:gap-x-[32px]">
            <div className="w-[100%] lg:w-[95%] relative">
              <div className="leader-section-swiper" />
            </div>
            <div className="w-fit gap-x-[12px] hidden lg:flex">
              <button
                className={`swiper-button-prev-leaderSection transition-opacity 
                        ${
                          activeIndex === 0
                            ? "pointer-events-none opacity-30"
                            : "cursor-pointer opacity-100"
                        }
                      `}
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
                className={`swiper-button-next-leaderSection transition-opacity ${
                  activeIndex >=
                  (leadersData?.length || 0) -
                    Math.floor(
                      typeof swiperRef.current?.params.slidesPerView ===
                        "number"
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
    </div>
  );
};

export default MeetMinds;
