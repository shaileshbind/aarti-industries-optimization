"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BodyText2, H2, SubH2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import gsap from "gsap";
import SwipeImage from "./SwipeImage";
import { WordReveal } from "../ScrollReveal";
import type { SwiperRef } from "swiper/react";
import { CDMOE2EProps } from "@/app/types/cdmo.type";

const CDMOE2E: React.FC<CDMOE2EProps> = ({ data }) => {
  const { title, content, description } = data;

  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImg, setActiveImg] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef | null>(null);

  // 🧠 Update active image when slide or tab changes
  useEffect(() => {
    const currentImg = content?.[active]?.card?.[activeIndex]?.image?.url;
    if (currentImg) setActiveImg(currentImg);
  }, [active, activeIndex, content]);

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
          setActiveIndex(0);
        })
        .to(contentRef.current, {
          duration: 0.3,
          opacity: 1,
          ease: "power2.out",
          onComplete: () => setIsTransitioning(false),
        });
    }
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
            {activeImg && (
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={activeImg}
                  alt="active-img"
                  fill
                  className="object-cover scale-110"
                />
                <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
                <span className="absolute rounded-full rounded-br-[28px] overflow-hidden w-[100%] h-[100%]">
                  <Image
                    src={activeImg}
                    alt="active-img"
                    fill
                    className="object-cover scale-110"
                  />
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            {/* <BodyText2 className="text-orange-200 pb-4">
              0{activeIndex + 1}-<span>0{content?.[active]?.card?.length}</span>
            </BodyText2> */}
            <Swiper
              key={`swiper-${active}`}
              ref={swiperRef}
              spaceBetween={16}
              slidesPerView={0.9}
              breakpoints={{
                1024: { slidesPerView: 1, spaceBetween: 24 },
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
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              observer={true}
              observeParents={true}
              direction="horizontal"
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              className="!pr-5 lg:!pr-0"
            >
              {content?.[active]?.card?.length > 0 &&
                content?.[active]?.card?.map((item, index) => (
                  <SwiperSlide key={`${active}-${index}`}>
                    <div className="relative w-full h-max overflow-hidden">
                      {item?.title && (
                        <SubH2 className="text-blue-200 pb-2">
                          {item?.title}
                        </SubH2>
                      )}

                      <ul className="mt-2 space-y-1">
                        {item?.BulletPoints?.length > 0 &&
                          item?.BulletPoints?.map((feature, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-300 flex items-center gap-2"
                            >
                              <Image
                                src="/images/star-orange.svg"
                                alt="star"
                                height={15}
                                width={15}
                              />
                              {feature?.title && (
                                <BodyText2>{feature?.title}</BodyText2>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Navigation */}
            {/* <div className="absolute top-0 right-0 py-2 z-10 hidden lg:block">
              <div className="flex justify-end gap-3 px-5 lg:px-0">
                <button
                  className={`swiper-button-prev-useBySection transition-opacity ${
                    activeIndex > 0
                      ? "cursor-pointer opacity-100"
                      : "pointer-events-none opacity-30"
                  }`}
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
                    activeIndex < content?.[active]?.card?.length - 1
                      ? "cursor-pointer opacity-100"
                      : "pointer-events-none opacity-30"
                  }`}
                >
                  <Image
                    src="/images/home/chevron-right-orange.svg"
                    alt="Next"
                    width={34}
                    height={34}
                  />
                </button>
              </div>
            </div> */}

            {/* Progress Bar */}
            <div className="home-by-use-section-swiper mt-10 h-[2px] w-[90%] mx-auto" />

            {/* Tabs */}
            <div className="overflow-x-auto pt-[40px] px-5 lg:px-0 mt-6">
              <div className="gap-x-6 lg:gap-x-[72px] w-fit hidden lg:flex">
                {content?.length > 0 &&
                  content?.map((items, index) => (
                    <div key={items.id} onClick={() => handleTabClick(index)}>
                      {items?.category && (
                        <BodyText2
                          className={`cursor-pointer flex-shrink-0 transition-all duration-300 ${
                            active === index
                              ? "text-orange-200"
                              : "text-gray-600 hover:text-orange-100"
                          } ${isTransitioning ? "pointer-events-none" : ""}`}
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
          <SwipeImage activeImg={activeImg} />
        </div>
      </div>
    </div>
  );
};

export default CDMOE2E;
