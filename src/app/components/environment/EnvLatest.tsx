"use client";
import React from "react";
import { H2 } from "../Typography2";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";

const EnvLatest = () => {
  const envData = [
    {
      id: 0,
      date: "May 21, 2025",
      slug: "#",
      description:
        "Minimum one week, and I'll need backend help as well. Since I'm working on Aarti too, the timeline might extend.",
      image: "/images/environment/env-banner.png",
      mobImage: "/images/environment/env-banner.png",
    },
    {
      id: 1,
      date: "May 22, 2025",
      slug: "#",
      description:
        "Minimum one week, and I'll need backend help as well. Since I'm working on Aarti too, the timeline might extend.",
      image: "/images/environment/env-banner.png",
      mobImage: "/images/environment/env-banner.png",
    },
    {
      id: 2,
      date: "May 23, 2025",
      slug: "#",
      description:
        "Minimum one week, and I'll need backend help as well. Since I'm working on Aarti too, the timeline might extend.",
      image: "/images/environment/env-banner.png",
      mobImage: "/images/environment/env-banner.png",
    },
    {
      id: 3,
      date: "May 25, 2025",
      slug: "#",
      description:
        "Minimum one week, and I'll need backend help as well. Since I'm working on Aarti too, the timeline might extend.",
      image: "/images/environment/env-banner.png",
      mobImage: "/images/environment/env-banner.png",
    },
  ];
  return (
    <div className="my-[50px] lg:my-[100px]">
      <H2 className="fluid-container">Latest from AIL</H2>
      <div className="mt-[52px] px-[20px] lg:px-[60px]">
        <Swiper
          spaceBetween={24}
          slidesPerView={1.5}
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
          className="env-latest-at-swiper "
        >
          {envData?.map((item, index) => (
            <SwiperSlide key={index}>
              <DateCard
                imageSrc={item?.image}
                date={item?.date}
                desc={item?.description}
                link={item?.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EnvLatest;
