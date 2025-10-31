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
import { MeetMindsProps } from "@/app/types/who-we-are.type";
import CustomCursorTrigger from "../../CustomCursorTrigger";
import Link from "next/link";

const MeetMinds: React.FC<MeetMindsProps> = ({ data }) => {
  const { sectionTitle, profiles } = data;

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="py-[50px] lg:py-[100px]">
      {sectionTitle && <H2 className="fluid-container">{sectionTitle}</H2>}

      <div className="mt-[44px]">
        {/* Swiper */}
        {profiles?.length > 0 && (
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
              className="!pr-[20px] !lg:pr-[unset]"
            >
              {profiles?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <Link href="#" target="_blank">
                  <CustomCursorTrigger title="Read Bio">
                  <div className="relative rounded-[20px] overflow-hidden w-full h-[400px]">
                    <Image
                      src={item?.image?.url}
                      alt={item?.image?.alternativeText || "leader"}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  {item?.name && (
                    <BodyText2 className="mt-[18px] text-blue-200">
                        
                      {item?.name} 
                    
                    </BodyText2>

                  )}
                  {item?.designation && (
                    <BodyText1 className="mt-[4px] text-grey-300">
                      {item?.designation}
                    </BodyText1>
                  )}
                  </CustomCursorTrigger>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
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
                  (profiles?.length || 0) -
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
