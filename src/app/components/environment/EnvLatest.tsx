"use client";
import React from "react";
import { H2 } from "../Typography2";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { EnvLifeProps } from "@/app/types/environment.type";

const EnvLatest = ({ data }: EnvLifeProps) => {
  const { post_categories, sectionTitle } = data;
  return (
    <div className="my-[50px] lg:my-[100px]">
      <H2 className="fluid-container">{sectionTitle}</H2>
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
          {post_categories[0]?.posts?.map((item, index) => (
            <SwiperSlide key={index}>
              <DateCard
                imageSrc={item?.image?.url}
                date={item?.title}
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
