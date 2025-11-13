"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BodyText1, BodyText2, H2 } from "./Typography2";
import Image from "next/image";
import { ImageProps } from "../types/global.type";

interface Testimonials {
  id: number;
  name: string;
  designation: string;
  testimonialText: string;
  image: ImageProps;
  mobImage: ImageProps;
}

interface ThePeopleProps {
  data: {
    title: string;
    testimonials: Testimonials[];
  };
}

const ThePeople: React.FC<ThePeopleProps> = ({ data }) => {
  const { title, testimonials } = data;

  return (
    <div className="w-full mt-[0px] md:mt-10 mb-[72px] md:mb-[100px] overflow-hidden">
      {title && <H2 className="text-center mb-11">{title}</H2>}

      {/* Swiper center mode slider */}
      {testimonials?.length > 0 && (
        <div className="container !max-w-[800px] relative md:mb-10">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            modules={[Navigation, Pagination]}
            pagination={{
              el: ".home-by-use-section-swiper",
              type: "progressbar",
            }}
            navigation={{
              nextEl: ".swiper-button-next-people",
              prevEl: ".swiper-button-prev-people",
            }}
            className="people-swiper !overflow-visible"
            breakpoints={{
              1024: {
                spaceBetween: 124,
              },
            }}
          >
            {testimonials?.map((person) => (
              <SwiperSlide
                key={person?.id}
                className="opactiSlide transition-all duration-300"
              >
                <div className="bg-[#EFF3F5] shadow-lg rounded-xl overflow-hidden flex text-left w-full flex-col md:flex-row  md:h-[370px]">
                  <div className="w-full md:w-[40%] relative md:pt-8 order-2 md:order-1 h-[278px] md:h-full">
                    <Image
                      src={person?.image?.url}
                      alt={person?.name}
                      width={326}
                      height={350}
                      className="w-[80%] md:w-full  h-full"
                    />
                  </div>
                  <div className="w-full md:w-[60%] self-center p-5 md:px-8 md:py-8 order-1 md:order-2">
                    {person?.testimonialText && (
                      <BodyText1>{person?.testimonialText}</BodyText1>
                    )}

                    {person?.name && (
                      <BodyText2 className="mb-1 text-blue-200 mt-8">
                        {person?.name}
                      </BodyText2>
                    )}

                    {person?.designation && (
                      <BodyText2 className="mb-1 text-gray-300">
                        {person?.designation}
                      </BodyText2>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="absolute top-[100%] mt-2.5 left-0 w-full h-5 z-10"> */}
          <div className="md:hidden home-by-use-section-swiper mt-10 h-[2px] w-[90%] mx-auto z-[1]" />
          {/* </div> */}
          <div className="hidden md:block swiper-button-prev-people absolute top-1/2 -translate-y-1/2 right-full min-w-[65px] min-h-[70px] p-3  cursor-pointer">
            <Image
              src="/images/home/chevron-right-orange.svg"
              alt="arrow-left"
              width={24}
              height={24}
              className="rotate-180"
            />
          </div>
          <div className="hidden md:block swiper-button-next-people absolute top-1/2 -translate-y-1/2 left-full min-w-[65px] min-h-[70px] p-3  cursor-pointer">
            <Image
              src="/images/home/chevron-right-orange.svg"
              alt="arrow-left"
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThePeople;
