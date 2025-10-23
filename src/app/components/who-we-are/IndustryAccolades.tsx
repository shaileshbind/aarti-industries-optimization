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

const IndustryAccolades = () => {
  const [active, setActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
     const swiperRef = useRef<SwiperType | null>(null);

  const awardData = [
    {
      label: "2025",
      id: 0,
      content: [
        {
          img: "/images/who-we-are/a1.png",
          desc: "2025 - Tristique nulla sed hac donec nulla habitant facilisi.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2025 - Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2025 - Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2025 - Neque cras quis sit mattis fringilla.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2025 - Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2025 - Sit feugiat vel dictumst consectetur turpis.",
        },
      ],
    },
    {
      label: "2024",
      id: 1,
      content: [
        {
          img: "/images/who-we-are/a2.png",
          desc: "2024 - Exploring sustainable practices for future-ready industries.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2024 - How R&D leaders shape the path to global competitiveness.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2024 - Building stronger partnerships across industries.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2024 - Balancing growth with environmental responsibility.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2024 - How R&D leaders shape the path to global competitiveness.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2024 - Building stronger partnerships across industries.",
        },
      ],
    },
    {
      label: "2023",
      id: 2,
      content: [
        {
          img: "/images/who-we-are/a3.png",
          desc: "2023 - Commitment to reduce carbon emissions by 30% by 2030.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2023 - Boosting capacity to meet growing global demand.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2023 - Recognition for leadership in speciality chemicals.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2025 - Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2025 - Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2023 - Partnering with local schools and universities.",
        },
      ],
    },
    {
      label: "2022",
      id: 3,
      content: [
        {
          img: "/images/who-we-are/a1.png",
          desc: "2022 - Detailed insights on progress towards global goals.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2022 - Analysis of emerging technologies and applications.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2022 - Strengthening collaborations across continents.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2025 - Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2025 - Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2022 - Key projects and outcomes from the last year.",
        },
      ],
    },
    {
      label: "2021",
      id: 4,
      content: [
        {
          img: "/images/who-we-are/a2.png",
          desc: "2021 - Celebrating the journey of our long-standing team members.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2021 - How our employees contribute breakthrough ideas daily.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2025 - Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2025 - Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2021 - Providing resources and support for local development.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2021 - Fostering a culture of belonging across all teams.",
        },
      ],
    },
    {
      label: "2020",
      id: 5,
      content: [
        {
          img: "/images/who-we-are/a3.png",
          desc: "2020 - Highlights from early initiatives and milestones.",
        },
        {
          img: "/images/who-we-are/a1.png",
          desc: "2020 - The foundation of our innovation journey.",
        },
        {
          img: "/images/who-we-are/a2.png",
          desc: "2020 - Collaborations that shaped our early success.",
        },
        {
          img: "/images/who-we-are/a3.png",
          desc: "2020 - Pioneering projects that started it all.",
        },
      ],
    },
  ];

  const handleTabClick = (index: number) => {
    setActive(index);
  };

  // ✅ Reset when changing tabs
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0); // go to first slide
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
      <H2 className="text-center container">
        Industry Accolades. Global Trust
      </H2>

      {/* Tabs */}
      <div className=" mt-[27px] lg:mt-[36px] w-full lg:w-fit flex gap-x-[20px] lg:gap-x-[46px] overflow-x-auto lg:overflow-hidden px-[20px] lg:px-auto mx-[unset] lg:mx-auto">
        {awardData.map((items, index) => (
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
              {items.label}
            </BodyText2>
          </div>
        ))}
      </div>

      {/* Swiper */}
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
          {awardData[active]?.content?.map((item, idx) => (
            <SwiperSlide key={`${active}-${idx}`}>
              <div className="bg-[#EFF3F5] rounded-[20px] p-[60px] grid place-items-center">
                <Image
                  src={item.img}
                  alt="img"
                  width={70}
                  height={190}
                  className="object-contain w-[70px] h-[190px]"
                />
              </div>
              <BodyText1 className="mt-[14px] text-blue-200">
                {item.desc}
              </BodyText1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
                (awardData[active]?.content?.length || 0) -
                  Math.floor(swiperRef.current?.params.slidesPerView || 1)
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
