"use client";
import React, { useState } from "react";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import Tabs from "../Tabs";
import DateCard from "../cards/DateCard";

const LatestAtAarti = () => {
  const [active, setActive] = useState(0);
  const sliderData = [
    {
      label: "Blogs",
      id: 0,
      content: [
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 21, 2025",
          desc: "Tristique nulla sed hac donec nulla habitant facilisi.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 21, 2025",
          desc: "Urna at mi nunc sit cursus eu diam congue.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 21, 2025",
          desc: "Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 21, 2025",
          desc: "Neque cras quis sit mattis fringilla.",
        },
      ],
    },
    {
      label: "Thought Leadership",
      id: 1,
      content: [
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 25, 2025",
          desc: "Exploring sustainable practices for future-ready industries.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 25, 2025",
          desc: "How R&D leaders shape the path to global competitiveness.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 25, 2025",
          desc: "Building stronger partnerships across industries.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 25, 2025",
          desc: "Balancing growth with environmental responsibility.",
        },
      ],
    },
    {
      label: "News & Media",
      id: 2,
      content: [
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 28, 2025",
          desc: "Commitment to reduce carbon emissions by 30% by 2030.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 28, 2025",
          desc: "Boosting capacity to meet growing global demand.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 28, 2025",
          desc: "Recognition for leadership in speciality chemicals.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 28, 2025",
          desc: "Partnering with local schools and universities.",
        },
      ],
    },
    {
      label: "Reports & Publications",
      id: 3,
      content: [
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "June 01, 2025",
          desc: "Detailed insights on progress towards global goals.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "June 01, 2025",
          desc: "Analysis of emerging technologies and applications.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "June 01, 2025",
          desc: "Strengthening collaborations across continents.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "June 01, 2025",
          desc: "Key projects and outcomes from the last year.",
        },
      ],
    },
    {
      label: "Stories from AIL",
      id: 4,
      content: [
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "June 05, 2025",
          desc: "Celebrating the journey of our long-standing team members.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "June 05, 2025",
          desc: "How our employees contribute breakthrough ideas daily.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "June 05, 2025",
          desc: "Providing resources and support for local development.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "June 05, 2025",
          desc: "Fostering a culture of belonging across all teams.",
        },
      ],
    },
  ];

  return (
    <div className="w-full my-[50px] lg:my-[100px]">
      <div className="container mx-auto">
        <H2 className="text-blue-200">The Latest at Aarti</H2>
      </div>
      <div className="mt-[18px] md:mt-[30px] w-full container">
        <div className="max-w-[100%] md:max-w-fit">
          <Tabs
            tabs={sliderData}
            activeId={active}
            onChange={(id) => {
              setActive(id);
            }}
          />
        </div>

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
            {sliderData[active]?.content?.map((item, index) => (
              <SwiperSlide key={index}>
                <DateCard
                  imageSrc={item?.img}
                  date={item?.date}
                  desc={item?.desc}
                  link={item?.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LatestAtAarti;
