"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import SwipeImage from "./SwipeImage";
import { WordReveal } from "../ScrollReveal";
import type { Swiper as SwiperType } from "swiper";
import { CDMOE2EProps } from "@/app/types/cdmo.type";

const CDMOE2E: React.FC<CDMOE2EProps> = ({ data }) => {
  const { title, content, description } = data;
console.log('content', data);
  const [active, setActive] = useState(0);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [activeImg, setActiveImg] = useState<string>("");

  const contentRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="pt-[50px] lg:pt-[100px] overflow-hidden fluid-container">
      <div className="flex flex-col-reverse lg:flex-row items-start gap-10">
        {/* LEFT SIDE – TEXT + SWIPER */}
        <div
          className="w-full lg:w-1/2 lg:gap-18 gap-7 h-full mt-[unset] lg:mt-[40px] flex flex-col justify-between align-center"
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
          <div className="relative w-full h-[300px] overflow-hidden rounded-[1rem] items-center justify-center flex lg:hidden">
            {content?.[active]?.card?.[active]?.image?.url && (
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={content?.[active]?.card?.[active]?.image?.url}
                  alt="active-img"
                  fill
                  className="object-cover scale-110"
                />
                <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                <span className="absolute rounded-full rounded-br-[28px] overflow-hidden w-[100%] h-[100%]">
                  <Image
                    src={content?.[active]?.card?.[active]?.image?.url}
                    alt="active-img"
                    fill
                    className="object-cover scale-110"
                  />
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              loop={false}
              spaceBetween={30}
              onSlideChange={(swiper) => setActive(swiper.activeIndex)}
              // onSlideChangeTransitionStart={(swiper) => setActive(swiper.activeIndex)}
              modules={[Pagination, Navigation]}
              navigation={{
                prevEl: ".swiper-button-prev-useBySection",
                nextEl: ".swiper-button-next-useBySection",
              }}
              pagination={{
                el: ".home-by-use-section-swiper",
                type: "progressbar",
              }}
              className="rounded-xl overflow-hidden"
            >
              {content?.length > 0 &&
                content?.map((item, index) => (
                  <SwiperSlide key={`${index}`}>
                    <div className="relative w-full h-max overflow-hidden">
                      {item?.category && (
                        <SubH2 className="text-blue-200 pb-2">
                          {item?.category}
                        </SubH2>
                      )}

                      <ul className="mt-2 space-y-1">
                        {item?.card?.length > 0 &&
                          item?.card?.map((feature, idx) => (
                            <>
                              {feature?.BulletPoints?.map((item) => (
                                <li
                                  key={`${idx}-${item?.title}`}
                                  className="text-sm text-gray-300 flex items-center gap-2"
                                >
                                  <Image
                                    src="/images/star-orange.svg"
                                    alt="star"
                                    height={15}
                                    width={15}
                                  />

                                  <BodyText2 key={item?.title}>{item?.title}</BodyText2>

                                </li>
                              ))}
                            </>
                          ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Navigation */}
            <div className="absolute top-0 right-0 py-2 z-10 hidden lg:block bg-white">
              <div className="flex justify-end gap-3 px-5 lg:px-0">
                <button
                  className={`swiper-button-prev-useBySection transition-opacity`}

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
                  className={`swiper-button-next-useBySection transition-opacity `}
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
              <div className="gap-x-6 lg:gap-x-[72px] w-fit hidden lg:flex">
                {content?.length > 0 &&
                  content?.map((items, index) => (
                    <div key={items.id} onClick={() => handleSlideChange(index)}>
                      {items?.category && (
                        <BodyText2
                          className={`cursor-pointer flex-shrink-0 transition-all duration-300 ${active === index
                              ? "text-orange-200"
                              : "text-gray-600 hover:text-orange-100"
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
        <div className="w-1/2">
          <SwipeImage activeImg={content?.[active]?.card?.[active]?.image?.url} />
        </div>
      </div>
    </div>
  );
};

export default CDMOE2E;