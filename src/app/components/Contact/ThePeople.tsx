"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import { BodyText1, BodyText2, H2 } from "../Typography2";
import Image from "next/image";
interface Person {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
  url?: string;
}
interface ThePeopleProps {
  data: {
    title: string;
    people: Person[];
  };
}

const ThePeople: React.FC<ThePeopleProps> = ({ data }) => {
    console.log("dataxxxxx", data);
//   const { title, people } = data;
  console.log("people", data);
  return (
    <div className="w-full mt-10 mb-40 overflow-hidden">
      {/* Title */}
      {/* <h2 className="text-center text-3xl lg:text-5xl font-bold mb-11">{data.title}</h2> */}
      
      <H2 className="text-center mb-11">{data.title}</H2>


      {/* Swiper center mode slider */}
      <div className="container !max-w-[800px] relative mb-10">
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
        {data.people.map((person) => (
          <SwiperSlide key={person.id} className="opactiSlide transition-all duration-300">
            <div className="bg-[#EFF3F5] shadow-lg rounded-xl overflow-hidden flex text-left w-full flex-col lg:flex-row">
                <div className="w-full lg:w-[40%] relative pt-8 order-2 lg:order-1">
              <Image
                src={person.image}
                alt={person.name}
                width={326}
                height={350}
                className="object-contain"
                // className="w-28 h-28 object-cover rounded-full mb-6 border-4 border-gray-100"
              />
              </div>
              <div className="w-full lg:w-[60%] self-center  px-8 py-8 order-1 lg:order-2">
              <BodyText1>{person.description}</BodyText1>
              <BodyText2 className="mb-1 text-blue-200 mt-8">{person.name}</BodyText2>
              <BodyText2 className="mb-1 text-gray-300">{person.designation}</BodyText2>
              
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="absolute top-[100%] mt-2.5 left-0 w-full h-5 z-10"> */}
      <div className="lg:hidden home-by-use-section-swiper mt-10 h-[2px] w-[90%] mx-auto z-[1]" />
      {/* </div> */}
      <div className="hidden lg:block swiper-button-prev-people absolute top-1/2 -translate-y-1/2 right-full min-w-[65px] min-h-[70px] p-3">
        <Image
          src="/images/home/chevron-right-orange.svg"
          alt="arrow-left"
          width={24}
          height={24}
          className="rotate-180"
        />
      </div>
      <div className="hidden lg:block swiper-button-next-people absolute top-1/2 -translate-y-1/2 left-full min-w-[65px] min-h-[70px] p-3">
        <Image
          src="/images/home/chevron-right-orange.svg"
          alt="arrow-left"
          width={24}
          height={24}
        />
      </div>
    </div>
    </div>
  );
};

export default ThePeople;
