"use client";
import React, { useState } from "react";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import Tabs from "../Tabs";
import DateCard from "../cards/DateCard";
import { LatestAtAartiProps } from "@/app/types/home.type";

const LatestAtAarti: React.FC<LatestAtAartiProps> = ({ data }) => {
  const { sectionTitle, card } = data;
  const [active, setActive] = useState<string>(card?.[0]?.post_category?.slug);
  const [activeIndex, setactiveIndex] = useState<number>(0);

  return (
    <div className="w-full my-[50px] lg:my-[100px]">
      {sectionTitle && (
        <div className="container mx-auto">
          <H2 className="text-blue-200">{sectionTitle}</H2>
        </div>
      )}

      <div className="mt-[18px] md:mt-[30px] w-full container">
        <div className="max-w-[100%] md:max-w-fit">
          <Tabs
            tabs={card}
            activeId={active}
            onChange={(slug, index) => {
              setActive(String(slug));
              setactiveIndex(index);
            }}
          />
        </div>

        {card[activeIndex]?.post_category?.posts?.length > 0 && (
          <div className="mt-[52px]">
            <Swiper
              key={active}
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
              className="home-latest-at-swiper"
            >
              {card?.[activeIndex]?.post_category?.posts?.map((item, index) => (
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
        )}
      </div>
    </div>
  );
};

export default LatestAtAarti;
