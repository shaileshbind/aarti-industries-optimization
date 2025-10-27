"use client";
import React from "react";
import { H2 } from "../Typography2";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";

const ChemCreates = () => {
  const sliderData = [
    {
      id: 0,
      img: "/images/home/blog1.png",
      link: "#",
      date: "May 21, 2025",
      desc: "Tristique nulla sed hac donec nulla habitant facilisi.",
    },
    {
      id: 1,
      img: "/images/home/blog2.png",
      link: "#",
      date: "May 21, 2025",
      desc: "Urna at mi nunc sit cursus eu diam congue.",
    },
    {
      id: 2,
      img: "/images/home/blog3.png",
      link: "#",
      date: "May 21, 2025",
      desc: "Sit feugiat vel dictumst consectetur turpis.",
    },
    {
      id: 3,
      img: "/images/home/blog4.png",
      link: "#",
      date: "May 21, 2025",
      desc: "Neque cras quis sit mattis fringilla.",
    },
  ];

  return (
    <div className="my-[100px] container">
      <H2>Chemistry That Creates Results</H2>
      <div className="mt-[36px] lg:mt-[40px]">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={24}
          breakpoints={{
            1024: { slidesPerView: 4 },
          }}
          modules={[Pagination, Mousewheel]}
          pagination={{
            type: "progressbar",
          }}
          direction="horizontal"
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          className="whoweare-chem-creates-swiper"
        >
          {sliderData?.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                <DateCard
                  imageSrc={item?.img}
                  date={item?.date}
                  desc={item?.desc}
                  link={item?.link}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ChemCreates;
