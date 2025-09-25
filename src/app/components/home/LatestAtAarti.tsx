import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { H2 } from "../Typography2";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Tabs from "../Tabs";

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
          label: "Lorem ipsum dolor sit amet consectetur.",
          desc: "Sit feugiat vel dictumst consectetur turpis.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 21, 2025",
          label: "Lorem ipsum dolor sit amet consectetur.",
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
          label: "Driving innovation in speciality chemicals.",
          desc: "Exploring sustainable practices for future-ready industries.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 25, 2025",
          label: "Leadership perspectives in research & development.",
          desc: "How R&D leaders shape the path to global competitiveness.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "May 25, 2025",
          label: "The role of collaboration in science & technology.",
          desc: "Building stronger partnerships across industries.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 25, 2025",
          label: "Sustainability in manufacturing.",
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
          label: "Company announces new sustainability targets.",
          desc: "Commitment to reduce carbon emissions by 30% by 2030.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "May 28, 2025",
          label: "Expansion of manufacturing facilities in Asia.",
          desc: "Boosting capacity to meet growing global demand.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "May 28, 2025",
          label: "Featured in international trade magazine.",
          desc: "Recognition for leadership in speciality chemicals.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "May 28, 2025",
          label: "Community engagement initiatives.",
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
          label: "Annual Sustainability Report 2025.",
          desc: "Detailed insights on progress towards global goals.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "June 01, 2025",
          label: "Market Trends in Chemical Innovation.",
          desc: "Analysis of emerging technologies and applications.",
        },
        {
          img: "/images/home/blog4.png",
          link: "#",
          date: "June 01, 2025",
          label: "Global Partnerships Report.",
          desc: "Strengthening collaborations across continents.",
        },
        {
          img: "/images/home/blog2.png",
          link: "#",
          date: "June 01, 2025",
          label: "Research & Development Highlights.",
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
          label: "Employee spotlight: 20 years of dedication.",
          desc: "Celebrating the journey of our long-standing team members.",
        },
        {
          img: "/images/home/blog3.png",
          link: "#",
          date: "June 05, 2025",
          label: "Innovation from within.",
          desc: "How our employees contribute breakthrough ideas daily.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "June 05, 2025",
          label: "Community outreach in rural areas.",
          desc: "Providing resources and support for local development.",
        },
        {
          img: "/images/home/blog1.png",
          link: "#",
          date: "June 05, 2025",
          label: "Diversity and inclusion at AIL.",
          desc: "Fostering a culture of belonging across all teams.",
        },
      ],
    },
  ];

  return (
    <div className="w-full my-[50px] lg:my-[100px]">
      <div className="mx-[20px] lg:container lg:mx-auto">
        <H2 className="text-blue-200">The Latest at Aarti</H2>
      </div>
      <div className="mt-[18px] md:mt-[30px]">
        {/* Tabs */}
        {/* <div className="lg:container lg:mx-auto w-full overflow-scroll !px-[20px] lg:!px-[unset]">
          <div className="bg-grey-100 rounded-[40px] p-[4px]  flex overflow-x-auto whitespace-nowrap gap-x-[unset] lg:gap-x-[14px] w-fit">
            {sliderData.map((items, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`text-grey-400 font-alte-hans leading-[136%] cursor-pointer py-[10px] lg:py-[12px] px-[12px] lg:px-[24px] rounded-[40px] ${
                  active === index ? "text-white bg-gradient-orange-3" : ""
                }`}
              >
                {items?.label}
              </div>
            ))}
          </div>
        </div> */}
        <div className="lg:container lg:mx-auto w-full">
          <div className="max-w-[100%] md:max-w-fit"> 
          <Tabs
            tabs={sliderData}
            activeId={active}
            onChange={(id) => {
              setActive(id);
            }}
          />
          </div>
        </div>

        <div className="mt-[52px] container mx-[unset] lg:mx-auto">
          <Swiper
            key={active}
            spaceBetween={24}
            slidesPerView={1.5}
            breakpoints={{
              1024: { slidesPerView: 4 },
            }}
            modules={[Pagination]}
            pagination={{
              type: "progressbar",
            }}
            className="home-latest-at-swiper"
          >
            {sliderData[active]?.content?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={item?.link} target="_blank">
                  <div className="relative rounded-[10px] w-full h-[230px] overflow-hidden">
                    <Image
                      src={item?.img}
                      alt="img"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
                    {item?.date}
                  </div>
                  <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
                    {item?.desc}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LatestAtAarti;
