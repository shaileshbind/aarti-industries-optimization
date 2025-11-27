"use client";
import React from "react";
import { BodyText2, H2, SubH2 } from "../Typography2";
import Button from "../Button";
import DateCard from "../cards/DateCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

const InHeadlines = () => {
  return (
    <div className="my-[72px] lg:my-[120px]">
      <H2 className="fluid-container">In the Headlines</H2>
      <div className="mt-[30px] grid lg:grid-cols-[300px_1fr] gap-y-[50px] gap-x-[60px] mx-[unset] lg:mx-[60px]">
        <div className="mx-[20px] lg:mx-[unset]">
          <SubH2 className="mb-[12px] lg:mb-[30px]">Press Release</SubH2>
          {[0, 1, 2].map((index) => {
            return (
              <div
                key={index}
                className="pb-[14px] border-b border-grey-200 mb-[14px]"
              >
                <BodyText2>
                  Lorem ipsum dolor sit amet consectetur. Ac vulputate metu
                </BodyText2>
                <BodyText2 className="!text-grey-300 !text-[12px] lg:!text-[14px]">
                  November 11, 2025
                </BodyText2>
              </div>
            );
          })}
          <Button
            secondary
            href="#"
            title="Read More Coverages"
            className="mt-[10px] lg:mt-[30px]"
          />
        </div>
        <div className=" overflow-hidden">
          <div className="flex justify-between mx-[20px] lg:mx-[unset]">
            <H2 className="!text-[20px] lg:!text-[24px] ">Media Coverages</H2>
            <Button href="#" title="View All" secondary />
          </div>
          <div className="mt-[28px]">
            <Swiper
              spaceBetween={15}
              slidesPerView={1.2}
              modules={[Navigation, Pagination, Mousewheel]}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              pagination={{
                el: ".in-headlines-section-progressbar",
                type: "progressbar",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                  allowTouchMove: true,
                },
                600: {
                  slidesPerView: 2.2,
                  spaceBetween: 15,
                  allowTouchMove: true,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              className="!px-[20px] lg:!px-[0px]"
            >
              {[0, 1, 2].map((index) => {
                return (
                  <SwiperSlide key={index}>
                    <DateCard
                      key={index}
                      imageSrc="/images/home/hero-banner1.png"
                      date="May 21, 2025"
                      desc="Lorem ipsum dolor sit amet consectetur. Urna at mi nunc sit cursus eu diam congue. "
                      link="#"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="w-full pt-[24px] px-5 lg:px-0">
            <div className="in-headlines-section-progressbar h-[2px] z-[1] w-full lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InHeadlines;
