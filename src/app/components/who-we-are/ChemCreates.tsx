"use client";
import React from "react";
import { H2 } from "../Typography2";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { ChemCreatesProps } from "@/app/types/who-we-are.type";

const ChemCreates: React.FC<ChemCreatesProps> = ({ data }) => {
  const { sectionTitle, card } = data;

  return (
    <div className="my-[100px] container">
      {sectionTitle && <H2>{sectionTitle}</H2>}

      {card?.length > 0 && (
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
            {card?.map((item) => {
              return (
                <SwiperSlide key={item?.id}>
                  <DateCard
                    imageSrc={item?.image?.url}
                    date={item?.date}
                    desc={item?.title}
                    link={item?.link || "#"}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ChemCreates;
